import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "../components/Icon";

const data = [
  {
    id: 1,
    name: "Your Ride",

    backgroundColor: "#55cd85",
    icon: "car-multiple",
  },
  {
    id: 2,
    name: "Complains",

    backgroundColor: "#3497fd",
    icon: "emoticon-sad-outline",
  },
  {
    id: 3,
    name: "Notification",

    backgroundColor: "#3497fd",
    icon: "bell-ring-outline",
  },
  {
    id: 4,
    name: "Profile",

    backgroundColor: "#55cd85",
    icon: "account-outline",
  },
  {
    id: 5,
    name: "Setting",
    backgroundColor: "#55cd85",
    icon: "account-cog-outline",
  },
  {
    id: 6,
    name: "Passenger",
    backgroundColor: "#3497fd",
    icon: "seat-passenger",
  },
];

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.mainContaier}>
      <FlatList
        numColumns={2}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <View
            style={[
              styles.tilesItem,
              { backgroundColor: item.item.backgroundColor },
            ]}
          >
            <Pressable
              onPress={() => navigation.navigate(item.item.name)}
              style={({ pressed }) => [
                pressed && styles.pressed,
                styles.button,
              ]}
            >
              <View style={styles.innerContainer}>
                <Icon name={item.item.icon} size={40} color="#fff" />
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  {item.item.name}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  mainContaier: {
    flex: 1,
    backgroundColor: "white",
  },
  tilesItem: {
    flex: 1,
    margin: 4,
    height: 150,
    elevation: 4,
    backgroundColor: "white",

    shadowColor: "black",
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
});
