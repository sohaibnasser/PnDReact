// import * as React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDrawerStatus } from "@react-navigation/drawer";
// import { API, mobileApi } from "../config";
import { useIsFocused } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import Dashboard from "../Dashboard";
import UserProfile from "../../components/UserProfile";
import { API, mobileApi } from "../../config";
import Icon from "../../components/Icon";
import { useContext } from "react";
import { AuthContext } from "../../store/store";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rides } from "./Rides";
import Passengers from "./Passengers";
// import TermsAndConditions from "./TermsAndConditions";
import Profile from "./Profile";
import Notification from "../Notification";
import Setting from "../Setting";
import Complains from "./Complains";
// import AskForBid from "./AskForBid";
import Leaves from "./Leaves";
import WebView from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import UpdatePackage from "./UpdatePackage";
import Bids from "./Bids";
import AskForBid from "../AskForBid";
import AskBid from "./AskBid";
import Rating from "../../components/Rating";

function TermsAndConditions({ navigation }) {
  // React.useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <Pressable
  //         style={{ marginLeft: 20 }}
  //         onPress={() => navigation.goBack()}
  //       >
  //         <Ionicons name="arrow-back-outline" size={24} color="white" />
  //       </Pressable>
  //     ),
  //   });
  // }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: "https://google.com" }} />
    </View>
  );
}

function AboutUs({ navigation }) {
  // React.useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <Pressable
  //         style={{ marginLeft: 20 }}
  //         onPress={() => navigation.goBack()}
  //       >
  //         <Ionicons name="arrow-back-outline" size={24} color="white" />
  //       </Pressable>
  //     ),
  //   });
  // }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: "https://google.com" }} />
    </View>
  );
}

function Privacy({ navigation }) {
  // React.useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <Pressable
  //         style={{ marginLeft: 20 }}
  //         onPress={() => navigation.goBack()}
  //       >
  //         <Ionicons name="arrow-back-outline" size={24} color="white" />
  //       </Pressable>
  //     ),
  //   });
  // }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: "https://google.com" }} />
    </View>
  );
}

function CustomDrawerContent(props) {
  // const navigation = useNavigation();
  const [state, setState] = useContext(AuthContext);
  const states = useDrawerStatus();
  const [parentID, setParentID] = useState("");
  const [profile, setProfile] = useState("");
  const [imagee, setImagee] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log("state", states);
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      console.log("ParentId of Profile", data);
      const id = JSON.parse(data);
      setParentID(id.parentId);
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
  }, [parentID, states]);
  const getImage = async () => {
    if (profile?.imageUrl) {
      const response = await fetch(
        `${mobileApi}/image/downloadImage/${profile?.imageUrl}`
      );
      setImagee(response.url);
    }
  };

  useEffect(() => {
    getImage();
  }, [profile?.imageUrl]);

  //   const [state, setState] = React.useState("");
  //   async function getUserData() {
  //     const response = await fetch(`${API}/profile/6`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const responseData = await response.json();
  //     console.log("userProfile data", responseData.result.otp);
  //     setState(responseData);
  //     //   return responseData;
  //     //   console.log("response Data", responseData);
  //     //   setIsLoading(false);
  //     //   if (responseData.message === "success") {
  //     //     alert("An Otp is sent to your given Email");
  //     //     navigation.navigate("SignIn");

  //     // setIsLoading(false);
  //     //   } else {
  //     //     // store to context
  //     //     // setState(data);
  //     //     // store to asyncstorage
  //     //     // await AsyncStorage.setItem("@auth", JSON.stringify(data));
  //     //     // setIsLoading(false);
  //     //     alert(responseData.error);
  //     //   }
  //     //   } catch (error) {
  //     //     console.log("not ", error.message);
  //     //     alert(error.message);
  //     //     // setIsLoading(false);
  //     //   }
  //   }
  //   React.useEffect(() => {
  //     getUserData();
  //   }, []);
  return (
    <>
      <DrawerContentScrollView {...props}>
        {/* <View style={styles.userInfo}>
          <Image
            source={require("../../assets/splash_bg.png")}
            size={80}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
          <Text style={styles.userName}>{state.result.parentName}</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View> */}
        {/* <View
          style={{ marginLeft: 21 }}
          onPress={() => {
            console.log("pressed");
          }}
        >
          <Icon name="arrow-left-thin" size={40} color="green" />
        </View> */}
        {/* <UserProfile /> */}
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
        <DrawerItemList {...props} />
        {/* <DrawerItem
          icon={({ size, color }) => (
            <Icon name="help-circle-outline" color={color} size={size} />
          )}
          label="About Us"
          onPress={AboutUs}
        />
        <DrawerItem
          icon={({ size, color }) => (
            <Icon name="help-circle-outline" color={color} size={size} />
          )}
          label="Privacy"
          onPress={AboutUs}
        /> */}
      </DrawerContentScrollView>

      <DrawerItem
        icon={({ size, color }) => (
          <Icon
            name="arrow-left-thin-circle-outline"
            color={color}
            size={size}
          />
        )}
        label="Logout"
        onPress={async () => {
          setState({ parentEmail: "", parentPassword: null, parentId: null });
          await AsyncStorage.removeItem("@auth");
        }}
      />
    </>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#ffffff",
          maxWidth: "100%",
          width: "75%",
          marginTop: 40,
          borderTopRightRadius: 5,
        },

        headerStyle: {
          backgroundColor: "#191b28",
        },
        headerTitleStyle: {
          color: "#ffffff",
          // use your preferred color code
        },
        headerTintColor: "#ffffff",
      }}
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="car-multiple" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Ask Bid"
        component={AskBid}
        // options={{
        //   drawerItemStyle: {
        //     display: "none",
        //   },
        // }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="car-multiple" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Bids"
        component={Bids}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="car-clock" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Your Ride"
        component={Rides}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="car-3-plus" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Complains"
        component={Complains}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="emoticon-sad-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="bell-ring-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Update Package"
        component={UpdatePackage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="update" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="account-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{
          drawerIcon: ({ color, size }) => (
            // <SimpleLineIcons name="settings" size={size} color={color} />
            <Icon name="account-cog-outline" size={size} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Passenger"
        component={Passengers}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="seat-passenger" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Leaves"
        component={Leaves}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="map-marker-minus-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="About Us"
        component={TermsAndConditions}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="police-badge-outline" size={size} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Terms & Conditions"
        component={TermsAndConditions}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="police-badge-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="information-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Privacy"
        component={Privacy}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="security" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function DrawerNav() {
  return <MyDrawer />;
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
    marginTop: 10,
    fontWeight: "",
  },
  userEmail: {
    fontSize: 14,
    marginTop: 5,
    color: "#777",
  },
});
