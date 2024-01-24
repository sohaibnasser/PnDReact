import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from "react-native";
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
import { dependentApi } from "../config";
import UploadImage from "../components/auth/UploadImage";
import { maskCNIC, maskPhoneNumber } from "../Util/masking";

const AddPassenger = ({ navigation }) => {
  const [parentID, setParentID] = useState("");
  console.log("parentIDDD", parentID);
  const [dependentName, setDependentName] = useState("");
  const [dependentCnic, setDependentCnic] = useState("");

  const [dependentContact, setDependentContact] = useState("");

  const [dependentEmail, setDependentEmail] = useState("");
  const age = 5;
  const [dependentAge, setDependentAge] = useState(parseInt(age));
  const [dependentGender, setDependentGender] = useState("");

  const [imageUrl, setImageUrl] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [parentName, setParentName] = useState();
  const [inputErrors, setInputErrors] = useState({
    dependentName: false,
    dependentContact: false,
    dependentEmail: false,
    dependentCnic: false,
  });

  const handleFieldFocus = (fieldName) => {
    // Remove the error highlight when the user starts editing the field
    setInputErrors({ ...inputErrors, [fieldName]: false });
  };
  let dCnic = "";
  if (dependentCnic) {
    dCnic = maskCNIC(dependentCnic);
  }

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...inputErrors };
    if (
      !dependentName ||
      !dependentContact ||
      !dependentEmail ||
      !dependentAge ||
      !dependentCnic
    ) {
      // Display alert for empty fields
      Alert.alert("Error", "All fields are required.");
      return false;
    }
    if (!imageUrl) {
      return Alert.alert(
        "Empty profile image",
        "Please select an image for passenger profile"
      );
    }
    if (!dependentGender) {
      return Alert.alert("Gender not specified", "Please specify a gender");
    }
    // Validate each field and set error state
    if (!dependentName) {
      newErrors.dependentName = true;
      isValid = false;
    }
    if (!dependentContact) {
      newErrors.dependentContact = true;
      isValid = false;
    }
    if (dependentContact.length < 13) {
      newErrors.dependentContact = true;
      isValid = false;
    }
    if (!dependentEmail) {
      newErrors.dependentEmail = true;
      isValid = false;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(dependentEmail)) {
      newErrors.dependentEmail = true;
      isValid = false;
    }
    // if (!dependentAge) {
    //   newErrors.dependentAge = true;
    //   isValid = false;
    // }
    if (!dependentCnic) {
      newErrors.dependentCnic = true;
      isValid = false;
    }
    if (dCnic.length < 15) {
      newErrors.dependentCnic = true;
      isValid = false;
    }

    // Add more validations for other fields here...

    setInputErrors(newErrors);

    return isValid;
  };

  //  GET dependent ID FROM ASYNCSTORAGE
  React.useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      console.log("paren data", id);
      setParentID(id.parentId);
      setParentName(id.parentName);
    };
    PressHandler();
  }, [setParentID]);

  const takeImage = (url) => {
    setImageUrl(url);
  };

  const inreaseAge = () => {
    if (dependentAge >= 199) {
      return;
    }
    setDependentAge((pre) => pre + 1);
  };
  const decreaseAge = () => {
    if (dependentAge <= 5) {
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

  const AddHandButtonler = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await fetch(`${dependentApi}/new_dependent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dependentDto: {
              dependentAge,
              dependentCnic,
              dependentContact,
              dependentEmail,
              dependentGender,
              dependentName,
              imageUrl: imageUrl,
              parentDto: { parentId: parentID, parentName: parentName },
            },
          }),
        });
        const responseData = await response.json();
        console.log("response data Add Passenger", responseData);
        // setIsLoading(false);
        if (responseData.code === "200") {
          return Alert.alert("Success", "Passenger added successfully", [
            { text: "Ok", onPress: () => navigation.navigate("Passenger") },
          ]);
        } else {
          return Alert.alert("Error", responseData.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <UploadImage takeImage={takeImage} imageUrl={imageUrl} />
        <View
          style={[styles.input__icon, styles.paddingVertical, styles.nameInput]}
        >
          <Icon name="account-outline" size={24} color="gray" />

          <UserInput
            placeholder="Name"
            autoCapitalize="words"
            autoCorrect={false}
            value={dependentName}
            setValue={setDependentName}
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
      {inputErrors.dependentCnic && (
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
          inputErrors.dependentCnic ? { borderColor: "red" } : null,
        ]}
      >
        <Icon name="card-bulleted-outline" size={24} color="gray" />
        <UserInput
          placeholder="CNIC No._ _ _ _ _ - _ _ _ _ _ _ _ - _"
          autoCorrect={false}
          maxLength={15}
          value={maskCNIC(dependentCnic)}
          setValue={setDependentCnic}
          keyboardType="number-pad"
          onFocus={() => handleFieldFocus("dependentCnic")}
        />
      </View>
      {inputErrors.dependentEmail && (
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
          inputErrors.dependentEmail ? { borderColor: "red" } : null,
        ]}
      >
        <Icon name="email-outline" size={24} color="gray" />
        <UserInput
          placeholder="Email Address"
          keyboardType="email-address"
          autoCorrect={false}
          value={dependentEmail}
          setValue={setDependentEmail}
          onFocus={() => handleFieldFocus("dependentEmail")}
        />
      </View>
      {inputErrors.dependentContact && (
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
          inputErrors.dependentContact ? { borderColor: "red" } : null,
        ]}
      >
        <Icon name="phone-outline" size={24} color="gray" />
        <UserInput
          placeholder="phone"
          autoCorrect={false}
          maxLength={13}
          value={maskPhoneNumber(dependentContact)}
          setValue={setDependentContact}
          keyboardType="phone-pad"
          onFocus={() => handleFieldFocus("dependentContact")}
        />
      </View>
      {/* <View style={styles.addMorePassengerContainer}>
          <Pressable
            onPress={() => navigation.navigate("Add Passengers")}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Icon name="plus-box" color="#3696f9" size={33} />
          </Pressable>
          <Text style={styles.addMorePassenger}>Add More Passenger</Text>
        </View> */}
      {/* </View> */}
      <View style={{ marginTop: 10 }}>
        <SwipButton title="ADD" onPress={AddHandButtonler} />
        {/* <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={() => {}}
        >
          <Button>CONTINUE</Button>
        </Pressable> */}
      </View>
    </ScrollView>
  );
};

export default AddPassenger;

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
});
