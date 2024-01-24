import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { useWindowDimensions } from "react-native";
import { ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "../components/Icon";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../Util/colors";

const data = [
  {
    id: 1,
    name: "Ask Bid",

    icon: "car-multiple",
  },
  {
    id: 2,
    name: "Bids",

    icon: "car-clock",
  },

  {
    id: 3,
    name: "Your Ride",

    icon: "car-3-plus",
  },
  {
    id: 4,
    name: "Complains",

    icon: "emoticon-sad-outline",
  },
  {
    id: 5,
    name: "Notification",

    icon: "bell-ring-outline",
  },
  {
    id: 6,
    name: "Profile",

    icon: "account-outline",
  },
  {
    id: 7,
    name: "Leaves",

    icon: "account-cog-outline",
  },
  {
    id: 8,
    name: "Passenger",

    icon: "seat-passenger",
  },
];

const Dashboard = ({ navigation, route }) => {
  const height = useWindowDimensions().height;
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
                  height: height / 5 - 6,
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
