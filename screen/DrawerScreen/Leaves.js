import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Icon from "../../components/Icon";

const Leaves = ({ navigation }) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{ marginLeft: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("Add Passengers")}
          style={({ pressed }) => [
            pressed && styles.pressed,
            styles.headerRightButton,
          ]}
        >
          <Icon name="plus-box" color="#3696f9" size={33} />
        </Pressable>
        // <Pressable style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
        //   <Ionicons name="arrow-back-outline" size={24} color="white" />
        // </Pressable>
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>Leaves</Text>
    </View>
  );
};

export default Leaves;

const styles = StyleSheet.create({
  headerRightButton: {
    justifyContent: "center",
    paddingTop: 10,
    paddingRight: 10,
  },
});
