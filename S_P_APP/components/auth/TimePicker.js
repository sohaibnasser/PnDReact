import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatTimeWithAMPM } from "../../Util/date";

const TimePicker = ({
  title,
  onTimeChange,
  selectedTime,
  timee,
  falseValue,
}) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [dropTime, setDropTime] = useState(new Date());
  console.log("+++++++++++++++++++++++", selectedTime);

  const formatTime = (time) => {
    if (!time) {
      return;
    }
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    onTimeChange(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

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
        {title}:
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
          onPress={falseValue ? null : showPicker}
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
