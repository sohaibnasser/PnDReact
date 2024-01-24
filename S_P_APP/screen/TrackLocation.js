import { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";

function TrackLocation({ navigation, route }) {
  const { itemLatLng } = route?.params || {};
  const lat = itemLatLng.split(",")[0];
  const lng = itemLatLng.split(",")[1];
  const [driverLat, setDriverLat] = useState(parseFloat(lat));
  const [driverLng, setDriverLng] = useState(parseFloat(lng));

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const mapRef = useRef(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    const getLocationAsync = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access location was denied");
          return;
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      } catch (error) {}
    };

    getLocationAsync();
  }, []);

  useEffect(() => {
    if (driverLat && driverLng && location) {
      const region = {
        latitude: driverLat,
        longitude: driverLng,
        latitudeDelta: 0.09122,
        longitudeDelta: 0.0421,
      };
      mapRef.current.animateToRegion(region, 5000); // Adjust the duration as needed
    }
  }, [driverLat, driverLng, location]);

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {driverLat && driverLng && (
            <Marker
              coordinate={{
                latitude: driverLat,
                longitude: driverLng,
              }}
              title="Current Location"
              description="This is your current location"
            />
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default TrackLocation;
