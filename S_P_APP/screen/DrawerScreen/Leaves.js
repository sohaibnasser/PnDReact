import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Icon from "../../components/Icon";
import { API, LeaveApi, mobileApi } from "../../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import Activityindicator from "../../components/Activityindicator";
import { extractDateFromTimestamp } from "../../Util/formatedate";
import Nodata from "../../components/Nodata";

const Leaves = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [spId, setSpId] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const [vehicleArray, setVehicleArray] = useState();
  console.log("ASDDas", vehicleArray);
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setSpId(id.spId);
    };
    PressHandler();
  }, [setSpId]);
  //get vehicles
  const getAllVehicles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/sp/vehicleListForSPMobile/${spId}`
      );
      const resData = await response.json();
      if (resData.code === "200") {
        setVehicleArray(resData);
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
  const headerRightButtonHandler = () => {
    if (!vehicleArray || vehicleArray?.result?.length === 0) {
      return Alert.alert("No vehicle", "No vehicle for add leave");
    }
    navigation.navigate("Add Leave", {
      ID: spId,
    });
  };
  console.log("spId at leave", spId);
  const getAllLeaves = async () => {
    // if (isFocused) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/sp/getAllLeavesAgainstSp/${spId}`
      );
      // console.log(response);
      const responseData = await response.json();
      console.log("response of leave=>", responseData);
      if (responseData.code === "200") {
        setData(responseData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    // }
  };
  React.useEffect(() => {
    if (isFocused && spId) {
      getAllLeaves();
    }
  }, [isFocused, spId]);

  React.useEffect(() => {
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
  }, [navigation, vehicleArray?.result]);

  return (
    <>
      {isLoading ? (
        <Activityindicator
          isLoading={isLoading}
          onRequestClose={() => {
            setIsLoading(false), navigation.navigate("Dashboard");
          }}
        />
      ) : (
        <View style={styles.container}>
          {data?.result?.length > 0 ? (
            <FlatList
              data={data.result}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.leaveDto?.leaveId}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getAllLeaves}
                />
              }
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.tilesItem,
                    index % 2 === 0 ? styles.evenItem : styles.oddItem,
                  ]}
                >
                  <Pressable
                    onPress={() =>
                      navigation.navigate("Update Leave", {
                        leaveDetailId: item?.leaveDetailId,
                        leaveId: item.leaveDto?.leaveId,
                        dateFromm: item.leaveDto?.dateFrom,
                        dateToo: item.leaveDto?.dateTo,
                        vehicleIdd: item.vehicleDto?.vehicleId,
                        Remarks: item.leaveDto?.remarks,
                        Announced: item.leaveDto?.announced,
                      })
                    }
                    style={({ pressed }) => [
                      pressed && styles.pressed,
                      styles.button,
                    ]}
                  >
                    <View style={styles.innerContainer}>
                      <Text
                        style={[
                          styles.serviceProviderText,
                          { marginBottom: 5 },
                        ]}
                      >
                        {item?.vehicleDto?.driverDto?.driverName}
                      </Text>
                      <View>
                        <View
                          style={[
                            styles.cardInnerDataStyle,
                            { marginBottom: 10 },
                          ]}
                        >
                          <Text style={styles.Text}>DATE FROM</Text>
                          <Text style={styles.Text}>
                            {extractDateFromTimestamp(item?.leaveDto?.dateFrom)}
                          </Text>
                        </View>
                        <View style={styles.cardInnerDataStyle}>
                          <Text style={styles.Text}>DATE TO</Text>
                          <Text style={styles.Text}>
                            {extractDateFromTimestamp(item?.leaveDto?.dateTo)}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={styles.Text}>REMARKS</Text>
                        <View>
                          <Text style={styles.serviceProviderText}>
                            {item?.leaveDto?.remarks.trim()}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      {/* <Pressable
                style={({ pressed }) => [
                  pressed && styles.pressed,
                  styles.detailsButton,
                ]}
              >
                <Text style={styles.serviceProviderText}>Ask For Bid</Text>
              </Pressable> */}
                    </View>
                  </Pressable>
                </View>
              )}
            />
          ) : (
            <Nodata text="No leaves available" />
          )}
        </View>
      )}
    </>
  );
};

export default Leaves;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // stickyHeaderHiddenOnScroll: false,
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  headerRightButton: {
    justifyContent: "center",
    paddingTop: 10,
    paddingRight: 10,
  },
  services: {
    maxWidth: "100%",
    width: 150,
    maxHeight: "100%",
    height: 150,

    margin: 3,
    elevation: 3,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    backgroundColor: "red",
  },
  Text: { fontSize: 14, fontWeight: "500" },
  service: {
    borderRadius: 6,
    alignItems: "center",
    color: "white",
  },
  pressed: {
    opacity: 0.7,
  },
  ServiceProviderName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  serviceProviderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  tilesItem: {
    flex: 1,
    // margin: 4,
    // marginVertical: 6,
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
  button: { flex: 1 },
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
  evenItem: {
    backgroundColor: "#55cd85",
  },
  oddItem: {
    backgroundColor: "#3497fd",
  },
  // Date: {
  //   backgroundColor: "#90d9dd",
  //   paddingHorizontal: 4,
  //   paddingVertical: 4,
  //   borderRadius: 4,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginVertical: 5,
  // },
});
