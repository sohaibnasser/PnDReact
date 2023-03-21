import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import UserInput from "../../components/auth/UserInput";
import { TextInput } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import Icon from "../../components/Icon";
import { Ionicons } from "@expo/vector-icons";

const genderOptions = [
  //   { label: "Select Gender", value: "" },
  { label: "Driver", value: "Driver" },
  { label: "Admin", value: "Admin" },
  { label: "Non-Binary", value: "non-binary" },
  { label: "Prefer Not to Say", value: "not-specified" },
];

const Complains = ({ navigation }) => {
  navigation.setOptions({
    headerLeft: () => (
      <Pressable style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color="white" />
      </Pressable>
    ),
    headerRight: () => (
      <Pressable
        // onPress={() => navigation.navigate("")}
        style={({ pressed }) => [
          pressed && styles.pressed,
          styles.headerRightButton,
        ]}
      >
        <Icon name="plus-box" color="#3696f9" size={33} />
      </Pressable>
    ),
  });
  const [parentGender, setParentGender] = useState("");
  const [complainTo, setCompmlainTo] = useState("");
  // const [isChecked, setChecked] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={styles.dropDown}>
            <View style={styles.dropDownContent}>
              <Text style={styles.text}>From:</Text>
              <Picker
                style={{ width: 240 }}
                selectedValue={complainTo}
                onValueChange={(itemValue) => setCompmlainTo(itemValue)}
              >
                {genderOptions.map((option) => (
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
                selectedValue={parentGender}
                onValueChange={(itemValue) => setParentGender(itemValue)}
              >
                {genderOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        {/* <View>
          <Text style={{ color: "gray" }}>Problem</Text>
        </View> */}
        {/* <View style={styles.problemContainer}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#4630EB" : undefined}
            />
            <Text>Problem statement </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#4630EB" : undefined}
            />
            <Text>Problem statement </Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#4630EB" : undefined}
            />
            <Text>Problem statement</Text>
          </View>
        </View> */}
        {/* additional comments */}
        <View style={styles.commentsBox}>
          <TextInput
            placeholder="Additional comments"
            style={styles.textArea}
            multiline={true}
            pla
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Complains;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
    // justifyContent: "space-between",
  },
  dropDown: {
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 10,
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
  // checkbox: {
  //   flex: 1,
  //   borderRadius: 10,
  //   borderWidth: 1.5,
  //   borderColor: "#4630EB",
  //   marginRight: 10,
  // },
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
    // marginTop: 100,
  },
  headerRightButton: {
    // alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    // marginTop: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
