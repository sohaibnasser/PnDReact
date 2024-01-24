import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useMemo } from "react";
import Icon from "../components/Icon";
import { Tabbar } from "../components/auth/Tabbar";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { mobileApi } from "../config";
import { formatTimeWithAMPM } from "../Util/date";
import Activityindicator from "../components/Activityindicator";
import { SafeAreaView } from "react-native-safe-area-context";
import Nodata from "../components/Nodata";

const Notification = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [spId, setSpId] = useState();
  const [dataResponse, setDataResponse] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      // console.log("parent id at passenger", id.spId);
      setSpId(id.spId);
    };
    PressHandler();
  }, [setSpId]);

  const getNotificationDataHandler = async () => {
    if (isFocused && spId) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${mobileApi}/sp/getNotificationAgainstSpId/${spId}`
        );
        const responseData = await response.json();
        if (responseData.code === "200") {
          setDataResponse(responseData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  // 2023-06-10T12:46:11.000+0000
  // 2023-06-12T03:45:34.000+0000
  useEffect(() => {
    if (spId && isFocused) {
      getNotificationDataHandler();
    }
  }, [spId, isFocused]);

  const General = React.memo(({ item, index }) => {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.card}>
            <View style={styles.cardData}>
              <View>
                <Text style={{ lineHeight: 20 }}>
                  {item.pushNotifyDto.pushTitle}
                </Text>
              </View>
              <View>
                <Text style={{ lineHeight: 20 }}>
                  {item.pushNotifyDto.pushMessage}
                </Text>
              </View>
              <View>
                <Text style={styles.dayAndTime}>
                  {item?.pushNotifyDto.pushDate &&
                    formatTimeWithAMPM(item.pushNotifyDto.pushDate)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  });

  return (
    <View>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <>
          {dataResponse?.result?.length > 0 ? (
            <FlatList
              data={dataResponse?.result}
              keyExtractor={(item) => item.pushDetailId}
              renderItem={({ item }) => <General item={item} />}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getNotificationDataHandler}
                />
              }
              ListFooterComponent={<View style={{ height: 200 }}></View>}
            />
          ) : (
            <Nodata text="No notifications avaliable" />
          )}
        </>
      )}
    </View>
  );
};
export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    marginTop: 10,
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
