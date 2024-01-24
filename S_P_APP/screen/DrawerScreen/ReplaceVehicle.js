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
import UserInput from "../../components/auth/UserInput";
import { TextInput } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import Icon from "../../components/Icon";
import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { mobileApi } from "../../config";
import SwipButton from "../../components/auth/SwipButton";
import Activityindicator from "../../components/Activityindicator";
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

const ReplaceVehicle = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const [replaceFrom, setReplaceFrom] = useState();
  const [spId, setSpId] = useState();
  const [replaceVehicle, setReplaceVehicle] = useState("");
  const [remarks, setRemarks] = useState();
  const [vehicleList, setVehicleList] = useState([]);
  const [replaceTo, setReplaceTo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setSpId(id.spId);
    };
    PressHandler();
  }, [setSpId]);
  const replaceVehicleList = async () => {
    // if (spId) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/sp/replaceVehicleListForSP/${spId}`
      );

      const responseData = await response.json();
      console.log("response data of replace from", responseData);
      if (responseData.code === "200") {
        setReplaceVehicle(responseData);
      }
      if (responseData?.result?.length > 0) {
        setReplaceFrom(responseData?.result[0]?.vehicleFrom?.vehicleId);
      }
    } catch (error) {
      console.log(error);
      return Alert.alert("Error", "Cannot get vehicle list");
    } finally {
      setIsLoading(false);
    }
    // }
  };
  React.useEffect(() => {
    if (spId) {
      replaceVehicleList();
    }
  }, [spId, isFocused]);
  const vehicleListForSPMobile = async () => {
    // if (spId) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/sp/vehicleListForSPMobile/${spId}`
      );

      const responseData = await response.json();
      console.log(
        "response data of vehicle list for SP Mobile",
        responseData?.result[0].vehicleColor
      );
      if (responseData?.result && responseData?.result.length > 0) {
        setReplaceTo(responseData?.result[0].vehicleId);
      }

      setVehicleList(responseData);
    } catch (error) {
      console.log(error);
      return Alert.alert("Error", "Error while getting vehicle list");
    } finally {
      setIsLoading(false);
    }
    // }
  };
  React.useEffect(() => {
    if (spId) {
      vehicleListForSPMobile();
    }
  }, [spId, isFocused]);

  const saveLeaveHandler = async () => {
    if (!remarks || remarks?.trim().length < 5) {
      return Alert.alert(
        "Error",
        "Remarks is required and must be at least 5 characters"
      );
    }
    if (!replaceFrom || !replaceTo) {
      return Alert.alert("Error", "No vehicle is selected");
    }
    if (replaceFrom.toString() === replaceTo.toString()) {
      return Alert.alert("Same vehicle", "Please select a different vehicle");
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${mobileApi}/sp/replaceVehicle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          remarks: remarks,
          vehicleFrom: {
            vehicleId: replaceFrom,
          },
          vehicleTo: {
            vehicleId: replaceTo,
          },
        }),
      });
      const responseData = await response.json();
      if (responseData.code === "200") {
        return Alert.alert("Success", "Vehicle was successfully replaced", [
          { text: "Ok", onPress: () => navigation.goBack() },
        ]);
      } else {
        return Alert.alert("Error", responseData.message);
      }
    } catch (error) {
      console.log("save leave error", error);
      return Alert.alert("Error", "Error while replacing vehicle");
    } finally {
      setIsLoading(false);
    }
  };

  const changeVehicleHandle = (itemValue) => {
    setReplaceTo(itemValue);
  };
  return (
    <>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <ScrollView
          style={[styles.container]}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={styles.dropDown}>
              <Text style={styles.text}>From:</Text>
              <View style={styles.dropDownContent}>
                <Picker
                  style={{ width: Dimensions.get("window").width / 1.29 }}
                  selectedValue={replaceFrom}
                  onValueChange={(itemValue) => setReplaceFrom(itemValue)}
                >
                  {replaceVehicle?.result?.map((option) => (
                    <Picker.Item
                      key={option.replaceId}
                      label={option.vehicleFrom?.vehicleMake}
                      value={option.vehicleFrom?.vehicleId}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.dropDown}>
              <Text style={styles.text}>To:</Text>
              <View style={styles.dropDownContent}>
                {vehicleList && (
                  <Picker
                    style={{ width: Dimensions.get("window").width / 1.29 }}
                    selectedValue={replaceTo}
                    onValueChange={changeVehicleHandle}
                  >
                    {vehicleList.result?.map((vehicle) => (
                      <Picker.Item
                        key={vehicle.vehicleId}
                        label={vehicle.vehicleMake}
                        value={vehicle.vehicleId}
                      />
                    ))}
                  </Picker>
                )}
              </View>
            </View>
            <View style={styles.commentsBox}>
              <TextInput
                placeholder="Remarks"
                style={styles.textArea}
                multiline={true}
                value={remarks}
                onChangeText={(text) => setRemarks(text)}
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <SwipButton title="SAVE" onPress={saveLeaveHandler} />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default ReplaceVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
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
    width: Dimensions.get("window").width / 7,
  },
  // dropDownContent: {
  //   flexDirection: "row",
  //   alignItems: "center",
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
