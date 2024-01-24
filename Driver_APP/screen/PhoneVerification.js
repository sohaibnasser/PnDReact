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
import SwipButton from "../components/auth/SwipButton";
import Icon from "../components/Icon";

const PhoneVerification = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [enteredOTP, setEnteredOTP] = useState(["", "", "", "", "", ""]);
  // const [isOtpMatched, setIsOtpMatched] = useState(false);

  const { email, password, responseOtp } = route.params;
  const refs = useRef(enteredOTP.map(() => React.createRef()));
  const otp = enteredOTP.join("");

  let backgroundColor = "#dadfe8";
  let color = "#000";
  if (otp === responseOtp && otp !== "") {
    backgroundColor = "#55cd85";
    color = "#fff";
  } else if (otp !== responseOtp && otp !== "" && otp.length === 6) {
    backgroundColor = "rgb(237, 90, 90)";

    color = "#fff";
  }

  const handleOTPChange = (index, value) => {
    const newOTP = [...enteredOTP];
    newOTP[index] = value;
    setEnteredOTP(newOTP);
    // setIsOtpMatched(false)
    if (index < newOTP.length - 1 && value !== "") {
      refs.current[index + 1].current.focus();
    }
    if (index > 0 && value === "") {
      refs.current[index - 1].current.focus();
    }
  };

  // Resend otp
  const getOtp = async () => {
    try {
      setEnteredOTP(["", "", "", "", "", ""]);
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

        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const verifyOTP = async () => {
    try {
      setIsLoading(true);

      console.log("otp in verification", otp);

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
        setIsLoading(false);
        navigation.navigate("SignIn");
      } else {
        console.log("failed", responseData);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("not sending request", "error");
    }
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Activityindicator isLoading={isLoading} />
        <View style={[styles.Otp__card, { backgroundColor }]}>
          <View>
            <Text style={{ fontWeight: "600" }}>Enter your OTP</Text>
            <Text style={styles.otp__code}>OTP Code</Text>
          </View>
          <View style={styles.otpContainer}>
            {enteredOTP.map((digit, index) => (
              <TextInput
                key={index}
                style={[
                  styles.otpInput,
                  { color: color, borderBottomColor: color },
                ]}
                maxLength={1}
                keyboardType={"number-pad"}
                value={digit}
                onChangeText={(value) => handleOTPChange(index, value)}
                ref={refs.current[index]}
              />
            ))}
          </View>
        </View>
        {otp === responseOtp ? (
          <View style={{ alignSelf: "center", marginVertical: 30 }}>
            <Icon
              name="checkbox-marked-circle-outline"
              size={80}
              color="#55cd85"
            />
          </View>
        ) : (
          <View style={styles.smsText}>
            <Text>
              Did't get the SMS,
              <Text onPress={getOtp} style={{ color: "#49bece" }}>
                {/* {isLoading ? ActivityIndicator : "Send Again"} */}
                Send Again
              </Text>
            </Text>
          </View>
        )}
      </View>

      {/* <View style={styles.button}>{button}</View> */}
      {/* <Pressable
        onPress={verifyOTP}
        style={({ pressed }) => {
          pressed && styles.pressed;
        }}
      >
        <Button>CONTINUE</Button>

      </Pressable> */}
      <View>
        <SwipButton onPress={verifyOTP} title="CONTINUE" />
      </View>
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
  otpInput: {
    borderBottomWidth: 1,

    fontSize: 20,
    marginHorizontal: 5,
    padding: 3,
    textAlign: "center",
  },
  Otp__card: {
    alignSelf: "center",
    height: 160,
    maxWidth: "100%",
    width: 300,
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
  },
  otpInput: {
    borderBottomWidth: 2,
    // borderBottomColor: "#fff",
    // color: color,

    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 8,
    padding: 3,
    textAlign: "center",
  },
  smsText: {
    alignItems: "center",
    marginTop: 15,
  },
  button: {},
  pressed: {
    opacity: 0.7,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default PhoneVerification;
