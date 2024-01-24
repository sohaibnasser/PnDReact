import {
  Pressable,
  SafeAreaView,
  ScrollView,
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
import { API } from "../config";
import Activityindicator from "../components/Activityindicator";
import SwipButton from "../components/auth/SwipButton";
import { AuthContext } from "../store/store";

const SignIn = ({ navigation, route }) => {
  const [parentEmail, setParentEmail] = useState("");
  const [parentPassword, setParentPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  const [inputErrors, setInputErrors] = useState({
    parentEmail: false,

    parentPassword: false,
  });
  const handleFieldFocus = (fieldName) => {
    // Remove the error highlight when the user starts editing the field
    setInputErrors({ ...inputErrors, [fieldName]: false });
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...inputErrors };
    if (!parentEmail || !parentPassword) {
      // Display alert for empty fields
      Alert.alert("Error", "All fields are required.");
      return false;
    }
    // Validate each field and set error state
    if (!parentEmail) {
      newErrors.parentEmail = true;
      isValid = false;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(parentEmail)) {
      newErrors.parentEmail = true;
      isValid = false;
    }

    if (!parentPassword) {
      newErrors.parentPassword = true;
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
        const response = await fetch(`${API}/parent_login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: parentEmail,
            password: parentPassword,
            token: UUid,
            uuid: UUid,
          }),
        });
        setIsLoading(false);
        const responseData = await response.json();
        if (responseData.code !== "200") {
          return Alert.alert("Error", responseData.message);
        } else {
          // store to context
          // setState(data);
          // store to asyncstorage
          // await AsyncStorage.setItem("@auth", JSON.stringify(data));

          // alert(responseData.message);
          const Id = responseData.result[0];
          console.log("id login jdjdhjfhdshf", Id);
          const parn = Id;
          console.log("result", parn);
          const email = Id.parentEmail;
          const password = Id.parentPassword;
          const parentId = Id.parentId;
          const parentName = Id.parentName;
          const imageUrl = Id.imageUrl;

          // console.log("email and passord of sign in", email, password);
          setState({
            ...state,
            parentEmail: email,
            parentPassword: password,
            parentId: parentId,
            parentName: parentName,
            imageUrl: imageUrl,
          });
          await AsyncStorage.setItem(
            "@auth",
            JSON.stringify({ email, password, parentId, parentName, imageUrl })
          );
          navigation.navigate("Services");
          // setEmail("");
          // setPassword("");
        }
      } catch (error) {
        console.log("catch error of sign in ", error.message);
        // alert(error.message);
        setIsLoading(false);
      }
      const PressHandler = async () => {
        let data = await AsyncStorage.getItem("@auth");

        console.log("loadfromAsyncsStorage sigin", data);
      };
      PressHandler();
    }
  };

  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        {inputErrors.parentEmail && (
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
            inputErrors.parentEmail ? { borderColor: "red" } : null,
          ]}
        >
          <Icon name="email-outline" size={24} color="gray" />
          <UserInput
            onfocus={() => handleFieldFocus("parentEmail")}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCorrect={false}
            value={parentEmail}
            setValue={setParentEmail}
          />
        </View>
        <View style={[styles.input__icon, styles.paddingVertical]}>
          <Icon name="lock-outline" size={24} color="gray" />
          <UserInput
            placeholder="Password"
            secureTextEntry={!isVisible}
            value={parentPassword}
            setValue={setParentPassword}
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
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => navigation.navigate("Create Account")}
          >
            <Text style={styles.createAccount__text}>Sign Up</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => navigation.navigate("Forgot Password")}
          >
            <Text style={styles.createAccount__text}>Forgot Password</Text>
          </Pressable>
        </View>
      </View>
      <SwipButton onPress={handleSubmit} title="LOGIN" />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  createAccount: { flexDirection: "row", justifyContent: "space-around" },
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
