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
import { SafeAreaView } from "react-native-safe-area-context";
import UploadImage from "../components/auth/UploadImage";
import { colors } from "../Util/colors";
import UploadDocument from "../components/auth/UploadDocument";
import FormDocumentPicker from "../components/auth/FormDocumentPicker";
import Activityindicator from "../components/Activityindicator";
const width = Dimensions.get("window").width;
const AddVehicle = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [spId, setSpId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    make: "",
    model: "",
    colors: "",
    facilities: "",
    type: "",
    seats: "",
    registration: "",
  });

  const [arr, setArr] = useState("");
  const [driverId, setDriverId] = useState();
  const [spName, setSpName] = useState();

  const [documentUris, setDocumentUris] = useState([]);
  // console.log("DriverISs", documentUris);
  const handleDelete = (uri) => {
    setDocumentUris(documentUris.filter((documentUri) => documentUri !== uri));
  };

  const handleAdd = (uri) => {
    setDocumentUris([...documentUris, uri]);
  };

  React.useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setSpName(id.spName);
      setSpId(id.spId);
    };
    PressHandler();
  }, [setSpId, isFocused]);
  console.log("spId", spId);

  const handleValueChange = (itemValue) => {
    setDriverId(itemValue);
  };

  const getAllDrivers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/sp/geMobileDriverForSP/${spId}`
      );

      const responseData = await response.json();
      console.log("respose of get driver in Add vehicle", responseData);
      if (responseData.code === "200") {
        setArr(responseData);
        if (responseData?.result && responseData?.result?.length > 0) {
          setDriverId(responseData?.result[0]?.driverId); // Set the first driverId as initial
        }
      }
    } catch (error) {
      Alert.alert("Network error", error.message);
      console.log("api", error);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (spId) {
      getAllDrivers();
    }
  }, [spId, isFocused]);

  const saveVehicleHandler = async () => {
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
      setIsLoading(true);
      const response = await fetch(`${mobileApi}/sp/saveVehicleMobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentList: documentUris,
          driverDto: {
            driverId: driverId,
          },
          serviceProviderDto: {
            spId: spId,
            spName: spName,
          },
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

      if (responseData.code === "200") {
        Alert.alert("Success", responseData.message, [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      }
      console.log("response of save add Vehicle", responseData);
    } catch (error) {
      Alert.alert("Network Error", error.message);
      console.log("save leave error", error);
    } finally {
      setIsLoading(false);
    }
  };
  const inputHandler = (key, value) => {
    setValues((previousVal) => ({ ...previousVal, [key]: value }));
  };
  return (
    // <ScrollView>
    <View style={[styles.container]}>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View>
              <View
                style={[
                  styles.input__icon,
                  styles.paddingVertical,
                  styles.nameInput,
                ]}
              >
                <Icon name="car-wrench" size={24} color="gray" />

                <UserInput
                  placeholder="Make"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={values.make}
                  setValue={(text) => inputHandler("make", text)}
                />
              </View>
            </View>

            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                styles.nameInput,
              ]}
            >
              <Icon name="globe-model" size={24} color="gray" />

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
              <Icon name="format-color-highlight" size={24} color="gray" />

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
              <Icon name="seat-recline-normal" size={24} color="gray" />

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
              <Icon name="air-conditioner" size={24} color="gray" />

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
              <Icon name="registered-trademark" size={24} color="gray" />

              <UserInput
                placeholder="Registration"
                autoCapitalize="words"
                autoCorrect={false}
                value={values.registration}
                setValue={(text) => inputHandler("registration", text)}
              />
            </View>

            <View style={styles.dropDown}>
              <Text style={styles.text}>Drivers:</Text>
              <View style={styles.dropDownContent}>
                {arr && (
                  <Picker
                    style={{ width: width / 1.29 }}
                    selectedValue={driverId}
                    onValueChange={handleValueChange}
                  >
                    {arr.result?.map((driver) => (
                      <Picker.Item
                        key={driver.driverId}
                        label={driver.driverName}
                        value={driver.driverId}
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
          <SwipButton title="SAVE" onPress={saveVehicleHandler} />
          {/* <Pressable>o
        <Button>SAVE</Button>
      </Pressable> */}
        </ScrollView>
      )}
    </View>
  );
};

export default AddVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  // dropDown: {
  //   borderWidth: 0.5,
  //   borderColor: "gray",
  //   backgroundColor: "#ffffff",
  //   borderRadius: 6,
  //   marginVertical: 8,
  // },
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
  // dropDownContent: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   maxWidth: "100%",
  //   marginLeft: 10,
  // },

  textArea: {
    textAlignVertical: "top",
    flex: 1,
  },
  commentsBox: {
    elevation: 4,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    padding: 8,
    height: 120,
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: "white",
  },
});
