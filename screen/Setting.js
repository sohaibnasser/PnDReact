import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Icon from "../components/Icon";
import { Ionicons } from "@expo/vector-icons";

const Setting = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{ marginLeft: 20 }}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Pressable style={styles.iconName}>
        <Ionicons size={20} color="gray" name="person-outline" />
        <Text style={styles.text}>Profile</Text>
      </Pressable>
      <Pressable style={styles.iconName}>
        <Ionicons size={20} color="gray" name="settings-outline" />
        <Text style={styles.text}>General</Text>
      </Pressable>
      <Pressable style={styles.iconName}>
        <Ionicons size={20} color="gray" name="md-calendar-outline" />
        <Text style={styles.text}>Calendar</Text>
      </Pressable>
      <Pressable style={styles.iconName}>
        <Ionicons size={20} color="gray" name="help-buoy-outline" />
        <Text style={styles.text}>Support</Text>
      </Pressable>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  iconName: { flexDirection: "row", marginVertical: 10 },
  text: {
    fontSize: 15,
    marginLeft: 15,
    fontWeight: "700",
  },
});
