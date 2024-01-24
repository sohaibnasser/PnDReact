import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import UserInput from "../components/auth/UserInput";
import { TextInput } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import Icon from "../components/Icon";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/auth/Button";
import SwipButton from "../components/auth/SwipButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { mobileApi } from "../config";
const From = [
  //   { label: "Select Gender", value: "" },

  { label: "Service Provider", value: "Service Provider", id: 1 },
  { label: "Admin", value: "Admin", id: 2 },
];
const Against = [
  //   { label: "Select Gender", value: "" },
  { label: "Service Provider1", value: "Service Provider1" },
  { label: "Service Provider2", value: "Service Provider2" },
];

const AddComplain = ({ navigation }) => {
  const width = Dimensions.get("window").width;
  const isFocused = useIsFocused();

  const [complainTo, setCompmlainTo] = useState("Service Provider");
  const [parentID, setParentID] = useState("");
  const [parentName, setParentName] = useState("");
  const [arr, setArr] = useState("");
  const [complainFrom, setComplainFrom] = useState();
  console.log("complain formmrmr", complainFrom, parentID);
  const [remarks, setRemarks] = useState("");
  const [spId, setSpId] = useState("");
  const [inputErrors, setInputErrors] = useState({
    remarks: false,
  });
  const handleFieldFocus = (fieldName) => {
    // Remove the error highlight when the user starts editing the field
    setInputErrors({ ...inputErrors, [fieldName]: false });
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...inputErrors };
    // if (!remarks) {
    //   // Display alert for empty fields
    //   Alert.alert(
    //     "Error",
    //     "Remarks are required and should have at least 5 characters long"
    //   );
    //   return false;
    // }
    // Validate each field and set error state
    if (!remarks) {
      newErrors.remarks = true;
      isValid = false;
    }
    if (remarks?.length < 5) {
      newErrors.remarks = true;
      isValid = false;
    }
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(remarks)) {
      newErrors.remarks = true;
      isValid = false;
    }

    // Add more validations for other fields here...

    setInputErrors(newErrors);

    return isValid;
  };
  // const [sPId, setSPId] = useState([]);
  // console.log("array of all sp=>", sPId);
  React.useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      console.log("id", id);
      setParentID(id.parentId);
      setParentName(id.parentName);
    };
    PressHandler();
  }, [setParentID, isFocused]);
  console.log("parentID0123", parentID, parentName);
  let spList = "";
  if (arr.length !== 0) {
    spList = arr.result.map((item) => item.spId);
    // spList = JSON.parse(id);
  }
  const handleValueChange = (itemValue) => {
    setComplainFrom(itemValue);
  };
  // let id = "";
  // console.log("asad", spList);
  // if (spList.length !== 0) {
  //   const iD = spList.map((item) => item);
  //   id = JSON.parse(iD);
  // }
  // console.log("asad", id);
  // const jsonArray = await JSON.parse(spList);
  // console.log("json", jsonArray);
  // arr.result.map((item) => {
  //   return {
  //     pa,
  //   };
  // });
  // console.log("array of all arr=>", arr.result[0].spId);
  // const [isChecked, setChecked] = useState(false);
  console.log("complainfrom", complainFrom);
  // console.log("complainTo", complainTo);

  const getAllSP = async () => {
    // if (parentID) {
    try {
      const response = await fetch(
        `${mobileApi}/complain/service_provider_for_complain/${parentID}`
      );

      const responseData = await response.json();
      console.log("sevice provider for complain", responseData);
      const resData = responseData;
      const arrr = resData;
      if (responseData.code === "200") {
        setArr(arrr);
      }

      if (arrr.result.length > 0) {
        setComplainFrom(arrr.result[0].spId);
      }
      // setComplainFrom(arrr.result[0].spName);
      // setSPId(arrr.result);
    } catch (error) {
      console.log("api", error);
    }
    // }
  };

  const spID = arr.result?.spId;
  console.log("spIDddD", spID);
  React.useEffect(() => {
    if (parentID) {
      getAllSP();
    }
  }, [parentID, isFocused]);

  const saveLeaveHandler = async () => {
    if (complainTo === "Admin") {
      // if (!remarks || remarks.trim().length < 5) {
      //   return Alert.alert(
      //     "Error",
      //     "Remarks required and must be at least 5 characters long"
      //   );
      // }
      if (validateForm()) {
        try {
          const response = await fetch(`${mobileApi}/complain/lodge_complain`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              complaintFrom: "Parent",
              parentDto: {
                parentId: parentID,
                parentName: parentName,
              },
              remarks: remarks,
            }),
          });
          const responseData = await response.json();

          if (responseData.code === "200") {
            navigation.goBack();
          }
          console.log("response of Admin", responseData);
        } catch (error) {
          console.log("save leave error", error);
        }
      }
    }

    if (complainTo === "Service Provider") {
      // if (!remarks || remarks.trim().length < 5) {
      //   return Alert.alert(
      //     "Error",
      //     "Remarks required and must be at least 5 characters long"
      //   );
      // }

      if (arr?.result.length === 0) {
        return Alert.alert("Error", "No service provider for complain");
      }
      if (validateForm()) {
        try {
          const response = await fetch(`${mobileApi}/complain/lodge_complain`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              complaintFrom: "Parent",
              parentDto: {
                parentId: parentID,
                parentName: parentName,
              },
              remarks: remarks,
              serviceProviderDto: {
                spId: complainFrom,
              },
            }),
          });
          const responseData = await response.json();

          if (responseData.code === "200") {
            return Alert.alert("Success", "Complain Added Successfully", [
              { text: "OK", onPress: () => navigation.goBack() },
            ]);
          }
          console.log("response of Admin", responseData);
        } catch (error) {
          console.log("save leave error", error);
        }
      }
    }
  };
  return (
    // <ScrollView>
    <ScrollView style={[styles.container]}>
      <View>
        <View style={styles.dropDown}>
          <Text style={styles.text}>Complain To:</Text>
          <View style={styles.dropDownContent}>
            <Picker
              style={{ width: width / 1.45 }}
              selectedValue={complainTo}
              onValueChange={(itemValue) => setCompmlainTo(itemValue)}
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
        {complainTo === "Admin" ? (
          <View></View>
        ) : (
          <View style={styles.dropDown}>
            <Text style={styles.text}>Against:</Text>
            <View style={styles.dropDownContent}>
              {arr && (
                <Picker
                  style={{ width: width / 1.29 }}
                  selectedValue={complainFrom}
                  onValueChange={handleValueChange}
                >
                  {arr.result.map((sp) => (
                    <Picker.Item
                      key={sp.spId}
                      label={sp.spName}
                      value={sp.spId}
                    />
                  ))}
                </Picker>
              )}
            </View>
          </View>
        )}
        {inputErrors.remarks && (
          <Text
            style={{
              marginLeft: 5,
              paddingVertical: 5,
              color: "red",
            }}
          >
            Remarks are required and should have at least 5 characters
          </Text>
        )}
        <View
          style={[
            styles.commentsBox,
            inputErrors.remarks ? { borderColor: "red" } : null,
          ]}
        >
          <TextInput
            onFocus={() => handleFieldFocus("remarks")}
            placeholder="Remarks"
            style={styles.textArea}
            multiline={true}
            value={remarks}
            onChangeText={(text) => setRemarks(text)}
          />
        </View>
        <View style={styles.commentsBox}>
          <TextInput
            scrollEnabled
            editable={false}
            placeholder="Remarks History"
            style={styles.textArea}
            multiline={true}
          />
        </View>
      </View>
      <SwipButton title="SAVE" onPress={saveLeaveHandler} />
      {/* <Pressable>o
        <Button>SAVE</Button>
      </Pressable> */}
    </ScrollView>
  );
};

export default AddComplain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
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
  //   // borderWidth: 1,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   width: "50%",
  //   maxWidth: "100%",
  //   marginLeft: 10,
  // },

  textArea: {
    textAlignVertical: "top",
    flex: 1,
  },
  commentsBox: {
    elevation: 4,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    padding: 8,
    height: 120,
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: "white",
  },
});
