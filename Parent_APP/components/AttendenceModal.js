import { View, Text, Modal, Button, StyleSheet } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../Util/colors";

const AttendenceModal = ({
  visible,
  onClose,
  onYesCheckboxChange,
  onNoCheckboxChange,
  yesChecked,
  noChecked,
  value,
  onChangeText,
}) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: "white",
          height: 200,
          marginTop: "auto",
          marginBottom: "auto",
          borderRadius: 4,
        }}
      >
        <View style={styles.checkboxs}>
          <View style={styles.CheckboxContainer}>
            <Checkbox
              value={yesChecked}
              onValueChange={onYesCheckboxChange}
              style={styles.checkboxstyle}
              color={yesChecked ? "#3696f9" : undefined}
            />
            <Text style={styles.checkboxText}>Driver</Text>
          </View>

          <View style={styles.CheckboxContainer}>
            <Checkbox
              value={noChecked}
              onValueChange={onNoCheckboxChange}
              style={[styles.checkboxstyle, { marginStart: 10 }]}
              color={noChecked ? "#3696f9" : undefined}
            />
            <Text style={styles.checkboxText}>Vehicle</Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: colors.grey,
            borderRadius: 4,
            padding: 5,
            maxWidth: "100%",
            marginHorizontal: 10,
            height: "40%",
            marginVertical: 10,
          }}
        >
          <TextInput
            value={value}
            onChangeText={onChangeText}
            multiline
            placeholder="Comments"
          />
        </View>
        <View
          style={[
            {
              alignSelf: "center",
              width: 100,
              paddingVertical: 5,
            },
          ]}
        >
          <Button title="OK" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal_mainContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  checkboxstyle: {
    borderRadius: 10,
    // backgroundColor: "transparent",
  },
  checkboxText: {
    marginRight: 5,
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "500",
    color: "#3696f9",
  },
  CheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default React.memo(AttendenceModal);
