import React, { useState, useEffect, useCallback } from "react";
import { View, Pressable, StyleSheet, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useLayoutEffect } from "react";
import Icon from "../components/Icon";

import Activityindicator from "../components/Activityindicator";

const Map = ({ navigation, route }) => {
  const {
    spId,
    parentId,
    vehicleId,
    bidIdd,
    bidAmountt,
    dayss,
    bidDropTimee,
    bidPickupTimee,
    numPassengerr,
    fromcity,
    tocity,
    messagee,
    returntrip,
    dependentListt,

    messagefrom,
    parentName,

    place,
    bidDropLocation,
    bidDropLatlng,
    bidPickupLocation,
    bidPickupLatlng,
    name,
  } = route?.params || {};

  // console.log(
  //   "pickedafasdfasd=====<<><>111q001111",
  //   "spidd",
  //   spId,
  //   parentId,
  //   vehicleId,
  //   bidIdd,
  //   bidAmountt,
  //   dayss,
  //   bidDropTimee,
  //   bidPickupTimee,
  //   numPassengerr,
  //   fromcity,
  //   tocity,
  //   messagee,
  //   returntrip,
  //   "dependemtList",
  //   dependentListt,

  //   messagefrom,
  //   parentName,
  //   "place",
  //   place,
  //   bidDropLocation,
  //   bidDropLatlng,
  //   bidPickupLocation,
  //   bidPickupLatlng
  // );
  // const routeName = route.params?.name;
  // console.log("rote name", routeName);
  const [location, setLocation] = useState(null);
  // console.log("Locations", location);
  const [markerLocation, setMarkerLocation] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getLocationAsync = async () => {
      setIsLoading(true);
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          return;
        }
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
        setIsLoading(false);
      } catch (error) {
        console.log("map error", error);
        // Handle error here
        setIsLoading(false);
      }
    };

    getLocationAsync();
  }, []);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerLocation({ lat: latitude, lng: longitude });
  };

  const savePickedLocationHandler = useCallback(async () => {
    if (!markerLocation) {
      Alert.alert("No location picked!", "Please select a location first!");
      return;
    }

    if (name === "Ask For Bid") {
      if (place === "pickup") {
        navigation.navigate("Ask For Bid", {
          // pickupLatLng: markerLocation,
          pickedLat: markerLocation?.lat,
          pickedLng: markerLocation?.lng,
          parentId: parentId,
          spId: spId,
        });
      } else if (place === "dropoff") {
        navigation.navigate("Ask For Bid", {
          droplatt: markerLocation?.lat,
          dropLngg: markerLocation?.lng,
          bidDropLatlng: markerLocation,
          parentId: parentId,
          spId: spId,
        });
      }
    } else if (name === "Update Bid") {
      if (place === "pickup") {
        navigation.navigate("Update Bid", {
          pickedLat: markerLocation.lat,
          pickedLng: markerLocation.lng,
          bidPickupLocation,
          // bidPickupLatlng: markerLocation,
          bidIdd,
          vehicleId,
          parentId,
          bidAmountt,

          dayss,
          bidDropTimee,
          bidPickupTimee,
          numPassengerr,
          fromcity,
          tocity,
          messagee,
          returntrip,
          dependentListt,
          spId,
          messagefrom,
          parentName,
        });
      } else if (place === "dropoff") {
        navigation.navigate("Update Bid", {
          dropLat: markerLocation?.lat,
          droplng: markerLocation?.lng,

          bidDropLocation,

          // bidDropLatlng: markerLocation,
          bidIdd,
          parentId,
          bidAmountt,
          dayss,
          bidDropTimee,
          bidPickupTimee,
          numPassengerr,
          fromcity,
          tocity,
          messagee,
          returntrip,
          dependentListt,
          spId,
          vehicleId,
          messagefrom,
          parentName,
        });
      }
    }
  }, [markerLocation, navigation, location]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={savePickedLocationHandler}
          style={({ pressed }) => [
            pressed && styles.pressed,
            styles.headerRightButton,
          ]}
        >
          <Icon name="plus-box" color="#3696f9" size={33} />
        </Pressable>
      ),
    });
  }, [navigation, savePickedLocationHandler]);
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
              onPress={handleMapPress}
            >
              {markerLocation && (
                <Marker
                  coordinate={{
                    latitude: markerLocation.lat,
                    longitude: markerLocation.lng,
                  }}
                  title="Current Location"
                  description="This is your current location"
                />
              )}
            </MapView>
          )}
        </View>
      )}
    </>
  );
};

export default Map;
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
