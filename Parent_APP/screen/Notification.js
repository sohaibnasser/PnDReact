import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { mobileApi } from "../config";
import Activityindicator from "../components/Activityindicator";
import { memo } from "react";
import Nodata from "../components/Nodata";
import moment from "moment";

const Notification = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [parentID, setParentID] = useState();
  const [dataResponse, setDataResponse] = useState("");

  const isFocused = useIsFocused();
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      // console.log("parent id at passenger", id.parentId);
      setParentID(id.parentId);
    };
    PressHandler();
  }, [setParentID]);

  const getNotificationDataHandler = async () => {
    if (isFocused && parentID) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${mobileApi}/notify/notification_parent/${parentID}`
        );
        const responseData = await response.json();
        const resposneArray = responseData;
        if (responseData.code === "200") {
          setDataResponse(resposneArray);
        }
      } catch (error) {
        return Alert.alert("Error", "Error while getting notifications");
      } finally {
        setIsLoading(false);
      }
    }
  };

  console.log("notification response : ", dataResponse);

  // 2023-06-10T12:46:11.000+0000
  // 2023-06-12T03:45:34.000+0000
  useEffect(() => {
    if (parentID && isFocused) {
      getNotificationDataHandler();
    }
  }, [parentID, isFocused]);
  const [activeTab, setActiveTab] = React.useState("tab1");
  const tab1Styles =
    activeTab === "tab1" ? styles.activeTab : styles.inactiveTab;
  const tab2Styles =
    activeTab === "tab2" ? styles.activeTab : styles.inactiveTab;

  const General = memo(({ item, index }) => {
    console.log(item?.pushNotifyDto?.pushDate);
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.card}>
            <View style={styles.cardData}>
              <View>
                <Text style={{ lineHeight: 20 }}>
                  {item?.pushNotifyDto?.pushTitle}
                </Text>
              </View>
              <View>
                <Text style={{ lineHeight: 20 }}>
                  {item?.pushNotifyDto?.pushMessage}
                </Text>
              </View>
              <View>
                <Text style={styles.dayAndTime}>
                  {item?.pushNotifyDto?.pushDate &&
                    moment(item?.pushNotifyDto?.pushDate).format(
                      "YYYY-MM-DD  HH:mm"
                    )}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  });

  return (
    <>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <View>
          {dataResponse && dataResponse?.result?.length > 0 ? (
            <FlatList
              data={dataResponse.result}
              keyExtractor={(item) => item.pushDetailId}
              renderItem={({ item }) => <General item={item} />}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getNotificationDataHandler}
                />
              }
              ListFooterComponent={<View style={{ height: 100 }}></View>}
            />
          ) : (
            <Nodata text="No notification available" />
          )}
        </View>
      )}
    </>
  );
};
export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginTop: 5,
  },
  card: {
    width: "100%",
    height: 100,
    backgroundColor: "#eef3f9",
    // marginVertical: 10,
    // marginTop: 20,
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
  tabbar: {
    // padding: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#3696f9",
    height: 45,
    borderRadius: 4,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  tabContainer: {
    maxWidth: "100%",
    width: 100,

    height: 28,
    justifyContent: "center",

    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "white",
    borderRadius: 4,
    color: "#000",
  },
  inactiveTab: {
    backgroundColor: "#3696f9",
    borderRadius: 4,
    color: "#fff",
  },
  dayAndTime: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#3696f9",
  },
});
