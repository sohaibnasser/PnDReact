import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";

// import SignIn from "./screen/SignIn";
// import CreateUser from "./screen/CreateUser";
// import PhoneVerification from "./screen/PhoneVerification";
// import ForgotPassword from "./screen/ForgotPassword";
// import Home from "./screen/Home";
// import ServiceProvider from "./screen/ServiceProvider";
// import { Provider } from "react-redux";
// import { AuthProvider, store } from "./store/store.js";
// import UserProfile from "./components/UserProfile";
// import DrawerNav from "./screen/DrawerScreen/DrawerNav";
// import ScreenNav from "./components/nav/ScreenNav";
import RootNavigation from "./navigation";

// const Drawer = createDrawerNavigator();

SplashScreen.preventAutoHideAsync();
// const Stack = createNativeStackNavigator();

// <Drawer.Navigator
//   useLegacyImplementation
// drawerContent={(props) => <DrawerNav {...props} />}
//   screenOptions={{
//     drawerStyle: {
//       backgroundColor: "#ffffff",
//       width: 240,
//       marginTop: 40,
//       borderTopRightRadius: 5,
//     },
//     headerStyle: {
//       backgroundColor: "#191b28",
//     },
//     headerTitleStyle: {
//       color: "#ffffff",
//       // use your preferred color code
//     },
//     headerTintColor: "#ffffff",
//   }}
// >
// <Drawer.Screen name="Service Provider" component={ServiceProvider} />
// <Drawer.Screen name="Feed" component={Home} />
{
  /* <Drawer.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */
}
// </Drawer.Navigator>
// );

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
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

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="light" />

      <RootNavigation />
    </SafeAreaView>
  );
}
