import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const UserInput = ({
  placeholder,
  autoCapitalize = "none",
  secureTextEntry,
  keyboardType,
  value,
  setValue,
}) => {
  return (
    <TextInput
      style={styles.inputFiled}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
    />
  );
};

export default UserInput;

const styles = StyleSheet.create({
  inputFiled: {
    flex: 1,
    marginHorizontal: 5,
  },
});
