import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
  Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

import { Tabbar } from "../../components/auth/Tabbar";
import Icon from "../../components/Icon";
import { useState } from "react";
import moment from "moment";

import { RidesApi, mobileApi } from "../../config";
import axios from "axios";
import Activityindicator from "../../components/Activityindicator";
import { formatTimeWithAMPM } from "../../Util/date";
import { MaterialIcons } from "@expo/vector-icons";
import AttendenceModal from "../../components/AttendenceModal";
import { getDayFromDateString, getDayName } from "../../Util/getday";
import { memo } from "react";
import Nodata from "../../components/Nodata";
import { current } from "@reduxjs/toolkit";

export const Rides = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [spId, setSpId] = useState("");
  const [vehicleArray, setVehicleArray] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  console.log("vehicle iddd", vehicleId);
  // Modal
  const [starRating, setStarRating] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState("");
  const [rideDetails, setRideDetails] = useState("");
  const [selectedItem, setSelectedItem] = useState();
  const [isAttendenceModalVisible, setIsAttendenceModalVisible] =
    useState(false);
  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(false);
  const [vehicale, setVehicale] = useState("");
  const [attendenceComment, setAttendenceComment] = useState();
  const [driver, setDriver] = useState("");
  const [foundRideofToday, setFoundRideofToday] = useState(false);
  const [foundRideofPreviousDay, setFoundRideofPreviousDay] = useState(false);
  const [foundRideofFuture, setFoundRideofFuture] = useState(false);

  React.useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setSpId(id.spId);
    };
    PressHandler();
  }, [setSpId]);

  const getAllVehicles = async () => {
    try {
      const response = await fetch(
        `${mobileApi}/sp/vehicleListForSPMobile/${spId}`
      );

      const responseData = await response.json();
      console.log("response of add get all vehicles", responseData);

      setVehicleArray(responseData);
      if (responseData?.result?.length > 0) {
        setVehicleId(responseData?.result[0]?.vehicleId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    if (spId) {
      getAllVehicles();
    }
  }, [isFocused && spId]);

  const today = new Date();

  const currentY = today.getFullYear();
  const currentM = today.getMonth() + 1;
  const currentD = today.getDate();

  const getAllRides = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${mobileApi}/sp/getRidesBySpId/${spId}`);
      const resData = await response.json();
      console.log("response of get all ride=>", resData);
      if (resData.code === "200") {
        setResponse(resData);
      } else {
        return Alert.alert("Error", "Error in getting all rides");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (isFocused && spId) {
      getAllRides();
    }
  }, [isFocused, spId]);

  const [activeTab, setActiveTab] = React.useState("tab1");
  const tab1Styles =
    activeTab === "tab1" ? styles.activeTab : styles.inactiveTab;
  const tab2Styles =
    activeTab === "tab2" ? styles.activeTab : styles.inactiveTab;
  const tab3Styles =
    activeTab === "tab3" ? styles.activeTab : styles.inactiveTab;

  const RenderItem = memo(({ item }) => {
    const vehicleIdofGetRides =
      item.dependentVehicleMapDto?.vehicleDto?.vehicleId;

    const dateString = item?.pickupTime;
    const year = parseInt(dateString?.slice(0, 4));
    const month = parseInt(dateString?.slice(5, 7)) - 1;
    const day = parseInt(dateString?.slice(8, 10));
    const hour = parseInt(dateString?.slice(11, 13));
    const minute = parseInt(dateString?.slice(14, 16));
    const second = parseInt(dateString?.slice(17, 19));
    const milliseconds = parseInt(dateString?.slice(20, 23));

    const dateObject = new Date(
      year,
      month,
      day,
      hour,
      minute,
      second,
      milliseconds
    );

    const datee = dateObject.getDate();
    const yearr = dateObject.getFullYear();
    const monthh = dateObject.getMonth() + 1;
    const isToday =
      yearr === currentY && monthh === currentM && datee === currentD;
    const isPreviousDay =
      currentY === yearr && currentM === monthh && currentD > datee;

    const isFutureDay =
      currentY === yearr && currentM === monthh && currentD < datee;
    // console.log("istoday", isToday);
    // const isPreviousDay = !date < currentD;
    // const isFutureDay = !date > currentD;
    // console.log("ist", isPreviousDay, "aaa", isFutureDay);

    if (
      (isToday || isPreviousDay || isFutureDay) &&
      vehicleId === vehicleIdofGetRides
    ) {
      // setFoundRideofToday(true);
      return (
        <>
          <View
            style={[
              styles.card,
              isPreviousDay
                ? { backgroundColor: "rgba(54, 150, 249,0.8)" }
                : isFutureDay
                ? { backgroundColor: "rgba(85, 205, 133,0.8)" }
                : { elevation: 4 },
            ]}
          >
            <View style={styles.cardData}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text
                  style={[
                    styles.dayAndTime,
                    isPreviousDay && { color: "#000000" },
                    isFutureDay && { color: "#000000" },
                  ]}
                >
                  Day
                </Text>
                <Text
                  style={[
                    styles.dayAndTime,
                    isPreviousDay && { color: "#000000" },
                    isFutureDay && { color: "#000000" },
                  ]}
                >
                  {getDayFromDateString(item?.pickupTime)}
                </Text>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="circle-outline" color="#49bece" size={15} />
                  <Text
                    style={[
                      styles.fromAndtoTxt,
                      isPreviousDay && { color: "#000000" },
                      isFutureDay && { color: "#000000" },
                    ]}
                  >
                    Pick Status
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 0.4,
                    borderBottomColor: "gray",
                    paddingVertical: 8,
                  }}
                >
                  <Text
                    style={[
                      styles.FromAndToPlace,
                      isPreviousDay && { color: "#000000" },
                      isFutureDay && { color: "#000000" },
                    ]}
                  >
                    {item?.pickStatus}
                  </Text>
                  <Text
                    style={[
                      styles.dayAndTime,
                      isPreviousDay && { color: "#000000" },
                      isFutureDay && { color: "#000000" },
                    ]}
                  >
                    {formatTimeWithAMPM(item.pickupTime)}
                  </Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <Icon name="circle-outline" color="green" size={15} />
                  <Text
                    style={[
                      styles.fromAndtoTxt,
                      isPreviousDay && { color: "#000000" },
                      isFutureDay && { color: "#000000" },
                    ]}
                  >
                    Drop Status
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomColor: "gray",
                    paddingVertical: 8,
                  }}
                >
                  <Text
                    style={[
                      styles.FromAndToPlace,
                      isPreviousDay && { color: "#000000" },
                      isFutureDay && { color: "#000000" },
                    ]}
                  >
                    {item?.dropStatus}
                  </Text>
                  <Text
                    style={[
                      styles.dayAndTime,
                      isPreviousDay && { color: "#000000" },
                      isFutureDay && { color: "#000000" },
                    ]}
                  >
                    {formatTimeWithAMPM(item.dropTime)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      );
    }
  });
  const RenderItemOfPrevious = memo(({ item }) => {
    const vehicleIdofGetRides =
      item?.dependentVehicleMapDto?.vehicleDto?.vehicleId;

    const dateString = item?.pickupTime;

    const year = parseInt(dateString?.slice(0, 4));
    const month = parseInt(dateString?.slice(5, 7)) - 1;
    const day = parseInt(dateString?.slice(8, 10));
    const hour = parseInt(dateString?.slice(11, 13));
    const minute = parseInt(dateString?.slice(14, 16));
    const second = parseInt(dateString?.slice(17, 19));
    const milliseconds = parseInt(dateString?.slice(20, 23));

    const dateObject = new Date(
      year,
      month,
      day,
      hour,
      minute,
      second,
      milliseconds
    );

    const datee = dateObject.getDate();
    const yearr = dateObject.getFullYear();
    const monthh = dateObject.getMonth() + 1;

    const isPreviousDay = currentD > datee;

    if (isPreviousDay && vehicleId === vehicleIdofGetRides) {
      // setFoundRideofPreviousDay(true);
      return (
        <View
          style={[styles.card, { backgroundColor: "rgba(54, 150, 249,0.8)" }]}
        >
          <View style={styles.cardData}>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                padding: 10,
              }}
            >
              <Text style={styles.dayAndTimePrevious}>
                {getDayFromDateString(item?.pickupTime)}
              </Text>
              <Text style={styles.dayAndTimePrevious}>{item.rideStatus}</Text>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Icon name="circle-outline" color="#0cf268" size={15} />
                <Text style={styles.fromAndtoTxtPrevious}>Pick Status</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomWidth: 0.4,
                  borderBottomColor: "gray",
                  paddingVertical: 8,
                }}
              >
                <Text style={styles.FromAndToPlace}>{item?.pickStatus}</Text>
                <Text style={styles.dayAndTimePrevious}>
                  {formatTimeWithAMPM(item?.pickupTime)}
                </Text>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", paddingTop: 10 }}>
                <Icon name="circle-outline" color="#0cf268" size={15} />
                <Text style={styles.fromAndtoTxtPrevious}>Drop Status</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomColor: "gray",
                  paddingVertical: 8,
                }}
              >
                <Text style={styles.FromAndToPlace}>{item?.dropStatus}</Text>
                <Text style={styles.dayAndTimePrevious}>
                  {formatTimeWithAMPM(item?.dropTime)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  });
  const RenderItemOfFuture = memo(({ item }) => {
    const vehicleIdofGetRides =
      item.dependentVehicleMapDto?.vehicleDto?.vehicleId;

    const dateString = item.pickupTime;
    const year = parseInt(dateString?.slice(0, 4));
    const month = parseInt(dateString?.slice(5, 7)) - 1;
    const day = parseInt(dateString?.slice(8, 10));
    const hour = parseInt(dateString?.slice(11, 13));
    const minute = parseInt(dateString?.slice(14, 16));
    const second = parseInt(dateString?.slice(17, 19));
    const milliseconds = parseInt(dateString?.slice(20, 23));

    const dateObject = new Date(
      year,
      month,
      day,
      hour,
      minute,
      second,
      milliseconds
    );

    const datee = dateObject.getDate();
    const yearr = dateObject.getFullYear();
    const monthh = dateObject.getMonth() + 1;

    const isFutureDay = currentD < datee;
    if (isFutureDay && vehicleId === vehicleIdofGetRides) {
      return (
        <>
          <View
            style={[styles.card, { backgroundColor: "rgba(85, 205, 133,0.8)" }]}
          >
            <View style={styles.cardData}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  padding: 10,
                }}
              >
                <Text style={styles.dayAndTimeFuture}>
                  {getDayFromDateString(item?.pickupTime)}
                </Text>
                <Text style={styles.dayAndTimeFuture}>{item.rideStatus}</Text>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="circle-outline" color="#0d6edd" size={15} />
                  <Text style={styles.fromAndtoTxtfuture}>Pick Status</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 0.4,
                    borderBottomColor: "gray",
                    paddingVertical: 8,
                  }}
                >
                  <Text style={styles.FromAndToPlace}>{item?.pickStatus}</Text>
                  <Text style={styles.dayAndTimeFuture}>
                    {formatTimeWithAMPM(item.pickupTime)}
                  </Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <Icon name="circle-outline" color="#0d6edd" size={15} />
                  <Text style={styles.fromAndtoTxtfuture}>Drop Status</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomColor: "gray",
                    paddingVertical: 8,
                  }}
                >
                  <Text style={styles.FromAndToPlace}>{item?.dropStatus}</Text>
                  <Text style={styles.dayAndTimeFuture}>
                    {formatTimeWithAMPM(item.dropTime)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      );
    }
  });
  // function Today() {
  //   return (
  //     <>
  //       {isLoading ? (
  //         <Activityindicator isLoading={isLoading} />
  //       ) : (
  //         <View>
  //           {response?.result?.length > 0 ? (
  //             <FlatList
  //               data={response?.result}
  //               keyExtractor={(item) => item.rideId}
  //               renderItem={({ item }) => <RenderItemOfToday item={item} />}
  //               showsVerticalScrollIndicator={false}
  //               ListFooterComponent={<View style={{ height: 200 }} />}
  //             />
  //           ) : (
  //             <Nodata />
  //           )}
  //         </View>
  //       )}
  //     </>
  //   );
  // }
  // function Previous() {
  //   return (
  //     <>
  //       {isLoading ? (
  //         <Activityindicator isLoading={isLoading} />
  //       ) : (
  //         <View>
  //           {response?.result?.length > 0 ? (
  //             <FlatList
  //               data={response?.result}
  //               keyExtractor={(item) => item.rideId}
  //               renderItem={({ item }) => <RenderItemOfPrevious item={item} />}
  //               showsVerticalScrollIndicator={false}
  //               ListFooterComponent={<View style={{ height: 200 }} />}
  //             />
  //           ) : (
  //             <Nodata />
  //           )}
  //         </View>
  //       )}
  //     </>
  //   );
  // }
  // function Future() {
  //   return (
  //     <>
  //       {isLoading ? (
  //         <Activityindicator isLoading={isLoading} />
  //       ) : (
  //         <View>
  //           {response?.result?.length > 0 ? (
  //             <FlatList
  //               data={response?.result}
  //               keyExtractor={(item) => item.rideId}
  //               renderItem={({ item }) => <RenderItemOfFuture item={item} />}
  //               showsVerticalScrollIndicator={false}
  //               ListFooterComponent={<View style={{ height: 200 }} />}
  //             />
  //           ) : (
  //             <Nodata />
  //           )}
  //         </View>
  //       )}
  //     </>
  //   );
  // }
  const handleValueChange = (itemValue) => {
    setVehicleId(itemValue);
  };
  // function Rides() {
  // ... (previous code)
  const currentDate = moment();
  const todayData = response?.result?.filter((item) => {
    const dateString = item?.pickupTime;
    const year = parseInt(dateString?.slice(0, 4));
    const month = parseInt(dateString?.slice(5, 7)) - 1;
    const day = parseInt(dateString?.slice(8, 10));
    const isToday = currentDate.isSame(dateString, "day");
    return (
      isToday &&
      vehicleId === item?.dependentVehicleMapDto?.vehicleDto?.vehicleId
    );
  });
  // const currentDate = moment();
  const previousData = response?.result?.filter((item) => {
    const dateString = item?.pickupTime;
    const dateObject = moment(dateString);
    const day = dateObject.date();
    const month = dateObject.month() - 1;
    const year = dateObject.year();
    const isPreviousDay = currentDate.isAfter(dateObject);
    return (
      isPreviousDay &&
      vehicleId === item?.dependentVehicleMapDto?.vehicleDto?.vehicleId
    );
  });

  const futureData = response?.result?.filter((item) => {
    const dateString = item?.pickupTime;
    const year = parseInt(dateString?.slice(0, 4));
    const month = parseInt(dateString?.slice(5, 7)) - 1;
    const day = parseInt(dateString?.slice(8, 10));
    const isFutureDay = currentDate.isBefore(dateString, "day");
    return (
      isFutureDay &&
      vehicleId === item?.dependentVehicleMapDto?.vehicleDto?.vehicleId
    );
  });
  console.log("today daata", todayData);
  return (
    <>
      {isLoading ? (
        <Activityindicator
          isLoading={isLoading}
          onRequestClose={() => {
            setIsLoading(false), navigation.navigate("Dashboard");
          }}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.dropDown}>
            <View style={styles.dropDownContent}>
              <Text style={styles.text}>Vehicle Name</Text>
              {vehicleArray && (
                <Picker
                  // style={{ maxWidth: "100%", width: 200 }}
                  style={{
                    width: Dimensions.get("window").width / 1.5,
                  }}
                  selectedValue={vehicleId}
                  onValueChange={handleValueChange}
                >
                  {vehicleArray?.result?.map((option) => (
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
          <View style={styles.tabbar}>
            <View>
              <Tabbar
                title="Today Ride"
                handlePress={() => setActiveTab("tab1")}
                color={tab1Styles}
              />
            </View>
            <View>
              <Tabbar
                title="Previous Ride"
                handlePress={() => setActiveTab("tab2")}
                color={tab2Styles}
              />
            </View>
            <View>
              <Tabbar
                title="Future Ride"
                handlePress={() => setActiveTab("tab3")}
                color={tab3Styles}
              />
            </View>
          </View>
          {todayData?.length > 0 ||
          previousData?.length > 0 ||
          futureData?.length > 0 ? (
            <FlatList
              data={
                activeTab === "tab1"
                  ? todayData
                  : activeTab === "tab2"
                  ? previousData
                  : futureData
              }
              keyExtractor={(item) => item.rideId}
              renderItem={({ item }) => <RenderItem item={item} />}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={{ height: 200 }} />}
            />
          ) : (
            <Nodata />
          )}
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // marginBottom: 10,
    paddingVertical: 8,
  },
  card: {
    flex: 1,
    width: "100%",
    height: "auto",
    backgroundColor: "#fff",
    // marginVertical: 10,
    marginTop: 20,
    // elevation: 5,
    borderRadius: 4,
    justifyContent: "space-around",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
  },
  cardData: {
    paddingHorizontal: 10,
    justifyContent: "center",
    // alignItems: "center",
  },
  tabbar: {
    // padding: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#3696f9",
    height: 45,
    borderRadius: 4,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  tabContainer: {
    maxWidth: "100%",
    width: 100,

    height: 28,
    justifyContent: "center",

    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "white",
    borderRadius: 4,
    color: "#000",
  },
  inactiveTab: {
    backgroundColor: "#3696f9",
    borderRadius: 4,
    color: "#fff",
  },
  dayAndTime: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#3696f9",
  },
  dayAndTimePrevious: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
  FromAndToPlace: {
    marginLeft: 20,
    fontWeight: "500",
    fontSize: 18,
  },
  fromAndtoTxt: {
    marginLeft: 5,
    color: "#0d6edd",
    fontSize: 14,
  },
  fromAndtoTxtfuture: {
    marginLeft: 5,
    color: "#fff",
    fontSize: 14,
  },
  fromAndtoTxtPrevious: {
    marginLeft: 5,
    color: "#fff",
    fontSize: 14,
  },
  dayAndTimeFuture: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },

  listItemButton: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#3696f9",
    borderRadius: 5,
    padding: 10,
  },

  serviceProviderText: {
    color: "#3696f9",
    fontSize: 16,
    fontWeight: "500",
  },

  checkboxs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  checkboxstyle: {
    borderRadius: 10,
    // backgroundColor: "transparent",
  },
  CheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginRight: 5,
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "500",
    color: "#3696f9",
  },
  dropDown: {
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  dropDownContent: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    // marginLeft: 10,
  },
  text: {
    color: "#3696f9",
    fontSize: 15,
    fontWeight: "500",
  },
});
