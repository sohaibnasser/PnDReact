import {
  Pressable,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserInput from "../components/auth/UserInput";
import Button from "../components/auth/Button";
import Icon from "../components/Icon";
import CountryCodePicker from "../components/auth/CountryCodePicker";
import DisButton from "../components/auth/DisButton";
import Radio from "../components/Radio";
import { UUid } from "../Util/UUid";
import { API, mobileApi } from "../config";
import Activityindicator from "../components/Activityindicator";
import SwipButton from "../components/auth/SwipButton";
import { AuthContext } from "../store/store";
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from "react-native-safe-area-context";

const SignIn = ({ navigation, route }) => {
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPassword, setDriverPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  const [inputErrors, setInputErrors] = useState({
    driverEmail: false,

    driverPassword: false,
  });
  const handleFieldFocus = (fieldName) => {
    // Remove the error highlight when the user starts editing the field
    setInputErrors({ ...inputErrors, [fieldName]: false });
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...inputErrors };
    if (!driverEmail || !driverPassword) {
      // Display alert for empty fields
      Alert.alert("Error", "All fields are required.");
      return false;
    }
    // Validate each field and set error state
    if (!driverEmail) {
      newErrors.driverEmail = true;
      isValid = false;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(driverEmail)) {
      newErrors.driverEmail = true;
      isValid = false;
    }

    if (!driverPassword) {
      newErrors.driverPassword = true;
      isValid = false;
    }

    // Add more validations for other fields here...

    setInputErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await fetch(`${mobileApi}/driver/loginDriver`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: driverEmail,
            password: driverPassword,
            token: UUid,
            uuid: UUid,
          }),
        });

        const responseData = await response.json();
        if (responseData.status !== "success") {
          Alert.alert("Error", responseData.message);
        } else {
          console.log("response of login", responseData);

          const result = responseData.result;

          const driverId = result.driverId;

          const driverEmail = result.driverEmail;
          const driverName = result.driverName;
          const driverRating = result.driverAvgRating;

          setState({
            ...state,
            driverEmail: driverEmail,
            driverId: driverId,
            driverName: driverName,
            driverRating: driverRating,
          });
          await AsyncStorage.setItem(
            "@auth",
            JSON.stringify({ driverEmail, driverId, driverName, driverRating })
          );
          // navigation.navigate("Your Passengers");
        }
      } catch (error) {
        console.log("catch error of sign in ", error.message);
      } finally {
        setIsLoading(false);
      }
    }
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      //   navigation.navigate("Phone Verification");
      console.log("loadfromAsyncsStorage sigin", data);

      // };
    };
    PressHandler();
  };

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <>
          <View>
            {inputErrors.driverEmail && (
              <Text
                style={{
                  marginLeft: 5,
                  paddingVertical: 5,
                  color: "red",
                }}
              >
                Invalid Email Address
              </Text>
            )}
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                inputErrors.driverEmail ? { borderColor: "red" } : null,
              ]}
            >
              <Icon name="email-outline" size={24} color="gray" />
              {/* <UserInput
          placeholder="+92 321545"
          keyboardType="phone-pad"
          autoCorrect={false}
          value={phone}
          setValue={setPhone}
        /> */}
              {/* <Pressable style={styles.phoneInput__Icon}>
          <Text>Countary</Text>
        </Pressable> */}
              {/* <CountryCodePicker phone={phone} setPhone={setPhone} /> */}
              <UserInput
                placeholder="Email Address"
                keyboardType="email-address"
                onFocus={() => handleFieldFocus("driverEmail")}
                autoCorrect={false}
                value={driverEmail}
                setValue={setDriverEmail}
              />
            </View>
            {inputErrors.driverPassword && (
              <Text
                style={{
                  marginLeft: 5,
                  paddingVertical: 5,
                  color: "red",
                }}
              >
                Password is invalid
              </Text>
            )}
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                inputErrors.driverPassword ? { borderColor: "red" } : null,
              ]}
            >
              <Icon name="lock-outline" size={24} color="gray" />
              <UserInput
                onfocus={() => handleFieldFocus("driverPassword")}
                placeholder="Password"
                secureTextEntry={!isVisible}
                value={driverPassword}
                setValue={setDriverPassword}
              />
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Image
                    source={require("../assets/eye.png")}
                    style={{ height: 30, width: 35, marginRight: 5 }}
                  />
                ) : (
                  <Image
                    source={require("../assets/eye_closed.png")}
                    style={{ height: 30, width: 35, marginRight: 5 }}
                  />
                )}
              </Pressable>
            </View>

            <View style={styles.createAccount}>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() => navigation.navigate("Forgot Password")}
              >
                <Text style={styles.createAccount__text}>Forgot Password</Text>
              </Pressable>
            </View>
          </View>
          <View>
            {/* <Pressable> */}

            <SwipButton onPress={handleSubmit} title="LOGIN" />

            {/* </Pressable> */}
          </View>
        </>
      )}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.75,
  },
  input__icon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 10,
    paddingLeft: 10,
    overflow: "hidden",
  },
  createAccount: { justifyContent: "flex-start", marginTop: 5 },
  createAccount__text: {
    color: "#49bece",
    fontSize: 15,
  },
  phoneInput__Icon: {
    backgroundColor: "grey",
    height: 50,
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 6,
  },
});
