import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from "../../components/Icon";
import { mobileApi } from "../../config";
import Activityindicator from "../../components/Activityindicator";
import { formatTimeWithAMPM } from "../../Util/date";
import { SafeAreaView } from "react-native-safe-area-context";

import { RefreshControl } from "react-native-gesture-handler";
import Nodata from "../../components/Nodata";

const Passengers = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [driverID, setDriverID] = useState();
  const [dataResponse, setDataResponse] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // check Detalis:/
  const handleModalOpen = (item) => {
    console.log("selected", item);

    setSelectedItem(item);

    setModalVisible(true);
  };
  let Pick = "";
  let Drop = "";

  if (selectedItem) {
    Pick = selectedItem.bidDto.bidPickupLocation.split(",");
    Drop = selectedItem.bidDto.bidPickupLocation.split(",");
  }
  const handleModalClose = () => {
    setModalVisible(false);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setDriverID(id.driverId);
    };
    PressHandler();
  }, [driverID]);

  const getAllPassengerHandler = async () => {
    if (isFocused) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${mobileApi}/driver/passengerForDriverUsingBid/${driverID}`
        );
        const responseData = await response.json();
        if (responseData?.code === "200") {
          setDataResponse(responseData);
        }
        console.log("response dartaaaaa=>", responseData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    if (driverID && isFocused) {
      getAllPassengerHandler();
    }
  }, [driverID, isFocused]);

  return (
    <>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <SafeAreaView style={styles.mainContainer}>
          {dataResponse?.result?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={dataResponse.result}
              keyExtractor={(item) => item.bidDependMapId}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getAllPassengerHandler}
                />
              }
              ListFooterComponent={<View style={{ height: 50 }} />}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.tilesItem,
                    index % 2 === 0 ? styles.evenItem : styles.oddItem,
                  ]}
                >
                  <View style={styles.innerContainer}>
                    <Text
                      style={[styles.serviceProviderText, { marginBottom: 5 }]}
                    >
                      {item.bidDto?.parentDto?.parentName}
                    </Text>
                    <View
                      style={[styles.cardInnerDataStyle, { marginBottom: 8 }]}
                    >
                      <Text style={styles.Text}>NAME</Text>
                      <Text style={styles.Text}>
                        {item.dependentDto?.dependentName}
                      </Text>
                    </View>
                    <View style={styles.cardInnerDataStyle}>
                      <Text style={styles.Text}>CONTACT NO</Text>
                      <Text style={styles.Text}>
                        {item?.dependentDto?.dependentContact}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.status}>
                        {item?.dependentDto?.dependentStatus}
                      </Text>
                      <Text style={[styles.serviceProviderText]}>
                        {item?.dependentDto?.dependentGender}
                      </Text>
                    </View>
                  </View>
                  {/* </Pressable> */}
                  {/* <View> */}
                  <Pressable
                    onPress={() => handleModalOpen(item)}
                    style={({ pressed }) => [
                      pressed && styles.pressed,
                      styles.detailsButton,
                    ]}
                  >
                    <Text style={styles.serviceProviderText}>
                      Check Details
                    </Text>
                  </Pressable>
                  {/* </View> */}
                  {/* </Pressable> */}
                </View>
              )}
            />
          ) : (
            <Nodata text="No passengers available" />
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleModalClose}
          >
            {/* <View style={styles.modalView}>
              <View>
                <View>
                  <Text style={styles.modalText}>asa</Text>
                </View>
                <View>
                  <Text>parentContact</Text>
                  <Text>a</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text>ParentEmail</Text>
                  <Text style={styles.modalText}>asad</Text>
                </View>
                <View>
                  <Text>parentContact</Text>
                  <Text>asad</Text>
                </View>
              </View>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View> */}
            <View style={[styles.card, { elevation: 4 }]}>
              <View style={styles.cardData}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.dayAndTime}>
                    {selectedItem?.dependentDto.dependentName}
                  </Text>
                  <View>
                    {selectedItem?.dependentDto.imageUrl ? (
                      <Image
                        style={styles.img}
                        source={{ uri: selectedItem?.dependentDto.imageUrl }}
                      />
                    ) : (
                      <Image
                        style={styles.img}
                        source={require("../../assets/icon.png")}
                      />
                    )}
                  </View>
                </View>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Icon name="circle-outline" color="#49bece" size={15} />
                    <Text style={styles.fromAndtoTxt}>Pick Up</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottomWidth: 0.4,
                      borderBottomColor: "gray",
                      paddingVertical: 8,
                      width: "100%",
                    }}
                  >
                    <View>
                      <Text style={styles.FromAndToPlace}>{Pick[0]}</Text>
                      <Text style={styles.FromAndToPlace}>{Pick[1]}</Text>
                    </View>
                    <Text style={styles.dayAndTime}>
                      {selectedItem?.pickupTime &&
                        formatTimeWithAMPM(selectedItem?.bidDto.bidPickupTime)}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={{ flexDirection: "row", paddingTop: 10 }}>
                    <Icon name="circle-outline" color="green" size={15} />
                    <Text style={styles.fromAndtoTxt}>Drop Off</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderBottomColor: "gray",
                      paddingVertical: 8,
                      width: "100%",
                    }}
                  >
                    <View>
                      <Text style={styles.FromAndToPlace}>{Drop[0]}</Text>
                      <Text style={styles.FromAndToPlace}>{Drop[1]}</Text>
                    </View>
                    <View>
                      <Text style={styles.dayAndTime}>
                        {selectedItem?.dropTime &&
                          formatTimeWithAMPM(selectedItem?.dropTime)}
                      </Text>
                    </View>
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
                    {/* <Pressable
                      onPress={handleModalClose}
                      style={({ pressed }) => [
                        pressed && styles.pressed,
                        {
                          padding: 5,
                          alignSelf: "flex-end",
                          width: 60,
                          height: 40,
                        },
                      ]}
                    > */}
                     <Button title="OK" onPress={handleModalClose} />
                    {/* </Pressable> */}
                  </View>
                </View>
               
              </View>
            </View>
          </Modal>
          {modalVisible && <View style={styles.overlay} />}
          {/* <Bc /> */}
        </SafeAreaView>
      )}
    </>
  );
};

export default Passengers;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 12,
    // paddingBottom: 10,
  },

  pressed: {
    opacity: 0.7,
  },
  ServiceProviderName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardInnerDataStyle: {
    backgroundColor: "#90d9dd",

    marginVertical: 8,
    maxHeight: "40%",
    height: 40,

    justifyContent: "space-between",
    paddingHorizontal: 6,
    alignItems: "center",
    marginBottom: 5,
    flexDirection: "row",
  },
  tilesItem: {
    flex: 1,
    // margin: 4,
    // marginVertical: 6,
    marginBottom: 20,
    maxWidth: "100%",
    width: 300,

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
  Text: { fontSize: 14, fontWeight: "500" },
  // button: { flex: 1 },
  innerContainer: {
    flex: 1,
    padding: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  serviceProviderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  status: {
    color: "#a50808",
    fontSize: 16,
    fontWeight: "500",
  },
  evenItem: {
    backgroundColor: "#55cd85",
  },
  oddItem: {
    backgroundColor: "#3497fd",
  },
  pressed: {
    opacity: 0.7,
  },
  detailsButton: {
    borderWidth: 0.4,
    // maxWidth: "100%",
    width: Dimensions.get("window").width / 3,
    // alignSelf: "center",
    borderRadius: 4,
    padding: 3,
    borderColor: "white",
    alignItems: "center",
    alignSelf: "center",
    // justifyContent: "center",
    marginBottom: 10,
  },
  //modal
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
  img: {
    width: 50,
    height: 50,
    // marginRight: 8,
    borderRadius: 25,
    backgroundColor: "gray",
    // alignItems: "center",
    // justifyContent: "center",
  },
  dayAndTime: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#3696f9",
  },
  dayAndTimePrevious: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
  FromAndToPlace: {
    marginLeft: 20,
    fontWeight: "500",
    fontSize: 18,
  },
  fromAndtoTxt: {
    marginLeft: 5,
    color: "#0d6edd",
    fontSize: 14,
  },
  //modal2
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
  buttonClose: {
    alignSelf: "center",

    backgroundColor: "#2196F3",
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
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
