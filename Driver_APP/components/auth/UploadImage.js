import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Icon from "../Icon";

const UploadImage = ({ takeImage, imageUrl }) => {
  const [photo, setPhoto] = React.useState(null);
  const [photoShow, setPhotoShow] = React.useState(null);
  // const [imageUrl, setImageUrl] = React.useState("");
  // console.log("image show uri", photoShow);
  // console.log("imageuri", photo);

  const takePhotoAndUpload = async () => {
    // console.log("takw iamge", takeImage);
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Camera access is required");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (pickerResult.canceled === true) {
      return;
    }
    // console.log("Picker result=>", pickerResult);
    // let base64Image = `${pickerResult.assets[0].base64}`;
    const base64Image = pickerResult.assets[0];
    // setImageUrl(base64Image);
    takeImage(base64Image);
    // console.log(base64Image);
  };
  return (
    <Pressable style={styles.profileImage} onPress={takePhotoAndUpload}>
      {imageUrl ? (
        <View>
          <Image
            source={{
              uri: imageUrl,
            }}
            style={{ width: 70, height: 70, borderRadius: 35 }}
          />
        </View>
      ) : (
        <View
          style={{
            width: 70,
            height: 70,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="camera" size={30} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 70,
    height: 70,
    backgroundColor: "#ffffff",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginRight: 10,
    borderWidth: 0.1,
    borderColorL: "black",
  },
});

export default UploadImage;
