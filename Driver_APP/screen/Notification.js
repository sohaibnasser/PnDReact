import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { mobileApi } from "../config";
import { formatDate } from "../Util/formatedDate";
import { SafeAreaView } from "react-native-safe-area-context";
import Activityindicator from "../components/Activityindicator";
import Nodata from "../components/Nodata";

const Notification = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [driverID, setDriverID] = useState("");
  const [response, setResponse] = useState("");
  console.log("resposnse of notifications", response);
  useEffect(() => {
    const getDriverId = async () => {
      let data = await AsyncStorage.getItem("@auth");
      console.log("driverId of Profile", data);
      const id = JSON.parse(data);
      setDriverID(id.driverId);
    };
    getDriverId();
  }, [setDriverID]);
  console.log("driverId at notification", driverID);
  // get all notification
  const getAllNotification = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/driver/notification_driver/${driverID}`
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
      getAllNotification();
    }
  }, [isFocused, driverID]);

  console.log(response, " ====>>>>>>Response data");

  function General({ item, index }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardData}>
          <View>
            <Text style={{ lineHeight: 20 }}>
              {item.pushNotifyDto.pushTitle}
            </Text>
            <Text style={{ lineHeight: 20 }}>
              {item.pushNotifyDto.pushMessage}
            </Text>
          </View>
          <Pressable>
            <Text style={styles.dayAndTime}>
              {formatDate(item.pushNotifyDto.pushDate)}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <View>
          {response?.result?.length > 0 ? (
            <FlatList
              data={response?.result}
              keyExtractor={(item) => item.pushDetailId}
              renderItem={General}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getAllNotification}
                />
              }
              ListFooterComponent={<View style={{ height: 50 }} />}
            />
          ) : (
            <Nodata text="No notification" />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingVertical: 8,
    // marginTop: 5,
  },
  card: {
    flex: 1,
    maxWidth: "100%",
    width: "95%",
    // width: 300,
    // marginHorizontal: 16,
    alignSelf: "center",
    maxHeight: "100%",
    height: 100,
    marginTop: 5,
    backgroundColor: "#eef3f9",
    marginBottom: 10,
    elevation: 4,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  cardData: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.7,
  },
  dayAndTime: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "bold",
    color: "#3696f9",
  },
});
