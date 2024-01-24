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
  Alert,
} from "react-native";

import moment from "moment";
import * as Location from "expo-location";
import React, { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import SwipButton from "../components/auth/SwipButton";
import axios from "axios";
import { mobileApi } from "../config";
import { Ionicons } from "@expo/vector-icons";
import DatePickerTextInput from "../components/auth/DatePickerTextInput";
import Icon from "../components/Icon";
import TimePicker from "../components/auth/TimePicker";
import { useMemo } from "react";
import TimepickerForUpdateBid from "../components/auth/TimepickerForUpdateBid";
import DatePickerText from "../components/auth/DatePickerText";

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
  const {
    vehicleId,
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
    bidToAll,
    spName,
    bidStatus,
  } = route?.params || {};

  console.log("bidPickUpLocationnnnn", bidPickupLocation);
  console.log(
    spName,
    "bidToAll",
    bidToAll,
    "bidPickupLocation",
    bidPickupLocation,
    "bidDropLocation",
    bidDropLocation,
    "amount ",
    bidAmountt,
    bidIdd,
    "vehicleId12ee12",
    vehicleId,
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
    "spId",
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
    bidPickupLatlng
  );

  const pickTime = bidPickupTimee.slice(0, -2) + ":" + bidPickupTimee.slice(-2);
  // const pickTime = moment(bidPickupTimee).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  console.log("pick time 01 12", pickTime);
  console.log("chekdfdfkdfkf", moment(pickTime).format("YYYY-MM-DD HH:mm:ss"));

  const DropTime = bidDropTimee.slice(0, -2) + ":" + bidDropTimee.slice(-2);

  // console.log("formatedLocatio111", formatteddropLocation, bidDropLocation);

  const [isChecked, setChecked] = useState(false);
  const [days, setDays] = useState([]);

  console.log("12345612", days);
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
  const [bidPickUpLocation, setBidPickUpLocation] = useState(bidPickupLocation);
  console.log("bidPickUp11000", bidPickUpLocation);
  const [bidDropOffLocation, setBidDropOffLocation] = useState(bidDropLocation);
  const formattedpickLocation = bidPickUpLocation?.split(",");
  const formatteddropLocation = bidDropOffLocation?.split(",");
  const [fromDate, setFromDate] = useState(new Date(pickTime));

  const [toDate, setToDate] = useState(new Date(DropTime));
  console.log("DATAA", toDate, fromDate);
  const takeDateFromfromDate = moment(fromDate).format("YYYY-MM-DD");
  const takeDateFromToDate = moment(toDate).format("YYYY-MM-DD");
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

  const ReturnpickTime =
    bidReturnPickTimee?.slice(0, -2) + ":" + bidReturnPickTimee?.slice(-2);
  const ReturnDropTime =
    bidReturnDropTimee?.slice(0, -2) + ":" + bidReturnDropTimee?.slice(-2);

  const [selectedTime, setSelectedTime] = useState(new Date(pickTime));
  // const asad = moment.utc(selectedTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  // let PICKTIME = moment(selectedTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const [dropTime, setDropTime] = useState(new Date(DropTime));

  const [returnPickTime, setReturnPickTime] = useState(
    new Date(ReturnpickTime)
  );
  console.log("returnPickTime", returnPickTime);
  const [returnDropTime, setReturnDropTime] = useState(
    new Date(ReturnDropTime)
  );
  const [returnpicktimeforupdate, setReturnpicktime] = useState(new Date());
  const [returndroptimeforupdate, setReturndroptime] = useState(new Date());
  const getOnlyTimefromSelectedTime = moment
    .utc(selectedTime)
    .format("HH:mm:ss");
  const getOnlyTimefromDropTime = moment.utc(dropTime).format("HH:mm:ss");
  console.log("timesss", getOnlyTimefromSelectedTime, getOnlyTimefromDropTime);
  const fromDateAndTime = `${takeDateFromfromDate}${getOnlyTimefromSelectedTime}`;
  const toDateAndTime = `${takeDateFromToDate}${getOnlyTimefromDropTime}`;
  // console.log("toDateAndTime", toDateAndTime, returnDropTime);
  const parsedFromDate = moment(fromDateAndTime, "YYYY-MM-DDHH:mm:ss");

  // Format the date in the desired format
  const formattedFromDate = parsedFromDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const parsedToDate = moment(toDateAndTime, "YYYY-MM-DDHH:mm:ss");

  // Format the date in the desired format
  const formattedToDate = parsedToDate.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  console.log("formatted to date", formattedFromDate, formattedToDate);
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
  // console.log("khan", ids);
  // console.log("dependesnt========", arre);
  // pre filling the array of days
  useEffect(() => {
    setDays(incomingDays);
  }, []);

  useEffect(() => {
    setPassengers(ids);
  }, [ids]);

  const [arr, setArr] = useState("");

  // console.log("passengers", passengers);
  let count = numPassengerr;
  // console.log("passengrerqqqs", count);
  count = passengers.length;
  // console.log("passengrers aeewwsww", count, numPassengerr);

  // useEffect(() => {
  // const PressHandler = async () => {
  //   // setIsLoading(true);
  //   let data = await AsyncStorage.getItem("@auth");
  //   const id = JSON.parse(data);
  //   if (id !== null) {
  //     setParentID(id.parentId);
  //   }
  //   console.log("ParentId of Profile", data);
  //   setIsLoading(false);
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (isFocused) {
  //       PressHandler();
  //     }
  //   }, [isFocused])
  // );
  // }, []);
  // console.log("parentID at leave", parentID);
  // useEffect(() => {
  //   if (parentID) {
  //     const getAllLeaves = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${LeaveApi}/getLeaveAgainstParentId/${parentID}`
  //         );
  //         console.log("response of leave=>", response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     getAllLeaves();
  //   }
  // }, []);

  // console.log("sdfasdf", parentID);
  // CONVERTED DAYS
  const DAY = [...days].join(", ");
  // time picking
  const handlePickTimeChange = (time) => {
    // const Time = moment.utc(time);
    setSelectedTime(time);
    // setSelectedToTime(time);
  };

  const handleDropTimeChange = (time) => {
    // const Time = moment.utc(time);
    setDropTime(time);
    // setSelectedToTime(time);
  };
  const handleReturnTimeFromChange = (time) => {
    // const Time = moment.utc(time);
    setReturnPickTime(time);
    // setSelectedToTime(time);
  };
  const handleReturnTimeToChange = (time) => {
    // const Time = moment.utc(time);
    setReturnDropTime(time);
    // setSelectedToTime(time);
  };
  //DATES SET
  const handleDateFrom = (time) => {
    setFromDate(time);
    // setSelectedToTime(time);
  };
  const HandleDateTo = (time) => {
    setToDate(time);
    // setSelectedToTime(time);
  };
  // console.log("selected time of bid", selectedTime);
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
    if (isFocused) {
      try {
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
      }
    }
  };
  React.useEffect(() => {
    getAllDependent();
  }, [isFocused]);

  // console.log("selected options", arr.length);
  // console.log("array", arr[0].dependentDto);
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // console.log(dependentList);
  const toggleOption = (optionId) => {
    // console.log("optooind", optionId);
    if (passengers.includes(optionId)) {
      setPassengers(passengers.filter((id) => id !== optionId));
    } else {
      setPassengers([...passengers, optionId]);
    }
  };
  const toggleO = (daysName) => {
    // console.log("daysIdd", daysName);
    if (days.includes(daysName)) {
      setDays(days.filter((name) => name !== daysName));
    } else {
      setDays([...days, daysName]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.checkboxView}>
      <Text style={styles.text}>{item.dependentDto.dependentName}</Text>
      <Pressable
        style={styles.checkbox}
        onPress={() => toggleOption(item.dependentDto.dependentId)}
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
      <Pressable style={styles.checkbox} onPress={() => toggleO(item.name)}>
        {days.includes(item.name) && (
          <View>
            <Ionicons name="checkmark" size={22} color="#3696f9" />
          </View>
        )}
      </Pressable>
    </View>
  );
  const fDate = fromDate.getDate();
  const fMonth = fromDate.getMonth() + 1;
  const tDate = toDate.getDate();
  const tMonth = toDate.getMonth() + 1;
  //api call
  console.log("spIdddd", spId, bidIdd, parentId, vehicleId);
  const updateBidHandler = async () => {
    if (!amount || !message || !picklocation || !droplocation || !returnTrip) {
      return Alert.alert("Error", "All fields are required");
    }
    if (arre.length === 0) {
      return Alert.alert("Error", "No passengers selected for ask bid");
    }
    if (days.length === 0) {
      return Alert.alert("Error", "Please select a number of days");
    }
    if (!picklocation || !droplocation) {
      return Alert.alert("Error", "Please select pick and drop locations");
    }
    if (picklocation.toString() === droplocation.toString()) {
      return Alert.alert("Error", "Please select different locations");
    }
    if (fDate === tDate && fMonth === tMonth) {
      return Alert.alert("Error", "From and to dates must be different");
    }
    if (fMonth === tMonth && fDate > tDate) {
      return Alert.alert(
        "Error",
        "From data should not be greater than To date"
      );
    }
    if (
      returnTrip === "Yes" &&
      returnPickTime.toString() === returnDropTime.toString()
    ) {
      return Alert.alert("Same time", "Return time should be different");
    }
    if (selectedTime.toString() === dropTime.toString()) {
      return Alert.alert("Same time", "From and to time should be different");
    }
    if (validateForm()) {
      try {
        const response = await axios.post(`${mobileApi}/bid/updateBid`, {
          bidAmount: amount,
          bidDropLatlng: droplatlng,
          bidDropLocation: droplocation,
          bidDropTime: formattedToDate,
          bidPickupLatlng: picklatlng,
          bidPickupLocation: picklocation,
          bidPickupTime: formattedFromDate,
          bidReturnDropTime: returnDropTime,
          bidReturnPickTime: returnPickTime,
          days: DAY,
          dependentList: arre,
          dropTimeString: formattedToDate,
          fromCity: pickupCity,
          message: message,
          messageFrom: "Parent",
          bidId: bidIdd,
          bidStatus: bidStatus,
          numPassenger: count,
          parentDto: {
            parentId: parentId,
            parentName: parentName,
          },
          vehicleDto: { vehicleId: vehicleId },
          returnTrip: returnTrip,
          serviceProviderDto: {
            spId: spId,
            spName: spName,
          },
          toCity: dropCity,
        });
        console.log("response of Update bid to all", response.data);
        if (response.data.code === "200") {
          navigation.navigate("Bids", { bidToAll: "bidToAll" });
        }
      } catch (error) {
        console.log("Update bid error", error);
      }
    }
  };
  // console.log("days", arr);
  // const keyExtractor = (item) => {
  //   // Check if dependentDto is an array
  //   if (Array.isArray(item.dependentDto)) {
  //     // Extract the dependentIds from dependentDto objects
  //     const dependentIds = item.dependentDto.map((dependent) =>
  //       dependent.dependentId.toString()
  //     );
  //     // Combine and return the dependentIds as a string
  //     return dependentIds.join("_");
  //   } else {
  //     // Return a fallback value if dependentDto is not an array
  //     return "";
  //   }
  // };
  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        {/* {isLoading ? (
          <Activityindicator isLoading={isLoading} />
        ) : ( */}
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
                {/* {arr.map((item) => (
                <Text>asad</Text>
              ))} */}
                <Text style={{ color: "#b7b7b7" }}>
                  Selected Passenger(s)
                  <Text style={{ color: "#3696f9" }}>[{count}]</Text>
                </Text>
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
              <FlatList
                data={Days}
                renderItem={renderDays}
                keyExtractor={(item) => item.dayid.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
              {/* <View> */}
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
                  // value={
                  //   formattedpickLocation || bidPickUpLocation?.split(",")[1]
                  // }
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
                  // }

                  editable={false}
                />
                <Pressable
                  onPress={() =>
                    navigation.navigate("Map", {
                      place: "pickup",
                      name: "Update Bid",
                      vehicleId: vehicleId,
                      bidIdd: bidIdd,
                      parentId: parentId,
                      bidAmountt: bidAmountt,
                      dayss: dayss,
                      bidDropTimee: bidDropTimee,
                      bidPickupTimee: bidPickupTimee,
                      numPassengerr: numPassengerr,
                      fromcity: fromcity,
                      tocity: tocity,
                      messagee: message,
                      returntrip: returnTrip,
                      dependentListt: arre,
                      spId: spId,
                      messagefrom: messagefrom,
                      parentName: parentName,
                      bidDropLocation,
                      bidDropLatlng,
                      bidPickupLocation,
                      bidPickupLatlng,
                    })
                  }
                  style={({ pressed }) => {
                    pressed && styles.pressed;
                  }}
                >
                  <Icon name="map-marker-outline" size={25} color="#55cd85" />
                </Pressable>
              </View>
              <TimepickerForUpdateBid
                title="From Time"
                onTimeChange={handlePickTimeChange}
                selectedTime={selectedTime}
              />
              <DatePickerTextInput
                title="From Date"
                onDateChange={handleDateFrom}
                dateFrom={fromDate}
              />
              {/* </View> */}

              {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                alignItems: "center",
                // alignContent: "center",
              }}
            >
              <Text style={styles.FromLocation}>To</Text>
              <Icon name="map-marker-outline" size={25} color="#3696f9" />
            </View> */}

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
                  // value={

                  // }
                  value={
                    formatteddropLocation && formatteddropLocation[0] !== "null"
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
                  onPress={() =>
                    navigation.navigate("Map", {
                      place: "dropoff",
                      name: "Update Bid",
                      bidIdd: bidIdd,
                      vehicleId: vehicleId,
                      parentId: parentId,
                      bidAmountt: bidAmountt,
                      dayss: dayss,
                      bidDropTimee: bidDropTimee,
                      bidPickupTimee: bidPickupTimee,
                      numPassengerr: numPassengerr,
                      fromcity: fromcity,
                      tocity: tocity,
                      messagee: message,
                      returntrip: returnTrip,
                      dependentListt: arre,
                      spId: spId,
                      messagefrom: messagefrom,
                      parentName: parentName,
                    })
                  }
                  style={({ pressed }) => {
                    pressed && styles.pressed;
                  }}
                >
                  <Icon name="map-marker-outline" size={25} color="#55cd85" />
                </Pressable>
              </View>
              <TimepickerForUpdateBid
                title="Drop Off Time"
                onTimeChange={handleDropTimeChange}
                selectedTime={dropTime}
              />
              <DatePickerText
                title="Date  To"
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
          <View>
            {/* <View style={styles.dropDown}>
            <View style={styles.dropDownContent}>
              <Text style={styles.text}>From City:</Text>
              {cityFrom && (
                <Picker
                  style={{ maxWidth: "100%", width: 220 }}
                  selectedValue={From}
                  onValueChange={(itemValue) => setFrom(itemValue)}
                >
                  {
                    
                    cityFrom.map((option) => (
                      <Picker.Item
                        key={option.cityId}
                        label={option.cityName}
                        value={option.cityName}
                      />
                    ))
                  }
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
                  {cityTo.map((option) => (
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
                  {/* <Text style={styles.FromLocation}>yes</Text> */}
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
                {returnTrip === "Yes" && (
                  <>
                    <TimepickerForUpdateBid
                      title="Return PickUp Time"
                      onTimeChange={handleReturnTimeFromChange}
                      selectedTime={returnpickTime}
                      timee={bidReturnPickTimee}
                    />
                    <TimepickerForUpdateBid
                      title="Return Drop Off Time"
                      onTimeChange={handleReturnTimeToChange}
                      selectedTime={returndropTime}
                      timee={bidReturnDropTimee}
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
              style={styles.amountBox}
              placeholder="Amount"
              value={amount.toString()}
              onChangeText={(text) => setAmount(text)}
              // keyboardType="numeric"
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
                style={styles.textArea}
                multiline={true}
                value={message}
                onChangeText={(text) => setMessage(text)}
              />
            </View>
          </View>
          <View>
            <SwipButton title="ADD" onPress={updateBidHandler} />
          </View>
        </>
        {/* )} */}
      </KeyboardAvoidingView>
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
    fontWeight: "",
    color: "#3696f9",
  },
  ToLocation: {
    // marginBottom: 8,
    fontSize: 15,
    fontWeight: "",
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
  dropDown: {
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 8,
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
