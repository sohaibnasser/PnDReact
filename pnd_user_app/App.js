// import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";

import SignIn from "./screen/SignIn";
import CreateUser from "./screen/CreateUser";
import PhoneVerification from "./screen/PhoneVerification";
import ForgotPassword from "./screen/ForgotPassword";
import Home from "./screen/Home";
import ServiceProvider from "./screen/ServiceProvider";
import { Provider } from "react-redux";
import { store } from "./store/store";

// const Drawer = createDrawerNavigator();

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // function Root() {
  //   return (
  //     <Drawer.Navigator>
  //       <Drawer.Screen name="Home" component={Home} />
  //       <Drawer.Screen name="Profile" component={Profile} />
  //       <Stack.Screen name="Settings" component={Settings} />
  //     </Drawer.Navigator>
  //   );
  // }

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      {/* <Provider store={store}> */}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Sign In"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#191b28",
            },
            headerTintColor: "#ffffff",
          }}
        >
          {/* <Stack.Screen
            name="Root"
            component={Root}
            // options={{ headerShown: false }}
          /> */}
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Dashboard" component={ServiceProvider} />
          <Stack.Screen name="Sign Up" component={CreateUser} />
          <Stack.Screen name="OTP Verification" component={PhoneVerification} />
          <Stack.Screen name="Forgot Password" component={ForgotPassword} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </Provider> */}
    </SafeAreaView>
  );
}
