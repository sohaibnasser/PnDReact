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

const ComplainDetails = ({ navigation, route }) => {
  const width = Dimensions.get("window").width;
  const {
    item,
    spID,
    parentId,
    name,
    namee,
    complaintStatus,
    remarksHistory,
    remarkss,
    complaintsId,
  } = route?.params || {};
  let Name = "";
  if (!spID) {
    Name = "Admin";
  } else {
    Name = "Service Provider";
  }
  console.log(
    "name",
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
    complaintsId
  );
  const isFocused = useIsFocused();

  const [complainTo, setComplainTo] = useState(Name);
  const [parentID, setParentID] = useState(parentId);
  const [arr, setArr] = useState("");
  const [complainFrom, setComplainFrom] = useState("");
  const [remarks, setRemarks] = useState(remarkss);
  const [complainStatus, setComplainStatus] = useState(complaintStatus);
  console.log("co", complainStatus, complaintStatus);
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
  //   const saveLeaveHandler = async () => {
  //     if (!remarks || remarks.length < 5) {
  //       return Alert.alert(
  //         "Error",
  //         "Remarks required and must be 5 characters long"
  //       );
  //     }
  //     if (complainStatus === complaintStatus && remarks === remarkss) {
  //       Alert.alert("Same Data", "Please make some changes to Update");
  //       return;
  //     }
  //     if (!spID) {
  //       try {
  //         const response = await fetch(`${mobileApi}/complain/update_complain`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             complaintFrom: "Parent",
  //             complaintStatus: complainStatus,
  //             complaintsId: complaintsId,
  //             parentDto: {
  //               parentId: parentID,
  //             },
  //             remarks: remarks,
  //             remarksHistory: remarksHistory,
  //           }),
  //         });
  //         const responseData = await response.json();
  //         if (responseData.message === "success") {
  //           navigation.goBack();
  //         }
  //         console.log("response of Update leave", responseData);
  //       } catch (error) {
  //         console.log("save leave error", error);
  //       }
  //     } else {
  //       try {
  //         const response = await fetch(`${mobileApi}/complain/update_complain`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             complaintFrom: "Parent",
  //             complaintStatus: complainStatus,
  //             complaintsId: complaintsId,
  //             parentDto: {
  //               parentId: parentID,
  //             },
  //             remarks: remarks,
  //             remarksHistory: remarksHistory,
  //             serviceProviderDto: {
  //               spId: spID,
  //             },
  //           }),
  //         });
  //         const responseData = await response.json();
  //         if (responseData.message === "success") {
  //           navigation.goBack();
  //         }
  //         console.log("response of Update leave", responseData);
  //       } catch (error) {
  //         console.log("save leave error", error);
  //       }
  //     }
  //   };
  return (
    // <ScrollView>
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.commentsBox}>
          <Text style={styles.text}>Complain From:</Text>
          <Text style={styles.text}>{item?.complaintFrom}</Text>
        </View>
        <View style={styles.commentsBox}>
          <Text style={styles.text}>Complain Status:</Text>
          <Text style={styles.text}>{item?.complaintStatus}</Text>
        </View>
        <View style={styles.commentsBox}>
          <Text style={styles.text}>ParentName:</Text>
          <Text style={styles.text}>{item?.parentDto?.parentName}</Text>
        </View>
        <View style={styles.commentsBox}>
          <Text style={styles.text}>Parent_Id:</Text>
          <Text style={styles.text}>{item?.parentDto?.parentId}</Text>
        </View>
        <View style={styles.commentsBox}>
          <Text style={styles.text}>Parent Contacts:</Text>
          <Text style={styles.text}>{item?.parentDto?.parentContact}</Text>
        </View>
        <View style={styles.commentsBox}>
          <Text style={styles.text}>Parent Email:</Text>
          <Text style={styles.text}>{item?.parentDto?.parentEmail}</Text>
        </View>
        <View style={styles.commentsBox}>
          <Text style={styles.text}>Parent Status:</Text>
          <Text style={styles.text}>{item?.parentDto?.parentStatus}</Text>
        </View>
        <View style={styles.commentsBox}>
          <Text style={styles.text}>Parent Address:</Text>
          <Text style={styles.text}>{item?.parentDto?.parentAddress}</Text>
        </View>
        <View style={[styles.commentsBox, { height: "100%" }]}>
          <Text style={styles.text}>Remarks</Text>
          <Text style={styles.text}>{item?.remarks}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ComplainDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  text: {
    color: "gray",
    fontSize: 15,
    marginLeft: 5,
  },

  textArea: {
    textAlignVertical: "top",
    flex: 1,
  },
  commentsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    padding: 8,
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: "white",
  },
  addressContainer: {
    // justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    padding: 8,
    borderRadius: 4,
    height: "100%",
    marginTop: 10,
    backgroundColor: "white",
  },
  addressText: {
    color: "gray",
    fontSize: 15,
    marginLeft: 90,
  },
});
