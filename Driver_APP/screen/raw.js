import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import Icon from "../components/Icon";
import { useCallback } from "react";
import * as Location from "expo-location";

export default function Map({ navigation, route }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);
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
  } = route.params;
  const routeName = route.params.name;
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const getAddress = async () => {
    try {
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (response.length > 0) {
        const { street, city, region, country, postalCode } = response[0];
        const formattedAddress = `${street}, ${city}, ${region}, ${country} ${postalCode}`;
        setAddress(formattedAddress);
      }
    } catch (error) {
      console.error("Error getting address:", error);
    }
  };

  console.log("Route name", routeName);
  const [selectedLocation, setSelectedLocation] = useState();
  const selectLocationHandler = (event) => {
    // console.log(event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  };
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked!", "Please select a location first!");
      return;
    }
    if (routeName === "Ask For Bid") {
      navigation.navigate("Ask For Bid", {
        pickedLat: selectedLocation.lat,
        pickedLng: selectedLocation.lng,
      });
    } else if (routeName === "Update Bid") {
      navigation.navigate("Update Bid", {
        pickedLat: selectedLocation.lat,
        pickedLng: selectedLocation.lng,
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
  }, [navigation, selectedLocation]);
  React.useLayoutEffect(() => {
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
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 30.3753,
        longitude: 69.3451,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
