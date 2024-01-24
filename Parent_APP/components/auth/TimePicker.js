import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import moment from "moment";

import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TimePicker = ({ title, onTimeChange, selectedTime }) => {
  const [isPickerShow, setIsPickerShow] = useState(false);

  const formatTime = (time) => {
    if (!time) {
      return;
    }

    const formattedLocalTime = moment(time).format("YYYY-MM-DD hh:mm:ss A");
    const formattedTime = moment(
      formattedLocalTime,
      "YYYY-MM-DD hh:mm:ss A"
    ).format("hh:mm A");

    return formattedTime;
  };

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
    onTimeChange(value);
  };
  const offset = new Date().getTimezoneOffset() * -1;
  console.log("offset", offset);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
      }}
    >
      <Text
        style={{
          marginRight: 10,
          color: "#3696f9",
          fontSize: 15,
          fontWeight: "500",
        }}
      >
        {title}
      </Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TextInput value={formatTime(selectedTime)} editable={false} />

        <TouchableOpacity
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: [{ translateY: -10 }],
          }}
          onPress={showPicker}
        >
          <MaterialCommunityIcons
            name="clock-time-eight-outline"
            size={24}
            color="#3696f9"
          />
        </TouchableOpacity>
      </View>
      {/* The date picker */}
      {isPickerShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedTime}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={false}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default TimePicker;
