import * as React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import UserProfile from "../../components/UserProfile";

import Icon from "../../components/Icon";
import { useContext } from "react";
import { AuthContext } from "../../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rides } from "./Rides";
import Passengers from "./Passengers";

import Notification from "../Notification";

import { TodayRide } from "./TodayRide";
import ChangePassword from "./ChangePassword";
import { stopBackgroundUpdate } from "../../Util/BcTask";

function CustomDrawerContent(props) {
  const [state, setState] = useContext(AuthContext);
  return (
    <>
      <DrawerContentScrollView {...props}>
        <UserProfile />
        <DrawerItemList {...props} />
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
            setState({ driverEmail: "", driverId: null });
            await AsyncStorage.removeItem("@auth");
            await stopBackgroundUpdate();
          }}
        />
      </DrawerContentScrollView>
    </>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Today Ride"
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
        name="Today Ride"
        component={TodayRide}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="car-3-plus" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Your Passengers"
        component={Passengers}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="seat-passenger" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="This Month Ride"
        component={Rides}
        initialParams={{ source: "other" }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="car-3-plus" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        initialParams={{ source: "other" }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="bell-ring-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Change Password"
        component={ChangePassword}
        initialParams={{ source: "other" }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="update" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function DrawerNav() {
  return <MyDrawer />;
}
