// import "react-native-get-random-values";
import {
  Pressable,
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
import { AuthContext } from "../../store/store";

const Profile = ({ navigation }) => {
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
  const [state, setState] = useContext(AuthContext);
  const [getProfileData, setProfileData] = useState("");
  const [parentAddress, setParentAddress] = useState("");
  const [parentAge, setParentAge] = useState("");
  const [parentCnic, setParentCnic] = useState("");
  const [parentContact, setParentContact] = useState("");

  const [parentEmail, setParentEmail] = useState("");
  const [parentName, setParentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [parentCountry, setParentCountry] = useState("");
  const [deviceOS, setDeviceOs] = useState("");
  const [deviceToken, setDeviceToken] = useState("");
  const [deviceUUid, setDeviceUUid] = useState("");
  const [parentPackage, setParentPackage] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [parentGender, setParentGender] = useState("");
  const [parentOtherContact, setParentOtherContact] = useState("");
  const [imagee, setImagee] = useState("");
  const [image, setImage] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    parentName: false,
    parentContact: false,
    parentEmail: false,
    parentAddress: false,
    parentAge: false,
    parentCnic: false,
    parentOtherContact: false,
    confirmPass: false,
  });

  const handleFieldFocus = (fieldName) => {
    // Remove the error highlight when the user starts editing the field
    setInputErrors({ ...inputErrors, [fieldName]: false });
  };
  let pCnic = "";
  if (parentCnic) {
    pCnic = maskCNIC(parentCnic);
  }

  const validateForm = () => {
    let isValid = true;
    const regex = /^[a-zA-Z0-9\s]+$/;
    const emailPattern = /\S+@\S+\.\S+/;
    const newErrors = { ...inputErrors };
    if (
      !parentName ||
      !parentContact ||
      !parentEmail ||
      !parentAddress ||
      !parentAge ||
      !parentCnic ||
      !parentOtherContact
    ) {
      // Display alert for empty fields
      Alert.alert("Error", "All fields are required.");
      return false;
    }

    // Validate each field and set error state
    if (!parentName) {
      newErrors.parentName = true;
      isValid = false;
    }
    if (!parentContact) {
      newErrors.parentContact = true;
      isValid = false;
    }
    if (parentContact.length < 13) {
      newErrors.parentContact = true;
      isValid = false;
    }
    if (parentOtherContact.length < 13) {
      newErrors.parentOtherContact = true;
      isValid = false;
    }
    if (!parentEmail) {
      newErrors.parentEmail = true;
      isValid = false;
    }
    if (!emailPattern.test(parentEmail)) {
      newErrors.parentEmail = true;
      isValid = false;
    }
    if (!parentAddress) {
      newErrors.parentAddress = true;
      isValid = false;
    }
    if (!regex.test(parentAddress)) {
      newErrors.parentAddress = true;
      isValid = false;
    }
    if (!parentAge) {
      newErrors.parentAge = true;
      isValid = false;
    }
    if (!parentCnic) {
      newErrors.parentCnic = true;
      isValid = false;
    }
    if (pCnic.length < 15) {
      newErrors.parentCnic = true;
      isValid = false;
    }
    if (!parentOtherContact) {
      newErrors.parentOtherContact = true;
      isValid = false;
    }

    // Add more validations for other fields here...

    setInputErrors(newErrors);

    return isValid;
  };
  console.log(" sele", image);
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
  // console.log("imamgeULLLLLLLLL ", imageUrl);
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
      const resData = responseData?.result;
      setProfileData(resData);
      setParentName(resData?.parentName);
      setParentAddress(resData?.parentAddress);
      setParentAge(resData?.parentAge);
      setParentCnic(resData?.parentCnic);
      setParentContact(resData?.parentContact);
      setParentEmail(resData?.parentEmail);
      setParentGender(resData?.parentGender);
      setParentOtherContact(resData?.parentOtherContact);
      setDeviceToken(resData?.parentDeviceToken);
      setDeviceOs(resData?.parentDeviceOs);
      setDeviceUUid(resData?.parentDeviceUuid);
      setImageUrl(resData?.imageUrl);
      setSelectedPackage(resData?.packageDto?.packageId);
      // setSelectedPackage(resData.packageName);

      // console.log("response data of get profile", resData.imageUrl);
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
    let base64Image = `data:image/jpeg;base64,${pickerResult.assets[0].base64}`;
    setImageUrl(base64Image);
    setImage(true);
  };

  // console.log("Image", imagee);
  const getPakage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/parent_packages`);
      const responseData = await response.json();
      if (responseData.code === "200") {
        const resData = responseData.result;

        setParentPackage(resData);
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
      // setImage(false);
      // console.log("response data ogggggggg", response.data.responseUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getImage();
  }, [imageUrl, isFocused]);

  const handleSubmit = async () => {
    if (!imageUrl) {
      return Alert.alert("Missing image", "Please select an image for profile");
    }
    if (!parentGender) {
      return Alert.alert(
        "Missing Gender",
        "Please select a gender for profile"
      );
    }
    if (validateForm()) {
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
            parentContact,
            parentName,
            parentAddress,
            parentAge,
            parentGender,
            parentCnic,
            parentEmail,
            parentDeviceToken: deviceToken,
            parentDeviceUuid: deviceUUid,
            parentDeviceOs: deviceOS,
            parentId: parentID,
          }),
        });
        const responseData = await response.json();
        console.log("response data of updated profile", responseData);
        // setIsLoading(false);
        if (responseData.code === "200") {
          // alert(responseData.message);
          setState({
            ...state,
            parentEmail: responseData?.result?.parentEmail,
            parentPassword: responseData?.result?.parentPassword,
            parentId: responseData?.result?.parentId,
            parentName: responseData?.result?.parentName,
            imageUrl: responseData?.result?.imageUrl,
          });
          await AsyncStorage.setItem(
            "@auth",
            JSON.stringify({
              email: responseData?.result?.parentEmail,
              password: responseData?.result?.parentPassword,
              parentId: responseData?.result?.parentId,
              parentName: responseData?.result?.parentName,
              imageUrl: responseData?.result?.imageUrl,
            })
          );
          return Alert.alert("Success", "Profile updated successfully", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
                setImage(false);
              },
            },
          ]);
        } else {
          return Alert.alert("Error", responseData?.message);
        }
        //  else {i
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
    }
  };
  // console.log("response data of get profile", getProfileData.imageUrl);
  console.log("image state", image);
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
                onPress={takePhotoAndUpload}
              >
                {/* <View>
                  <Image
                    source={{
                      uri: imageUrl,
                    }}
                    style={{ width: 70, height: 70, borderRadius: 35 }}
                  />
                </View> */}
                {imagee && image === false ? (
                  <View>
                    <Image
                      source={{
                        uri: imagee,
                      }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        // backgroundColor: "gray",
                      }}
                    />
                  </View>
                ) : (
                  imageUrl && (
                    <View
                      style={{
                        width: 70,
                        height: 70,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={{
                          uri: imageUrl,
                        }}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 35,
                        }}
                      />
                    </View>
                  )
                )}
              </Pressable>
              {inputErrors.parentName && (
                <Text
                  style={{
                    flex: 1,
                    marginLeft: 5,
                    paddingVertical: 5,
                    color: "red",
                  }}
                >
                  Name is required
                </Text>
              )}
              <View
                style={[
                  inputErrors.parentName ? { borderColor: "red" } : null,
                  styles.input__icon,
                  styles.paddingVertical,
                  styles.nameInput,
                ]}
              >
                <Icon name="account-outline" size={24} color="gray" />

                <UserInput
                  placeholder="Name"
                  onFocus={() => handleFieldFocus("parentName")}
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={parentName}
                  setValue={setParentName}
                />
              </View>
            </View>
            {inputErrors.parentContact && (
              <Text
                style={{
                  flex: 1,
                  marginLeft: 5,
                  paddingVertical: 5,
                  color: "red",
                }}
              >
                Phone number must be 11 characters long
              </Text>
            )}
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                inputErrors.parentContact ? { borderColor: "red" } : null,
              ]}
            >
              <Icon name="phone-outline" size={24} color="gray" />
              <UserInput
                placeholder="Contact No"
                autoCorrect={false}
                value={maskPhoneNumber(parentContact)}
                setValue={setParentContact}
                keyboardType="phone-pad"
                maxLength={13}
                onFocus={() => handleFieldFocus("parentContact")}
              />
            </View>
            {inputErrors.parentEmail && (
              <Text
                style={{
                  flex: 1,
                  marginLeft: 5,
                  paddingVertical: 5,
                  color: "red",
                }}
              >
                Invalid email address
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
                placeholder="Email Address"
                keyboardType="email-address"
                autoCorrect={false}
                value={parentEmail}
                setValue={setParentEmail}
                onFocus={() => handleFieldFocus("parentEmail")}
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
            {inputErrors.parentAddress && (
              <Text
                style={{
                  flex: 1,
                  marginLeft: 5,
                  paddingVertical: 5,
                  color: "red",
                }}
              >
                Invalid address
              </Text>
            )}
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                inputErrors.parentAddress ? { borderColor: "red" } : null,
              ]}
            >
              <Icon name="routes" size={24} color="gray" />
              <UserInput
                value={parentAddress}
                setValue={setParentAddress}
                autoCorrect={false}
                autoCapitalize="none"
                onFocus={() => handleFieldFocus("parentAddress")}
                placeholder="Address"
              />
            </View>
            {inputErrors.parentAge && (
              <Text
                style={{
                  flex: 1,
                  marginLeft: 5,
                  paddingVertical: 5,
                  color: "red",
                }}
              >
                Age should be greater than 0
              </Text>
            )}
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                inputErrors.parentAge ? { borderColor: "red" } : null,
              ]}
            >
              <Icon name="human-male" size={24} color="gray" />
              <UserInput
                value={parentAge}
                setValue={setParentAge}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="number-pad"
                placeholder="Age"
                onFocus={() => handleFieldFocus("parentAge")}
              />
            </View>
            {inputErrors.parentCnic && (
              <Text
                style={{
                  flex: 1,
                  marginLeft: 5,
                  paddingVertical: 5,
                  color: "red",
                }}
              >
                CNIC must be 13 characters long
              </Text>
            )}
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                inputErrors.parentCnic ? { borderColor: "red" } : null,
              ]}
            >
              <Icon name="card-bulleted-outline" size={24} color="gray" />
              <UserInput
                placeholder="CNIC No._ _ _ _ _  _ _ _ _ _ _ _  _"
                autoCorrect={false}
                value={maskCNIC(parentCnic)}
                setValue={setParentCnic}
                keyboardType="number-pad"
                maxLength={15}
                onFocus={() => handleFieldFocus("parentCnic")}
              />
            </View>
            {inputErrors.parentOtherContact && (
              <Text
                style={{
                  flex: 1,
                  marginLeft: 5,
                  paddingVertical: 5,
                  color: "red",
                }}
              >
                Phone number must be 11 characters long
              </Text>
            )}
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                inputErrors.parentOtherContact ? { borderColor: "red" } : null,
              ]}
            >
              <Icon name="phone-plus-outline" size={24} color="gray" />

              <UserInput
                placeholder="Other Contact"
                autoCorrect={false}
                value={maskPhoneNumber(parentOtherContact)}
                setValue={setParentOtherContact}
                keyboardType="phone-pad"
                maxLength={13}
                onFocus={() => handleFieldFocus("parentOtherContact")}
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
              <Icon name="lock-outline" size={30} color="gray" />
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
                  {parentPackage.map((packeges) => {
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

export default Profile;

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
