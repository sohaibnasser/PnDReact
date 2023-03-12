import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from "react-native";
import React, { useState, useContext } from "react";
// import axios from "axios";
import UserInput from "../components/auth/UserInput";
import Button from "../components/auth/Button";
import Icon from "../components/Icon";
import { API } from "../config";
// import CountryCodePicker from "../components/auth/CountryCodePicker";

const ForgotPassword = ({ navigation }) => {
  // const [phone, setPhone] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
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
    setIsLoading(true);
    if (!email) {
      alert("all field are required");
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/forgot_password/${email}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log("response Data", responseData);
      setIsLoading(false);
      if (responseData.message === "success") {
        alert("An Otp is sent to your given Email");
        navigation.navigate("SignIn");

        // setIsLoading(false);
      } else {
        // store to context
        // setState(data);
        // store to asyncstorage
        // await AsyncStorage.setItem("@auth", JSON.stringify(data));
        // setIsLoading(false);
        alert(responseData.error);
      }
    } catch (error) {
      console.log("not ", error.message);
      alert(error.message);
      // setIsLoading(false);
    }
  };
  return (
    // <SafeAreaView style={styles.container}>
    <View showsVerticalScrollIndicator={false} style={styles.container}>
      <View>
        <View style={[styles.input__icon, styles.paddingVertical]}>
          <Icon name="email" size={30} color="gray" />
          <UserInput
            placeholder="Email"
            // secureTextEntry={true}
            keyboardType="email-address"
            value={email}
            setValue={setEmail}
          />
        </View>
      </View>
      <Pressable onPress={handleSubmit}>
        <Button>{loading ? "loading..." : "SEND"}</Button>
      </Pressable>
    </View>
  );
};

export default ForgotPassword;

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
});
