import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  RefreshControl,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { useContext } from "react";
import Icon from "../../components/Icon";
import { dependentApi, mobileApi } from "../../config";
import Activityindicator from "../../components/Activityindicator";
import Rating from "../../components/Rating";
import Nodata from "../../components/Nodata";

const YourDriver = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [spId, setSpId] = useState("");
  const [driverArray, setDriverArray] = useState("");
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

  const getDriverHandler = async () => {
    if (isFocused) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${mobileApi}/sp/geMobileDriverForSP/${spId}`
        );
        const responseData = await response.json();
        console.log("all drivers", responseData);
        if (responseData.code === "200") {
          setDriverArray(responseData);
        }
        // const resposneArray = responseData;
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    if (spId && isFocused) {
      getDriverHandler();
    }
  }, [spId, isFocused]);
  useEffect(() => {
    navigation.setOptions({
      // ),
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("Add Driver")}
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
  const renderDriversHandler = ({ item, index }) => {
    const formatedImage = item?.documentList.map((doc) => ({
      imageString: doc?.imageString,
    }));
    console.log("fomateed image", formatedImage);
    return (
      <View
        style={[
          styles.tilesItem,
          index % 2 === 0 ? styles.evenItem : styles.oddItem,
        ]}
      >
        <Pressable style={({ pressed }) => [styles.button]}>
          <Pressable
            onPress={() =>
              navigation.navigate("Update Driver", {
                driverName: item?.driverName,
                driverCnic: item?.driverCnic,
                driverLicenseNum: item?.driverLicenseNum,
                driverContactNumber: item?.driverContactNumber,
                driverOtherNumber: item?.driverOtherNumber,
                driverAge: item?.driverAge,
                driverAddress: item?.driverAddress,
                driverGender: item?.driverGender,
                driverEmail: item?.driverEmail,
                status: item?.active,
                imageString: formatedImage,
                driverId: item?.driverId,
              })
            }
            style={({ pressed }) => [
              styles.innerContainer,
              pressed && styles.pressed,
            ]}
          >
            <View>
              <Text style={[styles.serviceProviderText, { marginBottom: 5 }]}>
                {item.serviceProviderDto.spName}
              </Text>
              <View style={[styles.cardInnerDataStyle, { marginBottom: 10 }]}>
                <Text style={styles.Text}>NAME</Text>
                <Text style={styles.Text}>{item.driverName}</Text>
              </View>
              <View style={styles.cardInnerDataStyle}>
                <Text style={styles.Text}>EMAIL</Text>
                <Text style={styles.Text}>{item.driverEmail}</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Rating rating={item.driverAvgRating} />
                <Text style={[styles.serviceProviderText]}>
                  {item.driverGender}
                </Text>
              </View>
            </View>
          </Pressable>
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
          {driverArray?.result?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={driverArray?.result}
              keyExtractor={(item) => item.driverId}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getDriverHandler}
                />
              }
              renderItem={renderDriversHandler}
            />
          ) : (
            <Nodata text="Empty driver list" />
          )}
        </View>
      )}
    </>
  );
};

export default YourDriver;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 12,
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
  Text: { fontSize: 14, fontWeight: "500" },
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
  evenItem: {
    backgroundColor: "#55cd85",
  },
  oddItem: {
    backgroundColor: "#3497fd",
  },
  pressed: {
    opacity: 0.7,
  },
});
