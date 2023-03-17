import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { SimpleLineIcons } from "@expo/vector-icons";
import ServiceProvider from "../ServiceProvider";
import UserProfile from "../../components/UserProfile";
import { API } from "../../config";
import Icon from "../../components/Icon";
import { useContext } from "react";
import { AuthContext } from "../../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rides } from "./Rides";
import Passengers from "./Passengers";
import TermsAndConditions from "./TermsAndConditions";

function Setting() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Setting Screen</Text>
    </View>
  );
}

function Notification() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notification Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  const [state, setState] = useContext(AuthContext);
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
        <UserProfile />
        <DrawerItemList {...props} />
        <DrawerItem
          icon={({ size, color }) => (
            <Icon name="help-circle-outline" color={color} size={size} />
          )}
          label="Help"
          onPress={() => alert("Link to help")}
        />
      </DrawerContentScrollView>
      <DrawerItem
        icon={({ size, color }) => (
          <Icon name="information-outline" color={color} size={size} />
        )}
        label="About Us"
      />

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
          setState({ parentEmail: "", parentPassword: null });
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
      initialRouteName="Service Provider"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#ffffff",
          width: 220,
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
        name="Service Provider"
        component={ServiceProvider}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="car-multiple" size={size} color={color} />
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
        name="Notification"
        component={Notification}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="bell-ring-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{
          drawerIcon: ({ color, size }) => (
            <SimpleLineIcons name="settings" size={size} color={color} />
          ),
        }}
      />
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
        name="Terms & Conditions"
        component={TermsAndConditions}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="police-badge-outline" size={size} color={color} />
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
    // marginTop: 10,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    marginTop: 5,
    color: "#777",
  },
});
