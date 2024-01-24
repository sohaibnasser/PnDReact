import React, { useState } from "react";
import { Pressable, Alert, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { View } from "react-native";

function UploadDocument({ documentUri, onChangeDocument }) {
  const handleDocument = async () => {
    let pickerResult = await DocumentPicker.getDocumentAsync({
      multiple: true,
    });
    if (pickerResult.type === "success") {
      const base64Document = await FileSystem.readAsStringAsync(
        pickerResult.uri,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );
      const base64Image = `data:image/jpeg;base64,${base64Document}`;

      // onChangeDocument(base64Document);
      onChangeDocument({ imageString: base64Image });
    } else {
      alert("Didn't Select Any Document");
    }
  };

  const handlePressClose = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete the selected document?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => onChangeDocument(null),
        },
      ]
    );
  };

  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed}>
      {documentUri ? (
        <View style={styles.documentContainer}>
          <MaterialCommunityIcons
            name="file-document-outline"
            color="#3696f9"
            size={60}
          />
          <View style={styles.closeIcon}>
            <MaterialCommunityIcons
              name="close"
              color="tomato"
              size={15}
              onPress={handlePressClose}
            />
          </View>
        </View>
      ) : (
        <MaterialCommunityIcons
          name="plus-box"
          color="#3696f9"
          size={60}
          onPress={handleDocument}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  documentContainer: {
    display: "flex",
    flexDirection: "row",
  },
  pressed: {
    opacity: 0.75,
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "tomato",
  },
});

export default UploadDocument;
