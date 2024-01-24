import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import Icon from "../../components/Icon";

import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mobileApi } from "../../config";

import Activityindicator from "../../components/Activityindicator";
import { colors } from "../../Util/colors";
import Nodata from "../../components/Nodata";

const YourVehicle = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [spId, setSpId] = useState("");
  const [arr, setArr] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [driverArray, setDriverArray] = useState();

  const headerRightButtonHandler = () => {
    if (!driverArray || driverArray?.result?.length === 0) {
      return Alert.alert("No driver", "No driver for vehicle");
    }
    navigation.navigate("Add Vehicle");
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={headerRightButtonHandler}
          style={({ pressed }) => [
            pressed && styles.pressed,
            styles.headerRightButton,
          ]}
        >
          <Icon name="plus-box" color="#3696f9" size={33} />
        </Pressable>
      ),
    });
  }, [navigation, driverArray?.result]);
  useEffect(() => {
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
      console.log("respose of get driver in Add vehicle", responseData);
      if (responseData.code === "200") {
        setDriverArray(responseData);
      }
    } catch (error) {
      console.log("api", error);
    }
  };
  React.useEffect(() => {
    if (spId) {
      getAllDrivers();
    }
  }, [spId, isFocused]);

  const getAllVehicles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/sp/vehicleListForSPMobile/${spId}`
      );
      const resData = await response.json();
      if (resData.code === "200") {
        setArr(resData);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (isFocused && spId) {
      getAllVehicles();
    }
  }, [isFocused, spId]);

  const handleModalOpen = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const handleUpdateVehicle = (item, formatedImage) => {
    if (
      item?.approvalStatus === "Pending" ||
      item?.approvalStatus === "Rejected"
    ) {
      return Alert.alert(
        "Info",
        "Your approval status is " + item?.approvalStatus
      );
    }
    navigation.navigate("Update Vehicle", {
      vehicleMake: item?.vehicleMake,
      vehicleModel: item?.vehicleModel,
      vehicleColor: item?.vehicleColor,
      vehicleSeats: item?.vehicleSeats,
      vehicleFacilities: item?.vehicleFacilities,
      vehicleId: item?.vehicleId,
      vehicleRegNumber: item?.vehicleRegNumber,
      driver: item?.driverDto?.driverId,
      LatLng: item?.lastLatLng,
      imageString: formatedImage,
      vehicleType: item?.vehicleType,
    });
  };
  const renderVehicleHandler = ({ item, index }) => {
    const formatedImage = item?.documentList.map((doc) => ({
      imageString: doc?.imageString,
    }));
    // console.log("formatedd imagee", formatedImage);
    return (
      <View
        style={[
          styles.tilesItem,
          index % 2 === 0 ? styles.evenItem : styles.oddItem,
        ]}
      >
        <Pressable
          onPress={() => handleUpdateVehicle(item, formatedImage)}
          style={({ pressed }) => [pressed && styles.pressed, styles.button]}
        >
          <View style={styles.innerContainer}>
            {/* <View style={styles.cardInnerDataStyle}> */}
            <Text
              style={[
                styles.serviceProviderText,
                { marginBottom: 5, height: 20, maxHeight: "20%" },
              ]}
            >
              {item?.driverDto?.driverName}
            </Text>
            <View style={[styles.cardInnerDataStyle, { marginBottom: 10 }]}>
              <Text style={styles.Text}>VehicleMake</Text>

              <Text style={styles.Text}>{item.vehicleMake}</Text>
            </View>
            <View style={styles.cardInnerDataStyle}>
              <Text style={styles.Text}>VehicleSeats</Text>
              <Text style={styles.Text}>{item.vehicleSeats}</Text>
            </View>
            <View>
              <Pressable
                onPress={() => handleModalOpen(item)}
                style={({ pressed }) => [
                  pressed && styles.pressed,
                  styles.detailsButton,
                ]}
              >
                <Text style={[styles.serviceProviderText]}>Check Detalis</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <>
      {isLoading ? (
        <Activityindicator
          isLoading={isLoading}
          onRequestClose={() => {
            setIsLoading(false), navigation.goBack();
          }}
        />
      ) : (
        <View style={styles.mainContainer}>
          {arr?.result?.length > 0 ? (
            <FlatList
              data={arr.result}
              keyExtractor={(item) => item.vehicleId}
              renderItem={renderVehicleHandler}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getAllVehicles}
                />
              }
            />
          ) : (
            <Nodata text="Empty vehicle list" />
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleModalClose}
          >
            <View style={[styles.card, { elevation: 4, borderRadius: 4 }]}>
              <View style={styles.cardData}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.modalText}>Driver Name</Text>
                  <Text style={styles.modalText}>
                    {selectedItem?.driverDto.driverName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.modalText}>vehicleModel</Text>
                  <Text style={styles.modalText}>
                    {selectedItem?.vehicleModel}
                  </Text>
                </View>
              </View>
              <View style={styles.cardData}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.modalText}>vehicleFacilities</Text>
                  <Text style={styles.modalText}>
                    {selectedItem?.vehicleFacilities}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <Text style={styles.modalText}>vehicleType</Text>
                  <Text style={styles.modalText}>
                    {selectedItem?.vehicleType}
                  </Text>
                </View>
              </View>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </Modal>
          {modalVisible && <View style={styles.overlay} />}
        </View>
      )}
    </>
  );
};

export default YourVehicle;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    // margin: 20,
    justifyContent: "space-between",
    // alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    // padding: 20,
    marginTop: 90,
    maxHeight: "85%",
    height: 400,
    width: 320,
    maxWidth: "90%",
    backgroundColor: "white",
    // borderRadius: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderRadius: 30,

    // backgroundColor: "gray",
    // padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  //Modal style
  card: {
    maxWidth: "95%",
    width: "90%",
    alignSelf: "center",

    maxHeight: "100%",
    height: "auto",
    backgroundColor: "#fff",
    // marginVertical: 10,
    // padding: ,
    marginTop: "auto",
    marginBottom: "auto",
    // marginHorizontal: 10,
    elevation: 5,
    padding: 8,
    justifyContent: "space-around",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
  },
  cardData: {
    // paddingHorizontal: 10,
    padding: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    alignSelf: "center",

    backgroundColor: colors.blue,
    // padding: 10,
    justifyContent: "center",
    borderRadius: 4,
    maxWidth: "50%",
    width: 100,
    maxHeight: "15%",
    height: 50,
  },
  textStyle: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    // color: colors.green,
    fontWeight: "500",
  },

  cardInnerDataStyle: {
    backgroundColor: "#90d9dd",
    maxHeight: "40%",
    height: 40,

    justifyContent: "space-between",
    paddingHorizontal: 6,
    alignItems: "center",
    marginBottom: 5,
    flexDirection: "row",
  },
  serviceProviderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.7,
  },
  ServiceProviderName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  tilesItem: {
    flex: 1,
    marginTop: 20,

    maxWidth: "100%",
    width: "95%",

    maxHeight: "100%",
    height: "auto",
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 6,
    alignSelf: "center",

    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    shadowOpacity: 0.25,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  evenItem: {
    backgroundColor: "#55cd85",
  },
  oddItem: {
    backgroundColor: "#3497fd",
  },
  button: { flex: 1 },
  innerContainer: {
    flex: 1,
    padding: 12,
  },
  Text: { fontSize: 14, fontWeight: "500" },
  detailsButton: {
    flex: 1,
    borderWidth: 0.4,
    maxWidth: "100%",
    width: "50%",
    alignSelf: "center",
    borderRadius: 4,
    padding: 3,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  headerRightButton: {
    justifyContent: "center",
    paddingTop: 10,
    paddingRight: 10,
  },
});
