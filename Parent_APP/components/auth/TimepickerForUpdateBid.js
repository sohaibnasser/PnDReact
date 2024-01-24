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

const TimepickerForUpdateBid = ({ title, onTimeChange, selectedTime }) => {
  console.log("TimePicker", selectedTime);
  // const checkingTime = moment(selectedTime).format(
  //   "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
  // );
  const [isPickerShow, setIsPickerShow] = useState(false);

  const formatTime = (time) => {
    console.log("tomewawe", time);
    if (!time) {
      return;
    }
    const localTime = moment.utc(time);
    const formattedLocalTime = localTime.format("YYYY-MM-DD hh:mm:ss A");
    console.log("local", formattedLocalTime); // This will log the local time in the desired format

    const formattedTime = localTime.format("hh:mm A");
    console.log("formattedTime", formattedTime);
    return formattedTime;
    // let hours = time.getHours();
    // const minutes = time.getMinutes();
    // console.log(hours, minutes);
    // const amPM = hours >= 12 ? "PM" : "AM";

    // hours %= 12;
    // hours = hours || 12;
    // return `${hours}:${minutes.toString().padStart(2, "0")} ${amPM}`;
    // console.log(formattedHours, formattedMinutes);

    // return `${formattedHours}:${formattedMinutes} ${period}`;
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
  //   const offset = new Date().getTimezoneOffset() * -1;
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
          value={selectedTime}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={false}
          onChange={onChange}
          timeZoneOffsetInMinutes={0}
        />
      )}
    </View>
  );
};

export default TimepickerForUpdateBid;
