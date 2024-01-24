import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, View, Text, StyleSheet, Pressable } from "react-native";

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState("");
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  //   console.log("first", cameraPermissionInformation);
  //   console.log("second", requestPermission);
  //   this Below code is for ios from line 14 to 27
  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
      //it is boolean and return if permission granted else false
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Need to grant Camera permission");

      return false;
    }
    // retun false because verifyPermission give true if access is granted otherwise false
    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
  }
  let ImagePickedFromCamera = (
    <Text style={{ color: "black" }}>No image Picked</Text>
  );
  if (pickedImage) {
    ImagePickedFromCamera = (
      <Image style={styles.image} source={{ uri: pickedImage }} />
    );
  }
  return (
    <Pressable onPress={takeImageHandler}>
      <View style={styles.imagePreview}>{ImagePickedFromCamera}</View>
      {/* <Button title="Take Image" onPress={takeImageHandler} /> */}
    </Pressable>
  );
}
export default ImagePicker;
const styles = StyleSheet.create({
  imagePreview: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 50,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
