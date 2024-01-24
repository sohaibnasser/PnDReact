// import React, { useState, useEffect } from "react";
// import * as Location from "expo-location";
// import * as TaskManager from "expo-task-manager";

// const LOCATION_TRACKING = "location-tracking";

// const startLocationTracking = async () => {
//   await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
//     accuracy: Location.Accuracy.Highest,
//     timeInterval: 5000,
//     distanceInterval: 0,
//   });
//   const hasStarted = await Location.hasStartedLocationUpdatesAsync(
//     LOCATION_TRACKING
//   );
//   return hasStarted;
// };

// const requestLocationPermissions = async () => {
//   let resf = await Location.requestForegroundPermissionsAsync();
//   let resb = await Location.requestBackgroundPermissionsAsync();
//   return resf.status === "granted" && resb.status === "granted";
// };

// const getLocation = async () => {
//   const task = await TaskManager.getRegisteredTasksAsync();
//   if (task.find((t) => t.taskName === LOCATION_TRACKING)) {
//     const locations = await Location.getLocationsAsync({
//       taskName: LOCATION_TRACKING,
//     });
//     if (locations.length > 0) {
//       const { latitude, longitude } = locations[0].coords;
//       return { latitude, longitude };
//     }
//   }
//   return null;
// };

// export default function MyLocationComponent() {
//   const [locationStarted, setLocationStarted] = useState(false);

//   useEffect(() => {
//     const initLocation = async () => {
//       const trackingStarted = await startLocationTracking();
//       setLocationStarted(trackingStarted);

//       const permissionsGranted = await requestLocationPermissions();
//       if (!permissionsGranted) {
//         console.log("Permission to access location was denied");
//       } else {
//         console.log("Permission to access location granted");
//       }
//     };

//     initLocation();
//   }, []);

//   useEffect(() => {
//     const fetchLocation = async () => {
//       const location = await getLocation();
//       if (location) {
//         console.log(
//           `${new Date(Date.now()).toLocaleString()}: ${location.latitude},${
//             location.longitude
//           }`
//         );
//       }
//     };

//     fetchLocation();
//   }, []);

//   return;
// }
