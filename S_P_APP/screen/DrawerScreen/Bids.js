import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import React, { useEffect, useState, memo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { mobileApi } from "../../config";
import Activityindicator from "../../components/Activityindicator";

import { formatTimeWithAMPM } from "../../Util/date";
import Nodata from "../../components/Nodata";

const Bids = ({ navigation, route }) => {
  const { bidToAll } = route.params || {};
  const [isLoading, setIsLoading] = useState(false);
  const [parentID, setParentID] = useState();
  const [dataResponse, setDataResponse] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [spId, setSpId] = useState("");

  // console.log("data response of bids===>>>>", dataResponse.result);
  const isFocused = useIsFocused();
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      console.log("ID0", id);
      setSpId(id.spId);
    };
    PressHandler();
  }, [setSpId]);

  const getProfileDataHandler = async () => {
    if (isFocused && spId) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${mobileApi}/bid/getBidAgainstSpId/${spId}`
        );
        const responseData = await response.json();
        const resposneArray = responseData;
        setDataResponse(resposneArray);
        setRefreshing(false);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (spId && isFocused) {
      getProfileDataHandler();
    }
  }, [spId, isFocused, refreshKey]);
  const onBidPress = (item) => {
    navigation.navigate("Update Bid", {
      bidIdd: item?.bidId,
      bidAmountt: item?.bidAmount,
      bidPickupTimee: item?.bidPickupTime,
      bidDropTimee: item?.bidDropTime,
      bidReturnDropTimee: item?.bidReturnDropTime,
      bidReturnPickTimee: item?.bidReturnPickTime,
      dayss: item?.days,
      messagefrom: item?.messageFrom,
      dependentListt: item?.dependentList,
      numPassengerr: item?.numPassenger,
      fromcity: item?.fromCity,
      tocity: item?.toCity,
      messagee: item?.message,
      returntrip: item?.returnTrip,
      spId: item.serviceProviderDto?.spId,
      spName: item.serviceProviderDto?.spName,
      parentName: item?.parentDto?.parentName,
      parentId: item?.parentDto?.parentId,
      bidPickupLatlng: item?.bidPickupLatlng,
      bidDropLatlng: item?.bidDropLatlng,
      bidDropLocation: item?.bidDropLocation,
      bidPickupLocation: item?.bidPickupLocation,
      vehicleId: item?.vehicleDto?.vehicleId,
      status: item?.bidStatus,
    });
  };
  const RenderBids = memo(({ item, index }) => {
    return (
      <View
        style={[
          styles.tilesItem,
          index % 2 === 0 ? styles.evenItem : styles.oddItem,
        ]}
      >
        <Pressable style={[styles.button]}>
          <Pressable
            style={({ pressed }) => [
              styles.innerContainer,
              pressed && styles.pressed,
            ]}
          >
            <View>
              <Text style={[styles.serviceProviderText, { marginBottom: 5 }]}>
                {item.serviceProviderDto?.spName}
              </Text>
              <View style={[styles.cardInnerDataStyle, { marginBottom: 10 }]}>
                <Text style={styles.Text}>AMOUNT</Text>
                <Text style={styles.Text}>{item?.bidAmount}</Text>
              </View>
              <View style={styles.cardInnerDataStyle}>
                <Text style={styles.Text}>PROPOSED TIME</Text>
                <Text style={styles.Text}>
                  {item.bidPickupTime &&
                    formatTimeWithAMPM(item?.bidPickupTime)}
                  <Text> /</Text>
                  {item?.bidDropTime && formatTimeWithAMPM(item?.bidDropTime)}
                </Text>
              </View>
              {item?.returnTrip === "Yes" && (
                <View
                  style={[styles.cardInnerDataStyle, { marginVertical: 10 }]}
                >
                  <Text style={styles.Text}>RETURN TIME</Text>
                  <Text style={styles.Text}>
                    {item.bidPickupTime &&
                      formatTimeWithAMPM(item?.bidReturnPickTime)}
                    <Text> /</Text>
                    {item?.bidDropTime &&
                      formatTimeWithAMPM(item?.bidReturnDropTime)}
                  </Text>
                </View>
              )}

              <Text
                style={[styles.serviceProviderText, { alignSelf: "flex-end" }]}
              ></Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => onBidPress(item)}
            style={({ pressed }) => [
              pressed && styles.pressed,
              styles.ApproveRejectButtons,
            ]}
          >
            <Text style={styles.serviceProviderText}>Update Bid</Text>
          </Pressable>
        </Pressable>
      </View>
    );
  });
  return (
    <>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <View style={styles.mainContainer}>
          {dataResponse?.result?.length > 0 ? (
            <FlatList
              data={dataResponse.result}
              keyExtractor={(item) => item.bidId}
              renderItem={({ item, index }) => (
                <RenderBids item={item} index={index} />
              )}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getProfileDataHandler}
                />
              }
              ListFooterComponent={<View style={{ height: 100 }}></View>}
            />
          ) : (
            <Nodata text="No bids available" />
          )}
        </View>
      )}
    </>
  );
};

export default Bids;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingBottom: 10,
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
    // margin: 4,
    // marginVertical: 6,
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
  headerRightButton: {
    justifyContent: "center",
    paddingTop: 10,
    paddingRight: 10,
  },
  Text: { fontSize: 14, fontWeight: "500" },
  evenItem: {
    backgroundColor: "#55cd85",
  },
  oddItem: {
    backgroundColor: "#3497fd",
  },
  pressed: {
    opacity: 0.7,
  },

  ApproveRejectButtons: {
    borderWidth: 0.4,
    maxWidth: "100%",
    width: 100,
    alignSelf: "center",
    borderRadius: 4,
    padding: 3,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});
