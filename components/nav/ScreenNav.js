import { View, Text } from "react-native";
import React, { useContext } from "react";
import SignIn from "../../screen/SignIn";
import CreateUser from "../../screen/CreateUser";
import PhoneVerification from "../../screen/PhoneVerification";
import ForgotPassword from "../../screen/ForgotPassword";
import Home from "../../screen/Home";
import ServiceProvider from "../../screen/ServiceProvider";
import { Provider } from "react-redux";
import { AuthContext, AuthProvider, store } from "../../store/store.js";
import UserProfile from "../../components/UserProfile";
import DrawerNav from "../../screen/DrawerScreen/DrawerNav";
// import DrawerNav from "../../screen/DrawerScreen/DrawerNav";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPassenger from "../../screen/AddPassenger";
// import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
function Root() {
  return <DrawerNav />;
}

const ScreenNav = () => {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state;
  console.log("AUTHENTICATED =>", authenticated);
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#191b28",
        },
        headerTintColor: "#ffffff",
      }}
    >
      {/* {authenticated ? ( */}
      <Stack.Screen
        name="Services"
        component={Root}
        options={{ headerShown: false }}
      />
      {/* ) : ( */}
      <>
        {/* <Stack.Screen
            name="Services"
            component={Root}
            options={{ headerShown: false }}
            // options={{ headerLeft: () => <DrawerNav /> }}
          /> */}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Create Account" component={CreateUser} />
        <Stack.Screen name="Verification" component={PhoneVerification} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        {/* <Stack.Screen
            name="Services"
            component={ServiceProvider}
            options={{ headerLeft: () => <DrawerNav /> }}
          /> */}
      </>
      {/* )} */}

      <Stack.Screen
        name="Add Passengers"
        component={AddPassenger}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ScreenNav;
