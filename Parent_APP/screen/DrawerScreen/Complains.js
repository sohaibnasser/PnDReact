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
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import UserInput from "../../components/auth/UserInput";
import { TextInput } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import Icon from "../../components/Icon";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/auth/Button";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ComplainApi, mobileApi } from "../../config";
import axios from "axios";
import Activityindicator from "../../components/Activityindicator";
import Nodata from "../../components/Nodata";

const Complains = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("Add Complain")}
          style={({ pressed }) => [
            pressed && styles.pressed,
            styles.headerRightButton,
          ]}
        >
          <Icon name="plus-box" color="#3696f9" size={33} />
        </Pressable>
      ),
    });
  }, [navigation]);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [parentID, setParentID] = useState("");
  const [arr, setArr] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // const [isChecked, setChecked] = useState(false);
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setParentID(id.parentId);
    };
    PressHandler();
  }, [setParentID]);
  // useEffect(() => {
  // if (parentID) {
  const getAllComplains = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/complain/existing_complain_parent/${parentID}`
      );
      const resData = await response.json();
      console.log("respnse data", resData);
      if (resData.code === "200") {
        setArr(resData);
      }
      console.log("response of get all complain=>", resData);
    } catch (error) {
      console.log("error", error);
      return Alert.alert("Error", "Error while getting complains");
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (isFocused && parentID) {
      getAllComplains();
    }
  }, [isFocused, parentID]);

  // }
  // }, []);
  // console.log("as110", arr.result[0].serviceProviderDto);

  const handleModalOpen = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const renderComplainsHandler = ({ item, index }) => {
    let spID;
    if (item.serviceProviderDto) {
      spID = item.serviceProviderDto?.spId;
    }
    console.log(`spID showing ff: ${spID}`);
    const updateComplainHandler = (item) => {
      if (item?.complaintStatus.toString() == "Resolved") {
        return;
      }
      navigation.navigate("Update Complain", {
        complaintStatus: item?.complaintStatus,
        complaintsId: item?.complaintsId,
        parentId: item?.parentDto?.parentId,
        remarkss: item?.remarks,
        remarksHistory: item?.remarksHistory,
        parentName: item?.parentDto?.parentName,
        spName: item?.serviceProviderDto?.spName,

        spID: spID,
      });
    };
    return (
      <View
        style={[
          styles.tilesItem,
          index % 2 === 0 ? styles.evenItem : styles.oddItem,
        ]}
      >
        <Pressable
          onPress={() => updateComplainHandler(item)}
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
              {item.complaintFrom}
            </Text>
            <View style={[styles.cardInnerDataStyle, { marginBottom: 10 }]}>
              <Text style={styles.Text}>STATUS</Text>

              <Text style={styles.Text}>{item.complaintStatus}</Text>
            </View>
            <View style={styles.cardInnerDataStyle}>
              <Text style={styles.Text}>REMARKS</Text>
              <Text style={styles.Text}>
                {item?.remarks?.trim()?.substring(0, 10)}...
              </Text>
            </View>
            <View>
              <Pressable
                onPress={() =>
                  navigation.navigate("Complain Details", {
                    item: item,
                    complaintStatus: item?.complaintStatus,
                    complaintsId: item?.complaintsId,
                    parentId: item.parentDto?.parentId,
                    remarkss: item?.remarks,
                    remarksHistory: item?.remarksHistory,

                    spID: spID,
                  })
                }
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
        <Activityindicator isLoading={isLoading} />
      ) : (
        <View style={styles.mainContainer}>
          {arr && arr?.result?.length > 0 ? (
            <FlatList
              data={arr.result}
              keyExtractor={(item) => item.complaintsId}
              renderItem={renderComplainsHandler}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getAllComplains}
                />
              }
              ListFooterComponent={<View style={{ height: 200 }}></View>}
            />
          ) : (
            <Nodata text="No complains available" />
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
                  <Text style={styles.modalText}>Complain From</Text>
                  <Text style={styles.modalText}>
                    {selectedItem?.complaintFrom}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.modalText}>Parent Contact</Text>
                  <Text style={styles.modalText}>
                    {selectedItem?.parentDto.parentContact}
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
                  <Text style={styles.modalText}>Parent Email</Text>
                  <Text style={styles.modalText}>
                    {selectedItem?.parentDto.parentEmail}
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
                  {/* <Text style={styles.modalText}>No of Passenger</Text>
                  <Text style={styles.modalText}>
                    {selectedItem?.parentDto.packageDto.numOfPassenger}
                  </Text> */}
                </View>
              </View>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
            {/* <View style={[styles.card, { elevation: 4 }]}>
              <View style={styles.cardData}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.modalText}>Complian From</Text>
                  <Text style={styles.modalText}>
                    {selectedItem?.complaintFrom}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>parentContact</Text>
                  <Text>{selectedItem?.parentDto.parentContact}</Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>ParentEmail</Text>
                  <Text style={styles.modalText}>
                    {selectedItem?.parentDto.parentEmail}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>No of Passengers</Text>
                  <Text>
                    {selectedItem?.parentDto.packageDto.numOfPassenger}
                  </Text>
                </View>
              </View>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View> */}
          </Modal>
          {modalVisible && <View style={styles.overlay} />}
        </View>
      )}
    </>
  );
};

export default Complains;

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
    fontWeight: "500",
    textAlign: "center",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    // color: colors.green,
    fontWeight: "500",
  },

  // services: {
  //   maxWidth: "100%",
  //   width: 300,
  //   maxHeight: "100%",
  //   height: 150,

  //   margin: 3,
  //   elevation: 3,
  //   shadowColor: "#000000",
  //   shadowRadius: 4,
  //   shadowOffset: { width: 1, height: 1 },
  //   shadowOpacity: 0.4,
  //   backgroundColor: "red",
  // },

  cardInnerDataStyle: {
    backgroundColor: "#90d9dd",

    // paddingVertical: 8,
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
    // margin: 4,
    // marginVertical: 10,
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
    width: "40%",
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
