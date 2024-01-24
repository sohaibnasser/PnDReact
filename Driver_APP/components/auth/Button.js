import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

const Button = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed, styles.button]}
    >
      <Text style={styles.button_text}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  button: {
    flex: 1,
    maxWidth: "40%",
    width: 100,
    height: 35,
    backgroundColor: "#3bcde2",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  button_text: {
    color: "#ffffff",
  },
});
