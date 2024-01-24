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
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { useContext } from "react";
import Icon from "../../components/Icon";
import { dependentApi } from "../../config";
import Activityindicator from "../../components/Activityindicator";
import { all } from "axios";
import Nodata from "../../components/Nodata";

const Passengers = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [parentID, setParentID] = useState();
  const [dataResponse, setDataResponse] = useState("");
  const [parentName, setParentName] = useState();
  let allowedPassenger = "";
  let addedPassenger = "";
  if (dataResponse) {
    allowedPassenger =
      dataResponse.result[0]?.dependentDto?.parentDto?.packageDto
        ?.numOfPassenger;
    addedPassenger = dataResponse.result?.length;
  }
  addedPassenger = parseInt(addedPassenger);
  allowedPassenger = parseInt(allowedPassenger);

  console.log("added passengers", addedPassenger, allowedPassenger);
  const addPassengerHandler = () => {
    if (
      (addedPassenger && isNaN(addedPassenger)) ||
      (allowedPassenger && isNaN(allowedPassenger))
    ) {
      alert("Invalid passenger count data");
    } else if (addedPassenger >= allowedPassenger) {
      alert("Your package limit has been exceeded");
    } else {
      navigation.navigate("Add Passenger");
    }
  };

  console.log("response123", dataResponse.result?.length);
  const isFocused = useIsFocused();
  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      // console.log("parent id at passenger", id.parentId);
      setParentID(id.parentId);
      setParentName(id.parentName);
    };
    PressHandler();
  }, [setParentID]);

  const getPassengerDataHandler = async () => {
    if (isFocused) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${dependentApi}/parent_dependents/${parentID}`
        );
        const responseData = await response.json();
        // const resposneArray = responseData;
        setDataResponse(responseData);
        console.log("response dartaaaaa=>", responseData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        // isLoading(false);
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (parentID && isFocused) {
      getPassengerDataHandler();
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
      headerRight: () => {
        return (
          <Pressable
            onPress={addPassengerHandler}
            style={({ pressed }) => [
              pressed && styles.pressed,
              styles.headerRightButton,
            ]}
          >
            <Icon name="plus-box" color="#3696f9" size={33} />
          </Pressable>
        );
      },
    });
  }, [navigation, addedPassenger, allowedPassenger]);
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
          {dataResponse && dataResponse?.result?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={dataResponse?.result}
              keyExtractor={(item) => item?.dependentDto?.dependentId}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getPassengerDataHandler}
                />
              }
              ListFooterComponent={<View style={{ height: 200 }}></View>}
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
                        navigation.navigate("Update Passenger", {
                          parentID: parentID,
                          parentName: parentName,
                          id: item?.dependentDto?.dependentId,
                          name: item?.dependentDto?.dependentName,
                          age: item?.dependentDto?.dependentAge,
                          gender: item?.dependentDto?.dependentGender,
                          cnic: item?.dependentDto?.dependentCnic,
                          contact: item?.dependentDto?.dependentContact,
                          email: item?.dependentDto?.dependentEmail,
                          imageurl: item?.dependentDto?.imageUrl,
                          vehicleId: item?.dependentVehicleMapId,
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
                          {item?.dependentDto?.dependentName}
                        </Text>
                        <View
                          style={[
                            styles.cardInnerDataStyle,
                            { marginBottom: 10 },
                          ]}
                        >
                          <Text style={styles.Text}>NAME</Text>
                          <Text style={styles.Text}>
                            {item.dependentDto.dependentName}
                          </Text>
                        </View>
                        <View style={styles.cardInnerDataStyle}>
                          <Text style={styles.Text}>EMAIL</Text>
                          <Text style={styles.Text}>
                            {item.dependentDto.dependentEmail}
                          </Text>
                        </View>

                        <Text
                          style={[
                            styles.serviceProviderText,
                            { alignSelf: "flex-end" },
                          ]}
                        >
                          {item.dependentDto.dependentGender}
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
          ) : (
            <Nodata text="No passengers avaliable" />
          )}
        </View>
      )}
    </>
  );
};

export default Passengers;

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
