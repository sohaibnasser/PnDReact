import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import Icon from "../Icon";

const DatePickerTextInput = ({ title, dateFrom, onDateChange }) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  // const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    // console.log("value", value);
    onDateChange(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",

        borderRadius: 4,
        paddingVertical: 8,
      }}
    >
      <Text
        style={{
          // marginRight: 10,
          color: "#3696f9",
          fontSize: 15,
          fontWeight: "bold",
          maxWidth: "20%",
          width: 32,
          // alignSelf: "center",
        }}
      >
        {title}:
      </Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TextInput value={dateFrom.toLocaleDateString()} editable={false} />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: [{ translateY: -10 }],
          }}
          onPress={showPicker}
        >
          <Icon name="calendar" size={24} color="#3696f9" />
        </TouchableOpacity>
      </View>
      {/* The date picker */}
      {isPickerShow && (
        <DateTimePicker
          value={dateFrom}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePickerTextInput;
