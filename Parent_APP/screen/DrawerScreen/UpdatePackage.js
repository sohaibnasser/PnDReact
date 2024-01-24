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
  Alert,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";

import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
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

import { API, mobileApi } from "../../config";
import { UUid } from "../../Util/UUid";
import Activityindicator from "../../components/Activityindicator";
import { Ionicons } from "@expo/vector-icons";
import SwipButton from "../../components/auth/SwipButton";
import UploadImage from "../../components/auth/UploadImage";
import { maskCNIC, maskPhoneNumber } from "../../Util/masking";

const UpdatePackage = ({ navigation }) => {
  console.log("123");
  const isFocused = useIsFocused();

  const [parentID, setParentID] = useState();
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      console.log(id.parentId);
      setParentID(id.parentId);
    };
    PressHandler();
  }, [setParentID]);

  const [getProfileData, setProfileData] = useState("");
  const [parentAddress, setParentAddress] = useState("");
  const [parentAge, setParentAge] = useState("");
  const [parentCnic, setParentCnic] = useState("");
  const [parentContact, setParentContact] = useState("");
  console.log("parent", parentContact);
  const [parentEmail, setParentEmail] = useState("");
  const [parentName, setParentName] = useState("");

  const [parentPassword, setParentPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [parentCountry, setParentCountry] = useState("");
  const [deviceOS, setDeviceOs] = useState("");
  const [deviceToken, setDeviceToken] = useState("");
  const [deviceUUid, setDeviceUUid] = useState("");
  const [state, setState] = useState([]);
  const [packag, setPackag] = useState();
  const [selectedPackage, setSelectedPackage] = useState(packag);
  console.log("selected package", selectedPackage);
  const [parentGender, setParentGender] = useState("");
  const [parentOtherContact, setParentOtherContact] = useState("");
  const [imagee, setImagee] = useState("");
  console.log(" selectedPackage", imagee);
  let Pcnic;
  let pOtherContact;
  let Pcontact;

  if (parentCnic && parentContact && parentOtherContact) {
    Pcontact = maskPhoneNumber(parentContact);
    pOtherContact = maskPhoneNumber(parentOtherContact);
    Pcnic = maskCNIC(parentCnic);
  }
  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-Binary", value: "non-binary" },
    { label: "Prefer Not to Say", value: "not-specified" },
  ];

  const [imageUrl, setImageUrl] = React.useState("");
  console.log("imamgeULLLLLLLLL ", imageUrl);
  // console.log(imageurl);
  // const takeImage = (url) => {
  //   setImageUrl(url);
  // };
  // get id of login user

  // get profile data

  const getProfileDataHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/profile/${parentID}`);
      const responseData = await response.json();
      if (responseData.code === "200") {
        const resData = responseData?.result;
        console.log("responsedata", resData);
        setProfileData(resData);
        setParentName(resData?.parentName);
        setParentAddress(resData?.parentAddress);
        setParentAge(resData?.parentAge);
        setParentCnic(resData?.parentCnic);
        setParentContact(resData?.parentContact);
        setParentEmail(resData?.parentEmail);
        setParentGender(resData?.parentGender);
        setParentPassword(resData?.parentPassword);
        setConfirmPass(resData?.parentPassword);
        setParentOtherContact(resData?.parentOtherContact);
        setDeviceToken(resData?.parentDeviceToken);
        setDeviceOs(resData?.parentDeviceOs);
        setDeviceUUid(resData?.parentDeviceUuid);
        setImageUrl(resData?.imageUrl);

        setSelectedPackage(resData?.packageDto?.packageId);
        // setPackag(resData?.packageDto?.packageId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (parentID && isFocused) {
      getProfileDataHandler();
    }
  }, [parentID, isFocused]);
  console.log("asad", selectedPackage);

  const getPakage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/parent_packages`);
      const responseData = await response.json();
      if (responseData.code === "200") {
        const resData = responseData.result;
        setState(resData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isFocused) {
      getPakage();
    }
  }, [isFocused]);
  // const image = profile?.imageUrl;

  const getImage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/image/downloadImage/${imageUrl}`
      );

      setImagee(response.url);
      // setImageUrl(response.url);

      // console.log("response data ogggggggg", response.data.responseUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getImage();
  }, [imageUrl]);
  // console.log("ooooooooooooooooo", imagee);
  // const parentDeviceToken = getProfileData.parentDeviceToken;
  // const parentDeviceUuid = getProfileData.parentDeviceUuid;
  // const parentDeviceOs = getProfileData.parentDeviceOs;
  // console.log(parentDeviceOs, parentDeviceToken, parentDeviceUuid);

  const handleSubmit = async () => {
    if (packag === selectedPackage) {
      return Alert.alert("Same package", "Please select a different package");
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageDto: { packageId: selectedPackage },
          imageUrl: imageUrl,
          parentContact: Pcontact,
          parentName,
          parentAddress,
          parentAge,
          parentGender,
          parentCnic: Pcnic,
          parentEmail,
          parentDeviceToken: deviceToken,
          parentDeviceUuid: deviceUUid,
          parentDeviceOs: deviceOS,
          parentId: parentID,
        }),
      });
      const responseData = await response.json();
      console.log("response of package updation", responseData);
      // setIsLoading(false);
      if (responseData.code === "200") {
        return Alert.alert("Success", "Package Update successfully", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
      //  else {
      //   const otp = responseData.result.otp;
      //   console.log(otp);
      //   const email = responseData.result.Email;
      //   const password = responseData.result.Password;

      //   navigation.navigate("", {
      //     otp,
      //     email,
      //     password,
      //   });
      // }
    } catch (error) {
      // setIsLoading(true);
      console.log(error);
      // alert("error while sign in");
    } finally {
      setIsLoading(false);
    }
  };
  // console.log("response data of get profile", getProfileData.imageUrl);

  return (
    <>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* <ImagePicker /> */}
              {/* <UploadImage takeImage={takeImage} imageUrl={imageUrl} /> */}
              <Pressable
                style={styles.profileImage}
                // onPress={takePhotoAndUpload}
              >
                {/* <View>
                  <Image
                    source={{
                      uri: imageUrl,
                    }}
                    style={{ width: 70, height: 70, borderRadius: 35 }}
                  />
                </View> */}
                {imagee ? (
                  <View>
                    <Image
                      source={{
                        uri: imagee,
                      }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        backgroundColor: "gray",
                      }}
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
                    <Icon name="camera" size={24} />
                  </View>
                )}
              </Pressable>
              <View
                style={[
                  styles.input__icon,
                  styles.paddingVertical,
                  styles.nameInput,
                ]}
              >
                <Icon name="account-outline" size={24} color="gray" />

                <UserInput
                  placeholder="Name"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={parentName}
                  setValue={setParentName}
                  editable={false}
                />
              </View>
            </View>
            <View style={[styles.input__icon, styles.paddingVertical]}>
              <Icon name="phone-outline" size={24} color="gray" />
              <UserInput
                placeholder="Contact No"
                autoCorrect={false}
                value={Pcontact || parentContact?.toString()}
                setValue={setParentContact}
                keyboardType="phone-pad"
                maxLength={13}
                editable={false}
              />
            </View>
            <View style={[styles.input__icon, styles.paddingVertical]}>
              <Icon name="email-outline" size={24} color="gray" />
              <UserInput
                placeholder="Email Address"
                keyboardType="email-address"
                autoCorrect={false}
                value={parentEmail}
                setValue={setParentEmail}
                editable={false}
              />
            </View>
            {/* gender */}
            <View style={[styles.dropDown, styles.nameInput]}>
              <View>
                <Picker
                  enabled={false}
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
              <Icon name="routes" size={24} color="gray" />
              <UserInput
                value={parentAddress}
                setValue={setParentAddress}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Address"
                editable={false}
              />
            </View>
            <View style={[styles.input__icon, styles.paddingVertical]}>
              <Icon name="human-male" size={24} color="gray" />
              <UserInput
                value={parentAge}
                setValue={setParentAge}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="number-pad"
                placeholder="Age"
                editable={false}
              />
            </View>
            <View style={[styles.input__icon, styles.paddingVertical]}>
              <Icon name="card-bulleted-outline" size={24} color="gray" />
              <UserInput
                placeholder="CNIC No._ _ _ _ _  _ _ _ _ _ _ _  _"
                autoCorrect={false}
                value={Pcnic || (parentCnic && maskPhoneNumber(parentCnic))}
                setValue={setParentCnic}
                keyboardType="number-pad"
                maxLength={15}
                editable={false}
              />
            </View>

            {/* gender */}
            {/* <RadioGroup
            radioButtons={Gender}
            onPress={onPressRadioButton}
            layout="row"
          /> */}

            <View style={[styles.input__icon, styles.paddingVertical]}>
              <Icon name="phone-plus-outline" size={24} color="gray" />
              {/* <UserInput
                placeholder="Country"
                // autoCapitalize="number-pad"
                autoCorrect={false}
                value={parentCountry}
                setValue={setParentCountry}
                //   keyboardType="phone-pad"
              /> */}
              <UserInput
                placeholder="Other Contact"
                autoCorrect={false}
                value={
                  pOtherContact ||
                  (parentOtherContact && maskPhoneNumber(parentOtherContact))
                }
                setValue={setParentOtherContact}
                keyboardType="phone-pad"
                maxLength={13}
                editable={false}
              />
            </View>

            {/* <View style={[styles.input__icon, styles.paddingVertical]}>
              <Icon name="lock-outline" size={24} color="gray" />
              <UserInput
                placeholder="Password"
                secureTextEntry={true}
                value={parentPassword}
                setValue={setParentPassword}
              />
            </View> */}
            {/* <View style={[styles.input__icon, styles.paddingVertical]}>
              <Icon name="lock-outline" size={24} color="gray" />
              <UserInput
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={confirmPass}
                setValue={setConfirmPass}

              />
            </View> */}
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
            <SwipButton title="UPDATE" onPress={handleSubmit} />
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default UpdatePackage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
    // stickyHeaderHiddenOnScroll: false,
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
