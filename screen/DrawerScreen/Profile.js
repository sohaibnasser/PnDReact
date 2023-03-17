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
// import UploadImage from "../components/auth/UploadImage";
// // import ImagePicker from "../components/auth/ImagePicker";
// // import DeviceInfo from "react-native-device-info";
import * as ImagePicker from "expo-image-picker";

import { API } from "../../config";
import { UUid } from "../../Util/UUid";
import Activityindicator from "../../components/Activityindicator";

const CreateUser = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [cnic, setCnic] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  // const [Gender, setGender] = useState(radioButtonsData);

  // const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [gender, setGender] = useState("");
  console.log(" gneder", gender);

  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-Binary", value: "non-binary" },
    { label: "Prefer Not to Say", value: "not-specified" },
  ];

  const [imageUrl, setImageUrl] = React.useState("");

  const takePhotoAndUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Camera access is required");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (pickerResult.canceled === true) {
      return;
    }
    let base64Image = `${pickerResult.assets[0].uri}`;
    setImageUrl(base64Image);
  };

  // console.log("uploaded image", imageUrl);

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
    if (!cnic || !name || !age || !address || !email || !password || !contact) {
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
          packageDto: { packageId: selectedPackage },
          imageUrl,
          name,
          address,
          age,
          gender,
          cnic,
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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Activityindicator isLoading={isLoading} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <ImagePicker /> */}
            {/* <UploadImage /> */}
            <Pressable style={styles.profileImage} onPress={takePhotoAndUpload}>
              {imageUrl ? (
                <View>
                  <Image
                    source={{
                      uri: imageUrl,
                    }}
                    style={{ width: 70, height: 70, borderRadius: 35 }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: 70,
                    height: 70,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <Image
                        source={require("../assets/profile.svg")}
                        style={{ width: 5, height: 5 }}
                      /> */}
                  <Icon name="camera" size={30} />
                </View>
                // <View
                //   style={{
                //     width: 60,
                //     height: 60,
                //     alignItems: "center",
                //     justifyContent: "center",
                //   }}
                // >
                //   <Text>heelo</Text>
                // </View>
              )}
            </Pressable>
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                styles.nameInput,
              ]}
            >
              <Icon name="account-outline" size={30} color="gray" />

              <UserInput
                placeholder="Name"
                autoCapitalize="words"
                autoCorrect={false}
                value={name}
                setValue={setName}
              />
            </View>
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="cellphone" size={30} color="gray" />
            <UserInput
              placeholder="phone"
              autoCorrect={false}
              value={contact}
              setValue={setContact}
              keyboardType="phone-pad"
            />
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="email" size={30} color="gray" />
            <UserInput
              placeholder="Email Address"
              keyboardType="email-address"
              autoCorrect={false}
              value={email}
              setValue={setEmail}
            />
          </View>
          {/* gender */}
          <View style={[styles.dropDown, styles.nameInput]}>
            <View>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                {genderOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="location-enter" size={30} color="gray" />
            <UserInput
              value={address}
              setValue={setAddress}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Address"
            />
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="human-male" size={30} color="gray" />
            <UserInput
              value={age}
              setValue={setAge}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="number-pad"
              placeholder="Age"
            />
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="card-bulleted-outline" size={30} color="gray" />
            <UserInput
              placeholder="CNIC No._ _ _ _ _  _ _ _ _ _ _ _  _"
              autoCorrect={false}
              value={cnic}
              setValue={setCnic}
              keyboardType="number-pad"
            />
          </View>

          {/* gender */}
          {/* <RadioGroup
            radioButtons={Gender}
            onPress={onPressRadioButton}
            layout="row"
          /> */}

          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="account-outline" size={30} color="gray" />
            <UserInput
              placeholder="Country"
              // autoCapitalize="number-pad"
              autoCorrect={false}
              value={country}
              setValue={setCountry}
              //   keyboardType="phone-pad"
            />
          </View>

          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="lock-outline" size={30} color="gray" />
            <UserInput
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              setValue={setPassword}
            />
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="lock-outline" size={30} color="gray" />
            <UserInput
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPass}
              setValue={setConfirmPass}
            />
          </View>
          <View style={[styles.dropDown, styles.nameInput]}>
            {/* <Icon name="account-outline" size={30} color="gray" /> */}
            <View>
              <Picker
                selectedValue={selectedPackage}
                onValueChange={(itemValue) => setSelectedPackage(itemValue)}
              >
                {state.map((packeges) => {
                  return (
                    <Picker.Item
                      key={packeges.packageId}
                      label={packeges.packageName}
                      value={packeges.packageId}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>

          {/* button */}
          {/* <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={handleSubmit}
          >
            <Button>
              <Text>CONTINUE</Text>
            </Button>
          </Pressable> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
    stickyHeaderHiddenOnScroll: false,
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
    marginVertical: 5,
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
  termsAndconditions: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  createAccount: {
    flexDirection: "row",
    marginBottom: 5,
  },

  nameInput: {
    flex: 1,
  },
  profileImage: {
    width: 70,
    height: 70,
    backgroundColor: "#ffffff",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginRight: 10,
    borderWidth: 0.1,
    borderColorL: "black",
  },
  dropDown: {
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 5,
    // paddingVertical: 0,
  },
});
