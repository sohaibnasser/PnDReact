import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "../components/Icon";
const data = [
  { id: 1, name: "asad" },
  { id: 2, name: "asad" },
  { id: 3, name: "asad" },
  { id: 4, name: "asad" },
  { id: 5, name: "asad" },
  { id: 6, name: "asad" },
  { id: 7, name: "asad" },
  { id: 8, name: "asad" },
];

const ServiceProvider = () => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        key={(item) => item.id}
        numColumns={2}
        renderItem={(item) => (
          <Pressable
            style={({ pressed }) => [
              pressed && styles.pressed,
              styles.services,
            ]}
          >
            <View style={styles.service}>
              <Icon name="email" color="#fff" size={40} />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default ServiceProvider;

const styles = StyleSheet.create({
  mainContainer: {
    // padding: 8,
    alignItems: "center",
    paddingVertical: 3,
    backgroundColor: "#000000",
  },
  services: {
    maxWidth: "100%",
    width: 160,
    backgroundColor: "#1d1e1e",
    margin: 5,
    borderRadius: 4,
    elevation: 3,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  service: {
    maxWidth: "98%",
    borderRadius: 6,
    maxHeight: "23%",
    height: 150,
    alignItems: "center",
    // justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
