import React, { useContext, useEffect } from "react";
import SignIn from "../../screen/SignIn";

import ForgotPassword from "../../screen/ForgotPassword";

import { AuthContext } from "../../store/store.js";

import DrawerNav from "../../screen/DrawerScreen/DrawerNav";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notification from "../../screen/Notification";

import Map from "../../screen/Map";

import TrackLocation from "../../screen/TrackLocation";

const Stack = createNativeStackNavigator();
function Root() {
  return <DrawerNav />;
}

const ScreenNav = () => {
  const [state, setState] = useContext(AuthContext);
  const authenticated =
    state && state?.driverEmail !== "" && state?.driverId !== "";
  return (
    <Stack.Navigator
      initialRouteName={authenticated ? "Today Ride" : "SignIn"}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#191b28",
        },
        headerTintColor: "#ffffff",
      }}
    >
      {!authenticated ? (
        <>
          <Stack.Screen name="SignIn" component={SignIn} />

          <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Passengers"
            component={Root}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Notification" component={Notification} />

          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Track Location" component={TrackLocation} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenNav;
