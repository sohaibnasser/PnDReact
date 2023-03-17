import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import Button from "../components/auth/Button";
import { API } from "../config";
import Activityindicator from "../components/Activityindicator";

const PhoneVerification = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = route.params;

  // Resend otp
  const getOtp = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/parent_signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentEmail: email,
        }),
      });
      // setIsLoading(false);
      const responseData = await response.json();
      // const resData = responseData.result;
      console.log(responseData);
      // setState(resData);

      if (responseData.message === "success") {
        console.log("response message of resnt otp", responseData);
        //   const responseData = await response.json();
        //   const data = responseData.result;
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch request
      // alert("error", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  // console.log(password, email);

  // const [formData, setFormData] = useState({
  //   pin1: "",
  //   pin2: "",
  //   pin3: "",
  //   pin4: "",
  //   pin5: "",
  //   pin6: "",
  // });
  // const handleTextChange = (key, text) => {
  //   setFormData({ ...formData, [key]: text });
  // };
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [pin5, setPin5] = useState("");
  const [pin6, setPin6] = useState("");
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const Otp = {
    pin1,
    pin2,
    pin3,
    pin4,
    pin5,
    pin6,
  };
  const otp = JSON.stringify(Otp);
  // console.log("oooop", otp);
  // call to api
  console.log("emai", email, password, otp);
  const verifyOTP = async () => {
    if (!pin1 || !pin2 || !pin3 || !pin4 || !pin5 || !pin6) {
      alert("all fields are requried");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/otp_verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          password,
        }),
      });
      const responseData = await response.json();
      setIsLoading(false);
      console.log(responseData);
      if (responseData.message === "success") {
        // alert(responseData.message);
        setIsLoading(false);
        navigation.navigate("SignIn");
        // OTP verification was successful
        // Do something here, like navigating to a success screen or performing some action
      } else {
        console.log("failed", responseData);
        // alert(responseData.message);
        // OTP verification failed
        // Handle the error in some way (e.g. display an error message)
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      // alert(responseData.message);
      // Handle any errors that occurred during the fetch request
      console.log("not sending request", "error");
    }
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Activityindicator isLoading={isLoading} />
        <View style={styles.Otp__card}>
          <View>
            <Text style={{ fontWeight: "600" }}>Enter your OTP</Text>
            <Text style={styles.otp__code}>OTP Code</Text>
          </View>
          <View style={styles.otp_input__container}>
            <TextInput
              style={styles.otpInput}
              maxLength={1}
              keyboardType={"number-pad"}
              ref={ref1}
              // value={formData.pin1}
              // onChangeText={(text) => handleTextChange("pin1", text)}
              //   if (pin1 === "") {
              //     ref2.current.focus();
              //   }
              // }
              onChangeText={(text) => {
                setPin1(text);
                if (pin1 === "") {
                  ref2.current.focus();
                }
                //  else {
                //   ref1.current.focus();
                // }
              }}
              value={pin1}
              // ref={ref2}
            />
            <TextInput
              style={styles.otpInput}
              maxLength={1}
              keyboardType={"number-pad"}
              // value={formData.pin2}
              // onChangeText={(text) => handleTextChange("pin2", text)}
              onChangeText={(text) => {
                setPin2(text);
                if (pin2 === "") {
                  ref3.current.focus();
                } else {
                  ref1.current.focus();
                }
              }}
              value={pin2}
              ref={ref2}
            />
            <TextInput
              style={styles.otpInput}
              maxLength={1}
              keyboardType={"number-pad"}
              onChangeText={(text) => {
                setPin3(text);
                if (pin3 === "") {
                  ref4.current.focus();
                } else {
                  ref2.current.focus();
                }
              }}
              value={pin3}
              ref={ref3}
              // value={formData.pin3}
              // onChangeText={(text) => handleTextChange("pin3", text)}
            />
            <TextInput
              style={styles.otpInput}
              maxLength={1}
              keyboardType={"number-pad"}
              onChangeText={(text) => {
                setPin4(text);
                if (pin4 === "") {
                  ref5.current.focus();
                } else {
                  ref3.current.focus();
                }
              }}
              value={pin4}
              ref={ref4}
              // value={formData.pin4}
              // onChangeText={(text) => handleTextChange("pin4", text)}
            />
            <TextInput
              style={styles.otpInput}
              maxLength={1}
              keyboardType={"number-pad"}
              onChangeText={(text) => {
                setPin5(text);
                if (pin5 === "") {
                  ref6.current.focus();
                } else {
                  ref4.current.focus();
                }
              }}
              value={pin5}
              ref={ref5}
              // value={formData.pin5}
              // onChangeText={(text) => handleTextChange("pin5", text)}
            />
            <TextInput
              style={styles.otpInput}
              maxLength={1}
              keyboardType={"number-pad"}
              onChangeText={(text) => {
                setPin6(text);
                if (pin6 !== "") {
                  ref5.current.focus();
                }
              }}
              value={pin6}
              ref={ref6}
              // value={formData.pin6}
              // onChangeText={(text) => handleTextChange("pin6", text)}
            />
          </View>
        </View>
        <View style={styles.smsText}>
          <Text>
            Did't get the SMS,
            <Text onPress={getOtp} style={{ color: "#49bece" }}>
              {/* {isLoading ? ActivityIndicator : "Send Again"} */}
              Send Again
            </Text>
          </Text>
        </View>
      </View>
      {/* <View style={styles.button}>{button}</View> */}
      <Pressable
        onPress={verifyOTP}
        style={({ pressed }) => {
          pressed && styles.pressed;
        }}
      >
        {/* <Button>
          {isloading ? <ActivityIndicator size={10} /> : "CONTINUE"}
        </Button> */}
        <Button>CONTINUE</Button>
      </Pressable>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    padding: 16,
    justifyContent: "space-between",
  },
  Otp__card: {
    alignSelf: "center",
    height: 160,
    maxWidth: "100%",
    width: 300,
    elevation: 3,
    backgroundColor: "#dadfe8",
    borderRadius: 4,
    padding: 15,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    justifyContent: "space-around",
  },
  otp__code: {
    fontSize: 30,
    fontWeight: "600",
  },
  otp_input__container: {
    flexDirection: "row",
    justifyContent: "space-around",
    // paddingBottom: 50,
  },
  otpInput: {
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    width: 20,
    textAlign: "center",
    fontSize: 25,
  },
  smsText: {
    alignItems: "center",
    marginTop: 15,
  },
  button: {
    // maxWidth: "100%",
    // width: 300,
    // alignSelf: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});

export default PhoneVerification;
