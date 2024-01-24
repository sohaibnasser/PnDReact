import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Dashboard from "../Dashboard";
import Icon from "../../components/Icon";
import { useContext } from "react";
import { AuthContext } from "../../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rides } from "./Rides";
import YourDriver from "./YourDriver";
import Profile from "./Profile";
import Notification from "../Notification";
import YourVehicle from "./YourVehicle";
import Leaves from "./Leaves";
import TrackDrivers from "./TrackDrivers";
import ReplaceVehicle from "./ReplaceVehicle";
import Bids from "./Bids";

function CustomDrawerContent(props) {
  const [state, setState] = useContext(AuthContext);
  return (
    <>
      <DrawerContentScrollView {...props}>
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
            setState({ spEmail: "", spId: null });
            await AsyncStorage.removeItem("@auth");
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
        name="Your Vehicle"
        component={YourVehicle}
        initialParams={{ source: "other" }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="emoticon-sad-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Your Drivers"
        component={YourDriver}
        initialParams={{ source: "other" }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="seat-passenger" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Track Drivers"
        component={TrackDrivers}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="car-clock" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Replace Vehicle"
        component={ReplaceVehicle}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="car-clock" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Leaves"
        component={Leaves}
        initialParams={{ source: "other" }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="map-marker-minus-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        initialParams={{ source: "other" }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="account-outline" size={size} color={color} />
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
        name="Your Ride"
        component={Rides}
        initialParams={{ source: "other" }}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="car-3-plus" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Bids"
        component={Bids}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="car-3-plus" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function DrawerNav() {
  return <MyDrawer />;
}
