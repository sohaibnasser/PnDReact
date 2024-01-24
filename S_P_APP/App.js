import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import RootNavigation from "./navigation";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // useEffect(() => {
  //   async function configurePushNotifications() {
  //     const { status } = await Notifications.getPermissionsAsync();
  //     let finalStatus = status;

  //     if (finalStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }

  //     if (finalStatus !== "granted") {
  //       Alert.alert(
  //         "Permission required",
  //         "Push notifications need the appropriate permissions."
  //       );
  //       return;
  //     }

  //     const pushTokenData = await Notifications.getExpoPushTokenAsync();
  //     console.log(pushTokenData);

  //     if (Platform.OS === "android") {
  //       Notifications.setNotificationChannelAsync("default", {
  //         name: "default",
  //         importance: Notifications.AndroidImportance.DEFAULT,
  //       });
  //     }
  //   }

  //   configurePushNotifications();
  // }, []);

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
