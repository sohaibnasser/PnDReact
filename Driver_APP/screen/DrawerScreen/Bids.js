import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { useContext } from "react"
import { dependentApi, mobileApi } from "../../config";
import Activityindicator from "../../components/Activityindicator";
import Icon from "../../components/Icon";
import { formatTimeWithAMPM } from "../../Util/date";

// import { API } from "../config";
// import { AuthContext } from "../store/store";

// const data = [
//   {
//     id: 1,
//     name: "Irfan Ali",
//     Email: "Irfan@gmail.com",
//     gender: "male",
//     image: "IMAGE",
//     backgroundColor: "#3497fd",
//   },
//   {
//     id: 2,
//     name: "Muddasir Khan",
//     Email: "Irfan@gmail.com",
//     gender: "male",
//     image: "IMAGE",
//     backgroundColor: "#55cd85",
//   },
//   {
//     id: 3,
//     name: "M Afnan",
//     Email: "Irfan@gmail.com ",
//     gender: "Female",
//     image: "IMAGE",
//     backgroundColor: "#55cd85",
//   },
//   {
//     id: 4,
//     name: "Adnan Khan",
//     Email: "Irfan@gmail.com ",
//     gender: "male",
//     image: "IMAGE",

//     backgroundColor: "#3497fd",
//   },
//   {
//     id: 5,
//     name: "Asad Khan",
//     Email: "Irfan@gmail.com",
//     gender: "Female",
//     image: "IMAGE",
//     backgroundColor: "#3497fd",
//   },
//   {
//     id: 6,
//     name: "Muhammed ali",
//     Email: "Irfan@gmail.com",
//     gender: "male",
//     image: "IMAGE",
//     backgroundColor: "#55cd85",
//   },
//   {
//     id: 7,
//     name: "Khan",
//     Email: "Irfan@gmail.com",
//     gender: "Female",
//     image: "IMAGE",
//     backgroundColor: "#55cd85",
//   },
//   {
//     id: 8,
//     name: "Asad Ullah",
//     Email: "Irfan@gmail.com",
//     gender: "male",
//     image: "IMAGE",

//     backgroundColor: "#3497fd",
//   },
// ];

const Bids = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [parentID, setParentID] = useState();
  const [dataResponse, setDataResponse] = useState([]);
  console.log("data response of bids===>>>>", dataResponse.result);
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

  const getProfileDataHandler = async () => {
    if (isFocused && parentID) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${mobileApi}/bid/getBidAgainstParentId/${parentID}`
        );
        const responseData = await response.json();
        const resposneArray = responseData;
        setDataResponse(resposneArray);
        console.log("biddddd", resposneArray);
        // const resData = responseData;
        // console.log("response dartaaaaa=>", resData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (parentID && isFocused) {
      getProfileDataHandler();
    }
  }, [parentID, isFocused]);
  useEffect(() => {
    navigation.setOptions({
      // headerLeft: () => (
      //   <Pressable
      //     style={({ pressed }) => [
      //       pressed && styles.pressed,
      //       { marginLeft: 20 },
      //     ]}
      //     onPress={() => navigation.navigate("Dashboard")}
      //   >
      //     <Ionicons name="arrow-back-outline" size={24} color="white" />
      //   </Pressable>
      // ),
      //   headerRight: () => (
      //     <Pressable
      //       onPress={() => navigation.navigate("Add Passenger")}
      //       style={({ pressed }) => [
      //         pressed && styles.pressed,
      //         styles.headerRightButton,
      //       ]}
      //     >
      //       <Icon name="plus-box" color="#3696f9" size={33} />
      //     </Pressable>
      //   ),
    });
  }, [navigation]);
  //   const [state, setState] = useContext(AuthContext);
  // async function getUserData() {
  //   const response = await fetch(`${API}/profile/6`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const responseData = await response.json();
  //   const oop = responseData.result;
  //   setState(oop);
  //   //   return responseData;
  //   //   console.log("response Data", responseData);
  //   //   setIsLoading(false);
  //   //   if (responseData.message === "success") {
  //   //     alert("An Otp is sent to your given Email")Irfan@gmail.com navigation.navigate("SignIn");

  //   // setIsLoading(false);
  //   //   } else {
  //   //     // store to context
  //   //     // setState(data);
  //   //     // store to asyncstorage
  //   //     // await AsyncStorage.setItem("@auth", JSON.stringify(data));
  //   //     // setIsLoading(false);
  //   //     alert(responseData.error);
  //   //   }
  //   //   } catch (error) {
  //   //     console.log("not ", error.message);
  //   //     alert(error.message);
  //   //     // setIsLoading(false);
  //   //   }
  // }
  // useEffect(() => {
  //   getUserData();
  // }, []);
  // console.log("stateData=>", state);

  return (
    <>
      {isLoading ? (
        <Activityindicator isLoading={isLoading} />
      ) : (
        <View style={styles.mainContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataResponse.result}
            keyExtractor={(item) => item.bidId}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.tilesItem,
                  index % 2 === 0 ? styles.evenItem : styles.oddItem,
                ]}
              >
                <Pressable
                  // onPress={() =>
                  //   navigation.navigate("Service Provider Details", {
                  //     itemId: item.item.id,
                  //     name: item.item.ServiceProvider1,
                  //   })
                  // }
                  style={({ pressed }) => [
                    // pressed && styles.pressed,
                    styles.button,
                  ]}
                >
                  <Pressable
                    onPress={() =>
                      navigation.navigate("Update Bid", {
                        bidIdd: item.bidId,
                        parentIDD: parentID,
                        bidAmountt: item.bidAmount,
                        bidPickupTimee: item.bidPickupTime,
                        bidDropTimee: item.bidDropTime,
                        bidReturnDropTimee: item.bidReturnDropTime,
                        bidReturnPickTimee: item.bidReturnPickTime,
                        dayss: item.days,
                        messagefrom: item.messageFrom,
                        dependentListt: item.dependentList,
                        numPassengerr: item.numPassenger,
                        fromcity: item.fromCity,
                        tocity: item.toCity,
                        messagee: item.message,
                        returntrip: item.returnTrip,
                        spid: item.serviceProviderDto.spId,
                        parentName: item.parentDto.parentName,
                        bidPickupLatlng: item.bidPickupLatlng,
                        bidDropLatlng: item.bidDropLatlng,
                        bidDropLocation: item.bidDropLocation,
                        bidPickupLocation: item.bidPickupLocation,
                      })
                    }
                    style={({ pressed }) => [
                      styles.innerContainer,
                      pressed && styles.pressed,
                    ]}
                  >
                    <View>
                      <Text
                        style={[
                          styles.serviceProviderText,
                          { marginBottom: 5 },
                        ]}
                      >
                        {item.parentDto.parentName}
                      </Text>
                      <View style={styles.cardInnerDataStyle}>
                        <Text style={styles.Text}>AMOUNT</Text>
                        <Text style={styles.Text}>{item.bidAmount}</Text>
                      </View>
                      <View style={styles.cardInnerDataStyle}>
                        <Text style={styles.Text}>PROPOSED TIME</Text>
                        <Text style={styles.Text}>
                          {formatTimeWithAMPM(item.pickupTimeString)}
                          <Text> /</Text>
                          {formatTimeWithAMPM(item.dropTimeString)}
                        </Text>
                      </View>

                      <Text
                        style={[
                          styles.serviceProviderText,
                          { alignSelf: "flex-end" },
                        ]}
                      >
                        {/* {item.dependentDto.dependentGender} */}
                      </Text>
                    </View>
                  </Pressable>
                  {/* <View>
                <Pressable
                  style={({ pressed }) => [
                    pressed && styles.pressed,
                    styles.detailsButton,
                  ]}
                >
                  <Text style={styles.serviceProviderText}>Ask For Bid</Text>
                </Pressable>
              </View> */}
                </Pressable>
              </View>
            )}
          />
        </View>
        // <Text>h</Text>
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
    fontWeight: "bold",
  },
  tilesItem: {
    flex: 1,
    marginTop: 20,
    // margin: 4,
    // marginVertical: 6,
    maxWidth: "100%",
    width: "95%",

    maxHeight: "100%",
    height: 180,
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

    // paddingVertical: 8,
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
    fontWeight: "bold",
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
});
