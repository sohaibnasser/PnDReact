import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Switch,
  FlatList,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useState, useEffect, useContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import SwipButton from "../components/auth/SwipButton";
import axios from "axios";
import { LeaveApi, mobileApi } from "../config";
import { Ionicons } from "@expo/vector-icons";
import DatePickerTextInput from "../components/auth/DatePickerTextInput";
import Icon from "../components/Icon";
import TimePicker from "../components/auth/TimePicker";
import Activityindicator from "../components/Activityindicator";
import { useMemo } from "react";
// import CalendarInput from "../components/auth/CalenderInput";
// import * as Calendar from 'expo-calendar';

// const From = [
//   //   { label: "Select Gender", value: "" },
//   { label: "Karachi", value: "Karachi" },
//   { label: "islamabad", value: "islamabad" },
//   { label: "Peshawer", value: "Peshawer" },
//   { label: "Lahore", value: "Lahore" },
//   { label: "Mardan", value: "Mardan" },
// ];

const Days = [
  { dayid: 1, name: "MONDAY" },
  { dayid: 2, name: "TUESDAY" },
  { dayid: 3, name: "WEDNESDAY" },
  { dayid: 4, name: "THURSDAY" },
  { dayid: 5, name: "FRIDAY" },
  { dayid: 6, name: "SATURDAY" },
  { dayid: 7, name: "SUNDAY" },
];
const UpdateBid = ({ navigation, route }) => {
  const width = Dimensions.get("window").width;
  const {
    bidIdd,
    bidAmountt,
    dayss,
    bidDropTimee,
    bidPickupTimee,
    numPassengerr,
    fromcity,
    tocity,
    messagee,
    returntrip,
    dependentListt,
    spId,
    messagefrom,
    parentName,
    bidDropLatlng,
    bidPickupLocation,
    bidDropLocation,
    bidPickupLatlng,
    bidReturnDropTimee,
    bidReturnPickTimee,
    parentId,
    spName,
    status,
  } = route?.params || {};

  console.log("dysof ", days);
  console.log(
    "amount ",
    status,
    bidAmountt,
    bidIdd,
    bidAmountt,
    "days",
    dayss,
    "bidDropLocation",
    bidDropLocation,
    "bidDropTime",
    bidDropTimee,
    "pictime",
    bidPickupTimee,
    "passedno",
    numPassengerr,
    "fromcity",
    fromcity,
    "tocit",
    tocity,
    "message",
    messagee,
    "rtrip",
    returntrip,
    "droptimeee",
    bidDropTimee,
    "picktime",
    bidPickupTimee,
    "spId00000",
    spId,
    "msag from",
    messagefrom,
    "parentname",
    parentName,
    "lat",
    bidDropLatlng,
    "lng",
    bidPickupLocation,
    "1212",
    bidDropLocation,
    "piclocatio",
    bidPickupLatlng,
    "Dependent List",
    dependentListt,
    "SpNAme",
    spName
  );
  const formattedpickLocation = bidPickupLocation?.split(",");
  const formatteddropLocation = bidDropLocation?.split(",");
  console.log("formatedLocatio111", formatteddropLocation, bidDropLocation);

  const [isChecked, setChecked] = useState(false);
  const [days, setDays] = useState([]);

  console.log("123456", days);
  const incomingDays = dayss.split(", ");
  const [passengers, setPassengers] = useState([""]);
  // const [cityFrom, setCityFrom] = useState(fromcity);
  const [dropoffLatLng, setDropoffLatLng] = useState("");
  console.log("dropopopoooo", dropoffLatLng);
  const [pickUpLatLng, setPickUpLatLng] = useState("");
  // const [To, setCityTo] = useState(tocity);
  const [pickupCity, setPickupCity] = useState(fromcity);
  const [dropCity, setDropCity] = useState(tocity);
  console.log("asadkhan", "====>", pickupCity, tocity);
  const [amount, setAmount] = useState(bidAmountt);

  const [message, setMessage] = useState(messagee);
  const [yesChecked, setYesChecked] = useState(returntrip === "Yes");
  const [noChecked, setNoChecked] = useState(returntrip === "No");
  const [returnTrip, setReturnTrip] = useState(returntrip);
  const [arre, setArre] = useState([]);
  const [bidPickUpLocation, setBidPickUpLocation] = useState();
  const [bidDropOffLocation, setBidDropOffLocation] = useState();
  const [arr, setArr] = useState("");
  const [vehicles, setVehicales] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [sPid, setSPid] = useState();
  const [vehicleId, setVehicleId] = useState();
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
    if (!message || !amount) {
      // Display alert for empty fields
      Alert.alert("Error", "All fields are required.");
      return false;
    }
    if (!vehicleId) {
      Alert.alert("Error", "Empty vehicles");
      return false;
    }

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

    if (!amount) {
      newErrors.amount = true;
      isValid = false;
    }

    // Add more validations for other fields here...

    setInputErrors(newErrors);

    return isValid;
  };
  console.log("vehicleId", vehicleId);

  console.log(
    "checking",
    dropoffLatLng,
    "pickcity",
    pickupCity,
    "dropcity",
    dropCity,
    pickUpLatLng,
    bidPickUpLocation,
    bidDropOffLocation
  );
  // console.log("bidPickUp11123", bidDropOffLocation);
  // const time = new Date(bidPickupTimee);
  let picklocation = bidPickupLocation;
  if (!bidPickupLocation) {
    picklocation = bidPickUpLocation;
  }
  let droplocation = bidDropLocation;
  if (!bidDropLocation) {
    droplocation = bidDropOffLocation;
  }

  let picklatlng = bidPickupLatlng;
  if (!bidPickupLatlng) {
    picklatlng = pickUpLatLng;
  }

  let droplatlng = bidDropLatlng;
  if (!bidDropLatlng) {
    droplatlng = dropoffLatLng;
  }
  console.log(
    "locationnnnnnq",
    picklocation,
    droplocation,
    picklatlng,
    droplatlng
  );
  // console.log("poooo", bidPickupTimee);
  const pickTime = bidPickupTimee.slice(0, -2) + ":" + bidPickupTimee.slice(-2);

  const DropTime = bidDropTimee.slice(0, -2) + ":" + bidDropTimee.slice(-2);
  const ReturnpickTime =
    bidReturnPickTimee?.slice(0, -2) + ":" + bidReturnPickTimee?.slice(-2);
  const ReturnDropTime =
    bidReturnDropTimee?.slice(0, -2) + ":" + bidReturnDropTimee?.slice(-2);
  // console.log("qa", pickTime);
  const [selectedTime, setSelectedTime] = useState(new Date(pickTime));
  const [dropTime, setDropTime] = useState(new Date(DropTime));
  // console.log("driopopo", dropTime);
  const [returnPickTime, setReturnPickTime] = useState(
    new Date(ReturnpickTime)
  );
  const [returnDropTime, setReturnDropTime] = useState(
    new Date(ReturnDropTime)
  );
  const [returnpicktimeforupdate, setReturnpicktime] = useState(new Date());
  const [returndroptimeforupdate, setReturndroptime] = useState(new Date());
  let returnpickTime = returnPickTime;
  if (!returnPickTime) {
    returnpickTime = returnpicktimeforupdate;
  }
  let returndropTime = returnDropTime;
  if (!returnDropTime) {
    returnpickTime = returndroptimeforupdate;
  }

  console.log("returnPickTime", returnPickTime, returnDropTime);
  ////
  const isFocused = useIsFocused();
  const pickedLat = route.params?.pickedLat;
  const pickedLng = route.params?.pickedLng;
  const droplat = route.params?.dropLat;
  const dropLng = route.params?.droplng;

  const getAddressFromLatLng = React.useCallback(
    async (lat, lng, locationType) => {
      console.log("))))))))))", lat, lng, locationType);
      try {
        const response = await Location.reverseGeocodeAsync({
          latitude: lat,
          longitude: lng,
        });
        if (response.length > 0) {
          const { city, country, street, district, region, subregion } =
            response[0];
          const formattedAddress = `${street},${district},${city},${region}, ${country}, `;
          console.log("formatedass", formattedAddress);
          // const result = pickUpParts.join(", ").replace(/, ]$/, "]");
          const pickUpParts = formattedAddress?.split(",");
          const bidcity = pickUpParts[2];
          console.log("bidcityyyyyyyyyyyyyy", bidcity);
          if (locationType === "drop") {
            const formattedlatlng = `${lat}, ${lng}`;
            setDropoffLatLng(formattedlatlng);
            setBidDropOffLocation(formattedAddress);
            setDropCity(bidcity);
          } else if (locationType === "pickup") {
            const formattedlatlng = `${lat}, ${lng}`;
            setBidPickUpLocation(formattedAddress);
            setPickUpLatLng(formattedlatlng);
            setPickupCity(bidcity);
          }
        }
      } catch (error) {
        console.error("Error getting address:", error);
      }
    },
    []
  );
  // console.log("address", address);
  useEffect(() => {
    if (pickedLat && pickedLng) {
      getAddressFromLatLng(pickedLat, pickedLng, "pickup");
    }
  }, [pickedLat, pickedLng, getAddressFromLatLng]);

  useEffect(() => {
    if (dropLng && droplat) {
      getAddressFromLatLng(droplat, dropLng, "drop");
    }
  }, [dropLng, droplat, getAddressFromLatLng]);

  React.useEffect(() => {
    const idObjects = dependentListt.map((item) => ({
      dependentId: item.dependentId,
    }));
    setArre(idObjects);
  }, [isFocused]);
  console.log("dependentList000", arre);
  const ids = useMemo(
    () =>
      arre.map((item) => {
        return item.dependentId;
        // console.log(item.dependentId);
      }),
    [arre]
  );
  // pre filling the array of days
  useEffect(() => {
    setDays(incomingDays);
  }, []);

  useEffect(() => {
    setPassengers(ids);
  }, [ids]);
  const handleValueChange = (itemValue) => {
    setVehicleId(itemValue);
  };
  // console.log("passengers", passengers);
  let count = numPassengerr;
  count = passengers.length;

  const DAY = [...days].join(", ");
  console.log("passengers", DAY);
  //ALL DEPENDENT
  const getAllDependent = async () => {
    if (isFocused) {
      try {
        setIsLoading(true);
        const [response] = await Promise.all([
          fetch(`${mobileApi}/dependent/parent_dependents/${parentId}`),
          // fetch(`${mobileApi}/sp/getCityList`),
        ]);
        const responseData = await response.json();
        // const responseCountary = await response1.json();
        // const countryArray = responseCountary.result;
        // console.log("countaryyyy", countryArray);
        // setCityFrom(countryArray);
        // setCityTo(countryArray);
        // console.log(countryArray);
        const resData = responseData;
        // console.log("check id", resData.result[0].dependentDto.dependentId);
        const arrr = resData;
        setArr(arrr);

        // console.log("keyextractoe", keyExtractor);
        // console.log("arr", arrr.dependentDto);
        // setState(resData);
        // if (response.ok) {
        //   //   const responseData = await response.json();
        //   //   const data = responseData.result;
        // } else {
        // }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  React.useEffect(() => {
    getAllDependent();
  }, [isFocused]);
  React.useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setSPid(id.spId);
    };
    PressHandler();
  }, [setSPid]);

  const getAllVehicle = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/sp/vehicleListForSPMobile/${sPid}`
      );

      const responseData = await response.json();
      console.log("response of add get all vehicles", responseData);
      if (responseData.code === "200") {
        setVehicales(responseData);
      }
      if (responseData?.result?.length > 0) {
        setVehicleId(responseData?.result[0]?.vehicleId);
      }
    } catch (error) {
      console.log(error);
      return Alert.alert("Error", "Error while getting vehicles");
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    getAllVehicle();
  }, [isFocused && sPid]);

  const renderItem = ({ item }) => (
    <View style={styles.checkboxView}>
      <Text style={styles.text}>{item.dependentDto.dependentName}</Text>
      <Pressable
        style={styles.checkbox}
        // onPress={() => toggleOption(item.dependentDto.dependentId)}
      >
        {passengers.includes(item.dependentDto.dependentId) && (
          <View>
            <Ionicons name="checkmark" size={22} color="#3696f9" />
          </View>
        )}
      </Pressable>
    </View>
  );
  const renderDays = ({ item }) => (
    <View style={styles.checkboxView}>
      <Text style={styles.text}>{item?.name?.slice(0, 3)}</Text>
      <Pressable
        style={styles.checkbox}
        //  onPress={() => toggleO(item.name)}
      >
        {days.includes(item.name) && (
          <View>
            <Ionicons name="checkmark" size={22} color="#3696f9" />
          </View>
        )}
      </Pressable>
    </View>
  );
  console.log("ideees", sPid, parentId, vehicleId);
  //api call
  // console.log("spIdddd", spId);
  const AskForBidHandler = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await axios.post(`${mobileApi}/bid/updateBid`, {
          bidAmount: amount,
          bidDropLatlng: droplatlng,
          bidDropLocation: droplocation,
          bidDropTime: dropTime,
          bidPickupLatlng: picklatlng,
          bidPickupLocation: picklocation,
          bidPickupTime: selectedTime,
          bidReturnDropTime: returnDropTime,
          bidReturnPickTime: returnPickTime,
          days: DAY,
          dependentList: arre,
          dropTimeString: dropTime,
          fromCity: pickupCity,
          message: message,
          messageFrom: "SP",
          bidId: bidIdd,
          bidStatus: status,
          numPassenger: count,
          parentDto: {
            parentId: parentId,
            parentName: parentName,
          },
          vehicleDto: {
            vehicleId: vehicleId,
          },
          returnTrip: returnTrip,
          serviceProviderDto: {
            spId: sPid,
            spName: spName,
          },
          toCity: dropCity,
        });
        console.log("response of Update bid", response.data);
        if (response.data.code === "200") {
          navigation.navigate("Bids");
        }
      } catch (error) {
        console.log("Update bid error", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <KeyboardAvoidingView style={{ flex: 1 }}>
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
                    {parentName}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ color: "#b7b7b7" }}>Select Passenger(s)</Text>
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
                  keyExtractor={(item) => item.dayid.toString()}
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
                  <Text style={styles.ToLocation}>Pick Location</Text>
                  <TextInput
                    value={
                      formattedpickLocation[0] !== "null"
                        ? formattedpickLocation[0]
                        : formattedpickLocation[1] !== "null"
                        ? formattedpickLocation[1]
                        : formattedpickLocation[2] !== "null"
                        ? formattedpickLocation[2]
                        : formattedpickLocation[3] !== "null"
                        ? formattedpickLocation[3]
                        : formattedpickLocation[4] !== "null"
                        ? formattedpickLocation[4]
                        : ""
                    }
                    editable={false}
                  />
                  <Pressable
                    style={({ pressed }) => {
                      pressed && styles.pressed;
                    }}
                  >
                    <Icon name="map-marker-outline" size={25} color="#55cd85" />
                  </Pressable>
                </View>
                <TimePicker
                  title="From Time"
                  selectedTime={selectedTime}
                  falseValue={1}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.ToLocation}>Drop Location</Text>
                  <TextInput
                    value={
                      formatteddropLocation[0] !== "null"
                        ? formatteddropLocation[0]
                        : formatteddropLocation[1] !== "null"
                        ? formatteddropLocation[1]
                        : formatteddropLocation[2] !== "null"
                        ? formatteddropLocation[2]
                        : formatteddropLocation[3] !== "null"
                        ? formatteddropLocation[3]
                        : formatteddropLocation[4] !== "null"
                        ? formatteddropLocation[4]
                        : ""
                    }
                    editable={false}
                  />
                  <Pressable
                    style={({ pressed }) => {
                      pressed && styles.pressed;
                    }}
                  >
                    <Icon name="map-marker-outline" size={25} color="#55cd85" />
                  </Pressable>
                </View>
                <TimePicker
                  title="Drop Time"
                  falseValue={1}
                  selectedTime={dropTime}
                />
              </View>
            </View>

            <View style={styles.dropDown}>
              <Text style={styles.dropdownText}>Vehicle Name:</Text>
              {vehicles && (
                <Picker
                  style={{ width: width / 1.55 }}
                  selectedValue={vehicleId}
                  onValueChange={handleValueChange}
                >
                  {vehicles.result?.map((option) => (
                    <Picker.Item
                      key={option.vehicleId}
                      label={option.vehicleMake}
                      value={option.vehicleId}
                    />
                  ))}
                </Picker>
              )}
            </View>

            <View>
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
                    {/* <Text style={styles.FromLocation}>yes</Text> */}
                    <View style={{ flexDirection: "row" }}>
                      <Checkbox
                        value={yesChecked}
                        // onValueChange={handleYesCheckboxChange}
                        style={styles.checkboxForReturnTrip}
                        color={yesChecked ? "#3696f9" : undefined}
                      />
                      <Text style={{ marginLeft: 3 }}>Yes</Text>

                      <Checkbox
                        value={noChecked}
                        // onValueChange={handleNoCheckboxChange}
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
                  {returnTrip === "Yes" && (
                    <>
                      <TimePicker
                        falseValue={1}
                        title="Return PickUp Time"
                        // onTimeChange={handleTimeFromChange}
                        selectedTime={returnpickTime}
                        // timee={bidReturnPickTimee}
                      />
                      <TimePicker
                        falseValue={1}
                        title="Return Drop Off Time"
                        // onTimeChange={handleTimeToChange}
                        selectedTime={returndropTime}
                        // timee={bidReturnDropTimee}
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
              <TextInput
                onFocus={() => handleFieldFocus("amount")}
                style={[styles.amountBox]}
                placeholder="Amount"
                value={amount?.toString()}
                onChangeText={(text) => setAmount(text)}
                keyboardType="numeric"
              />
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
                  style={[styles.textArea]}
                  multiline={true}
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />
              </View>
            </View>
            <View>
              {status && status!=='Approved' && status !== 'Rejected' && <SwipButton title="ADD" onPress={AskForBidHandler} />}
            </View>
          </>
          {/* )} */}
        </KeyboardAvoidingView>
      )}
    </ScrollView>
  );
};

export default UpdateBid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingVertical: 5,
  },
  card: {
    maxWidth: "100%",
    maxHeight: "100%",
    height: 350,

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
    // fontWeight: "",
    color: "#3696f9",
  },
  ToLocation: {
    // marginBottom: 8,
    fontSize: 15,
    // fontWeight: "",
    color: "#55cd85",
  },
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
  // dropDownContent: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   maxWidth: "100%",
  //   // marginLeft: 10,
  // },
  dropdownText: {
    color: "#3696f9",
    fontSize: 15,
    marginLeft: 5,
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

  // //   marginVertical: 10,
  // // },

  passengerName: {
    fontWeight: "500",
    fontSize: 18,
    marginHorizontal: 10,
  },
  // dropDown: {
  //   borderWidth: 0.5,
  //   borderColor: "gray",
  //   backgroundColor: "#ffffff",
  //   borderRadius: 6,
  //   marginVertical: 8,
  // },
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
  amountBox: {
    elevation: 4,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    padding: 8,

    borderRadius: 4,
    // marginTop: 10,
    backgroundColor: "white",
  },

  pressed: {
    opacity: 0.7,
  },
});
