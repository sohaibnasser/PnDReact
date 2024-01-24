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
import { API, mobileApi } from "../config";
import Rating from "./Rating";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Activityindicator from "./Activityindicator";

function UserProfile() {
  const [parentID, setParentID] = useState("");
  const [profile, setProfile] = useState("");
  const [imagee, setImagee] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      console.log("ParentId of Profile", data);
      const id = JSON.parse(data);
      setParentID(id.parentId);
    };
    PressHandler();
  }, []);
  console.log("parentID111111", parentID);
  const profileData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/profile/${parentID}`);
      const resdata = await response.json();
      console.log("response data:", resdata);
      setProfile(resdata.result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (parentID && isFocused) {
      profileData();
    }
  }, [parentID]);
  // console.log("image urll", profile?.imageUrl);
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
  // const getProfileDataHandler = useCallback(async () => {
  //   try {
  //     const response = await fetch(`${API}/profile/${parentID}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const responseData = await response.json();
  //     console.log("responseData of profile", responseData);

  //     if (responseData.message === "success") {
  //       const result = responseData.result;
  //       setProfile(result);

  //       await AsyncStorage.setItem("@profile", JSON.stringify(result));
  //     } else {
  //     }
  //   } catch (error) {}
  // }, []);

  // useEffect(() => {
  //   setInterval(() => {
  //     getProfileDataHandler();
  //   }, 1200);
  // }, []);
  // useEffect(() => {
  //   getProfileDataHandler();
  // }, []);
  // console.log("parentID1234", profile.otp);

  // const route = useRoute();
  // const para = route.params.Id;
  // console.log(profile);
  // async function getUserData() {
  //   const response = await fetch(`${API}/profile/${parentID}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const responseData = await response.json()

  //     if (responseData.message === "success") {
  //       // alert("An Otp is sent to your given Email");
  //       // navigation.navigate("SignIn");

  //   setIsLoading(false);
  //     } else {
  //       // store to context
  //       // setState(data);
  //       // store to asyncstorage
  //       // await AsyncStorage.setItem("@auth", JSON.stringify(data));
  //       // setIsLoading(false);
  //       // alert(responseData.error);
  //     }
  //     } catch (error) {
  //       console.log("not ", error.message);
  //       alert(error.message);
  //       setIsLoading(false);
  //     }
  // }
  // useEffect(() => {
  //   getUserData();
  // }, []);
  // const Profile = JSON.parse(parentID);
  // console.log(Profile.parentName);
  // const asd = Profile.parentId;
  // console.log(responseData);

  return (
    <View>
      {isLoading ? (
        <Activityindicator />
      ) : (
        <View style={styles.userInfo}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "gray",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imagee && (
              <Image
                source={{ uri: imagee }}
                size={10}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                }}
              />
            )}
          </View>

          <View style={{ marginLeft: 15 }}>
            <Text style={styles.userName}>{profile.parentName}</Text>

            {/* <Text>sttae{state.result.parentName}</Text> */}

            <Text style={styles.userEmail}>{profile.parentEmail}</Text>

            {/* <Text style={styles.userEmail}>{profile.otp}</Text> */}
            <View style={{ marginVertical: 3 }}>
              <Rating rating={profile.parentRating} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  userInfo: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
  },
  userName: {
    fontSize: 18,

    fontWeight: "500",
  },
  userEmail: {
    fontSize: 14,
    marginTop: 5,
    color: "#777",
  },
});

export default UserProfile;
