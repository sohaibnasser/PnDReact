import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native";
import Activityindicator from "../components/Activityindicator";
import Icon from "../components/Icon";
import UserInput from "../components/auth/UserInput";
import Button from "../components/auth/Button";
import { Ionicons } from "@expo/vector-icons";
import SwipButton from "../components/auth/SwipButton";
import { dependentApi, mobileApi } from "../config";
import UploadImage from "../components/auth/UploadImage";
import { maskCNIC, maskPhoneNumber } from "../Util/masking";
import { colors } from "../Util/colors";
import UploadDocument from "../components/auth/UploadDocument";
import FormDocumentPicker from "../components/auth/FormDocumentPicker";
const From = [
  //   { label: "Select Gender", value: "" },

  { label: "Active", value: "Active", id: 1 },
  { label: "Inactive", value: "Inactive", id: 2 },
];
const width = Dimensions.get("window").width;

const AddDriver = ({ navigation }) => {
  const [spId, setSpId] = useState("");
  const [documentUris, setDocumentUris] = useState([]);
  const [dependentAge, setDependentAge] = useState(18);
  const [dependentGender, setDependentGender] = useState("Male");
  // const [documentUri, setDocumentUri] = useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    cnic: "",
    email: "",
    contact: "",
    otherContact: "",
    address: "",
    status: "Active",
    licence: "",
  });
  console.log(values);

  const handleDelete = (uri) => {
    setDocumentUris(documentUris.filter((documentUri) => documentUri !== uri));
  };

  const handleAdd = (uri) => {
    setDocumentUris([...documentUris, uri]);
  };
  const handleDocumentSelect = (uri) => {
    setDocumentUris(uri);
  };
  // console.log("Adding", documentUris);

  //  GET PARENT ID FROM ASYNCSTORAGE
  React.useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setSpId(id.spId);
    };
    PressHandler();
  }, [setSpId]);

  const inreaseAge = () => {
    setDependentAge((pre) => pre + 1);
  };
  const decreaseAge = () => {
    if (dependentAge <= 18) {
      alert("Age should be greater than 18");
      return;
    }
    setDependentAge((pre) => pre - 1);
  };
  const selectMaleHandler = () => {
    setDependentGender("Male");
  };
  const selectFemaleHandler = () => {
    setDependentGender("Female");
  };
  const changeTextHandler = (key, value) => {
    setValues((previous) => ({ ...previous, [key]: value }));
  };
  const isAllFieldsNotEmpty = () => {
    for (const key in values) {
      if (values[key].trim() === "") {
        return false;
      }
    }
    return true;
  };
  //API REQUEST
  const AddHandButtonler = async () => {
    if (!isAllFieldsNotEmpty()) {
      return Alert.alert("Error", "All fields are required");
    }
    if (documentUris.length === 0) {
      return Alert.alert(
        "Error",
        "Please provide related documents of Vehicle"
      );
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${mobileApi}/sp/saveDriver`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentList: documentUris,
          driverAddress: values.address,
          driverAge: dependentAge,
          driverCnic: values.cnic,
          driverContactNumber: values.contact,
          driverEmail: values.email,
          driverGender: dependentGender,
          driverLicenseNum: values.licence,
          driverName: values.name,
          driverOtherNumber: values.otherContact,
          serviceProviderDto: {
            spId: spId,
          },
        }),
      });
      const responseData = await response.json();
      console.log("response data Add Driver", responseData);

      if (responseData.code === "200") {
        Alert.alert("Success", responseData.message, [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (error) {
      Alert.alert("Network error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <>
          <View>
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
                value={values.name}
                setValue={(text) => changeTextHandler("name", text)}
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
                {dependentAge} Years
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
                        dependentGender === "Male" ? "white" : "transparent",
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
                        dependentGender === "Female" ? "white" : "transparent",
                    },
                  ]}
                >
                  Female
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="card-bulleted-outline" size={24} color="gray" />
            <UserInput
              placeholder="CNIC No._ _ _ _ _ - _ _ _ _ _ _ _ - _"
              autoCorrect={false}
              maxLength={15}
              value={maskCNIC(values.cnic)}
              setValue={(text) => changeTextHandler("cnic", text)}
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="email-outline" size={24} color="gray" />
            <UserInput
              placeholder="Email Address"
              keyboardType="email-address"
              autoCorrect={false}
              value={values.email}
              setValue={(text) => changeTextHandler("email", text)}
            />
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="phone-outline" size={24} color="gray" />
            <UserInput
              placeholder="Contact No"
              autoCorrect={false}
              maxLength={13}
              value={maskPhoneNumber(values.contact)}
              setValue={(text) => changeTextHandler("contact", text)}
              keyboardType="phone-pad"
            />
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="phone-plus-outline" size={24} color="gray" />
            <UserInput
              placeholder="Other Contact"
              autoCorrect={false}
              maxLength={13}
              value={maskPhoneNumber(values.otherContact)}
              setValue={(text) => changeTextHandler("otherContact", text)}
              keyboardType="phone-pad"
            />
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="routes" size={24} color="gray" />
            <UserInput
              placeholder="Address"
              autoCorrect={false}
              value={values.address}
              setValue={(text) => changeTextHandler("address", text)}
            />
          </View>
          <View style={[styles.input__icon, styles.paddingVertical]}>
            <Icon name="license" size={24} color="gray" />
            <UserInput
              placeholder="Licence"
              autoCorrect={false}
              value={values.licence}
              setValue={(text) => changeTextHandler("licence", text)}
            />
          </View>
          <View style={styles.dropDown}>
            <Text style={styles.text}>Status:</Text>
            <View style={styles.dropDownContent}>
              <Picker
                style={{ width: width / 1.29 }}
                selectedValue={values.status}
                onValueChange={(itemValue) =>
                  changeTextHandler("status", itemValue)
                }
              >
                {From.map((option) => (
                  <Picker.Item
                    key={option.id}
                    label={option.label}
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
              marginVertical: 5,
            }}
          >
            <Text
              style={{ color: colors.blue, fontWeight: "700", fontSize: 16 }}
            >
              Upload Document
            </Text>
            {/* <UploadDocument onDocumentSelect={handleDocumentSelect} /> */}
          </View>
          <FormDocumentPicker
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            documentUris={documentUris}
          />
          <View style={{ marginTop: 10 }}>
            <SwipButton title="ADD" onPress={AddHandButtonler} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default AddDriver;

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
  // dropDown: {
  //   borderWidth: 0.5,
  //   borderColor: "gray",
  //   backgroundColor: "#ffffff",
  //   borderRadius: 6,
  //   marginVertical: 8,
  // },
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
