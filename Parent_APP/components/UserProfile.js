import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API, mobileApi } from "../config";
import Rating from "./Rating";
import { useIsFocused } from "@react-navigation/native";

function UserProfile() {
  const [parentID, setParentID] = useState("");
  const [profile, setProfile] = useState("");
  const [imagee, setImagee] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      console.log("ParentId of Profile", data);
      const id = JSON.parse(data);
      setParentID(id.parentId);
      setProfileImage(id.imageUrl);
    };
    PressHandler();
  }, []);
  const profileData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/profile/${parentID}`);
      const resdata = await response.json();
      console.log("response data:", resdata);
      setProfile(resdata.result);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (parentID) {
      profileData();
    }
  }, [parentID]);
  // const image = profile?.imageUrl;
  console.log("profike", profileImage);
  useEffect(() => {
    if (profileImage) {
      const getImage = async () => {
        const response = await fetch(
          `${mobileApi}/image/downloadImage/${profileImage}`
        );
        setImagee(response.url);
      };
      getImage();
    }
  }, [profileImage, imagee]);

  return (
    <View>
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
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
              }}
            />
          )}
        </View>

        <View style={{ marginLeft: 15 }}>
          <Text style={styles.userName}>{profile?.parentName}</Text>

          {/* <Text>sttae{state.result.parentName}</Text> */}

          <Text style={styles.userEmail}>{profile?.parentEmail}</Text>

          {/* <Text style={styles.userEmail}>{profile.otp}</Text> */}
          <View style={{ marginVertical: 3 }}>
            <Rating rating={profile?.parentRating} />
          </View>
        </View>
      </View>
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
