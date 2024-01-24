import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
// import Icon from "../Icon";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Button = ({ children, loading }) => {
  const loader = <ActivityIndicator size="small" color="white" />;
  return (
    <View style={styles.button}>
      <Text style={styles.button_text}>{loading ? loader : children}</Text>
      <Pressable style={styles.button_icon}>
        <MaterialCommunityIcons name="arrow-right" size={30} color="white" />
      </Pressable>
    </View>
  );
};
let backgroundColor = "#3696f9";

export default Button;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  button: {
    backgroundColor: backgroundColor,
    height: 50,
    borderRadius: 4,
    marginBottom: 20,
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  button_text: {
    paddingLeft: 10,
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "600",
  },
  button_icon: {
    backgroundColor: "#49bece",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // paddingLeft: 10,
    borderRadius: 4,
    paddingHorizontal: 22,
  },
});
