import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { mobileApi } from "../../config";

const BACKGROUND_LOCATION_TASK = "background-location-task";
const sendLocationToBackend = async (coords) => {
  try {
    // Send latitude and longitude to your backend API
    const { latitude, longitude } = coords;
    const endpoint = `${mobileApi}/driver/updateVehicleLocation/1/${latitude},${longitude}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error sending location:", error);
  }
};
TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
  if (error) {
    console.log("Background location task error:", error);
    return;
  }

  if (data) {
    const { locations } = data;
    console.log("Background location:", locations);
    sendLocationToBackend(locations[0].coords);
    // Process the background location data as needed
  }
});

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    // Request permission to access the user's location
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status", status);
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }
      if (status === "granted") {
        // Start listening for location updates
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 5000, // Update location every 5 seconds
            distanceInterval: 5, // Update location if the user moves by 10 meters
            foregroundService: {
              notificationTitle: "App is tracking your location",
              notificationBody: "To stop tracking, open the app.",
            },
          },

          (location) => {
            console.log("Foreground location:", location);
            setLocation(location);
            // Process the foreground location data as needed
          }
        );

        // Start a background location task
        Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
          accuracy: Location.Accuracy.BestForNavigation,
          showsBackgroundLocationIndicator: true,
        });
      }
    };

    requestLocationPermission();
    // scheduleNotificationHandler();

    return () => {
      // Clean up the location listeners and stop the background task
      Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
    };
  }, []);

  return <View></View>;
};

const LocationScreen = () => {
  const [shouldRenderLocation, setShouldRenderLocation] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldRenderLocation(true);
    }, 60000); // Delay rendering for 1 minute (60,000 milliseconds)

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View>
      {shouldRenderLocation && <LocationComponent />}
      {/* Add any additional UI or functionality related to location */}
    </View>
  );
};

export default LocationScreen;
