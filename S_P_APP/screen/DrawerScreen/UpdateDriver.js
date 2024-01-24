import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Activityindicator from "../../components/Activityindicator";
import Icon from "../../components/Icon";
import UserInput from "../../components/auth/UserInput";
import SwipButton from "../../components/auth/SwipButton";
import { mobileApi } from "../../config";
import { maskCNIC, maskPhoneNumber } from "../../Util/masking";
import { useEffect } from "react";
import UploadDocument from "../../components/auth/UploadDocument";
import FormDocumentPicker from "../../components/auth/FormDocumentPicker";
import { colors } from "../../Util/colors";
import UploadImage from "../../components/auth/UploadImage";
const width = Dimensions.get("window").width;

const From = [
  { label: "Active", value: "Active", id: 1 },
  { label: "Inactive", value: "Inactive", id: 2 },
];

const UpdateDriver = ({ navigation, route }) => {
  const {
    driverName,
    driverCnic,
    driverLicenseNum,
    driverContactNumber,
    driverOtherNumber,
    driverAge,
    driverAddress,
    driverGender,
    driverEmail,
    status,
    imageString,
    driverId,
  } = route?.params || {};

  const [DriverAge, setDriverAge] = useState(parseInt(driverAge));
  const [DriverGender, setDriverGender] = useState(driverGender);
  const [driverStatus, setDriverStatus] = useState(status);

  const [isLoading, setIsLoading] = useState(false);
  // console.log("image url from state", imageUrl);
  const [spId, setSpId] = useState("");
  const [documentUris, setDocumentUris] = useState(imageString);
  // const [imageUrl, setImageUrl] = useState(imageString[0]?.imageString);
  // console.log("iamge staring", imageUrl);
  // console.log("iamge staring", imageUrl);
  const [values, setValues] = useState({
    name: driverName,
    age: driverAge,
    gender: driverGender,
    cnic: driverCnic,
    email: driverEmail,
    contact: driverContactNumber,
    otherContact: driverOtherNumber,
    address: driverAddress,
    license: driverLicenseNum,
  });
  const pCnic = maskCNIC(values.cnic);

  const [inputErrors, setInputErrors] = useState({
    name: false,
    contact: false,
    email: false,
    address: false,
    cnic: false,
    otherContact: false,
    license: false,
    document: false,
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...inputErrors };
    if (
      !values.name ||
      !values.contact ||
      !values.email ||
      !values.address ||
      !values.cnic ||
      !values.otherContact ||
      !values.license
    ) {
      // Display alert for empty fields
      Alert.alert("Error", "All fields are required.");
      return false;
    }
    // Validate each field and set error state
    if (documentUris.length === 0) {
      Alert.alert("Document Missing", "Please provide related document");
      return false;
    }
    if (!values.name) {
      newErrors.name = true;
      isValid = false;
    }
    if (!values.contact) {
      newErrors.contact = true;
      isValid = false;
    }
    if (values.contact.length < 13) {
      newErrors.contact = true;

      isValid = false;
    }
    if (values.otherContact.length < 13) {
      newErrors.otherContact = true;

      isValid = false;
    }
    if (!values.email) {
      newErrors.email = true;
      isValid = false;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    const regex = /^[a-zA-Z0-9\s]+$/;

    if (!emailPattern.test(values.email)) {
      newErrors.email = true;
      isValid = false;
    }
    if (!values.address) {
      newErrors.address = true;
      isValid = false;
    }
    if (!regex.test(values.address)) {
      newErrors.address = true;
      isValid = false;
    }
    if (!values.cnic) {
      newErrors.cnic = true;
      isValid = false;
    }
    if (pCnic.length < 15) {
      newErrors.cnic = true;
      isValid = false;
    }
    if (!values.otherContact) {
      newErrors.otherContact = true;
      isValid = false;
    }
    if (!values.license) {
      newErrors.license = true;
      isValid = false;
    }
    if (!regex.test(values.license)) {
      newErrors.license = true;
      isValid = false;
    }

    // Add more validations for other fields here...

    setInputErrors(newErrors);

    return isValid;
  };
  const handleFieldFocus = (fieldName) => {
    // Remove the error highlight when the user starts editing the field
    setInputErrors({ ...inputErrors, [fieldName]: false });
  };
  // const takeImage = (url) => {
  //   setImageUrl(url);
  // };
  const handleDelete = (uri) => {
    setDocumentUris(documentUris.filter((documentUri) => documentUri !== uri));
  };

  const handleAdd = (uri) => {
    setDocumentUris([...documentUris, uri]);
  };

  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setSpId(id.spId);
    };
    PressHandler();
  }, [setSpId]);
  const handleValueChange = (itemValue) => {
    setDriverStatus(itemValue);
  };
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

  console.log(
    driverName,
    driverCnic,
    driverLicenseNum,
    driverContactNumber,
    driverOtherNumber,
    driverAge,
    driverAddress,
    driverGender,
    driverEmail,
    status,

    driverId
  );
  const inreaseAge = () => {
    setDriverAge((pre) => pre + 1);
  };
  const decreaseAge = () => {
    if (DriverAge <= 1) {
      return;
    }
    setDriverAge((pre) => pre - 1);
  };
  const selectMaleHandler = () => {
    setDriverGender("Male");
  };
  const selectFemaleHandler = () => {
    setDriverGender("Female");
  };

  const changeTextHandler = (key, value) => {
    setValues((previous) => ({ ...previous, [key]: value }));
  };

  //API REQUEST
  const AddHandButtonler = async () => {
    if (validateForm()) {
      try {
        console.log("press");
        setIsLoading(true);
        const response = await fetch(`${mobileApi}/sp/saveDriver`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentList: documentUris,
            driverAddress: values.address,
            driverAge: driverAge,
            driverCnic: values.cnic,
            driverContactNumber: values.contact,
            driverEmail: values.email,
            driverGender: driverGender,
            driverLicenseNum: values.license,
            driverName: values.name,
            driverId: driverId,
            driverOtherNumber: values.otherContact,
            serviceProviderDto: {
              spId: spId,
            },
          }),
        });
        const responseData = await response.json();
        console.log("response driver updated", responseData);
        if (responseData.code === "200") {
          return Alert.alert("Success", responseData.message, [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]);
        } else {
          return Alert.alert("Error", responseData.message);
        }
      } catch (error) {
        console.error("API request error:", error);
        return Alert.alert(
          "Error",
          "An error occurred while sending the request."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Activityindicator
          isLoading={isLoading}
          onRequestClose={() => {
            setIsLoading(false), navigation.goBack();
          }}
        />
      ) : (
        <ScrollView style={styles.container}>
          <View>
            {inputErrors.name && (
              <Text
                style={{
                  flex: 1,
                  marginLeft: 5,
                  paddingVertical: 5,
                  color: "red",
                }}
              >
                Invalid data
              </Text>
            )}
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                styles.nameInput,
                inputErrors.name ? { borderColor: "red" } : null,
              ]}
            >
              <Icon name="account-outline" size={24} color="gray" />

              <UserInput
                placeholder="Name"
                autoCapitalize="words"
                autoCorrect={false}
                value={values.name}
                setValue={(text) => changeTextHandler("name", text)}
                onFocus={() => handleFieldFocus("name")}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              justifyContent: "space-between",
            }}
          >
            <View style={styles.YearsAndGender}>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={inreaseAge}
              >
                <Icon name="plus" size={20} color="#fff" />
              </Pressable>
              <Text style={{ color: "#fff", fontSize: 20 }}>
                {DriverAge} Years
              </Text>
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={decreaseAge}
              >
                <Icon name="minus-thick" size={16} color="#fff" />
              </Pressable>
            </View>
            <View style={styles.YearsAndGender}>
              <Pressable
                onPress={selectMaleHandler}
                style={({ pressed }) => [pressed && styles.pressed]}
              >
                <Text
                  style={[
                    styles.activeMale,
                    {
                      backgroundColor:
                        DriverGender === "Male" ? "white" : "transparent",
                    },
                  ]}
                >
                  Male
                </Text>
              </Pressable>
              <Pressable
                onPress={selectFemaleHandler}
                style={({ pressed }) => [pressed && styles.pressed]}
              >
                <Text
                  style={[
                    styles.activefemale,
                    {
                      backgroundColor:
                        DriverGender === "Female" ? "white" : "transparent",
                    },
                  ]}
                >
                  Female
                </Text>
              </Pressable>
            </View>
          </View>
          {inputErrors.cnic && (
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
              inputErrors.cnic ? { borderColor: "red" } : null,
            ]}
          >
            <Icon name="card-bulleted-outline" size={24} color="gray" />
            <UserInput
              placeholder="CNIC No._ _ _ _ _ - _ _ _ _ _ _ _ - _"
              autoCorrect={false}
              maxLength={15}
              value={maskCNIC(values.cnic)}
              setValue={(text) => changeTextHandler("cnic", text)}
              keyboardType="number-pad"
              onFocus={() => handleFieldFocus("cnic")}
            />
          </View>
          {inputErrors.email && (
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
              inputErrors.email ? { borderColor: "red" } : null,
            ]}
          >
            <Icon name="email-outline" size={24} color="gray" />
            <UserInput
              placeholder="Email Address"
              keyboardType="email-address"
              autoCorrect={false}
              value={values.email}
              setValue={(text) => changeTextHandler("email", text)}
              onFocus={() => handleFieldFocus("email")}
            />
          </View>
          {inputErrors.contact && (
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
              inputErrors.contact ? { borderColor: "red" } : null,
            ]}
          >
            <Icon name="phone-outline" size={24} color="gray" />
            <UserInput
              placeholder="Contact No"
              autoCorrect={false}
              maxLength={13}
              value={maskPhoneNumber(values.contact)}
              setValue={(text) => changeTextHandler("contact", text)}
              keyboardType="phone-pad"
              onFocus={() => handleFieldFocus("contact")}
            />
          </View>
          {inputErrors.otherContact && (
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
              inputErrors.otherContact ? { borderColor: "red" } : null,
            ]}
          >
            <Icon name="phone-plus-outline" size={24} color="gray" />
            <UserInput
              placeholder="Other Contact"
              autoCorrect={false}
              maxLength={13}
              value={maskPhoneNumber(values.otherContact)}
              setValue={(text) => changeTextHandler("otherContact", text)}
              keyboardType="phone-pad"
              onFocus={() => handleFieldFocus("otherContact")}
            />
          </View>
          {inputErrors.address && (
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
              inputErrors.address ? { borderColor: "red" } : null,
            ]}
          >
            <Icon name="routes" size={24} color="gray" />
            <UserInput
              placeholder="Address"
              autoCorrect={false}
              value={values.address}
              setValue={(text) => changeTextHandler("address", text)}
              onFocus={() => handleFieldFocus("address")}
            />
          </View>
          {inputErrors.license && (
            <Text
              style={{
                flex: 1,
                marginLeft: 5,
                paddingVertical: 5,
                color: "red",
              }}
            >
              Invalid data
            </Text>
          )}
          <View
            style={[
              styles.input__icon,
              styles.paddingVertical,
              inputErrors.license ? { borderColor: "red" } : null,
            ]}
          >
            <Icon name="license" size={24} color="gray" />
            <UserInput
              placeholder="License"
              autoCorrect={false}
              value={values.license}
              setValue={(text) => changeTextHandler("license", text)}
              onFocus={() => handleFieldFocus("license")}
            />
          </View>
          <View style={styles.dropDown}>
            <Text style={styles.text}>Status:</Text>
            <View style={styles.dropDownContent}>
              <Picker
                style={{ width: width / 1.29 }}
                selectedValue={driverStatus}
                onValueChange={handleValueChange}
              >
                {From.map((option) => (
                  <Picker.Item
                    key={option.id}
                    label={
                      driverStatus === option.value
                        ? `${option.value}`
                        : option.value
                    }
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <Text style={{ color: colors.blue, fontWeight: "700" }}>
              Upload Document
            </Text>
          </View>
          <FormDocumentPicker
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            documentUris={documentUris}
          />
          {/* <UploadImage takeImage={takeImage} imageUrl={imageUrl} /> */}
          <View style={{ marginTop: 10 }}>
            <SwipButton title="ADD" onPress={AddHandButtonler} />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default UpdateDriver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    // justifyContent: "space-between",
  },
  headerRightButton: {
    justifyContent: "center",
    paddingTop: 10,
    paddingRight: 10,
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
  paddingVertical: {
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.75,
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
  nameInput: {
    flex: 1,
  },
  // addMorePassengerContainer: { flexDirection: "row", marginVertical: 10 },
  // addMorePassenger: {
  //   color: "#3696f9",
  //   alignSelf: "center",
  //   fontWeight: "",
  //   marginLeft: 12,
  // },
  YearsAndGender: {
    backgroundColor: "#3696f9",
    width: "48%",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    alignItems: "center",
    borderRadius: 4,
  },
  // bgColor: {
  //   width: "40%",
  //   height: "50%",
  //   borderRadius: 4,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  activeMale: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  activefemale: {
    padding: 5,
    borderRadius: 4,
  },
  dropDown: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 8,
    width: "100%",
  },
  text: {
    color: "gray",
    fontSize: 15,
    marginLeft: 5,
  },
  // dropDownContent: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   maxWidth: "100%",
  //   marginLeft: 10,
  // },
});
