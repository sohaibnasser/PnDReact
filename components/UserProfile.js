import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { API } from "../config";

function UserProfile() {
  const route = useRoute();
  const para = route.params.Id;
  console.log(para);
  // const [state, setState] = useState("");
  // async function getUserData() {
  //   const response = await fetch(`${API}/profile/6`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const responseData = await response.json();
  //   console.log("userProfile data", responseData.result.otp);
  //   setState(responseData);
  //   //   return responseData;
  //   //   console.log("response Data", responseData);
  //   //   setIsLoading(false);
  //   //   if (responseData.message === "success") {
  //   //     alert("An Otp is sent to your given Email");
  //   //     navigation.navigate("SignIn");

  //   // setIsLoading(false);
  //   //   } else {
  //   //     // store to context
  //   //     // setState(data);
  //   //     // store to asyncstorage
  //   //     // await AsyncStorage.setItem("@auth", JSON.stringify(data));
  //   //     // setIsLoading(false);
  //   //     alert(responseData.error);
  //   //   }
  //   //   } catch (error) {
  //   //     console.log("not ", error.message);
  //   //     alert(error.message);
  //   //     // setIsLoading(false);
  //   //   }
  // }
  // useEffect(() => {
  //   getUserData();
  // }, []);
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
          {para.imageUrl ? (
            <Image
              source={require("../assets/splash_bg.png")}
              size={10}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                // backgroundColor: "gray",
              }}
            />
          ) : (
            <Text>No image</Text>
          )}
        </View>

        <View style={{ marginLeft: 15 }}>
          <Text style={styles.userName}>{para.parentName}</Text>
          <Text>rating:{para.parentRating}</Text>
          {/* <Text>sttae{state.result.parentName}</Text> */}

          <Text style={styles.userEmail}>{para.parentEmail}</Text>
          <Text style={styles.userEmail}>{para.packageName}</Text>
        </View>
      </View>
      {/* <DrawerContentScrollView {...props}> */}
      {/* <DrawerItemList {...props} /> */}
      {/* <DrawerItem
        label="Profile"
        onPress={() => console.log("Profile pressed")}
      />
      <DrawerItem
        label="Settings"
        onPress={() => console.log("Settings pressed")}
      />
      <DrawerItem
        label="Settings"
        onPress={() => console.log("Settings pressed")}
      />
      <DrawerItem
        label="Settings"
        onPress={() => console.log("Settings pressed")}
      /> */}
      {/* </DrawerContentScrollView> */}
      {/* <DrawerItem
        label="Logout"
        onPress={() => console.log("Logout pressed")}
      /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  userInfo: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    // alignItems: "center",
    flexDirection: "row",
  },
  userName: {
    fontSize: 18,
    // marginTop: 10,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    marginTop: 5,
    color: "#777",
  },
});

export default UserProfile;
