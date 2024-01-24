import { Pressable, StyleSheet, Text, View } from "react-native";
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

const UpdateComplain = ({ navigation, route }) => {
  const {
    complaintFrom,
    spID,
    parentId,
    name,
    namee,
    complaintStatus,
    remarksHistory,
    remarkss,
    complaintsId,
  } = route.params;
  let Name = "";
  if (spID !== "") {
    Name = "Admin";
  } else {
    Name = "Service Provider";
  }
  console.log(
    "name",
    name,
    "namee",
    namee,
    "SPPPP",
    complaintFrom,
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
    complaintsId
  );
  const isFocused = useIsFocused();

  const [complainTo, setComplainTo] = useState(Name);
  const [parentID, setParentID] = useState(parentId);
  const [arr, setArr] = useState("");
  const [complainFrom, setComplainFrom] = useState("");
  const [remarks, setRemarks] = useState(remarkss);
  //   console.log("array of all sp=>", parentID);
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

  const saveLeaveHandler = async () => {
    try {
      const response = await fetch(`${mobileApi}/complain/update_complain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          complaintFrom: complaintFrom,
          complaintStatus: "Pending/Resolved",
          complaintsId: complaintsId,
          parentDto: {
            parentId: parentID,
          },
          remarks: remarks,
          remarksHistory: remarksHistory,
        }),
      });
      const responseData = await response.json();
      if (responseData.message === "success") {
        navigation.goBack();
      }
      console.log("response of Update leave", responseData);
    } catch (error) {
      console.log("save leave error", error);
    }
  };
  return (
    // <ScrollView>
    <ScrollView style={[styles.container]}>
      <View>
        <View style={styles.dropDown}>
          <View style={styles.dropDownContent}>
            <Text style={styles.text}>Complain To:</Text>
            <Picker
              style={{ width: 220 }}
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
        {complainTo === "Admin" ? (
          <View></View>
        ) : (
          <View style={styles.dropDown}>
            <View style={styles.dropDownContent}>
              <Text style={styles.text}>Against:</Text>
              {arr && (
                <Picker
                  style={{ width: 220 }}
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
        <View style={styles.commentsBox}>
          <TextInput
            placeholder="Remarks"
            style={styles.textArea}
            multiline={true}
            value={remarks}
            onChangeText={(text) => setRemarks(text)}
          />
        </View>
        <View style={styles.commentsBox}>
          <TextInput
            editable={false}
            placeholder="Remarks History"
            style={styles.textArea}
            multiline={true}
            value={remarksHistory}
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

export default UpdateComplain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  dropDown: {
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 8,
  },
  text: {
    color: "gray",
    fontSize: 15,
    width: 72,
    maxWidth: "50%",
  },
  dropDownContent: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    marginLeft: 10,
  },

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
