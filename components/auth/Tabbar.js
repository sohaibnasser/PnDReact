import { View, Text, Pressable, StyleSheet } from "react-native";

export const Tabbar = () => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          pressed && styles.pressed,
          styles.tabContainer,
        ]}
      >
        <Text>Schedule</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          pressed && styles.pressed,
          styles.tabContainer,
        ]}
      >
        <Text>History</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // padding: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#3696f9",
    height: 45,
    borderRadius: 4,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  tabContainer: {
    width: "46%",
    backgroundColor: "#fff",
    height: 28,
    justifyContent: "center",
    borderRadius: 4,
    alignItems: "center",
  },
});
