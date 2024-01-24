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
const ComplainStatus = [
  //   { label: "Select Gender", value: "" },
  { label: "Resolved", value: "Resolved", id: 1 },
  { label: "Pending", value: "Pending", id: 2 },
];
const Against = [
  //   { label: "Select Gender", value: "" },
  { label: "Service Provider1", value: "Service Provider1" },
  { label: "Service Provider2", value: "Service Provider2" },
];

const UpdateComplain = ({ navigation, route }) => {
  const width = Dimensions.get("window").width;
  const {
    spID,
    parentId,
    name,
    namee,
    complaintStatus,
    remarksHistory,
    remarkss,
    complaintsId,
    parentName,
    spName,
  } = route?.params || {};
  let Name = "";
  if (!spID) {
    Name = "Admin";
  } else {
    Name = "Service Provider";
  }
  console.log(
    "name",
    spName,
    name,
    "namee",
    namee,

    "spId",
    spID,
    "parentId",
    parentId,
    "params",
    name,
    complaintStatus,
    remarksHistory,
    remarkss,
    "cpmsmkss",
    complaintsId,
    "parentname",
    parentName
  );
  const isFocused = useIsFocused();

  const [complainTo, setComplainTo] = useState(Name);
  const [parentID, setParentID] = useState(parentId);
  const [arr, setArr] = useState("");
  const [complainFrom, setComplainFrom] = useState("");
  const [remarks, setRemarks] = useState();
  const [complainStatus, setComplainStatus] = useState(complaintStatus);
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
  //   setComplainTo(name);
  // const [isChecked, setChecked] = useState(false);
  //   console.log("complainto", complainTo);

  React.useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setParentID(id.parentId);
    };
    PressHandler();
  }, [setParentID]);
  const getAllDependent = async () => {
    // if (parentID) {
    try {
      const response = await fetch(
        `${mobileApi}/complain/service_provider_for_complain/${parentID}`
      );

      const responseData = await response.json();
      const resData = responseData;
      const arrr = resData;
      setArr(arrr);
    } catch (error) {
      console.log(error);
    }
    // }
  };
  React.useEffect(() => {
    if (parentID) {
      getAllDependent();
    }
  }, [parentID, isFocused]);
  console.log(
    "sa",
    ComplainStatus[0].value,
    "qq",
    complaintStatus,
    "qqw",
    remarks,
    "qqwss",
    remarkss
  );
  const updateComplainHandler = async () => {
    if (validateForm()) {
      if (!spID) {
        try {
          const response = await fetch(
            `${mobileApi}/complain/update_complain`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                complaintFrom: "Parent",
                complaintStatus: complainStatus,
                complaintsId: complaintsId,
                parentDto: {
                  parentId: parentID,
                  parentName: parentName,
                },
                remarks: remarks,
                remarksHistory: remarksHistory,
              }),
            }
          );
          const responseData = await response.json();
          if (responseData.code === "200") {
            return Alert.alert("Success", "Complain updated successfully", [
              { text: "Ok", onPress: () => navigation.goBack() },
            ]);
          }
          console.log("response of Update leave", responseData);
        } catch (error) {
          console.log("save leave error", error);
        }
      } else {
        try {
          const response = await fetch(
            `${mobileApi}/complain/update_complain`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                complaintFrom: "Parent",
                complaintStatus: complainStatus,
                complaintsId: complaintsId,
                parentDto: {
                  parentId: parentID,
                },
                remarks: remarks,
                remarksHistory: remarksHistory,
                serviceProviderDto: {
                  spId: spID,
                  spName: spName,
                },
              }),
            }
          );
          const responseData = await response.json();
          if (responseData.message === "success") {
            navigation.goBack();
          }
          console.log("response of Update leave", responseData);
        } catch (error) {
          console.log("save leave error", error);
        }
      }
    }
  };
  return (
    // <ScrollView>
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.dropDown}>
          <Text style={styles.text}>Complain To:</Text>
          <View style={styles.dropDownContent}>
            <Picker
              enabled={false}
              style={{ width: width / 1.45 }}
              selectedValue={complainTo}
              onValueChange={(itemValue) => setComplainTo(itemValue)}
            >
              {From.map((option) => (
                <Picker.Item
                  key={option.id}
                  label={
                    complainTo === option.value
                      ? `${option.label}`
                      : option.label
                  }
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.dropDown}>
          <Text style={styles.text}>Status:</Text>
          <View style={styles.dropDownContent}>
            <Picker
              style={{ width: width / 1.26 }}
              selectedValue={complainStatus}
              onValueChange={(itemValue) => setComplainStatus(itemValue)}
            >
              {ComplainStatus.map((status) => (
                <Picker.Item
                  key={status.id}
                  label={status.value}
                  value={status.value}
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
                  enabled={false}
                  style={{ width: width / 1.3 }}
                  selectedValue={complainFrom}
                  onValueChange={(itemValue) => setComplainFrom(itemValue)}
                >
                  {arr.result.map((sp) => (
                    <Picker.Item
                      key={sp.spId}
                      label={
                        complainFrom === sp.spName ? `${sp.spName}` : sp.spName
                      }
                      value={sp.spName}
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              scrollEnabled={true}
              editable={false}
              placeholder="Remarks History"
              style={styles.textArea}
              multiline={true}
              value={remarksHistory}
            />
          </ScrollView>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <SwipButton title="SAVE" onPress={updateComplainHandler} />
      </View>
      {/* <Pressable>o
        <Button>SAVE</Button>
      </Pressable> */}
    </ScrollView>
  );
};

export default UpdateComplain;

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
  //   borderWidth: 1,
  //   // justifyContent: "space-between",
  //   // flexDirection: "row",
  //   // alignItems: "center",
  //   width: "100%",
  //   // maxWidth: "100%",
  //   // marginLeft: 10,
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
