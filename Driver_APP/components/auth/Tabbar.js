import { View, Text, Pressable, StyleSheet } from "react-native";

export const Tabbar = ({ title, handlePress, color }) => {
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        pressed && styles.pressed,
        styles.tabContainer,
        color,
      ]}
    >
      <Text style={{ fontWeight: "bold" }}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  tabContainer: {
    maxWidth: "100%",
    width: 70,

    height: 28,
    justifyContent: "center",

    alignItems: "center",
  },
  tabbar: {
    // padding: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#3696f9",
    height: 45,
    borderRadius: 4,
    alignItems: "center",
  },
});
