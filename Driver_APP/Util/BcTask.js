import * as Location from "expo-location";
import { useBackgroundPermissions } from "expo-location";
import * as TaskManager from "expo-task-manager";
import axios from "axios";
import { useEffect } from "react";
import { mobileApi } from "../config";

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
let foregroundSubscription = null;

const sendLocationToServer = async (driverId, location) => {
  console.log("Sending location", location, driverId);
  const lat = location?.latitude;
  const lng = location?.longitude;
  try {
    const response = await axios.get(
      `${mobileApi}/driver/updateVehicleLocation/${driverId}/${lat - lng}`
    );
    console.log("Location sent to server:", response?.data);
  } catch (error) {
    console.error("Error sending location:", error);
  }
};

const startBackgroundLocationUpdate = async (driverId) => {
  const requestPermissions = async () => {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === "granted") {
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === "granted") {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.BestForNavigation,
          showsBackgroundLocationIndicator: true,
          timeInterval: 120000, // Update location every 5 seconds
          distanceInterval: 0, // Update location if the user moves by 10 meters
          foregroundService: {
            notificationTitle: "App is tracking your location",
            notificationBody: "To stop tracking, open the app.",
            killServiceOnDestroy: true,
          },
        });
      }
    }
    return () => {
      // Clean up the location listeners and stop the background task
      Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    };
  };
  requestPermissions();
  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      const { locations } = data;
      const location = locations[0];
      if (location) {
        sendLocationToServer(driverId, location?.coords);
      }
    }
  });

  const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);
  if (!isTaskDefined) {
    console.log("Task is not defined");
    return;
  }

  console.log("Location tracking in the background started");
};

const stopBackgroundUpdate = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  console.log("Location tracking in the background stopped");
};

export { startBackgroundLocationUpdate, stopBackgroundUpdate };
