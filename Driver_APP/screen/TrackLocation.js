import { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { Alert } from "react-native";

function TrackLocation({ navigation, route }) {
  const markerImage = require("../assets/red_car.png");
  const { passengetLatLng } = route?.params || {};
  console.log(passengetLatLng, "passengetLatLng");
  const lat = passengetLatLng?.split(",")[0];
  const lng = passengetLatLng?.split(",")[1];
  const [passengerLat, setPassengerLat] = useState(parseFloat(lat));
  const [passengerLng, setPassengerLng] = useState(parseFloat(lng));
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: passengerLat,
    longitude: passengerLng,
  });
  const mapRef = useRef(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    const getLocationAsync = async () => {
      setIsLoading(true);
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          let { coords } = await Location.getCurrentPositionAsync({});
          setLocation(coords);
        } else if (status === "undetermined") {
          // Handle undetermined status (user hasn't chosen yet)
          // You can show a prompt or UI element to request permission again
        } else if (status === "denied") {
          // Handle denied status (user explicitly denied the permission)
          Alert.alert("Permission to access location was denied");
        }
        setIsLoading(false);
      } catch (error) {
        // Handle error here
        setIsLoading(false);
      }
    };

    getLocationAsync();
  }, []);

  useEffect(() => {
    if (passengerLat && passengerLng && location) {
      const region = {
        latitude: passengerLat,
        longitude: passengerLng,
        latitudeDelta: 0.09122,
        longitudeDelta: 0.0421,
      };
      mapRef.current.animateToRegion(region, 5000); // Adjust the duration as needed
    }
  }, [passengerLat, passengerLng, location]);

  return (
    <>
      {/* {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : ( */}
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
            {passengerLat && passengerLng && (
              <Marker
                coordinate={{
                  latitude: passengerLat,
                  longitude: passengerLng,
                }}
                title="Your Passengers"
                description="This is your Passengers location"
              />
            )}
            {location.latitude && location.longitude && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Your Location Location"
                description="This is your current location"
              >
                <Image
                  source={markerImage}
                  style={{ width: 23, height: 40 }} // Adjust width and height as needed
                />
              </Marker>
            )}
          </MapView>
        )}
      </View>
      {/* )} */}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default TrackLocation;
