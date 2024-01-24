import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { API } from "../config";
import Rating from "./Rating";
import axios from "axios";

function UserProfile() {
  const [driverDetails, setDriverDetails] = useState("");
  const [profile, setProfile] = useState("");
  const [imagee, setImagee] = useState("");
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      console.log("ParentId of Profile", data);
      const id = JSON.parse(data);

      setDriverDetails(id);
    };
    PressHandler();
  }, []);
  const image = profile?.imageUrl;
  useEffect(() => {
    if (profile?.imageUrl) {
      const getImage = async () => {
        const response = await fetch(
          `${mobileApi}/image/downloadImage/${image}`
        );

        // const resdata = await response.json();
        console.log("response data ogggggggg", response.url);
        setImagee(response.url);
        // console.log("response data ogggggggg", response.data.responseUrl);
      };
      getImage();
    }
  }, [profile]);
  console.log("ooooooooooooooooo", imagee);
  // console.log("driverDetails", driverDetails);
  // useEffect(() => {
  //   if (driverDetails) {
  //     axios
  //       .get(`${API}/profile/${parentID}`)
  //       .then((response) => {
  //         console.log("RESPONSE=>123", response.data);
  //         setProfile(response.data.result);
  //       })
  //       .catch((error) => {
  //         console.log("Error=>", error);
  //       });
  //   }
  // }, [parentID]);
  return (
    <View style={styles.userInfo}>
      <View
        style={{
          maxWidth: "50%",
          width: 80,
          maxHeight: "100%",
          height: 80,
          borderRadius: 40,
          backgroundColor: "gray",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {driverDetails?.imageUrl ? (
          <Image
            source={{ uri: driverDetails?.imageUrl }}
            size={10}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
            }}
          />
        ) : (
          <Text>No image</Text>
        )}
      </View>

      <View style={{ marginLeft: 10, justifyContent: "center" }}>
        <Text style={styles.userName}>{driverDetails?.driverName}</Text>
        <View style={{ marginVertical: 3 }}>
          <Rating rating={driverDetails?.driverRating} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  userInfo: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    borderBottomWidth: 0.4,
    borderBottomColor: "gray",
    // justifyContent: "space-around",
  },
  userName: {
    fontSize: 18,

    fontWeight: "500",
    color: "#3696f9",
  },
});

export default React.memo(UserProfile);
