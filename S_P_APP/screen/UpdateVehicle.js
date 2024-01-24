import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import UserInput from "../components/auth/UserInput";
import { TextInput } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import Icon from "../components/Icon";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/auth/Button";
import SwipButton from "../components/auth/SwipButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { mobileApi } from "../config";
import UploadImage from "../components/auth/UploadImage";
import { useEffect } from "react";
import Activityindicator from "../components/Activityindicator";
import UploadDocument from "../components/auth/UploadDocument";
import UploadDocumentList from "../components/auth/UploadDocumentList";
import FormDocumentPicker from "../components/auth/FormDocumentPicker";
import { colors } from "../Util/colors";
const width = Dimensions.get("window").width;
const From = [
  //   { label: "Select Gender", value: "" },

  { label: "Service Provider", value: "Service Provider", id: 1 },
  { label: "Admin", value: "Admin", id: 2 },
];
const ComplainStatus = [
  //   { label: "Select Gender", value: "" },

  { label: "Resolved", value: "Resolved", id: 1 },
  { label: "Pending", value: "Pending", id: 2 },
];
const Against = [
  //   { label: "Select Gender", value: "" },
  { label: "Service Provider1", value: "Service Provider1" },
  { label: "Service Provider2", value: "Service Provider2" },
];

const UpdateVehicle = ({ navigation, route }) => {
  const {
    vehicleMake,
    vehicleModel,
    vehicleColor,
    vehicleSeats,
    vehicleFacilities,
    vehicleId,
    vehicleRegNumber,
    driver,
    LatLng,
    imageString,
    vehicleType,
  } = route?.params || {};
  const [isLoading, setIsLoading] = useState(false);

  console.log(
    vehicleMake,
    vehicleModel,
    vehicleColor,
    vehicleSeats,
    vehicleFacilities,

    vehicleId,
    vehicleRegNumber,
    driver,
    LatLng,
    "imageSritoot",
    imageString,
    "vehicle type",
    vehicleType
  );

  // const getImage = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(
  //       `${mobileApi}/image/downloadImage/${imageString}`
  //     );
  //     const resData = await response.json();
  //     // setImage(response.url);
  //     setImageUrl(response.url);
  //     setIsLoading(false);
  //     console.log("response data ogggggggg", resData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getImage();
  // }, [imageUrl]);
  const isFocused = useIsFocused();

  const [complainTo, setComplainTo] = useState();
  const [spId, setSpId] = useState();
  const [arr, setArr] = useState("");
  const [driverOfSp, setDriverOfSp] = useState(driver);
  const [complainStatus, setComplainStatus] = useState("Pending");
  const [documentUris, setDocumentUris] = useState(imageString);

  const handleDelete = (uri) => {
    setDocumentUris(documentUris.filter((documentUri) => documentUri !== uri));
  };

  const handleAdd = (uri) => {
    setDocumentUris([...documentUris, uri]);
  };

  const [values, setValues] = useState({
    make: vehicleMake,
    model: vehicleModel,
    colors: vehicleColor,
    facilities: vehicleFacilities,
    seats: vehicleSeats,
    registration: vehicleRegNumber,
    type: vehicleType,
  });

  const inputHandler = (key, value) => {
    setValues((previousVal) => ({ ...previousVal, [key]: value }));
  };

  React.useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setSpId(id.spId);
    };
    PressHandler();
  }, [setSpId]);
  const getAllDrivers = async () => {
    try {
      const response = await fetch(
        `${mobileApi}/sp/geMobileDriverForSP/${spId}`
      );

      const responseData = await response.json();
      const resData = responseData;
      const arrr = resData;
      setArr(arrr);
    } catch (error) {}
  };
  React.useEffect(() => {
    if (spId) {
      getAllDrivers();
    }
  }, [spId, isFocused]);

  const saveLeaveHandler = async () => {
    if (
      !values.make ||
      !values.colors ||
      !values.facilities ||
      !values.registration ||
      !values.model ||
      !values.seats ||
      !values.type
    ) {
      return Alert.alert("Error", "All fields are required");
    }
    if (documentUris.length === 0) {
      return Alert.alert(
        "Error",
        "Please provide related documents of Vehicle"
      );
    }
    try {
      const response = await fetch(`${mobileApi}/sp/saveVehicleMobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentList: documentUris,
          driverDto: {
            driverId: driverOfSp,
          },
          serviceProviderDto: {
            spId: spId,
          },
          vehicleId: vehicleId,
          vehicleColor: values.colors,
          vehicleFacilities: values.facilities,
          vehicleMake: values.make,
          vehicleModel: values.model,
          vehicleRegNumber: values.registration,
          vehicleSeats: values.seats,
          vehicleType: values.type,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === "200") {
        Alert.alert("Success", responseData.message, [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      }
      console.log("response of Update leave", responseData);
    } catch (error) {
      console.log("save leave error", error);
    }
  };
  const handleValueChange = (itemValue) => {
    console.log("items value", itemValue);
    setDriverOfSp(itemValue);
  };
  return (
    <>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <ScrollView
          style={[styles.container]}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View
              style={{
                marginHorizontal: 10,
              }}
            >
              {/* <UploadDocumentList /> */}
              {/* <UploadDocument onDocumentSelect={takeImage} /> */}
              {/* <FormDocumentPicker /> */}
            </View>
            {/* <UploadImage takeImage={takeImage} imageUrl={imageUrl} /> */}
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                styles.nameInput,
              ]}
            >
              <Icon name="account-outline" size={30} color="gray" />

              <UserInput
                placeholder="Make"
                autoCapitalize="words"
                autoCorrect={false}
                value={values.make}
                setValue={(text) => inputHandler("make", text)}
              />
            </View>

            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                styles.nameInput,
              ]}
            >
              <Icon name="account-outline" size={30} color="gray" />

              <UserInput
                placeholder="Model"
                autoCapitalize="words"
                autoCorrect={false}
                value={values.model}
                setValue={(text) => inputHandler("model", text)}
              />
            </View>
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                styles.nameInput,
              ]}
            >
              <Icon name="car-cog" size={24} color="gray" />

              <UserInput
                placeholder="Type"
                autoCapitalize="words"
                autoCorrect={false}
                value={values.type}
                setValue={(text) => inputHandler("type", text)}
              />
            </View>
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                styles.nameInput,
              ]}
            >
              <Icon name="account-outline" size={30} color="gray" />

              <UserInput
                placeholder="Colors"
                autoCapitalize="words"
                autoCorrect={false}
                value={values.colors}
                setValue={(text) => inputHandler("colors", text)}
              />
            </View>
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                styles.nameInput,
              ]}
            >
              <Icon name="account-outline" size={30} color="gray" />

              <UserInput
                placeholder="Seats"
                keyboardType="number-pad"
                autoCorrect={false}
                value={values.seats}
                setValue={(text) => inputHandler("seats", text)}
              />
            </View>
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                styles.nameInput,
              ]}
            >
              <Icon name="account-outline" size={30} color="gray" />

              <UserInput
                placeholder="Facilities"
                autoCapitalize="words"
                autoCorrect={false}
                multiline
                value={values.facilities}
                setValue={(text) => inputHandler("facilities", text)}
              />
            </View>
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                styles.nameInput,
              ]}
            >
              <Icon name="account-outline" size={30} color="gray" />

              <UserInput
                placeholder="Registration"
                autoCapitalize="words"
                autoCorrect={false}
                value={values.registration}
                setValue={(text) => inputHandler("registration", text)}
              />
            </View>
            <View style={styles.dropDown}>
              <Text style={styles.text}>Driver:</Text>
              <View style={styles.dropDownContent}>
                {arr && (
                  <Picker
                    style={{ width: width / 1.29 }}
                    selectedValue={driverOfSp}
                    onValueChange={handleValueChange}
                  >
                    {arr.result.map((sp) => (
                      <Picker.Item
                        key={sp.driverId}
                        label={
                          driverOfSp === sp.driverId
                            ? `${sp.driverName}`
                            : sp.driverName
                        }
                        value={sp.driverId}
                      />
                    ))}
                  </Picker>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <Text style={{ color: colors.blue, fontWeight: "700" }}>
              Upload Document
            </Text>
          </View>
          <FormDocumentPicker
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            documentUris={documentUris}
          />
          <View style={{ marginBottom: 20 }}>
            <SwipButton title="SAVE" onPress={saveLeaveHandler} />
          </View>
          {/* <Pressable>o
      <Button>SAVE</Button>
    </Pressable> */}
        </ScrollView>
      )}
    </>
  );
};

export default UpdateVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  dropDown: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 8,
    width: "100%",
  },
  // text: {
  //   color: "gray",
  //   fontSize: 15,
  //   width: 72,
  //   maxWidth: "50%",
  // },
  text: {
    color: "gray",
    fontSize: 15,
    marginLeft: 5,
  },
  dropDownContent: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    marginLeft: 10,
  },
  nameInput: {
    flex: 1,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  input__icon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 5,
    paddingLeft: 10,
  },
});
