import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "../components/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../Util/colors";
import * as Notifications from "expo-notifications";
import { AuthContext } from "../store/store";
import * as Device from "expo-device";

const data = [
  {
    id: 1,
    name: "Your Vehicle",

    icon: "emoticon-sad-outline",
  },
  {
    id: 2,
    name: "Your Drivers",

    icon: "seat-passenger",
  },
  {
    id: 3,
    name: "Track Drivers",

    icon: "car-clock",
  },
  {
    id: 4,
    name: "Replace Vehicle",

    icon: "seat-passenger",
  },

  {
    id: 5,
    name: "Your Ride",

    icon: "car-3-plus",
  },

  {
    id: 6,
    name: "Leaves",

    icon: "account-cog-outline",
  },
];
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  async function sendPushTokenToBackend(expoPushToken) {
    try {
      const response = await fetch(``, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expoPushToken }),
      });

      if (response.ok) {
        console.log("Expo Push Token sent successfully to the backend.");
      } else {
        console.error("Failed to send Expo Push Token to the backend.");
      }
    } catch (error) {
      console.error("Error sending Expo Push Token to backend:", error);
    }
  }
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);

    // Send the Expo Push Token to your backend
    sendPushTokenToBackend(token.data);
  } else {
    alert("Must use a physical device for Push Notifications");
  }

  return token.data;
}
const Dashboard = ({ navigation, route }) => {
  const [state] = useContext(AuthContext);
  console.log(state.spId);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(
    React.useCallback(() => {
      registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, [])
  );
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "6cccee58-ac4a-4ae0-99a3-088ecb722cbf",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use a physical device for Push Notifications");
    }

    return token;
  }

  async function sendPushTokenToServer(token) {
    // Replace 'https://your-server-url' with the actual URL of your server
    try {
      const response = await fetch(
        `http://62.72.3.95:8090/notification/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            message: "",
          }),
        }
      );

      const data = await response.json();
      console.log("Push token sent to server:", data);
    } catch (error) {
      console.error("Error sending push token to server:", error);
    }
  }

  const height = useWindowDimensions().height;
  const screenWidth = useWindowDimensions().width;
  return (
    <SafeAreaView style={[styles.mainContaier, { height }]}>
      <FlatList
        numColumns={2}
        scrollEnabled={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <View
              style={[
                styles.tilesItem,
                index % 4 === 0 || index % 4 === 3
                  ? styles.evenItem
                  : styles.oddItem,
                {
                  height: height / 4,
                },
              ]}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate(item.name, {
                    source: "dashboard",
                  })
                }
                style={({ pressed }) => [
                  pressed && styles.pressed,
                  styles.button,
                ]}
              >
                <View style={styles.innerContainer}>
                  <Icon name={item.icon} size={30} color="#fff" />
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  mainContaier: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tilesItem: {
    flex: 1,
    margin: 4,
    // maxHeight: "50%",
    elevation: 4,
    backgroundColor: colors.white,

    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    shadowOpacity: 0.25,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: { flex: 1 },
  innerContainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  evenItem: {
    backgroundColor: colors.green,
  },
  oddItem: {
    backgroundColor: colors.blue,
  },
});
