import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import UserInput from "../components/auth/UserInput";
import { TextInput } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import Icon from "../components/Icon";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/auth/Button";

const From = [
  //   { label: "Select Gender", value: "" },
  { label: "Admin", value: "Admin" },
  { label: "Service Provider", value: "Service Provider" },
];
const Against = [
  //   { label: "Select Gender", value: "" },
  { label: "Service Provider1", value: "Service Provider1" },
  { label: "Service Provider2", value: "Service Provider2" },
];

const AddComplain = ({ navigation }) => {
  const [complainFrom, setComplainFrom] = useState("");
  const [complainTo, setCompmlainTo] = useState("");
  // const [isChecked, setChecked] = useState(false);

  return (
    // <ScrollView>
    <ScrollView style={[styles.container]}>
      <View>
        <View style={styles.dropDown}>
          <View style={styles.dropDownContent}>
            <Text style={styles.text}>From:</Text>
            <Picker
              style={{ width: 240 }}
              selectedValue={complainTo}
              onValueChange={(itemValue) => setCompmlainTo(itemValue)}
            >
              {From.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.dropDown}>
          <View style={styles.dropDownContent}>
            <Text style={styles.text}>Against:</Text>
            <Picker
              style={{ width: 240 }}
              selectedValue={complainFrom}
              onValueChange={(itemValue) => setComplainFrom(itemValue)}
            >
              {Against.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.commentsBox}>
          <TextInput
            placeholder="Additional comments"
            style={styles.textArea}
            multiline={true}
          />
        </View>
      </View>
      <Pressable>
        <Button>SAVE</Button>
      </Pressable>
    </ScrollView>
  );
};

export default AddComplain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  dropDown: {
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 8,
  },
  text: {
    color: "gray",
    fontSize: 15,
    width: 50,
    maxWidth: "50%",
  },
  dropDownContent: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    marginLeft: 10,
  },
  problemContainer: {
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },

  textArea: {
    textAlignVertical: "top",
    flex: 1,
  },
  commentsBox: {
    elevation: 4,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    padding: 8,
    height: 120,
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: "white",
  },
});
