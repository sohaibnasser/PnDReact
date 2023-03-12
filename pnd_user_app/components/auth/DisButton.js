import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "../Icon";

const DisButton = ({ children, onSubmit, isLoading }) => {
  return (
    <View style={styles.button} onPress={onSubmit}>
      <Text style={styles.button_text}>
        {isLoading ? "please wait.." : children}
      </Text>
      <Pressable
        style={({ pressed }) => [styles.button_icon, pressed && styles.pressed]}
      >
        <Icon name="arrow-right" size={30} color="white" />
      </Pressable>
    </View>
  );
};
let backgroundColor = "#bababa";

export default DisButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  button: {
    backgroundColor: backgroundColor,
    height: 50,
    borderRadius: 4,
    marginBottom: 20,
    marginTop: 30,
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
    backgroundColor: "#a3a3a3",
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
    borderRadius: 4,
    paddingHorizontal: 22,
  },
});
