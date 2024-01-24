import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
const deviceWidth = Dimensions.get("window").width;
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
      <Text style={{ fontWeight: "500" }}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  tabContainer: {
    maxWidth: "100%",
    width: deviceWidth / 4,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  tabbar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#3696f9",
    height: 45,
    borderRadius: 4,
    alignItems: "center",
  },
});
