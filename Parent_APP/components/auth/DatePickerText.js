import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "../Icon";
import { colors } from "../../Util/colors";

const DatePickerText = ({ title, dateFrom, onDateChange }) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  // const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
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
        <TextInput value={dateFrom?.toLocaleDateString()} editable={false} />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: [{ translateY: -10 }],
          }}
          onPress={showPicker}
        >
          <Icon name="calendar" size={24} color={colors.blue} />
        </TouchableOpacity>
      </View>
      {/* The date picker */}
      {isPickerShow && (
        <DateTimePicker
          testID="datePicker"
          minimumDate={new Date()}
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

export default DatePickerText;
