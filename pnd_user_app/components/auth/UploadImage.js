import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const UploadImage = () => {
  const [photo, setPhoto] = React.useState(null);
  const [photoShow, setPhotoShow] = React.useState(null);
  console.log("image show uri", photoShow);
  console.log("imageuri", photo);

  const takePhotoAndUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      type: "photo",
    });

    if (result.canceled) {
      return;
    }

    let localUri = result.assets[0].uri;
    setPhotoShow(localUri);

    // let filename = localUri.split("/").pop();

    // let match = /\.(\w+)$/.exec(filename);
    // let type = match ? `image/${match[1]}` : `image`;

    // let formData = new FormData();
    // formData.append("photo", { uri: localUri, name: filename, type });

    // await axios
    //   .post(
    //     "https://c816-39-41-24-76.in.ngrok.io/mobileapi/user/parent_signup",
    //     formData,
    //     {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     }
    //   )
    //   .then((res) => {
    //     setPhoto(res.data.photo.photo);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
  };
  return (
    <Pressable style={styles.profileImage} onPress={takePhotoAndUpload}>
      {photoShow && (
        <View>
          <Image
            source={{ uri: photoShow }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginRight: 10,
  },
});

export default UploadImage;
