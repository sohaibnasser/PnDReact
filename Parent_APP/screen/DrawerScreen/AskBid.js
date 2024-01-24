import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  RefreshControl,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { useContext } from "react";
import Icon from "../../components/Icon";
import Rating from "../../components/Rating";

import { API, mobileApi } from "../../config";
import Activityindicator from "../../components/Activityindicator";
import UserInput from "../../components/auth/UserInput";
// import { AuthContext } from "../store/store";
import Nodata from "../../components/Nodata";

const AskBid = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [parentID, setParentID] = useState("");
  const [bids, setBids] = useState([]);
  console.log("bids", bids);
  const [cityFrom, setCityFrom] = useState("");
  console.log("setCityFrom", cityFrom);
  const [From, setFrom] = useState("");
  const [searchBySchool, setSearchByScool] = useState("");
  const [askforBid, setAskrorBid] = useState("");
  const [days, setDays] = useState("");
  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(true);
  const [searchForSp, setSearchForSp] = useState("Ask for Bid");
  console.log("Search by ", searchForSp);
  const [schoolCode, setSchoolCode] = useState();
  const [schoolArray, setSchoolArray] = useState("");
  console.log("searchschool", schoolArray);
  const [items, setItems] = useState();
  const [dependent, setDependent] = useState();
  console.log("bids2", bids);

  const isFocused = useIsFocused();
  const getAllDependent = async () => {
    if (parentID) {
      try {
        const response = await fetch(
          `${mobileApi}/dependent/parent_dependents/${parentID}`
        );

        const responseData = await response.json();
        console.log(responseData, "response of get all dependent");
        if (responseData.code === "200") {
          setDependent(responseData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getAllDependent();
  }, [isFocused, parentID]);
  console.log("searchForSp:", searchForSp);
  console.log("bids?.result:", bids?.result);
  console.log("schoolArray?.result:", schoolArray?.result);
  const AskForBidToAllSp = () => {
    if (dependent?.result?.length === 0) {
      Alert.alert("Error", "No passenger added for Bid");
      return;
    }
    if (
      searchForSp.toString() === "Ask for Bid" &&
      bids?.result?.length === 0
    ) {
      return Alert.alert("Error", "Empty list of service providers");
    }
    if (
      searchForSp.toString() === "Search by School" &&
      schoolArray?.result?.length === 0
    ) {
      return Alert.alert("Error", "Empty list of service providers");
    }
    // if (schoolArray?.result?.length === 0) {
    //   return Alert.alert("Error", "Empty list of service providers");
    // }
    if (parentID) {
      navigation.navigate("Ask For Bid", {
        spId: null,
        parentId: parentID,
        spName: "Bids To all SP",
      });
    }
  };
  // HEADE RIGHT BUTTON FOR ASK BID TO ALL AVAILABLE SERVICES PROVIDERS
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            onPress={AskForBidToAllSp}
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
  }, [
    navigation,
    parentID,
    dependent?.result,
    bids?.result,
    schoolArray?.result,
    searchForSp,
  ]);

  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);
      setParentID(id?.parentId);
    };
    PressHandler();
  }, [isFocused, setParentID]);

  const askforBidHanler = (item) => {
    if (dependent?.result.length === 0) {
      Alert.alert("Error", "No passenger added for Bid");
      return;
    }
    if (bids?.result?.length === 0 && schoolArray?.result?.length === 0) {
      return Alert.alert("Error", "Empty list of service providers");
    }
    navigation.navigate("Ask For Bid", {
      spId: item?.spId,
      name: item?.spName,
      parentId: parentID,
      spName: item?.spName,
    });
  };
  console.log("parentID in ask bid", parentID);
  const getAllCity = async () => {
    try {
      const response = await fetch(`${mobileApi}/sp/getCityList`);

      const responseCity = await response.json();
      if (responseCity?.code === "200") {
        setCityFrom(responseCity);
      }
      if (responseCity?.result?.length > 0) {
        setFrom(responseCity?.result[0]?.cityName);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isFocused) {
      getAllCity();
    }
  }, [isFocused]);

  const getAllServiceProviders = async (selectedCity) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/sp/ServiceProviderListOrdered/${selectedCity}`
      );
      const resData = await response.json();
      console.log("response data on ask bid", resData);
      if (resData?.code === "200") {
        setBids(resData);
        setItems(resData?.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cityFrom && cityFrom?.result?.length > 0) {
      setFrom(cityFrom?.result[0]?.cityName); // Set the initial value to the first city in the array
      getAllServiceProviders(cityFrom?.result[0]?.cityName); // Call getAllServiceProviders with the initial city value
    }
  }, [cityFrom]);
  const getAllServiceProvidersbasedSchool = async (schoolCode) => {
    const schoolcodeInUpperCase = schoolCode?.toUpperCase();
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/sp/ServiceProviderSchoolSearch/${schoolcodeInUpperCase}`
      );
      const resData = await response.json();
      console.log("response get sp on code", resData);
      if (resData.code === "200") {
        setSchoolArray(resData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // if (cityFrom && cityFrom.result.length > 0) {
    //   setFrom(cityFrom.result[0].cityName); // Set the initial value to the first city in the array
    getAllServiceProvidersbasedSchool(schoolCode); // Call getAllServiceProviders with the initial city value
    // }
  }, [schoolCode]);
  // let filteredData = [];
  // if (!bids) {
  //   const filteredData = bids.result.filter((item) =>
  //     item.spName.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // }
  // let filteredData = [];
  // if (!bids) {

  //   );
  // }
  // console.log("filtrd", filteredData);
  const dataHandler = ({ item, index }) => {
    // console.log("itemmmss", item);
    return (
      <>
        {isLoading ? (
          <Activityindicator isLoading={isLoading} />
        ) : (
          <View
            style={[
              styles.tilesItem,
              index % 2 === 0 ? styles.evenItem : styles.oddItem,
            ]}
          >
            <Pressable
              // onPress={() =>
              //   navigation.navigate("Service Provider Details", {
              //     itemId: item.item.spId,
              //     name: item.item.spName,
              //   })
              // }
              style={({ pressed }) => [
                pressed && styles.pressed,
                styles.button,
              ]}
            >
              <View style={styles.innerContainer}>
                <View>
                  <Text
                    style={[styles.serviceProviderText, { marginBottom: 5 }]}
                  >
                    {item?.spName}
                  </Text>
                  <View style={[styles.cardInnerDataStyle]}>
                    <Text style={styles.Text}>CONTACT NO</Text>
                    <Text>{item?.spContactNumber}</Text>
                  </View>
                  <View style={[styles.cardInnerDataStyle]}>
                    <Text style={styles.Text}>TYPE</Text>
                    <Text style={styles.Text}>{item.spType}</Text>
                  </View>

                  <View
                    style={[
                      styles.serviceProviderText,
                      { alignSelf: "flex-end" },
                    ]}
                  >
                    <Rating rating={item.spRating} />
                  </View>
                </View>
              </View>
              <View>
                <Pressable
                  onPress={() => {
                    askforBidHanler(item);
                  }}
                  style={({ pressed }) => [
                    pressed && styles.pressed,
                    styles.detailsButton,
                  ]}
                >
                  <Text style={styles.serviceProviderText}>Ask For Bid</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
        )}
      </>
    );
  };

  // const filteredDataHandler = (item, index) => {
  //   return (
  //     <View
  //       style={[
  //         styles.tilesItem,
  //         index % 2 === 0 ? styles.evenItem : styles.oddItem,
  //       ]}
  //     >
  //       <Pressable
  //         // onPress={() =>
  //         //   navigation.navigate("Service Provider Details", {
  //         //     itemId: item.item.id,
  //         //     name: item.item.ServiceProvider1,
  //         //   })
  //         // }
  //         style={({ pressed }) => [pressed && styles.pressed, styles.button]}
  //       >
  //         <View style={styles.innerContainer}>
  //           <View>
  //             <Text style={[styles.serviceProviderText, { marginBottom: 5 }]}>
  //               {item.item.spName}
  //             </Text>
  //             <View style={styles.cardInnerDataStyle}>
  //               <Text>Contact:</Text>
  //               <Text>{item.item.spContactNumber}</Text>
  //             </View>
  //             <View style={styles.cardInnerDataStyle}>
  //               <Text>Type:</Text>
  //               <Text>item.item.spType</Text>
  //             </View>

  //             <View
  //               style={[styles.serviceProviderText, { alignSelf: "flex-end" }]}
  //             >
  //               <Rating rating={item.item.spRating} />
  //             </View>
  //           </View>
  //         </View>
  //       </Pressable>
  //     </View>
  //   );
  // };

  const handleYesCheckboxChange = () => {
    setYesChecked(!yesChecked);
    setNoChecked(false);
    setSearchForSp("Search by School");
  };

  const handleNoCheckboxChange = () => {
    setNoChecked(!noChecked);
    setYesChecked(false);
    setSearchForSp("Ask for Bid");
  };
  return (
    <>
      {/* 

      {/* <View> */}

      <View style={styles.mainContainer}>
        {/* <FlatList
          data={Days}
          renderItem={renderDays}
          keyExtractor={(item) => item.dayid}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        /> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            alignItems: "center",
          }}
        >
          <View style={styles.checkboxs}>
            <View style={styles.CheckboxContainer}>
              <Checkbox
                value={yesChecked}
                onValueChange={handleYesCheckboxChange}
                style={styles.checkboxstyle}
                color={yesChecked ? "#3696f9" : undefined}
              />
              <Text style={styles.checkboxText}>Search by School</Text>
            </View>

            <View style={styles.CheckboxContainer}>
              <Checkbox
                value={noChecked}
                onValueChange={handleNoCheckboxChange}
                style={[styles.checkboxstyle, { marginStart: 10 }]}
                color={noChecked ? "#3696f9" : undefined}
              />
              <Text style={styles.checkboxText}>Ask for Bid</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.checkboxView}>
          <Text style={styles.text}>checkbx</Text>
          <Pressable
            style={styles.checkbox}
            onPress={() => toggleO(item?.name)}
          >
            {days.includes(item?.name) && (
              <View>
                <Ionicons name="checkmark" size={22} color="#3696f9" />
              </View>
            )}
          </Pressable>
        </View> */}
        {searchForSp === "Ask for Bid" ? (
          <>
            <View style={styles.dropDown}>
              <View style={styles.dropDownContent}>
                <Text style={styles.text}>Search City</Text>
                {cityFrom && (
                  <Picker
                    style={{ maxWidth: "100%", width: 220 }}
                    selectedValue={From}
                    onValueChange={(itemValue) => {
                      setFrom(itemValue);
                      getAllServiceProviders(itemValue);
                    }}
                  >
                    {cityFrom?.result?.map((option) => (
                      <Picker.Item
                        key={option.cityId}
                        label={option.cityName}
                        value={option.cityName}
                      />
                    ))}
                  </Picker>
                )}
              </View>
            </View>
            {bids?.result?.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={bids?.result}
                keyExtractor={(item) => item.spId}
                renderItem={dataHandler}
                ListFooterComponent={<View style={{ height: 100 }}></View>}
              />
            ) : (
              <Nodata text="No SP available" />
            )}
          </>
        ) : (
          <>
            <View style={styles.SearchContainer}>
              <TextInput
                style={styles.Search}
                onChangeText={(text) => setSchoolCode(text)}
                value={schoolCode}
                placeholder="Search..."
              />
            </View>
            {schoolArray?.result?.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={schoolArray.result}
                keyExtractor={(item) => item.spId}
                renderItem={dataHandler}
                ListFooterComponent={<View style={{ height: 100 }}></View>}
              />
            ) : (
              <Nodata text="No SP available" />
            )}
          </>
        )}
        {/* <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredData}
            // renderItem={({ item }) => <Text>{item.ServiceProvider1}</Text>}
            keyExtractor={(item) => item.spId}
            renderItem={filteredDataHandler}
          />
        </View> */}
        {/* {!filteredData && ( */}

        {/* )} */}
      </View>
    </>
  );
};

export default AskBid;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 8,
  },
  checkboxs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  checkboxstyle: {
    borderRadius: 10,
    // backgroundColor: "transparent",
  },
  CheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input__icon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 10,
    paddingLeft: 10,
    overflow: "hidden",
  },
  SearchContainer: {
    marginTop: 5,
    borderWidth: 0.4,
    borderColor: "gray",
    marginHorizontal: 5,
    backgroundColor: "white",
  },

  Search: {
    maxWidth: "100%",
    height: 40,
    borderRadius: 4,
    paddingLeft: 10,
  },
  dropDown: {
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  dropDownContent: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    marginLeft: 10,
  },
  text: {
    color: "gray",
    fontSize: 15,
    width: "auto",
  },
  checkboxView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 1,
    borderColor: "#3696f9",
    borderRadius: 12,
    marginHorizontal: 10,
  },
  checkboxText: {
    marginRight: 5,
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "500",
    color: "#3696f9",
  },
  headerRightButton: {
    justifyContent: "center",
    paddingTop: 10,
    paddingRight: 10,
  },
  // services: {
  //   maxWidth: "100%",
  //   width: 150,
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
  // service: {
  //   borderRadius: 6,
  //   alignItems: "center",
  //   color: "white",
  // },
  pressed: {
    opacity: 0.7,
  },
  Text: { fontSize: 14, fontWeight: "500" },
  ServiceProviderName: {
    color: "#fff",
    fontSize: 20,
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

  cardInnerDataStyle: {
    backgroundColor: "#90d9dd",

    marginVertical: 10,
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
  detailsButton: {
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
  // detailsButton: {
  //   borderWidth: 0.4,
  //   // maxWidth: "100%",
  //   width: 100,
  //   // alignSelf: "center",
  //   borderRadius: 4,
  //   padding: 3,
  //   borderColor: "white",
  //   alignItems: "center",
  //   alignSelf: "center",
  //   // justifyContent: "center",
  //   // margin: 10,
  // },
});
