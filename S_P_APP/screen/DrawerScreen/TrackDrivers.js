import React, { useState, useEffect, useCallback } from "react";
import { View, Pressable, StyleSheet, Alert, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import Activityindicator from "../../components/Activityindicator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { mobileApi } from "../../config";
import { Image } from "react-native";

const TrackDrivers = ({ navigation }) => {
  const markerImage = require("../../assets/red_car.png");
  const [location, setLocation] = useState(null);
  const [spId, setSpId] = useState("");

  const [latlng, setLatlng] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log("latlng", latlng);
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setSpId(id.spId);
    };
    PressHandler();
  }, [setSpId]);
  let driversLatLng = "";

  if (latlng) {
    driversLatLng = latlng?.map((text) => text.lastLatLng);
  }

  console.log("lat lnssgsss", driversLatLng);

  const getDriverHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/sp/vehicleListForSPMobile/${spId}`
      );
      const responseData = await response.json();

      setLatlng(responseData.result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    // }
  };
  useEffect(() => {
    if (spId) {
      getDriverHandler();
    }
  }, [spId]);
  useEffect(() => {
    const getLocationAsync = async () => {
      try {
        setIsLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          return;
        }
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      } catch (error) {
        console.log("map error", error);
      } finally {
        setIsLoading(false);
      }
    };

    getLocationAsync();
  }, []);
  return (
    <>
      {isLoading ? (
        <Activityindicator
          isLoading={isLoading}
          onRequestClose={() => {
            setIsLoading(false), navigation.goBack();
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          {location && (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{ flex: 1 }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Your current location"
              />
              {/* {latlng &&
                driversLatLng
                  .filter((item) => item && typeof item === "string")
                  .map((item, index) => {
                    const [lat, lng] = item?.split(",");

                    return (
                      <Marker
                        key={index}
                        coordinate={{
                          latitude: parseFloat(lat),
                          longitude: parseFloat(lng),
                        }}
                        title={`Driver ${index + 1}`}
                        description="This is your current location"
                      >
                        <Image
                          source={require("../../assets/red_car.png")}
                          style={{ width: 23, height: 40 }} // Adjust width and height as needed
                        />
                      </Marker>
                    );
                  })} */}
              {latlng &&
                driversLatLng
                  .filter((item) => item && typeof item === "string")
                  .map((item, index) => {
                    const [lat, lng] = item
                      ?.split(",")
                      .map((coord) => coord.trim()); // Trim whitespace
                    const parsedLat = parseFloat(lat);
                    const parsedLng = parseFloat(lng);

                    if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
                      return (
                        <Marker
                          key={index}
                          coordinate={{
                            latitude: parsedLat,
                            longitude: parsedLng,
                          }}
                          title={`Driver ${index + 1}`}
                          description="This is a driver's location"
                        >
                          <Image
                            source={markerImage}
                            style={{ width: 23, height: 40 }} // Adjust width and height as needed
                          />
                        </Marker>
                      );
                    } else {
                      return null; // Skip invalid coordinates
                    }
                  })}
            </MapView>
          )}
        </View>
      )}
    </>
  );
};

export default TrackDrivers;
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  headerRightButton: {
    justifyContent: "center",
    paddingTop: 10,
    paddingRight: 10,
  },
});
