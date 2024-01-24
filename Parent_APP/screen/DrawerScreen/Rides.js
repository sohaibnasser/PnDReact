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
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { memo } from "react";

import { Tabbar } from "../../components/auth/Tabbar";
import Icon from "../../components/Icon";
import moment from "moment";
import { useState, useEffect } from "react";

import { mobileApi } from "../../config";
import Activityindicator from "../../components/Activityindicator";
import { formatTimeWithAMPM } from "../../Util/date";
import { MaterialIcons } from "@expo/vector-icons";
import AttendenceModal from "../../components/AttendenceModal";
import { getDayFromDateString } from "../../Util/getDay";
import Nodata from "../../components/Nodata";

export const Rides = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [parentID, setParentID] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  const [dependents, setDependents] = useState([]);
  const handleAttendence = (item) => {
    setSelectedItem(item);
    setIsAttendenceModalVisible(true);
  };
  const handleAttendenceModalClose = async () => {
    if (!attendenceComment) {
      return Alert.alert(
        "Comment is required",
        "Attendence comment is not available!",
        [{ text: "Ok", onPress: () => setIsAttendenceModalVisible(false) }]
      );
    }
    const rideId = selectedItem?.rideId;
    try {
      const response = await fetch(`${mobileApi}/ride/markAttendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attendanceComments: attendenceComment,
          driverAttendance: driver,
          rideId: rideId,
          vehicleAttendance: vehicale,
        }),
      });
      const resData = await response.json();
    } catch (error) {}

    setIsAttendenceModalVisible(false);
    setYesChecked(false);
    setNoChecked(false);
    setAttendenceComment("");
  };

  const handleYesCheckboxChange = () => {
    if (!yesChecked) {
      setDriver("present");
    } else if (yesChecked) {
      setDriver("absent");
    }

    setYesChecked(!yesChecked);
  };

  const handleNoCheckboxChange = () => {
    if (!noChecked) {
      setVehicale("present");
    } else if (noChecked) {
      setVehicale("absent");
    }

    setNoChecked(!noChecked);
  };

  const handleModalClose = async () => {
    setModalVisible(false);
    const response = await fetch(`${mobileApi}/ride/ride_feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedback: comments,
        rating: starRating,
        rideId: rideDetails,
      }),
    });
    const responseData = await response.json();
  };

  useEffect(() => {
    const GetParentID = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setParentID(id.parentId);
    };
    GetParentID();
  }, [setParentID]);

  const getAllRides = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/ride/ride_history/${parentID}`
      );

      const resData = await response.json();
      if (resData?.code === "200") {
        setResponse(resData);
      }
    } catch (error) {
      return Alert.alert("Error", "Error while getting rides");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isFocused && parentID) {
      getAllRides();
    }
  }, [isFocused, parentID, activeTab]);

  const getAllDependent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/dependent/parent_dependents/${parentID}`
      );

      const resData = await response.json();
      if (resData?.code === "200") {
        setDependents(resData);
      }
    } catch (error) {
      return Alert.alert("Error", "Error while getting rides");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isFocused && parentID) {
      getAllDependent();
    }
  }, [isFocused, parentID]);

  const [activeTab, setActiveTab] = React.useState("tab1");
  const tab1Styles =
    activeTab === "tab1" ? styles.activeTab : styles.inactiveTab;
  const tab2Styles =
    activeTab === "tab2" ? styles.activeTab : styles.inactiveTab;
  const tab3Styles =
    activeTab === "tab3" ? styles.activeTab : styles.inactiveTab;
  const today = new Date();

  const currentY = today.getFullYear();
  const currentM = today.getMonth() + 1;
  const currentD = today.getDate();

  const RenderItemOfToday = memo(({ item }) => {
    const picklocations = item?.pickupLocation.split(",");
    const Droplocations = item?.dropLocation.split(",");

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
    if (isToday || isPreviousDay || isFutureDay) {
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
                  {getDayFromDateString(item.pickupTime)}
                </Text>
                <Text
                  style={[
                    styles.dayAndTime,
                    isPreviousDay && { color: "#000000" },
                    isFutureDay && { color: "#000000" },
                  ]}
                >
                  {item?.rideStatus}
                </Text>
              </View>

              <Text
                style={{
                  paddingRight: 40,
                  paddingLeft: 10,
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                {item?.dependentName}
              </Text>
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
                    Pick Up
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
                    {picklocations[0] !== "null"
                      ? picklocations[0]
                      : picklocations[1] !== "null"
                      ? picklocations[1]
                      : picklocations[2] !== "null"
                      ? picklocations[2]
                      : picklocations[3] !== "null"
                      ? picklocations[3]
                      : picklocations[4] !== "null"
                      ? picklocations[4]
                      : ""}
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
                  <Icon name="circle-outline" color="black" size={15} />
                  <Text
                    style={[
                      styles.fromAndtoTxt,
                      isPreviousDay && { color: "#000000" },
                      isFutureDay && { color: "#000000" },
                    ]}
                  >
                    Drop Off
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
                  <Text style={styles.FromAndToPlace}>
                    {Droplocations[0] !== "null"
                      ? Droplocations[0]
                      : Droplocations[1] !== "null"
                      ? Droplocations[1]
                      : Droplocations[2] !== "null"
                      ? Droplocations[2]
                      : Droplocations[3] !== "null"
                      ? Droplocations[3]
                      : Droplocations[4] !== "null"
                      ? picklocations[4]
                      : ""}
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                {isToday && item?.rideStatus === "Pick" && (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("Track Location", {
                        itemLatLng: item?.lastLatLng,
                      })
                    }
                    style={({ pressed }) => [
                      pressed && styles.pressed,
                      styles.TrackRide_Attendence,
                    ]}
                  >
                    <Text
                      style={[
                        styles.serviceProviderText,
                        isPreviousDay && { color: "#000000" },
                        isFutureDay && { color: "#000000" },
                      ]}
                    >
                      Track Ride
                    </Text>
                  </Pressable>
                )}
                {((isToday && item?.rideStatus === "Pending") ||
                  (isToday && item?.rideStatus === "Pick")) && (
                  <Pressable
                    onPress={() => {
                      handleAttendence(item);
                    }}
                    style={({ pressed }) => [
                      pressed && styles.pressed,
                      styles.TrackRide_Attendence,
                    ]}
                  >
                    <Text
                      style={[
                        styles.serviceProviderText,
                        isPreviousDay && { color: "#000000" },
                        isFutureDay && { color: "#000000" },
                      ]}
                    >
                      Attendance
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </>
      );
    }
  });

  const todayData = response?.result?.filter((item) => {
    const dateString = item?.pickupTime;
    const day = parseInt(dateString?.slice(8, 10));
    return currentD === day;
  });

  const previousData = response?.result?.filter((item) => {
    const dateString = item?.pickupTime;
    const day = parseInt(dateString?.slice(8, 10));
    return currentD > day;
  });

  const futureData = response?.result?.filter((item) => {
    const dateString = item?.pickupTime;
    const day = parseInt(dateString?.slice(8, 10));
    return currentD < day;
  });
  console.log(todayData);
  return (
    <>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <View style={styles.container}>
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
          <FlatList
            data={
              activeTab === "tab1"
                ? todayData
                : activeTab === "tab2"
                ? previousData
                : activeTab === "tab3" && futureData
            }
            keyExtractor={(item) => item.rideId}
            renderItem={({ item }) => <RenderItemOfToday item={item} />}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ height: 200 }} />}
          />

          {/* {activeTab === "tab1" ? (
            <Today />
          ) : activeTab === "tab2" ? (
            <Previous />
          ) : (
            <Future />
          )} */}
        </View>
      )}
      <View style={styles.modal_mainContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Rate your Ride</Text>
              <View style={styles.stars}>
                <TouchableOpacity onPress={() => setStarRating(1)}>
                  <MaterialIcons
                    name={starRating >= 1 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating >= 1
                        ? styles.starSelected
                        : styles.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(2)}>
                  <MaterialIcons
                    name={starRating >= 2 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating >= 2
                        ? styles.starSelected
                        : styles.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(3)}>
                  <MaterialIcons
                    name={starRating >= 3 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating >= 3
                        ? styles.starSelected
                        : styles.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(4)}>
                  <MaterialIcons
                    name={starRating >= 4 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating >= 4
                        ? styles.starSelected
                        : styles.starUnselected
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setStarRating(5)}>
                  <MaterialIcons
                    name={starRating >= 5 ? "star" : "star-border"}
                    size={32}
                    style={
                      starRating >= 5
                        ? styles.starSelected
                        : styles.starUnselected
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.commentsBox}>
                <TextInput
                  placeholder="Additional Comments"
                  style={styles.textArea}
                  multiline={true}
                  value={comments}
                  onChangeText={(text) => setComments(text)}
                />
              </View>
              <Pressable
                style={({ pressed }) => [
                  pressed && styles.pressed,
                  { overflow: "hidden" },
                ]}
                onPress={handleModalClose}
              >
                <Text style={styles.listItemButton}>DONE</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <AttendenceModal
        visible={isAttendenceModalVisible}
        onClose={handleAttendenceModalClose}
        onYesCheckboxChange={handleYesCheckboxChange}
        onNoCheckboxChange={handleNoCheckboxChange}
        yesChecked={yesChecked}
        noChecked={noChecked}
        value={attendenceComment}
        onChangeText={(text) => setAttendenceComment(text)}
      />
      {isAttendenceModalVisible && <View style={styles.overlay} />}
      {modalVisible && <View style={styles.overlay} />}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 10,
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
  //modal

  modal_mainContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  textArea: { padding: 10, flex: 1, top: -40 },
  commentsBox: {
    flex: 1,
    elevation: 4,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    // padding: 8,
    maxHeight: "100%",
    borderRadius: 4,
    // marginTop: 10,
    marginVertical: 20,
    backgroundColor: "white",
  },

  stars: {
    // display: "flex",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
  },
  starUnselected: {
    color: "#aaa",
  },
  starSelected: {
    color: "#ffb300",
  },

  listItemButton: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#3696f9",
    borderRadius: 5,
    padding: 10,
  },

  modal: {
    width: "100%",
    height: 300,
    padding: 15,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
  },
  serviceProviderText: {
    color: "#3696f9",
    fontSize: 16,
    fontWeight: "500",
  },
  TrackRide_Attendence: {
    borderWidth: 0.9,
    maxWidth: "100%",
    width: 100,
    alignSelf: "center",
    borderRadius: 4,
    padding: 3,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
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
});
