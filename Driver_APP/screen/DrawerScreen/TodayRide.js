import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import Button from "../../components/auth/Button";
import { Tabbar } from "../../components/auth/Tabbar";
import Icon from "../../components/Icon";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RidesApi, mobileApi } from "../../config";
import axios from "axios";
import Activityindicator from "../../components/Activityindicator";
import { formatTimeWithAMPM } from "../../Util/date";
import { MaterialIcons } from "@expo/vector-icons";
import { RefreshControl } from "react-native";
// import LocationScreen from "../../components/LocationComponent";
import Nodata from "../../components/Nodata";
import { useContext } from "react";
import { AuthContext } from "../../store/store";
import { startBackgroundLocationUpdate } from "../../Util/BcTask";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

export const TodayRide = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [driverID, setDriverID] = useState("");
  const [response, setResponse] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  // Modal
  const [starRating, setStarRating] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState("");
  const [IDs, setIDs] = useState("");
  const [updateFlag, setUpdateFlag] = React.useState(false);
  const [state] = useContext(AuthContext);
  const authenticated =
    state && state?.driverEmail !== "" && state?.driverId !== "";

  // const LOCATION_TASK_NAME = "background-location-task";
  useEffect(() => {
    if (authenticated) {
      startBackgroundLocationUpdate(state?.driverId);
    }
  }, [authenticated]);
  // const requestPermissions = async () => {
  //   const { status: foregroundStatus } =
  //     await Location.requestForegroundPermissionsAsync();
  //   if (foregroundStatus === "granted") {
  //     const { status: backgroundStatus } =
  //       await Location.requestBackgroundPermissionsAsync();
  //     if (backgroundStatus === "granted") {
  //       await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
  //         accuracy: Location.Accuracy.Balanced,
  //         timeInterval: 500, // Update location every 5 seconds
  //         distanceInterval: 0, // Update location if the user moves by 10 meters
  //         foregroundService: {
  //           notificationTitle: "App is tracking your location",
  //           notificationBody: "To stop tracking, open the app.",
  //         },
  //       });
  //     }
  //   }
  // };
  //  HANDLE IDS
  // useEffect(() => {
  //   const handleLocationUpdates = async () => {
  //     if (authenticated) {
  //       await startBackgroundLocationUpdate(state?.driverId);
  //     }
  //   };
  //   handleLocationUpdates();
  // }, [authenticated]);
  // useEffect(() => {
  // requestPermissions();
  // }, []);
  // TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  //   if (error) {
  //     // Error occurred - check `error.message` for more details.
  //     return;
  //   }
  //   if (data) {
  //     const { locations } = data;
  //     console.log("locations", locations);
  //     // do something with the locations captured in the background
  //   }
  // });
  const handleModalOpen = (item, item2) => {
    setIDs({
      rideId: item,
      dependentVehicleMapId: item2,
    });
    setModalVisible(true);
  };
  // RIDE FEEDBACK
  const handleModalClose = async () => {
    setModalVisible(false);

    const response = await fetch(`${mobileApi}/ride/ride_feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dependentVehicleMapDto: {
          dependentVehicleMapId: IDs?.dependentVehicleMapId,
        },
        feedback: comments,
        rating: starRating,
        rideId: IDs.rideId,
      }),
    });

    const responseData = await response.json();

    // setModalVisible(false);
    setUpdateFlag(!updateFlag);
  };

  // GETTING DATA FROM RESPONSE
  let dependentName = "";
  let dropLocation = "";
  let pickupLocation = "";
  let rideId = "";
  let rideStatus = "";
  let dropTimeString = "";
  let pickTimeString = "";
  let dropTime = "";

  //  let pickTimeString = ''

  useEffect(() => {
    const getDriverId = async () => {
      let data = await AsyncStorage.getItem("@auth");

      const id = JSON.parse(data);
      setDriverID(id.driverId);
    };
    getDriverId();
  }, [setDriverID]);

  // API REQUEST

  const getTodayRides = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/driver/todayRides/${driverID}`
      );

      const resData = await response.json();

      if (resData.code === "200") {
        setResponse(resData);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (isFocused && driverID) {
      getTodayRides();
    }
  }, [isFocused, driverID, updateFlag]);
  const getdata = () => {
    if (response.length !== 0) {
      dependentName = response.result?.map((item) => item.dependentName);
      dropLocation = response.result?.map((item) => item.dropLocation);
      pickupLocation = response.result?.map((item) => item.pickupLocation);
      rideId = response.result?.map((item) => item.rideId);
      rideStatus = response.result?.map((item) => item.rideStatus);
      dropTimeString = response.result?.map((item) => item.dropTimeString);
      pickTimeString = response.result?.map((item) => item.pickTimeString);
    }
  };

  useEffect(() => {
    getdata();
  }, [response]);

  const updateStatusForRideHandler = async (
    rideid,
    driverid,
    rideStatus,
    rideLatLng
  ) => {
    const response = await fetch(
      `${mobileApi}/driver/updateStatusForRide/${rideid}/${rideStatus}/${driverid}/${rideLatLng}`
    );
    const resData = await response.json();
    setUpdateFlag(!updateFlag);
  };

  const readyForPickUp = async (rideId) => {
    const response = await fetch(
      `${mobileApi}/driver/readyNotification/${rideId}/${driverID}`
    );
    const resData = await response.json();

    setUpdateFlag(!updateFlag);
  };

  const renderItemOfToday = ({ item, index }) => {
    const parts = item?.dependentVehicleMapDto?.pickupLocation?.split(",");

    return (
      <>
        <View
          style={[
            styles.card,
            { elevation: 4 },
            index % 2 === 0 ? styles.evenItem : styles.oddItem,
          ]}
        >
          <View style={styles.cardData}>
            <Text style={styles.dayAndTime}>
              {item?.dependentVehicleMapDto?.dependentDto.dependentName}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={styles.FromAndToTime}>
                  <Text>
                    {item.pickupTime && formatTimeWithAMPM(item.pickupTime)}
                  </Text>
                  <Text> - </Text>
                  {item.dropTime && formatTimeWithAMPM(item.dropTime)}
                </Text>
              </View>
              {item?.pickStatus === "Pending" ? (
                <Button
                  title="READY FOR PICK"
                  onPress={() => readyForPickUp(item?.rideId)}
                />
              ) : (
                item?.dropStatus === "Drop" && <Button title="DONE" on />
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <View>
                <Text style={styles.fromAndtoTxt}>From</Text>
                <View>
                  <Text style={styles.FromAndToPlace}>{parts[0]}</Text>
                  {/* <Text style={styles.FromAndToPlace}>{parts[1]}</Text> */}
                </View>
              </View>
              {item?.pickStatus === "Pending" ? (
                <Button
                  title="PICK UP"
                  onPress={() =>
                    updateStatusForRideHandler(
                      item?.rideId,
                      item?.dependentVehicleMapDto?.vehicleDto?.driverDto
                        .driverId,
                      (rideStatus = "Pick"),
                      item?.dependentVehicleMapDto?.pickupLatlng
                    )
                  }
                />
              ) : item?.dropStatus === "Drop" ? (
                <Button
                  title=" FEEDBACK"
                  onPress={() =>
                    handleModalOpen(
                      item?.rideId,
                      item?.dependentVehicleMapDto?.dependentVehicleMapId
                    )
                  }
                />
              ) : (
                item?.pickStatus === "Pick" && (
                  <Button
                    title="DROP OFF"
                    onPress={() =>
                      updateStatusForRideHandler(
                        item?.rideId,
                        item?.dependentVehicleMapDto?.vehicleDto.driverDto
                          .driverId,
                        (rideStatus = "Drop"),
                        item?.dependentVehicleMapDto.dropLatlng
                      )
                    }
                  />
                )
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
              paddingHorizontal: 10,
            }}
          >
            <View></View>

            {item?.rideStatus === "Pick" && (
              <Button
                title="Track Ride"
                onPress={() =>
                  navigation.navigate("Track Location", {
                    passengetLatLng: item?.dependentVehicleMapDto?.pickupLatlng,
                  })
                }
              />
            )}
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <SafeAreaView style={styles.container}>
          <View>
            {response?.result?.length > 0 ? (
              <FlatList
                data={response.result}
                keyExtractor={(item) => item.rideId}
                renderItem={renderItemOfToday}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={getTodayRides}
                  />
                }
                ListFooterComponent={<View style={{ height: 50 }} />}
              />
            ) : (
              <Nodata text="No rides for today" />
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
                      <Pressable
                        style={({ pressed }) => pressed && styles.pressed}
                        onPress={() => setStarRating(1)}
                      >
                        <MaterialIcons
                          name={starRating >= 1 ? "star" : "star-border"}
                          size={32}
                          style={
                            starRating >= 1
                              ? styles.starSelected
                              : styles.starUnselected
                          }
                        />
                      </Pressable>
                      <Pressable
                        style={({ pressed }) => pressed && styles.pressed}
                        onPress={() => setStarRating(2)}
                      >
                        <MaterialIcons
                          name={starRating >= 2 ? "star" : "star-border"}
                          size={32}
                          style={
                            starRating >= 2
                              ? styles.starSelected
                              : styles.starUnselected
                          }
                        />
                      </Pressable>
                      <Pressable
                        style={({ pressed }) => pressed && styles.pressed}
                        onPress={() => setStarRating(3)}
                      >
                        <MaterialIcons
                          name={starRating >= 3 ? "star" : "star-border"}
                          size={32}
                          style={
                            starRating >= 3
                              ? styles.starSelected
                              : styles.starUnselected
                          }
                        />
                      </Pressable>
                      <Pressable
                        style={({ pressed }) => pressed && styles.pressed}
                        onPress={() => setStarRating(4)}
                      >
                        <MaterialIcons
                          name={starRating >= 4 ? "star" : "star-border"}
                          size={32}
                          style={
                            starRating >= 4
                              ? styles.starSelected
                              : styles.starUnselected
                          }
                        />
                      </Pressable>
                      <Pressable
                        style={({ pressed }) => pressed && styles.pressed}
                        onPress={() => setStarRating(5)}
                      >
                        <MaterialIcons
                          name={starRating >= 5 ? "star" : "star-border"}
                          size={32}
                          style={
                            starRating >= 5
                              ? styles.starSelected
                              : styles.starUnselected
                          }
                        />
                      </Pressable>
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
          </View>
          {modalVisible && <View style={styles.overlay} />}
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingVertical: 8,
  },
  card: {
    flex: 1,
    maxWidth: "100%",
    width: "95%",
    alignSelf: "center",
    maxHeight: "100%",
    // height: 130,
    // height: 140,
    backgroundColor: "#fff",

    marginBottom: 20,
    // elevation: 5,
    // borderRadius: 4,
    justifyContent: "space-around",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
  },
  cardData: {
    padding: 10,
    flex: 1,
    maxHeight: "100%",
    maxWidth: "100%",
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
    opacity: 0.5,
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
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  dayAndTimePrevious: {
    // marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
  FromAndToPlace: {
    // marginLeft: 20,
    fontWeight: "500",
    fontSize: 16,
  },
  FromAndToTime: {
    // marginLeft: 20,
    fontWeight: "500",
    fontSize: 16,
  },
  fromAndtoTxt: {
    // marginLeft: 5,
    color: "#fff",
    // fontSize: 20,

    fontSize: 16,
  },
  fromAndtoTxtPrevious: {
    marginLeft: 5,
    color: "#0cf268",
    fontSize: 14,
  },
  dayAndTimeFuture: {
    // marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
  //modal

  modal_mainContainer: {
    flex: 1,
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
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
    color: "#ddf5e7",
  },
  starSelected: {
    color: "#55cd85",
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
  evenItem: {
    backgroundColor: "#55cd85",
  },
  oddItem: {
    backgroundColor: "#3497fd",
  },
  button: {
    height: 10,
  },
});
