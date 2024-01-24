import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Button, Pressable } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useLayoutEffect } from "react";
import Icon from "../components/Icon";
import { StyleSheet } from "react-native";
import { Alert } from "react-native";
import { useCallback } from "react";
import { add } from "react-native-reanimated";

const Map = ({ navigation, route }) => {
  const {
    bidIdd,
    parentIDD,
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
    spid,
    messagefrom,
    parentName,
    place,
    parentid,
    spID,
  } = route.params;
  console.log("pickedafasdfasd=====<<><>", place, parentid, spID);
  const routeName = route.params.name;
  console.log(routeName);
  const [location, setLocation] = useState(null);
  const [markerLocation, setMarkerLocation] = useState("");
  const [address, setAddress] = useState("");
  console.log("adddress", address);
  console.log("location", location);
  console.log("marker Loction", markerLocation);

  // }, [navigation]);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync({});
    setLocation(coords);
  };
  useEffect(() => {
    getLocationAsync();
  }, []);
  // const getAddressFromLatLng = useCallback(async (lat, lng) => {
  //   try {
  //     const response = await Location.reverseGeocodeAsync({
  //       latitude: lat,
  //       longitude: lng,
  //     });

  //     if (response.length > 0) {
  //       const { street, city, region, country, postalCode } = response[0];
  //       const formattedAddress = `${street}, ${city}, ${region}, ${country} ${postalCode}`;
  //       setAddress(formattedAddress);
  //     }
  //   } catch (error) {
  //     console.error("Error getting address:", error);
  //   }
  // }, []);
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerLocation({ lat: latitude, lng: longitude });
  };

  const savePickedLocationHandler = useCallback(async () => {
    if (!markerLocation) {
      Alert.alert("No location picked!", "Please select a location first!");
      return;
    }
    // const { lat, lng } = markerLocation;

    // Call the function to get the address
    // await getAddressFromLatLng(lat, lng);

    if (routeName === "Ask For Bid") {
      if (place === "pickup") {
        navigation.navigate("Ask For Bid", {
          pickupLatLng: markerLocation,
          pickedLat: markerLocation.lat,
          pickedLng: markerLocation.lng,
          parentid,
          spID,
        });
      } else if (place === "dropoff") {
        navigation.navigate("Ask For Bid", {
          dropLat: markerLocation.lat,
          droplng: markerLocation.lng,
          dropoffLatlng: markerLocation,
          parentid,
          spID,
        });
      }
    } else if (routeName === "Update Bid") {
      if (place === "pickup") {
        navigation.navigate("Update Bid", {
          pickupLatLng: markerLocation,
          pickedLat: markerLocation.lat,
          pickedLng: markerLocation.lng,
          bidIdd,
          parentIDD,
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
          spid,
          messagefrom,
          parentName,
        });
      } else if (place === "dropoff") {
        navigation.navigate("Update Bid", {
          dropLat: markerLocation?.lat,
          droplng: markerLocation?.lng,
          dropoffLatlng: markerLocation,
          bidIdd,
          parentIDD,
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
          spid,
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
    <View style={{ flex: 1 }}>
      {location ? (
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
      ) : (
        <Text>Loading...</Text>
      )}
      {/* <Button title="ad" onPress={getAddress} /> */}
    </View>
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
