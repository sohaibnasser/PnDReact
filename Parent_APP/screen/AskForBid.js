import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import * as Location from "expo-location";
import moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

import SwipButton from "../components/auth/SwipButton";
import axios from "axios";
import { mobileApi } from "../config";
import { Ionicons } from "@expo/vector-icons";

import Icon from "../components/Icon";
import TimePicker from "../components/auth/TimePicker";
import DatePickerTextInput from "../components/auth/DatePickerTextInput";
import Activityindicator from "../components/Activityindicator";
import DatePickerText from "../components/auth/DatePickerText";

const Days = [
  { dayid: 1, name: "MONDAY" },
  { dayid: 2, name: "TUESDAY" },
  { dayid: 3, name: "WEDENESDAY" },
  { dayid: 4, name: "THURSDAY" },
  { dayid: 5, name: "FRIDAY" },
  { dayid: 6, name: "SATURDAY" },
  { dayid: 7, name: "SUNDAY" },
];
const AskForBid = ({ navigation, route }) => {
  const [parentID, setParentID] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [pickUpLatLng, setPickUpLatLng] = useState("");
  const [DropLatLng, setDropUpLatLng] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [dropCity, setDropCity] = useState("");
  const [days, setDays] = useState("");
  const [cityFrom, setCityFrom] = useState("");
  const [cityTo, setCityTo] = useState("");

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [yesChecked, setYesChecked] = useState(true);
  const [noChecked, setNoChecked] = useState(false);
  const [returnTrip, setReturnTrip] = useState("No");
  const [arr, setArr] = useState("");
  const [passengers, setPassengers] = useState("");
  const pickupParts = pickupLocation.split(",");
  const dropParts = dropLocation.split(",");
  const [parentName, setParentName] = useState("");

  const [fromDate, setFromDate] = useState(new Date());

  const [toDate, setToDate] = useState(new Date());
  const takeDateFromfromDate = moment(fromDate).format("YYYY-MM-DD");
  const takeDateFromToDate = moment(toDate).format("YYYY-MM-DD");
  const { spId, parentId, dropLngg, droplatt, pickedLng, pickedLat, spName } =
    route?.params || {};
  const localTime = new Date();
  const [selectedTime, setSelectedTime] = useState(new Date());

  let PICKTIME = moment(selectedTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const [dropTime, setDropTime] = useState(new Date());
  let DROPTIME = moment(dropTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const [returnPickTime, setReturnPickTime] = useState(new Date());
  let fromReturnTime = returnPickTime;
  if (returnTrip === "Yes") {
    fromReturnTime = moment(returnPickTime).format(
      "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
    );
  }

  const [returnDropTime, setReturnDropTime] = useState(new Date());
  let toReturnTime = returnDropTime;
  if (returnTrip === "Yes") {
    toReturnTime = moment(returnDropTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    // toReturnTime = moment.utc(toReturn);
  }
  console.log("from and to return time", fromReturnTime, toReturnTime);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const getOnlyTimefromSelectedTime = moment.utc(PICKTIME).format("HH:mm:ss");
  const getOnlyTimefromDropTime = moment.utc(DROPTIME).format("HH:mm:ss");
  const fromDateAndTime = `${takeDateFromfromDate}${getOnlyTimefromSelectedTime}`;
  const toDateAndTime = `${takeDateFromToDate}${getOnlyTimefromDropTime}`;

  const parsedFromDate = moment(fromDateAndTime, "YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  // Format the date in the desired format
  const formattedFromDate = parsedFromDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const parsedToDate = moment(toDateAndTime, "YYYY-MM-DDHH:mm:ss");

  // Format the date in the desired format
  const formattedToDate = parsedToDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const [inputErrors, setInputErrors] = useState({
    message: false,
    amount: false,
  });
  const handleFieldFocus = (fieldName) => {
    // Remove the error highlight when the user starts editing the field
    setInputErrors({ ...inputErrors, [fieldName]: false });
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...inputErrors };

    // Validate each field and set error state
    if (!message) {
      newErrors.message = true;
      isValid = false;
    }
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(message)) {
      newErrors.message = true;
      isValid = false;
    }

    // Add more validations for other fields here...

    setInputErrors(newErrors);

    return isValid;
  };

  const handleDateFrom = (date) => {
    setFromDate(date);
    // setSelectedToTime(time);
  };
  const HandleDateTo = (date) => {
    setToDate(date);
    // setSelectedToTime(time);
  };

  const getAddressFromLatLng = React.useCallback(
    async (lat, lng, locationType) => {
      try {
        const response = await Location.reverseGeocodeAsync({
          latitude: lat,
          longitude: lng,
        });

        if (response.length > 0) {
          const { city, country, street, district, region, subregion } =
            response[0];
          const formattedAddress = `${street},${district},${city},${region}, ${country}, `;
          const pickUpParts = formattedAddress?.split(",");
          const bidcity = pickUpParts[2];

          if (locationType === "drop") {
            const formatedLatLng = `${lat}, ${lng}`;
            setDropUpLatLng(formatedLatLng);
            setDropLocation(formattedAddress);
            setDropCity(bidcity);
          } else if (locationType === "pickup") {
            const formatedLatLng = `${lat}, ${lng}`;
            setPickUpLatLng(formatedLatLng);
            setPickupLocation(formattedAddress);
            setPickupCity(bidcity);
          }
        }
      } catch (error) {
        console.error("Error getting address:", error);
      }
    },
    []
  );

  useEffect(() => {
    if (pickedLat && pickedLng) {
      getAddressFromLatLng(pickedLat, pickedLng, "pickup");
    }
  }, [pickedLat, pickedLng, getAddressFromLatLng]);

  useEffect(() => {
    if (dropLngg && droplatt) {
      getAddressFromLatLng(droplatt, dropLngg, "drop");
    }
  }, [dropLngg, droplatt, getAddressFromLatLng]);
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setParentID(id.parentId);
      setParentName(id.parentName);
    };
    PressHandler();
  }, [setParentID]);

  // COUNT THE NUMBER OF PASSENGERS
  const count = passengers.length;

  let dependentList = "";
  if (passengers.length !== 0) {
    dependentList = passengers.map((item) => {
      return {
        dependentId: item,
      };
    });
  }
  // CONVERTED DAYS
  const DAY = [...days].join(", ");
  // time picking
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
  const handleTimeToChange = (time) => {
    setReturnDropTime(time);
  };
  const handleDropTimeChange = (time) => {
    setDropTime(time);
  };
  const handleTimeFromChange = (time) => {
    setReturnPickTime(time);
  };

  //RETURN TRIP YES OR NO
  const handleYesCheckboxChange = () => {
    setYesChecked(!yesChecked);
    setNoChecked(false);
    setReturnTrip("Yes");
    setReturnDropTime(new Date());
    setReturnPickTime(new Date());
  };

  const handleNoCheckboxChange = () => {
    setNoChecked(!noChecked);
    setYesChecked(false);
    setReturnTrip("No");
    setReturnDropTime(null);
    setReturnPickTime(null);
  };

  //ALL DEPENDENT
  const getAllDependent = async () => {
    if (isFocused && parentID) {
      try {
        setIsLoading(true);
        const [response, response1] = await Promise.all([
          fetch(`${mobileApi}/dependent/parent_dependents/${parentID}`),
          fetch(`${mobileApi}/sp/getCityList`),
        ]);
        const responseData = await response.json();
        const responseCity = await response1.json();
        const CityArray = responseCity;

        setCityFrom(CityArray);
        setCityTo(CityArray);

        const resData = responseData;
        const arrr = resData;
        setArr(arrr);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  React.useEffect(() => {
    getAllDependent();
  }, [isFocused, parentID]);

  const toggleOption = (optionId) => {
    if (passengers.includes(optionId)) {
      setPassengers(passengers.filter((id) => id !== optionId));
    } else {
      setPassengers([...passengers, optionId]);
    }
  };
  const toggleO = (daysId) => {
    if (days.includes(daysId)) {
      setDays(days.filter((id) => id !== daysId));
    } else {
      setDays([...days, daysId]);
    }
  };

  const renderItem = ({ item }) => (
    <>
      <View style={styles.checkboxView}>
        <Text style={styles.text}>{item.dependentDto.dependentName}</Text>
        <Pressable
          style={styles.checkbox}
          onPress={() => toggleOption(item.dependentDto.dependentId)}
        >
          {passengers.includes(item.dependentDto.dependentId) && (
            <Ionicons name="checkmark" size={22} color="#3696f9" />
          )}
        </Pressable>
      </View>
    </>
  );
  const renderDays = ({ item }) => (
    <>
      <View style={styles.checkboxView}>
        <Text style={styles.text}>{item?.name?.slice(0, 3)}</Text>
        <Pressable style={styles.checkbox} onPress={() => toggleO(item.name)}>
          {days.includes(item.name) && (
            <View>
              <Ionicons name="checkmark" size={22} color="#3696f9" />
            </View>
          )}
        </Pressable>
      </View>
    </>
  );
  const fDate = fromDate.getDate();
  const fMonth = fromDate.getMonth() + 1;
  const tDate = toDate.getDate();
  const tMonth = toDate.getMonth() + 1;

  //api call
  const AskForBidHandler = async () => {
    if (
      !amount ||
      !message ||
      !pickupLocation ||
      !dropLocation ||
      !returnTrip
    ) {
      return Alert.alert("Error", "All fields are required");
    }
    if (dependentList?.length === 0) {
      return Alert.alert("Error", "No passengers selected for ask bid");
    }
    if (days?.length === 0) {
      return Alert.alert("Error", "Please select a number of days");
    }
    if (!pickupLocation || !dropLocation) {
      return Alert.alert("Error", "Please select pick and drop locations");
    }
    if (pickupLocation?.toString() === dropLocation?.toString()) {
      return Alert.alert("Error", "Please select different locations");
    }
    // if (fDate === tDate && fMonth === tMonth) {
    //   return Alert.alert("Error", "From and to dates must be different");
    // }
    if (fMonth === tMonth && fDate > tDate) {
      return Alert.alert(
        "Error",
        "From date should not be greater than To date"
      );
    }
    if (returnTrip === "Yes" && fromReturnTime === toReturnTime) {
      return Alert.alert("Same time", "Return time should be different");
    }
    if (selectedTime.toString() === dropTime.toString()) {
      return Alert.alert("Same time", "From and to time should be different");
    }

    if (spId == null) {
      if (validateForm()) {
        try {
          const response = await axios.post(`${mobileApi}/bid/askForBid`, {
            bidAmount: amount,
            bidDropLatlng: DropLatLng,
            bidDropLocation: dropLocation,
            bidDropTime: formattedToDate,
            bidPickupLatlng: pickUpLatLng,
            bidPickupLocation: pickupLocation,
            bidPickupTime: formattedFromDate,
            bidReturnDropTime: toReturnTime,
            bidReturnPickTime: fromReturnTime,
            days: DAY,
            dependentList: dependentList,
            dropTimeString: formattedToDate,
            fromCity: pickupCity,
            serviceProviderDto: null,
            message: message,
            bidStatus: "Pending",
            messageFrom: "Parent",
            numPassenger: count,
            parentDto: {
              parentId: parentId,
              parentName: parentName,
            },
            returnTrip: returnTrip,
            toCity: dropCity,
          });
          if (response.data?.status === "200") {
            navigation.navigate("Bids", { bidToAll: "bidToAll" });
          }
        } catch (error) {
          console.log("ask for bid error", error);
        }
      }
    } else if (spId) {
      if (validateForm()) {
        try {
          const response = await axios.post(`${mobileApi}/bid/askForBid`, {
            bidAmount: amount,
            bidDropLatlng: DropLatLng,
            bidDropLocation: dropLocation,
            bidDropTime: formattedToDate,
            bidPickupLatlng: pickUpLatLng,
            bidPickupLocation: pickupLocation,
            bidPickupTime: formattedFromDate,
            bidReturnDropTime: toReturnTime,
            bidReturnPickTime: fromReturnTime,
            days: DAY,
            dependentList: dependentList,
            dropTimeString: formattedToDate,
            fromCity: pickupCity,
            message: message,
            messageFrom: "Parent",
            bidStatus: "Pending",
            numPassenger: count,
            parentDto: {
              parentId: parentId,
              parentName: parentName,
            },
            returnTrip: returnTrip,
            serviceProviderDto: {
              spId: spId,
              spName: spName,
            },
            toCity: dropCity,
          });
          if (response.data?.status === "200") {
            navigation.navigate("Bids", { bidToAll: "bids" });
          }
        } catch (error) {
          console.log("ask for bid error", error);
        }
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView>
            <>
              <View style={styles.card}>
                <View style={styles.cardData}>
                  <View>
                    <Text
                      style={{
                        color: "#3696f9",
                        fontSize: 25,
                        paddingVertical: 5,
                        fontWeight: "600",
                      }}
                    >
                      {spName}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ color: "#b7b7b7" }}>
                      Select Passenger(s)
                    </Text>
                    {/* {arr.map((item) => (
              <Text>asad</Text>
            ))} */}
                    <Text style={{ color: "#b7b7b7" }}>
                      Selected Passenger(s)
                      <Text style={{ color: "#3696f9" }}>[{count}]</Text>
                    </Text>
                  </View>

                  <FlatList
                    data={arr.result}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.dependentDto.dependentId}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                  <FlatList
                    data={Days}
                    renderItem={renderDays}
                    keyExtractor={(item) => item.dayid}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Text style={styles.ToLocation}>Pick Up Location</Text>
                    <TextInput
                      value={
                        pickupParts[0] !== "null"
                          ? pickupParts[0]
                          : pickupParts[1] !== "null"
                          ? pickupParts[1]
                          : pickupParts[2] !== "null"
                          ? pickupParts[2]
                          : pickupParts[3] !== "null"
                          ? pickupParts[3]
                          : pickupParts[4] !== "null"
                          ? pickupParts[4]
                          : ""
                      }
                      editable={false}
                    />
                    <Pressable
                      onPress={() =>
                        navigation.navigate("Map", {
                          name: "Ask For Bid",
                          place: "pickup",
                          spName: spName,
                          spId: spId,
                          parentId: parentId,
                        })
                      }
                      style={({ pressed }) => {
                        pressed && styles.pressed;
                      }}
                    >
                      <Icon
                        name="map-marker-outline"
                        size={25}
                        color="#55cd85"
                      />
                    </Pressable>
                  </View>
                  <TimePicker
                    title="From Time"
                    onTimeChange={handleTimeChange}
                    selectedTime={selectedTime}
                  />
                  <DatePickerTextInput
                    title="From Date"
                    onDateChange={handleDateFrom}
                    dateFrom={fromDate}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                      alignItems: "center",
                      // alignContent: "center",
                    }}
                  >
                    <Text style={styles.ToLocation}>Drop Off Location</Text>
                    <TextInput
                      value={
                        dropParts[0] !== "null"
                          ? dropParts[0]
                          : dropParts[1] !== "null"
                          ? dropParts[1]
                          : dropParts[2] !== "null"
                          ? dropParts[2]
                          : dropParts[3] !== "null"
                          ? dropParts[3]
                          : dropParts[4] !== "null"
                          ? dropParts[4]
                          : ""
                      }
                      editable={false}
                    />
                    <Pressable
                      onPress={() =>
                        navigation.navigate("Map", {
                          name: "Ask For Bid",
                          place: "dropoff",
                          spId: spId,
                          parentId: parentId,
                          spName: spName,
                        })
                      }
                      style={({ pressed }) => {
                        pressed && styles.pressed;
                      }}
                    >
                      <Icon
                        name="map-marker-outline"
                        size={25}
                        color="#55cd85"
                      />
                    </Pressable>
                  </View>
                  <TimePicker
                    title="Drop Time"
                    onTimeChange={handleDropTimeChange}
                    selectedTime={dropTime}
                  />
                  <DatePickerText
                    title="Date To    "
                    onDateChange={HandleDateTo}
                    dateFrom={toDate}
                  />
                  {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text style={styles.dayAndTime}>Announced</Text>
            <Switch
              // trackColor={{ false: "#3696f9", true: "#55cd85" }}
              thumbColor={isEnabled ? "#3696f9" : "#55cd85"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View> */}

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
              {/* <View style={styles.dropDown}>
            <View style={styles.dropDownContent}>
              <Text style={styles.text}>From City:</Text>
              {cityFrom && (
                <Picker
                  style={{ maxWidth: "100%", width: 220 }}
                  selectedValue={From}
                  onValueChange={(itemValue) => setFrom(itemValue)}
                >
                  {cityFrom.result.map((option) => (
                    <Picker.Item
                      key={option.cityId}
                      label={option.cityName}
                      value={option.cityName}
                    />
                  ))}
                </Picker>
              )}
            </View>
          </View> */}

              {/* {cityTo && (
            <View style={styles.dropDown}>
              <View style={styles.dropDownContent}>
                <Text style={styles.text}>To City:</Text>
                <Picker
                  style={{ maxWidth: "100%", width: 220 }}
                  selectedValue={To}
                  onValueChange={(itemValue) => setTo(itemValue)}
                >
                  {cityTo.result.map((option) => (
                    <Picker.Item
                      key={option.cityId}
                      label={option.cityName}
                      value={option.cityName}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          )} */}
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.ToLocation}>Return Trip</Text>

                    <View style={{ flexDirection: "row" }}>
                      <Checkbox
                        value={yesChecked}
                        onValueChange={handleYesCheckboxChange}
                        style={styles.checkboxForReturnTrip}
                        color={yesChecked ? "#3696f9" : undefined}
                      />
                      <Text style={{ marginLeft: 3 }}>Yes</Text>

                      <Checkbox
                        value={noChecked}
                        onValueChange={handleNoCheckboxChange}
                        style={[
                          styles.checkboxForReturnTrip,
                          { marginStart: 10 },
                        ]}
                        color={noChecked ? "#3696f9" : undefined}
                      />
                      <Text style={{ marginLeft: 3 }}>No</Text>
                    </View>
                  </View>
                  {/* <View
              style={[
                styles.FromLocation,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  alignItems: "center",
                },
              ]}
            >
              <Text style={styles.ToLocation}>Return PickUp Time</Text>
              <Text style={styles.ToLocation}>7:40</Text>
            </View> */}
                  {yesChecked && (
                    <>
                      <TimePicker
                        title="Return PickUp Time"
                        onTimeChange={handleTimeFromChange}
                        selectedTime={returnPickTime}
                      />
                      <TimePicker
                        title="Return Drop Off Time"
                        onTimeChange={handleTimeToChange}
                        selectedTime={returnDropTime}
                      />
                    </>
                  )}
                  {/* <View
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                  alignItems: "center",
                },
              ]}
            >
              <Text style={styles.FromLocation}>Return DropOff Time</Text>
              <Text style={styles.FromLocation}>2:00</Text>
            </View> */}
                </View>
              </View>

              <View style={styles.amountBox}>
                <TextInput
                  placeholder="Amount"
                  value={amount}
                  onChangeText={(text) => {
                    if (parseFloat(text) !== 0 || text === "") {
                      setAmount(text);
                    }
                  }}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
              </View>
              {inputErrors.message && (
                <Text
                  style={{
                    marginLeft: 5,
                    paddingVertical: 5,
                    color: "red",
                  }}
                >
                  Invalid data
                </Text>
              )}
              <View style={styles.commentsBox}>
                <TextInput
                  onFocus={() => handleFieldFocus("message")}
                  placeholder="Message"
                  style={styles.textArea}
                  multiline={true}
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />
              </View>

              <SwipButton title="ADD" onPress={AskForBidHandler} />
            </>
            {/* )} */}
          </KeyboardAvoidingView>
        </ScrollView>
      )}
    </>
  );
};

export default AskForBid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingVertical: 5,
  },
  card: {
    maxWidth: "100%",
    maxHeight: "100%",
    // height: 150,
    // height: 350,

    backgroundColor: "#fff",
    // marginVertical: 10,
    marginTop: 10,
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
  FromLocation: {
    // marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#3696f9",
  },
  ToLocation: {
    // marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#55cd85",
  },

  checkboxCheck: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#3696f9",
  },
  checkboxForReturnTrip: {
    borderRadius: 10,
    // backgroundColor: "transparent",
  },
  // // checkboxs: {
  // //   width: 30,
  // //   height: 30,
  // //   backgroundColor: "gray",
  // //   borderRadius: 15,
  // //   alignItems: "center",
  // //   justifyContent: "center",

  //   marginVertical: 10,
  // // },
  checkboxView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    maxWidth: "100%",
    // width: 150,
    //
  },
  text: {
    color: "gray",
    fontSize: 16,
    width: 80,
    // marginRight: 5,
    maxWidth: "100%",
  },
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 1,
    borderColor: "#3696f9",
    borderRadius: 12,
    marginHorizontal: 20,
  },
  // passengerName: {
  //   fontWeight: "500",
  //   fontSize: 18,
  //   marginHorizontal: 10,
  // },
  dropDown: {
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 8,
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
  amountBox: {
    elevation: 4,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    padding: 8,
    // height: 120,
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: "white",
  },
  dropDownContent: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    marginLeft: 10,
  },

  pressed: {
    opacity: 0.7,
  },
});
