import {
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";
import UserInput from "../components/auth/UserInput";
import Button from "../components/auth/Button";
import Icon from "../components/Icon";
import { API, mobileApi } from "../config";
import Activityindicator from "../components/Activityindicator";
import SwipButton from "../components/auth/SwipButton";
import { set } from "react-native-reanimated";
// import CountryCodePicker from "../components/auth/CountryCodePicker";

const ForgotPassword = ({ navigation }) => {
  // const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    email: false,

    parentPassword: false,
  });
  const handleFieldFocus = (fieldName) => {
    // Remove the error highlight when the user starts editing the field
    setInputErrors({ ...inputErrors, [fieldName]: false });
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...inputErrors };
    if (!email) {
      // Display alert for empty fields
      Alert.alert("Error", "All fields are required.");
      return false;
    }
    // Validate each field and set error state
    if (!email) {
      newErrors.email = true;
      isValid = false;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      newErrors.email = true;
      isValid = false;
    }

    // Add more validations for other fields here...

    setInputErrors(newErrors);

    return isValid;
  };
  // const [isEditable, setIsEditable] = useState(false);
  //   const [state, setState] = useContext(AuthContext);

  // const handleSubmit = async () => {
  //     setIsLoading(true);
  //     if (!email || !password) {
  //       alert("all field are required");
  //       setIsLoading(false);
  //       return;
  //     }
  //     try {
  //       const { data } = await axios.post(`/signin`, {
  //         email,
  //         password,
  //       });
  //       if (data.error) {
  //         alert(data.error);
  //         setIsLoading(false);
  //       } else {
  //         // store to context
  //         setState(data);
  //         // store to asyncstorage
  //         await AsyncStorage.setItem("@auth", JSON.stringify(data));
  //         setIsLoading(false);
  //         alert("Sign in success");
  // navigation.navigate("home");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       alert("error while sign in");
  //       setIsLoading(false);
  //     }
  // };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${mobileApi}/driver/forgot_password/${email}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        console.log("response Data", responseData);
        if (responseData.status === "success") {
          // alert("An Otp is sent to your given Email");
          setSent(true);
          // navigation.navigate("SignIn");

          // setIsLoading(false);
        } else {
          // store to context
          // setState(data);
          // store to asyncstorage
          // await AsyncStorage.setItem("@auth", JSON.stringify(data));
          // setIsLoading(false);
          return Alert.alert("Error", responseData.message);
        }
      } catch (error) {
        Alert.alert("Error", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    // <SafeAreaView style={styles.container}>
    <View showsVerticalScrollIndicator={false} style={styles.container}>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <>
          <View>
            {sent ? (
              <View style={{ alignItems: "center", marginVertical: 30 }}>
                <Icon
                  name="checkbox-marked-circle-outline"
                  size={80}
                  color="#55cd85"
                />
                <Text style={{ marginVertical: 10, fontSize: 20 }}>Sent</Text>
              </View>
            ) : (
              <View>
                {inputErrors.email && (
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
                    inputErrors.email ? { borderColor: "red" } : null,
                  ]}
                >
                  <Icon name="email-outline" size={24} color="gray" />
                  <UserInput
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    setValue={setEmail}
                    onFocus={() => handleFieldFocus("email")}
                  />
                </View>
              </View>
            )}
          </View>
          {/* <Pressable onPress={handleSubmit}>
        <Button loading={isLoading}> "SEND"</Button>
      </Pressable> */}

          <View>
            {sent ? (
              <SwipButton
                onPress={() => navigation.navigate("SignIn")}
                title="LOGIN"
              />
            ) : (
              <SwipButton onPress={handleSubmit} title="SEND" />
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
});
