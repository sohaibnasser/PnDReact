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
import UserInput from "../components/auth/UserInput";
import Button from "../components/auth/Button";
import Icon from "../components/Icon";
// import CountryCodePicker from "../components/auth/CountryCodePicker";
// import axios from "axios";
// import UploadImage from "../components/auth/UploadImage";
// // import ImagePicker from "../components/auth/ImagePicker";
// // import DeviceInfo from "react-native-device-info";
import * as ImagePicker from "expo-image-picker";

import { API } from "../config";
import { UUid } from "../Util/UUid";
import Activityindicator from "../components/Activityindicator";
import SwipButton from "../components/auth/SwipButton";
import UploadImage from "../components/auth/UploadImage";
import { maskCNIC, maskPhoneNumber } from "../Util/masking";

const CreateUser = ({ navigation }) => {
  const [parentAddress, setParentAddress] = useState("asad");
  const [parentAge, setParentAge] = useState("12");
  const [parentCnic, setParentCnic] = useState("1234567");
  const [parentContact, setParentContact] = useState("12345678");
  const [parentEmail, setParentEmail] = useState("asad@gmail.com");
  // const [parentGender, setParentGender] = useState(radioButtonsData);

  // const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [parentName, setParentName] = useState("Asad");
  const [parentOtherContact, setParentOtherContact] = useState("");
  const [parentPassword, setParentPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("123456");
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [parentGender, setParentGender] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblee, setIsVisiblee] = useState(false);
  console.log("parent passr", parentPassword);

  const Pcontact = maskPhoneNumber(parentContact);
  const pOtherContact = maskPhoneNumber(parentOtherContact);
  const Pcnic = maskCNIC(parentCnic);
  console.log("parent Contact", Pcontact, pOtherContact, Pcnic);
  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-Binary", value: "non-binary" },
    { label: "Prefer Not to Say", value: "not-specified" },
  ];
  const parentDeviceOs = Device.osName;

  const [imageUrl, setImageUrl] = React.useState("");
  // console.log("image url from state", imageUrl);

  // const takePhotoAndUpload = async () => {
  //   let permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (permissionResult.granted === false) {
  //     alert("Camera access is required");
  //     return;
  //   }
  //   let pickerResult = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     base64: true,
  //   });
  //   if (pickerResult.canceled === true) {
  //     return;
  //   }
  //   // console.log("Picker result=>", pickerResult);
  //   // let base64Image = `${pickerResult.assets[0].base64}`;
  //   const base64Image = `data:image/jpeg;base64,${pickerResult.assets[0].base64}`;
  //   setImageUrl(base64Image);
  //   // console.log(base64Image);
  // };

  const takeImage = (url) => {
    // console.log("urli", url);
    setImageUrl(url);
  };
  // console.log("uploaded image", imageUrl);

  const getPakage = async () => {
    try {
      const response = await fetch(`${API}/parent_packages`);
      const responseData = await response.json();
      const resData = responseData.result;
      setState(resData);
      // if (response.ok) {
      //   //   const responseData = await response.json();
      //   //   const data = responseData.result;
      // } else {
      // }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPakage();
  }, []);

  const handleSubmit = async () => {
    if (
      !parentCnic ||
      !parentName ||
      !parentAge ||
      !parentAddress ||
      !parentOtherContact ||
      !parentEmail ||
      !parentPassword ||
      !parentContact
    ) {
      alert("All field are required");
      setIsLoading(false);
      return;
    }
    if (parentPassword != confirmPass) {
      alert("Password does not match");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/parent_signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageDto: { packageId: selectedPackage },
          imageUrl,
          parentDeviceUuid: UUid,
          parentDeviceToken: UUid,
          parentName,
          parentContact: Pcontact,
          parentAddress,
          parentAge,
          parentGender,
          parentOtherContact: pOtherContact,
          parentCnic: Pcnic,
          parentEmail,
          parentPassword,
          parentDeviceOs,
        }),
      });
      const responseData = await response.json();
      console.log("response data", responseData);
      // setIsLoading(false);
      if (responseData.message !== "success") {
        // alert(responseData.message);
      } else {
        const responseOtp = responseData.result.otp;
        // console.log(otp);
        const email = responseData.result.parentEmail;
        const password = responseData.result.parentPassword;
        //SAVE DATA IN ASYNCSTORAGE
        // console.log("email", email);
        // await AsyncStorage.setItem(
        //   "@auth",
        //   JSON.stringify({ email, password })
        // );
        navigation.navigate("Verification", {
          responseOtp,
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
    // GET DATA FROM ASYNC STORAGE
    // const PressHandler = async () => {
    //   let data = await AsyncStorage.getItem("@auth");
    //   //   navigation.navigate("Phone Verification");
    //   console.log("loadfromAsyncsStorage", data);

    //   // };
    // };
    // PressHandler();
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
            <UploadImage takeImage={takeImage} imageUrl={imageUrl} />
            {/* <Pressable style={styles.profileImage} onPress={takePhotoAndUpload}>
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
                 
                  <Icon name="camera" size={30} />
                </View>
                
              )}
            </Pressable> */}
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
                value={parentName}
                setValue={setParentName}
              />
            </View>
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="cellphone" size={30} color="gray" />
            <UserInput
              placeholder="phone"
              autoCorrect={false}
              value={maskPhoneNumber(parentContact)}
              setValue={setParentContact}
              keyboardType="phone-pad"
              maxLength={13}
            />
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="email" size={30} color="gray" />
            <UserInput
              placeholder="Email Address"
              keyboardType="email-address"
              autoCorrect={false}
              value={parentEmail}
              setValue={setParentEmail}
            />
          </View>
          {/* gender */}
          <View style={[styles.dropDown, styles.nameInput]}>
            <View>
              <Picker
                selectedValue={parentGender}
                onValueChange={(itemValue) => setParentGender(itemValue)}
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
              value={parentAddress}
              setValue={setParentAddress}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Address"
            />
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="human-male" size={30} color="gray" />
            <UserInput
              value={parentAge}
              setValue={setParentAge}
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
              value={maskCNIC(parentCnic)}
              setValue={setParentCnic}
              keyboardType="number-pad"
              maxLength={15}
            />
          </View>

          {/* gender */}
          {/* <RadioGroup
          radioButtons={parentGender}
          onPress={onPressRadioButton}
          layout="row"
        /> */}

          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="account-outline" size={30} color="gray" />
            <UserInput
              placeholder="otherContact"
              // autoCapitalize="number-pad"
              autoCorrect={false}
              value={maskPhoneNumber(parentOtherContact)}
              setValue={setParentOtherContact}
              keyboardType="phone-pad"
              maxLength={13}
            />
          </View>

          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="lock-outline" size={30} color="gray" />
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
              <Image
                source={require("../assets/eye.png")}
                style={{ height: 30, width: 35, marginRight: 5 }}
              />
            </Pressable>
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="lock-outline" size={30} color="gray" />
            <UserInput
              placeholder="Confirm Password"
              secureTextEntry={!isVisiblee}
              value={confirmPass}
              setValue={setConfirmPass}
            />
            <Pressable
              style={({ pressed }) => pressed && styles.pressed}
              onPress={() => setIsVisiblee(!isVisiblee)}
            >
              <Image
                source={require("../assets/eye.png")}
                style={{ height: 30, width: 35, marginRight: 5 }}
              />
            </Pressable>
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

          <View>
            <Text style={styles.termsAndconditions}>
              By creating account, you agree to our{" "}
              <Text style={{ color: "#49bece" }}>terms of services</Text>
            </Text>
          </View>
          <Pressable>
            {/* <Button>
              <Text>CONTINUE</Text>
            </Button> */}
            <SwipButton onPress={handleSubmit} title="CONTINUE" />
          </Pressable>

          <View style={styles.createAccount}>
            <Text>Already have account.</Text>

            <Pressable
              style={({ pressed }) => pressed && styles.pressed}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text style={styles.createAccount__text}>Sign In</Text>
            </Pressable>
          </View>
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
