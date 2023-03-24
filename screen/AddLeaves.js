import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";

const From = [
  //   { label: "Select Gender", value: "" },
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
];
const Against = [
  //   { label: "Select Gender", value: "" },
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
];
const AddLeaves = () => {
  const [isChecked, setChecked] = useState(false);
  const [complainFrom, setComplainFrom] = useState("");
  const [complainTo, setCompmlainTo] = useState("");
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardData}>
          <View>
            <Text style={{ color: "#b7b7b7" }}>Select Passenger(s)</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxs}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#3696f9" : undefined}
              />
              {/* <KidsSelection kids={kids} /> */}
            </View>
            <Text style={[styles.passengerName, { alignSelf: "center" }]}>
              Kid1
            </Text>
            <View style={styles.checkboxs}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#3696f9" : undefined}
              />
            </View>
            <Text style={[styles.passengerName, { alignSelf: "center" }]}>
              Kid1
            </Text>
            <View style={styles.checkboxs}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#3696f9" : undefined}
              />
            </View>
            <Text style={[styles.passengerName, { alignSelf: "center" }]}>
              Kid1
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={styles.dayAndTime}>Announced</Text>
            <Text>Toggle Button</Text>
          </View>

          {/* <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={styles.dayAndTime}>Monday</Text>
            <Text style={styles.dayAndTime}>Friday</Text>
          </Pressable>
          <Pressable
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.dayAndTime}>Remarks</Text>
            <Text style={styles.dayAndTime}>Announced</Text>
          </Pressable> */}
        </View>
      </View>
      <View>
        <View style={styles.dropDown}>
          <View style={styles.dropDownContent}>
            <Text style={styles.text}>From:</Text>
            <Picker
              style={{ maxWidth: "100%", width: 240 }}
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
            <Text style={styles.text}>To:</Text>
            <Picker
              style={{ maxWidth: "100%", width: 240 }}
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
            placeholder="Remarks"
            style={styles.textArea}
            multiline={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddLeaves;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
    stickyHeaderHiddenOnScroll: false,
  },
  card: {
    width: "100%",

    backgroundColor: "#fff",
    // marginVertical: 10,
    marginTop: 20,
    elevation: 4,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
  },
  cardData: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },
  dayAndTime: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "bold",
    color: "#3696f9",
  },
  checkbox: {
    borderRadius: 20,
    padding: 12,
    // marginRight: 10,
    borderWidth: 0,
    alignSelf: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    // borderBottomWidth: 0.4,
    // color: "gray",
  },
  checkboxs: {
    width: 30,
    height: 30,
    backgroundColor: "gray",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",

    marginVertical: 10,
  },
  passengerName: {
    fontWeight: "500",
    fontSize: 18,
    marginHorizontal: 10,
  },
  dropDown: {
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 8,
  },
  dropDownContent: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    marginLeft: 10,
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
  text: {
    color: "gray",
    fontSize: 15,
    width: 50,
    maxWidth: "50%",
  },
});
