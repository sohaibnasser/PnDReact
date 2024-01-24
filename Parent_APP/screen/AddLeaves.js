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
// import CalendarInput from "../components/auth/CalenderInput";
// import * as Calendar from 'expo-calendar';

const OPTIONS = [
  { id: 1, name: "Kid 1" },
  { id: 2, name: "Kid 2" },
  { id: 3, name: "Kid 3" },
  { id: 4, name: "Kid 4" },
];
const AddLeaves = ({ route, navigation }) => {
  // const { ID } = route.params.ID;
  // console.log("ID at add leave", ID);
  const isFocused = useIsFocused();
  const [parentID, setParentID] = React.useState("");
  const [isChecked, setChecked] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [announced, setAnnounced] = useState("Unannounced");
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [arr, setArr] = useState("");
  const [passengers, setPassengers] = useState("");
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [dropTime, setDropTime] = useState(new Date());
  console.log("enabled", isEnabled);
  // console.log("selected time", selectedTime, "drop time", dropTime);
  // const [returnPickTime, setReturnPickTime] = useState(new Date());
  // const [returnDropTime, setReturnDropTime] = useState(new Date());

  React.useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setParentID(id.parentId);
    };
    PressHandler();
  }, [setParentID]);
  // console.log("parentI/D at  add leave", parentID);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    // setSelectedToTime(time);
  };
  const handleDropTimeChange = (time) => {
    setDropTime(time);
    // setSelectedToTime(time);
  };

  let dependentList = "";
  if (passengers.length !== 0) {
    dependentList = passengers.map((item) => ({
      dependentDto: {
        dependentId: item,
      },
    }));
  }
  console.log("dependet list", dependentList);

  const dateHandler = (time) => {
    setDateFrom(time);
  };
  const getAllDependent = async () => {
    // if (parentID) {
    try {
      const response = await fetch(
        `${mobileApi}/dependent/parent_dependents/${parentID}`
      );

      const responseData = await response.json();

      // setPassengers(responseData);

      const resData = responseData;
      const arrr = resData;
      setArr(arrr);

      // console.log("keyextractoe", keyExtractor);
      // console.log("arr", arrr.dependentDto);
      // setState(resData);
    } catch (error) {
      console.log(error);
    }
    // }
  };
  React.useEffect(() => {
    getAllDependent();
  }, [isFocused, parentID]);
  // console.log(selectedOptions);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setAnnounced((previousAnnounced) =>
      previousAnnounced === "Announced" ? "Unannounced" : "Announced"
    );
  };

  const toggleOption = (optionId) => {
    if (passengers.includes(optionId)) {
      setPassengers(passengers.filter((id) => id !== optionId));
    } else {
      setPassengers([...passengers, optionId]);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => toggleOption(item.dependentDto.dependentId)}>
      <View style={styles.checkboxView}>
        <Text style={styles.text}>{item.dependentDto.dependentName}</Text>
        <View style={styles.checkbox}>
          {passengers.includes(item.dependentDto.dependentId) && (
            <View>
              <Ionicons name="checkmark" size={22} color="#3696f9" />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );

  //api call
  const addLeaveHandler = async () => {
    if (!remarks && dependentList.length === 0) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    if (!remarks || remarks.trim().length < 5) {
      return Alert.alert(
        "Error",
        " Remarks is required and must be at least 5 characters long"
      );
    }
    if (dependentList.length === 0) {
      Alert.alert("Error", "Please select some passenger ");
      return;
    }
    if (selectedTime.getDate() >= dropTime.getDate()) {
      return Alert.alert(
        "Date Error",
        "From date should not equal or greater than To date."
      );
    }

    try {
      const response = await fetch(`${mobileApi}/leave/saveLeave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          announced: announced,
          dateFrom: selectedTime,
          dateTo: dropTime,
          leaveDetailList: dependentList,
          remarks: remarks,
        }),
      });
      const responseData = await response.json();
      console.log("response data", responseData);
      if (responseData.code === "200") {
        return Alert.alert("Success", "Data saved successfully", [
          { text: "Ok", onPress: () => navigation.navigate("Leaves") },
        ]);
      } else {
        return Alert.alert(responseData?.message, responseData.result);
      }
    } catch (error) {
      console.log("save leave error", error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardData}>
          <View>
            <Text style={{ color: "#b7b7b7" }}>Select Passenger(s)</Text>
          </View>
          {/* <View style={styles.checkboxContainer}>
            <View style={styles.checkboxs}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#3696f9" : undefined}
              />
             
            </View>
            <Text style={[styles.passengerName, { alignSelf: "center" }]}>
              Kid1
            </Text>
            <View style={styles.checkboxs}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#3696f9" : undefined}
              />
            </View>
            <Text style={[styles.passengerName, { alignSelf: "center" }]}>
              Kid1
            </Text>
            <View style={styles.checkboxs}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#3696f9" : undefined}
              />
            </View>
            <Text style={[styles.passengerName, { alignSelf: "center" }]}>
              Kid1
            </Text>
          </View> */}
          <FlatList
            data={arr.result}
            renderItem={renderItem}
            keyExtractor={(item) => item.dependentDto.dependentId}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
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
              thumbColor={isEnabled ? "#3696f9" : "#55cd85"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          {/* <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={styles.dayAndTime}>Monday</Text>
            <Text style={styles.dayAndTime}>Friday</Text>
          </Pressable>
          <Pressable
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.dayAndTime}>Remarks</Text>
            <Text style={styles.dayAndTime}>Announced</Text>
          </Pressable> */}
        </View>
      </View>
      <View>
        <View style={styles.dropDown}>
          {/* <View style={styles.dropDownContent}>
            <Text style={styles.text}>From:</Text>
            <Picker
              style={{ maxWidth: "100%", width: 220 }}
              selectedValue={dateFrom}
              onValueChange={(itemValue) => setDateFrom(itemValue)}
            >
              {From.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View> */}
          {/* <TimePicker
            title="From"
            onTimeChange={handleDropTimeChange}
            selectedTime={dropTime}
          /> */}
          <DatePickerTextInput
            title="From"
            onDateChange={handleTimeChange}
            dateFrom={selectedTime}
          />
        </View>
        {/* <CalendarInput /> */}
        <View style={styles.dropDown}>
          {/* <View style={styles.dropDownContent}>
            <Text style={styles.text}>To:</Text>
            <Picker
              style={{ maxWidth: "100%", width: 220 }}
              selectedValue={dateTo}
              onValueChange={(itemValue) => setDateTo(itemValue)}
            >
              {To.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View> */}
          {/* <TimePicker
            title="To"
            onTimeChange={handleTimeChange}
            selectedTime={selectedTime}
          /> */}
          <DatePickerTextInput
            title="To"
            onDateChange={handleDropTimeChange}
            dateFrom={dropTime}
          />
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
    maxWidth: "100%",
    maxHeight: "100%",
    height: 150,

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
  // // checkboxs: {
  // //   width: 30,
  // //   height: 30,
  // //   backgroundColor: "gray",
  // //   borderRadius: 15,
  // //   alignItems: "center",
  // //   justifyContent: "center",

  // //   marginVertical: 10,
  // // },
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
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 8,
    paddingHorizontal: 8,
    // justifyContent: "center",
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
  text: {
    color: "gray",
    fontSize: 15,
    width: 72,
    maxWidth: "50%",
  },
});
