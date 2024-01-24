// import "react-native-get-random-values";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useContext, useEffect } from "react";
import * as Device from "expo-device";
// import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserInput from "../../components/auth/UserInput";
import Button from "../../components/auth/Button";
import Icon from "../../components/Icon";
// import CountryCodePicker from "../components/auth/CountryCodePicker";
// import axios from "axios";
import UploadImage from "../../components/auth/UploadImage";
// // import ImagePicker from "../components/auth/ImagePicker";
// // import DeviceInfo from "react-native-device-info";
import * as ImagePicker from "expo-image-picker";

import { API } from "../../config";
import { UUid } from "../../Util/UUid";
import Activityindicator from "../../components/Activityindicator";
import { Ionicons } from "@expo/vector-icons";
import SwipButton from "../../components/auth/SwipButton";

const ChangePassword = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [cnic, setCnic] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [gender, setGender] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblee, setIsVisiblee] = useState(false);
  console.log(" gneder", gender);

  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-Binary", value: "non-binary" },
    { label: "Prefer Not to Say", value: "not-specified" },
  ];

  const getPakage = async () => {
    try {
      const response = await fetch(`${API}/parent_packages`);
      const responseData = await response.json();
      const resData = responseData.result;
      setState(resData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPakage();
  }, []);

  const handleSubmit = async () => {
    console.log("handle submit");
    if (!password) {
      alert("all field are required");
      setIsLoading(false);
      return;
    }
    if (password != confirmPass) {
      alert("password does not match");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(``, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const responseData = await response.json();
      console.log("response data", responseData);
      // setIsLoading(false);
      if (responseData.message !== "success") {
        // alert(responseData.message);
      } else {
        const otp = responseData.result.otp;
        console.log(otp);
        const email = responseData.result.Email;
        const password = responseData.result.Password;

        navigation.navigate("", {
          otp,
          email,
          password,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log(error);
      // alert("error while sign in");
      setIsLoading(false);
    }
  };
  const passwordVisibilityHandler = () => {
    setIsVisiblee(!isVisiblee);
  };

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      <View style={[styles.card, { elevation: 4 }]}>
        <View style={[styles.input__icon, styles.paddingVertical]}>
          <Icon name="lock-outline" size={24} color="gray" />
          <UserInput
            placeholder="Old Password"
            // secureTextEntry={true}
            value={oldPassword}
            setValue={setOldPassword}
          />
        </View>
        <View style={[styles.input__icon, styles.paddingVertical]}>
          <Icon name="lock-outline" size={24} color="gray" />
          <UserInput
            placeholder="New Password"
            secureTextEntry={!isVisible}
            value={password}
            setValue={setPassword}
          />
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => setIsVisible(!isVisible)}
          >
            <Image
              source={require("../../assets/eye.png")}
              style={{ height: 24, width: 24, marginRight: 5 }}
            />
          </Pressable>
        </View>
        <View style={[styles.input__icon, styles.paddingVertical]}>
          <Icon name="lock-outline" size={24} color="gray" />
          <UserInput
            placeholder="Confirm New Password"
            secureTextEntry={!isVisiblee}
            value={confirmPass}
            setValue={setConfirmPass}
          />
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={passwordVisibilityHandler}
          >
            <Image
              source={require("../../assets/eye.png")}
              style={{ height: 24, width: 24, marginRight: 5 }}
            />
          </Pressable>
        </View>
        <View>
          {/* <Button onPress={handleSubmit} title="CHANGE" /> */}
          <SwipButton title="CHANGE" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    marginTop: 20,
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
    marginVertical: 8,
    paddingLeft: 10,
  },

  createAccount__text: {
    color: "#49bece",
    fontSize: 15,
  },
  phoneInput__Icon: {
    backgroundColor: "grey",
    height: 50,
    justifyContent: "center",
    borderRadius: 6,
  },

  nameInput: {
    flex: 1,
  },
  card: {
    maxWidth: "95%",
    width: 300,
    alignSelf: "center",
    // marginVertical: "auto",
    maxHeight: "100%",
    // height: 230,
    backgroundColor: "#fff",

    elevation: 5,
    padding: 8,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
  },
  cardData: {
    paddingHorizontal: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  img: {
    width: 40,
    height: 40,
    // marginRight: 8,
    borderRadius: 20,
    backgroundColor: "gray",
    // alignItems: "center",
    // justifyContent: "center",
  },
  dayAndTime: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "bold",
    color: "#3696f9",
  },
  dayAndTimePrevious: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  FromAndToPlace: {
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: 18,
  },
  fromAndtoTxt: {
    marginLeft: 5,
    color: "#0d6edd",
    fontSize: 14,
  },
});
