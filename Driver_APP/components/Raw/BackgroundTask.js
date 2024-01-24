// import React, { useEffect, useState } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import * as TaskManager from "expo-task-manager";
// import * as Location from "expo-location";
// import axios from "axios";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { mobileApi } from "../../config";

// const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
// let foregroundSubscription = null;

// TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   if (data) {
//     const { locations } = data;
//     const location = locations[0];
//     if (location) {
//       console.log("Location in background", location.coords);
//     }
//   }
// });

// export default function BackgroundTask() {
//   const [position, setPosition] = useState();
//   const [driverId, setDriverId] = useState();
//   useEffect(() => {
//     const getDriverId = async () => {
//       let data = await AsyncStorage.getItem("@auth");
//       console.log("driverId of Profile", data);
//       const id = JSON.parse(data);
//       setDriverId(id?.driverId);
//     };
//     getDriverId();
//   }, [setDriverId]);

//   useEffect(() => {
//     const requestPermissions = async () => {
//       const foreground = await Location.requestForegroundPermissionsAsync();
//       if (foreground.granted)
//         await Location.requestBackgroundPermissionsAsync();

//       if (foreground.granted) {
//         startForegroundUpdate();
//         startBackgroundUpdate();
//       }
//     };
//     requestPermissions();

//     return () => {
//       stopBackgroundUpdate();
//     };
//   }, []);

//   const sendLocationToServer = (location) => {
//     console.log("Sending location to server", location);
//     const lat = location?.latitude;
//     const lng = location?.longitude;
//     axios
//       .get(`${mobileApi}/driver/updateVehicleLocation/${driverId}/${lat - lng}`)
//       .then((response) => {
//         console.log("Location sent to server:", response?.data);
//       })
//       .catch((error) => {
//         console.error("Error sending location:", error);
//       });
//   };

//   const startForegroundUpdate = async () => {
//     const { granted } = await Location.getForegroundPermissionsAsync();
//     if (!granted) {
//       console.log("Location tracking denied");
//       return;
//     }

//     foregroundSubscription?.remove();

//     foregroundSubscription = await Location.watchPositionAsync(
//       {
//         accuracy: Location.Accuracy.BestForNavigation,
//       },
//       (location) => {
//         setPosition(location.coords);
//         sendLocationToServer(location.coords);
//       }
//     );
//   };

//   const startBackgroundUpdate = async () => {
//     const { granted } = await Location.getBackgroundPermissionsAsync();
//     if (!granted) {
//       console.log("Location tracking denied");
//       return;
//     }

//     const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);
//     if (!isTaskDefined) {
//       console.log("Task is not defined");
//       return;
//     }

//     const hasStarted = await Location.hasStartedLocationUpdatesAsync(
//       LOCATION_TASK_NAME
//     );
//     if (hasStarted) {
//       console.log("Already started");
//       return;
//     }

//     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//       accuracy: Location.Accuracy.BestForNavigation,
//       showsBackgroundLocationIndicator: true,
//       foregroundService: {
//         notificationTitle: "Location",
//         notificationBody: "Location tracking in the background",
//         notificationColor: "#fff",
//       },
//       onLocationUpdate: (location) => {
//         sendLocationToServer(location.coords);
//       },
//     });
//   };

//   const stopBackgroundUpdate = async () => {
//     const hasStarted = await Location.hasStartedLocationUpdatesAsync(
//       LOCATION_TASK_NAME
//     );
//     if (hasStarted) {
//       await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
//       console.log("Location tracking in the background stopped");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Longitude: {position?.longitude}</Text>
//       <Text>Latitude: {position?.latitude}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
// });
