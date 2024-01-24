// import "react-native-get-random-values";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import * as Device from "expo-device";
import UserInput from "../components/auth/UserInput";
import Icon from "../components/Icon";
import { API } from "../config";
import { UUid } from "../Util/UUid";
import Activityindicator from "../components/Activityindicator";
import SwipButton from "../components/auth/SwipButton";
import UploadImage from "../components/auth/UploadImage";
import { maskCNIC, maskPhoneNumber } from "../Util/masking";

const CreateUser = ({ navigation }) => {
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [parentGender, setParentGender] = useState();

  const [inputValues, setInputValues] = useState({
    parentName: "",
    parentContact: "",
    parentCnic: "",
    parentEmail: "",
    parentAddress: "",
    parentAge: "",
    parentOtherContact: "",
    confirmPass: "",
    parentPassword: "",
  });
  // console.log("12131313", inputValues.parentCnic.length);
  const pCnic = maskCNIC(inputValues.parentCnic);

  const [inputErrors, setInputErrors] = useState({
    parentName: false,
    parentContact: false,
    parentEmail: false,
    parentAddress: false,
    parentAge: false,
    parentCnic: false,
    parentOtherContact: false,
    parentPassword: false,
    confirmPass: false,
  });
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...inputErrors };
    if (
      !inputValues.parentName ||
      !inputValues.parentContact ||
      !inputValues.parentEmail ||
      !inputValues.parentAddress ||
      !inputValues.parentAge ||
      !inputValues.parentCnic ||
      !inputValues.parentOtherContact ||
      !inputValues.parentPassword ||
      !inputValues.confirmPass
    ) {
      // Display alert for empty fields
      Alert.alert("Error", "All fields are required.");
      return false;
    }
    if (!imageUrl) {
      return Alert.alert("Missing image", "Please select an image for profile");
    }
    if (!parentGender) {
      return Alert.alert(
        "Missing Gender",
        "Please select a gender for profile"
      );
    }
    if (inputValues.parentPassword != inputValues.confirmPass) {
      return Alert.alert("Error", "Passwords do not match");
    }
    // if (inputValues.parentAge < 5 || inputValues.parentAge > 199) {
    //   return Alert.alert("Error", "Age should be between 5 to 199");
    // }
    // Validate each field and set error state

    const regex = /^[a-zA-Z0-9\s]+$/;

    if (!inputValues.parentName) {
      newErrors.parentName = true;
      isValid = false;
    }
    if (!inputValues.parentContact) {
      newErrors.parentContact = true;
      isValid = false;
    }
    if (inputValues.parentContact.length < 13) {
      newErrors.parentContact = true;

      isValid = false;
    }
    if (inputValues.parentOtherContact.length < 13) {
      newErrors.parentOtherContact = true;

      isValid = false;
    }
    if (!inputValues.parentEmail) {
      newErrors.parentEmail = true;
      isValid = false;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(inputValues.parentEmail)) {
      newErrors.parentEmail = true;
      isValid = false;
    }
    if (!inputValues.parentAddress) {
      newErrors.parentAddress = true;
      isValid = false;
    }
    if (!regex.test(inputValues.parentAddress)) {
      newErrors.parentAddress = true;
      isValid = false;
    }
    // if (!emailPattern.test(inputValues.parentAddress)) {
    //   newErrors.parentAddress = true;
    //   isValid = false;
    // }
    if (!inputValues.parentAge) {
      newErrors.parentAge = true;
      isValid = false;
    }
    if (inputValues.parentAge < 5 || inputValues.parentAge > 199) {
      newErrors.parentAge = true;
      isValid = false;
    }
    if (!inputValues.parentCnic) {
      newErrors.parentCnic = true;
      isValid = false;
    }
    if (pCnic.length < 15) {
      newErrors.parentCnic = true;
      isValid = false;
    }
    if (!inputValues.parentOtherContact) {
      newErrors.parentOtherContact = true;
      isValid = false;
    }
    if (!inputValues.parentPassword) {
      newErrors.parentPassword = true;
      isValid = false;
    }
    if (!inputValues.confirmPass) {
      newErrors.confirmPass = true;
      isValid = false;
    }

    // Add more validations for other fields here...

    setInputErrors(newErrors);

    return isValid;
  };
  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblee, setIsVisiblee] = useState(false);

  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-Binary", value: "non-binary" },
    { label: "Prefer Not to Say", value: "not-specified" },
  ];
  const parentDeviceOs = Device.osName;

  const [imageUrl, setImageUrl] = React.useState("");
  const takeImage = (url) => {
    setImageUrl(url);
  };
  const inputHandler = (key, value) => {
    setInputValues((previousVal) => ({ ...previousVal, [key]: value }));
  };
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
  const handleFieldFocus = (fieldName) => {
    // Remove the error highlight when the user starts editing the field
    setInputErrors({ ...inputErrors, [fieldName]: false });
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await fetch(`${API}/parent_signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageDto: { packageId: selectedPackage },
            imageUrl: imageUrl,
            parentDeviceUuid: UUid,
            parentDeviceToken: UUid,
            parentName: inputValues.parentName,
            parentContact: inputValues.parentContact,
            parentAddress: inputValues.parentAddress,
            parentAge: inputValues.parentAge,
            parentGender: parentGender,
            parentOtherContact: inputValues.parentOtherContact,
            parentCnic: inputValues.parentCnic,
            parentEmail: inputValues.parentEmail,
            parentPassword: inputValues.parentPassword,
            parentDeviceOs: parentDeviceOs,
          }),
        });
        const responseData = await response.json();
        console.log("response data", responseData);
        // setIsLoading(false);
        if (responseData.code === "200") {
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
          console.log("respose of reate profile", responseData);
          return Alert.alert("Success", "Profile created successfully", [
            {
              text: "OK",
              onPress: () =>
                navigation.navigate("Verification", {
                  responseOtp,
                  email,
                  password,
                }),
            },
          ]);
        } else {
          return Alert.alert("Error", responseData.message);
        }
      } catch (error) {
        return Alert.alert("Error", error);
      } finally {
        setIsLoading(false);
      }
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
            <UploadImage takeImage={takeImage} imageUrl={imageUrl} />
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                styles.nameInput,
                inputErrors.parentName ? { borderColor: "red" } : null,
              ]}
            >
              <Icon name="account-outline" size={24} color="gray" />

              <UserInput
                placeholder="Name"
                autoCapitalize="words"
                autoCorrect={false}
                value={inputValues.parentName}
                setValue={(text) => inputHandler("parentName", text)}
                onFocus={() => handleFieldFocus("parentName")}
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
              placeholder="Phone Number"
              autoCorrect={false}
              value={maskPhoneNumber(inputValues.parentContact)}
              setValue={(text) => inputHandler("parentContact", text)}
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
              value={inputValues.parentEmail}
              setValue={(text) => inputHandler("parentEmail", text)}
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
              value={inputValues.parentAddress}
              setValue={(text) => inputHandler("parentAddress", text)}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Address"
              onFocus={() => handleFieldFocus("parentAddress")}
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
              Age should be between 5 to 199
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
              value={inputValues.parentAge}
              setValue={(text) => inputHandler("parentAge", text)}
              autoCorrect={false}
              maxLength={3}
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
              value={maskCNIC(inputValues.parentCnic)}
              setValue={(text) => inputHandler("parentCnic", text)}
              keyboardType="number-pad"
              maxLength={15}
              onFocus={() => handleFieldFocus("parentCnic")}
            />
          </View>

          {/* gender */}
          {/* <RadioGroup
          radioButtons={parentGender}
          onPress={onPressRadioButton}
          layout="row"
        /> */}
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
              // autoCapitalize="number-pad"
              autoCorrect={false}
              value={maskPhoneNumber(inputValues.parentOtherContact)}
              setValue={(text) => inputHandler("parentOtherContact", text)}
              keyboardType="phone-pad"
              maxLength={13}
              onFocus={() => handleFieldFocus("parentOtherContact")}
            />
          </View>

          <View
            style={[
              styles.input__icon,
              styles.paddingVertical,
              inputErrors.parentPassword ? { borderColor: "red" } : null,
            ]}
          >
            <Icon name="lock-outline" size={24} color="gray" />
            <UserInput
              placeholder="Password"
              secureTextEntry={!isVisible}
              value={inputValues.parentPassword}
              setValue={(text) => inputHandler("parentPassword", text)}
              onFocus={() => handleFieldFocus("parentPassword")}
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
          <View
            style={[
              styles.input__icon,
              styles.paddingVertical,
              inputErrors.confirmPass ? { borderColor: "red" } : null,
            ]}
          >
            <Icon name="lock-outline" size={24} color="gray" />
            <UserInput
              placeholder="Confirm Password"
              secureTextEntry={!isVisiblee}
              value={inputValues.confirmPass}
              setValue={(text) => inputHandler("confirmPass", text)}
              onFocus={() => handleFieldFocus("confirmPass")}
            />
            <Pressable
              style={({ pressed }) => pressed && styles.pressed}
              onPress={() => setIsVisiblee(!isVisiblee)}
            >
              {isVisiblee ? (
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
            <Text>
              Already have account <Text> </Text>
            </Text>

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
