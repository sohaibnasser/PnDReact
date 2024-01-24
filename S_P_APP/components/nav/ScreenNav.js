import React, { useContext } from "react";
import SignIn from "../../screen/SignIn";
import CreateUser from "../../screen/CreateUser";
import PhoneVerification from "../../screen/PhoneVerification";
import ForgotPassword from "../../screen/ForgotPassword";

import { AuthContext } from "../../store/store.js";

import DrawerNav from "../../screen/DrawerScreen/DrawerNav";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddDriver from "../../screen/AddDriver";
import Notification from "../../screen/Notification";
import ServiceProviderDetails from "../../screen/ServiceProviderDetails";
import AddVehicle from "../../screen/AddVehicle";
import AddLeaves from "../../screen/AddLeaves";

import UpdateDriver from "../../screen/DrawerScreen/UpdateDriver";
import Map from "../../screen/Map";

import UpdateVehicle from "../../screen/UpdateVehicle";
import TrackLocation from "../../screen/TrackLocation";
import UpdateLeave from "../../screen/UpdateLeave";
import UpdateBid from "../../screen/UpdateBid";

const Stack = createNativeStackNavigator();

function Root() {
  return <DrawerNav />;
}

const ScreenNav = () => {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.spEmail !== "";
  console.log("AUTHENTICATED => main", authenticated);
  return (
    <Stack.Navigator
      initialRouteName={authenticated ? "Services" : "SignIn"}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#191b28",
        },
        headerTintColor: "#ffffff",
      }}
    >
      {!authenticated ? (
        // <Stack.Group>
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Create Account" component={CreateUser} />
          <Stack.Screen name="Verification" component={PhoneVerification} />
          <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Services"
            component={Root}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Add Driver" component={AddDriver} />
          <Stack.Screen
            name="Notification"
            component={Notification}
            initialParams={{ source: "other" }}
          />
          <Stack.Screen
            name="Service Provider Details"
            component={ServiceProviderDetails}
          />

          <Stack.Screen name="Add Vehicle" component={AddVehicle} />
          <Stack.Screen name="Add Leave" component={AddLeaves} />
          <Stack.Screen name="Update Driver" component={UpdateDriver} />

          <Stack.Screen name="Update Vehicle" component={UpdateVehicle} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Track Location" component={TrackLocation} />
          <Stack.Screen name="Update Leave" component={UpdateLeave} />
          <Stack.Screen name="Update Bid" component={UpdateBid} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenNav;
