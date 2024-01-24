import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Switch,
  FlatList,
  Alert,
  Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import SwipButton from "../components/auth/SwipButton";
import axios from "axios";
import { LeaveApi, mobileApi } from "../config";
import { Ionicons } from "@expo/vector-icons";
import DatePickerTextInput from "../components/auth/DatePickerTextInput";
import TimePicker from "../components/auth/TimePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Activityindicator from "../components/Activityindicator";

const AddLeaves = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const [spId, setSpId] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [remarks, setRemarks] = useState("");
  const [arr, setArr] = useState("");
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [vehicleId, setVehicleId] = useState("");
  const [announced, setAnnounced] = useState("Unannounced");
  console.log("logs", dateFrom, dateTo, vehicleId, remarks, announced);
  React.useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setSpId(id.spId);
    };
    PressHandler();
  }, [setSpId]);

  const handleDateFrom = (time) => {
    setDateFrom(time);
  };
  const handleDateTo = (time) => {
    setDateTo(time);
  };

  const getAllVehicleForSP = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/sp/vehicleListForSPMobile/${spId}`
      );

      const responseData = await response.json();
      // console.log("response of add get all vehicles", responseData);

      setArr(responseData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    getAllVehicleForSP();
  }, [isFocused && spId]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setAnnounced((previousAnnounced) =>
      previousAnnounced === "Announced" ? "Unannounced" : "Announced"
    );
  };
  const fromYear = dateFrom.getFullYear();
  const fromMonth = dateFrom.getMonth() + 1;
  const fromDay = dateFrom.getDate();
  const toYear = dateTo.getFullYear();
  const toMonth = dateTo.getMonth() + 1;
  const toDay = dateTo.getDate();
  //api call
  const addLeaveHandler = async () => {
    if (!remarks || remarks?.trim().length < 5) {
      return Alert.alert(
        "Error",
        "Remarks is required and must be at least 5 characters"
      );
    }
    if (fromDay === toDay) {
      return Alert.alert("Same dates", "Dates must be different");
    }
    if (!vehicleId) {
      return Alert.alert("Vehicle missing", "No vehicle added for leave");
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${mobileApi}/sp/saveLeave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          announced: announced,
          dateFrom: dateFrom,
          dateTo: dateTo,
          leaveDetailList: [
            {
              vehicleDto: {
                vehicleId: vehicleId,
              },
            },
          ],
          remarks: remarks,
        }),
      });
      const responseData = await response.json();
      if (responseData.code === "200") {
        navigation.navigate("Leaves");
      }
      console.log("response of save leave", responseData);
    } catch (error) {
      console.log("save leave error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValueChange = (itemValue) => {
    setVehicleId(itemValue);
  };
  return (
    <>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <ScrollView style={styles.container}>
          <View>
            <View style={styles.dropDown}>
              <Text style={styles.text}>Vehicle Name:</Text>
              <View style={styles.dropDownContent}>
                {arr && (
                  <Picker
                    style={{
                      width: Dimensions.get("window").width / 1.5,
                    }}
                    selectedValue={vehicleId}
                    onValueChange={handleValueChange}
                  >
                    {arr.result?.map((option) => (
                      <Picker.Item
                        key={option.vehicleId}
                        label={option.vehicleMake}
                        value={option.vehicleId}
                      />
                    ))}
                  </Picker>
                )}
              </View>
            </View>
            <View style={styles.dropDown}>
              <DatePickerTextInput
                title="From"
                onDateChange={handleDateFrom}
                dateFrom={dateFrom}
                style={{ marginHorizontal: 5 }}
              />
            </View>
            {/* <CalendarInput /> */}
            <View style={styles.dropDown}>
              <DatePickerTextInput
                title="To"
                onDateChange={handleDateTo}
                dateFrom={dateTo}
                style={{ marginHorizontal: 5 }}
              />
            </View>
            <View style={styles.card}>
              <View style={styles.cardData}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.dayAndTime}>{announced}</Text>
                  <Switch
                    // trackColor={{ false: "#3696f9", true: "#55cd85" }}
                    thumbColor={isEnabled ? "#3696f9" : "#55cd85"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
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
          <View style={{ marginBottom: 10 }}>
            <SwipButton title="ADD" onPress={addLeaveHandler} />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default AddLeaves;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingVertical: 5,
  },
  card: {
    height: 80,

    backgroundColor: "#fff",
    // marginVertical: 10,
    marginTop: 20,
    elevation: 4,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
  },
  cardData: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },
  dayAndTime: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#3696f9",
  },
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 1,
    borderColor: "#3696f9",
    borderRadius: 12,
    marginHorizontal: 20,
  },
  checkboxCheck: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#3696f9",
  },

  checkboxView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    maxWidth: "100%",
    // width: 150,
    //
  },
  passengerName: {
    fontWeight: "500",
    fontSize: 18,
    marginHorizontal: 10,
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
  // dropDown: {
  //   borderWidth: 0.5,
  //   borderColor: "gray",
  //   backgroundColor: "#ffffff",
  //   borderRadius: 6,
  //   marginVertical: 8,
  //   paddingHorizontal: 8,
  // },
  // dropDownContent: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   maxWidth: "100%",
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
  text: {
    color: "#3696f9",
    fontSize: 15,
    marginLeft: 5,
  },
});
