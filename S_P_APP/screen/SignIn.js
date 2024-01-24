import { Pressable, StyleSheet, Text, View, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useContext } from "react";
import UserInput from "../components/auth/UserInput";
import Icon from "../components/Icon";
import { mobileApi } from "../config";
import Activityindicator from "../components/Activityindicator";
import SwipButton from "../components/auth/SwipButton";
import { AuthContext } from "../store/store";

const SignIn = ({ navigation, route }) => {
  const [spEmail, setSpEmail] = useState("");
  const [spPassword, setSpPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    spEmail: false,
    spPassword: false,
  });
  const handleFieldFocus = (fieldName) => {
    setInputErrors({ ...inputErrors, [fieldName]: false });
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...inputErrors };
    if (!spEmail || !spPassword) {
      // Display alert for empty fields
      Alert.alert("Error", "All fields are required.");
      return false;
    }
    // Validate each field and set error state
    if (!spEmail) {
      newErrors.spEmail = true;
      isValid = false;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(spEmail)) {
      newErrors.spEmail = true;
      isValid = false;
    }

    if (!spPassword) {
      newErrors.spPassword = true;
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
        const response = await fetch(`${mobileApi}/sp/ServiceProviderLogin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: spEmail,
            password: spPassword,
          }),
        });

        const responseData = await response.json();
        console.log("login Response", responseData);
        if (responseData.code === "200") {
          const Id = responseData.result;

          const email = Id.spEmail;

          const spId = Id.spId;
          const spName = Id.spName;
          setState({
            ...state,
            spEmail: email,
            spId: spId,
            spName: spName,
          });
          await AsyncStorage.setItem(
            "@auth",
            JSON.stringify({ email, spId, spName })
          );
        } else {
          return Alert.alert("Error", responseData.message);
        }
      } catch (error) {
        console.log("catch error of sign in ", error.message);
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <>
          <View>
            <View>
              {inputErrors.spEmail && (
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
                  inputErrors.spEmail ? { borderColor: "red" } : null,
                ]}
              >
                <Icon name="email-outline" size={24} color="gray" />
                <UserInput
                  onFocus={() => handleFieldFocus("spEmail")}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  autoCorrect={false}
                  value={spEmail}
                  setValue={setSpEmail}
                />
              </View>
              {inputErrors.spPassword && (
                <Text
                  style={{
                    marginLeft: 5,
                    paddingVertical: 5,
                    color: "red",
                  }}
                >
                  Invalid password
                </Text>
              )}
              <View
                style={[
                  styles.input__icon,
                  styles.paddingVertical,
                  inputErrors.spPassword ? { borderColor: "red" } : null,
                ]}
              >
                <Icon name="lock-outline" size={24} color="gray" />
                <UserInput
                  placeholder="Password"
                  secureTextEntry={!isVisible}
                  value={spPassword}
                  setValue={setSpPassword}
                  onFocus={() => handleFieldFocus("spPassword")}
                />
                <Pressable
                  style={({ pressed }) => pressed && styles.pressed}
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Image
                      source={require("../assets/eye_closed.png")}
                      style={{ height: 25, width: 25, marginRight: 5 }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/eye.png")}
                      style={{ height: 25, width: 25, marginRight: 5 }}
                    />
                  )}
                </Pressable>
              </View>

              <View style={styles.createAccount}>
                <View></View>
                <Pressable
                  style={({ pressed }) => pressed && styles.pressed}
                  onPress={() => navigation.navigate("Forgot Password")}
                >
                  <Text style={styles.createAccount__text}>
                    Forgot Password
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <SwipButton onPress={handleSubmit} title="LOGIN" />
        </>
      )}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
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
  createAccount: { flexDirection: "row", justifyContent: "space-between" },
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
