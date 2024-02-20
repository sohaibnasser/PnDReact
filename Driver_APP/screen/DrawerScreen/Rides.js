import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import React from "react";

import Icon from "../../components/Icon";

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mobileApi } from "../../config";
import axios from "axios";
import Activityindicator from "../../components/Activityindicator";

import { SafeAreaView } from "react-native-safe-area-context";
import Nodata from "../../components/Nodata";
import { formatDate } from "../../Util/formatedDate";

export const Rides = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [parentID, setParentID] = useState("");
  const [response, setResponse] = useState("");
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  // Modal
  const [starRating, setStarRating] = useState(null);

  const [comments, setComments] = useState("");
  const [driverID, setDriverID] = useState("");
  console.log("hdsdhsh", date, month, year);
  // GETTING DATA FROM RESPONSE
  let dependentName = "";
  let dropLocation = "";
  let pickupLocation = "";
  let rideId = "";
  let rideStatus = "";
  let dropTimeString = "";
  let pickTimeString = "";
  let dropTime = "";
  const today = new Date();

  useEffect(() => {
    const getDriverId = async () => {
      let data = await AsyncStorage.getItem("@auth");
      console.log("driverId of Profile", data);
      const id = JSON.parse(data);
      setDriverID(id.driverId);
    };
    getDriverId();
  }, [setDriverID]);
  console.log("driverId at this month ride", driverID);
  // api request

  const getAllRides = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/driver/thisMonthRides/${driverID}`
      );

      const resData = await response.json();
      console.log("response of get all ride=>", resData);
      if (resData.code === "200") {
        setResponse(resData);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (isFocused && driverID) {
      getAllRides();
    }
  }, [isFocused, driverID]);
  const getdata = () => {
    if (response.length !== 0) {
      dependentName = response.result?.map((item) => item.dependentName);
      dropLocation = response.result?.map((item) => item.dropLocation);
      pickupLocation = response.result?.map((item) => item.pickupLocation);
      rideId = response.result?.map((item) => item.rideId);
      rideStatus = response.result?.map((item) => item.rideStatus);
      dropTimeString = response.result?.map((item) => item.dropTimeString);
      pickTimeString = response.result?.map((item) => item.pickTimeString);
    }
  };
  console.log(
    "route=>",
    dropLocation,
    pickTimeString,
    dropTimeString,
    rideId,
    rideStatus,
    pickupLocation,
    "dropppp",
    dropTime
  );

  useEffect(() => {
    getdata();
  }, [response]);

  const renderItemOfthisMonth = ({ item, index }) => {
    const parts = item?.dependentVehicleMapDto.pickupLocation.split(",");
    const dropparts = item?.dependentVehicleMapDto.dropLocation.split(",");
    const pickTime = formatDate(item?.pickupTime);
    const dropTime = formatDate(item?.dropTime);
    console.log("-------------",item)

    return (
      <>
        <View
          style={[
            styles.card,
            { elevation: 4 },
            index % 2 === 0 ? styles.evenItem : styles.oddItem,
          ]}
        >
          <View style={styles.cardData}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.dayAndTime}>
                {item?.dependentVehicleMapDto?.dependentDto.dependentName}
              </Text>
              <Text style={styles.dayAndTime}>{item?.rideStatus}</Text>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Icon name="circle-outline" color="#fff" size={15} />
                <Text style={styles.fromAndtoTxt}>Pick Up Location</Text>
              </View>
              <View
                
              >
                <Text style={styles.FromAndToPlace}>
                  {parts[0] && parts[0] !== "null" && parts[0]} {parts[1]}
                </Text>

                 
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Icon name="circle-outline" color="#fff" size={15} />
                <Text style={styles.fromAndtoTxt}>Pick Time</Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.4,
                  borderBottomColor: "gray",
                }}
              >
                <Text style={styles.FromAndToPlace}>
                  {pickTime}
                </Text>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", paddingTop: 10 }}>
                <Icon name="circle-outline" color="black" size={15} />
                <Text style={styles.fromAndtoTxt}>Drop Off</Text>
              </View>
              <View
                style={{
                  borderBottomColor: "gray",
                }}
              >
                <Text style={styles.FromAndToPlace}>
                  {dropparts && dropparts[0] !== "null" && dropparts[0]}{" "}
                  {dropparts[1]}
                </Text>
                {/* <Text style={styles.FromAndToPlace}>{dropparts[1]}</Text> */}
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Icon name="circle-outline" size={15} />
                <Text style={styles.fromAndtoTxt}>Drop Time</Text>
              </View>
              <View
                 
              >
                <Text style={styles.FromAndToPlace}>
                  {dropTime}
                </Text>

                 
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <SafeAreaView style={styles.container}>
          {response?.result?.length > 0 ? (
            <FlatList
              data={response.result}
              keyExtractor={(item) => item.rideId}
              renderItem={renderItemOfthisMonth}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getAllRides}
                />
              }
              ListFooterComponent={<View style={{ height: 50 }} />}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Nodata text="No rides available" />
          )}
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingVertical: 8,
  },
  card: {
    flex: 1,
    width: "100%",
    // padding: 10,
    width: "95%",
    alignSelf: "center",
    maxHeight: "100%",
    height: "auto",
    // height: 150,
    backgroundColor: "#fff",
    // marginVertical: 10,
    // marginVertical: 10,
    marginBottom: 20,
    // elevation: 5,
    borderRadius: 4,
    justifyContent: "space-around",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
  },
  cardData: {
    flex: 1,
    // paddingHorizontal: 10,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  pressed: {
    opacity: 0.7,
  },

  dayAndTime: {
    marginBottom: 8,
    fontSize: 18,
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
    color: "#fff",
    fontSize: 16,
  },

  evenItem: {
    backgroundColor: "#55cd85",
  },
  oddItem: {
    backgroundColor: "#3497fd",
  },
});
