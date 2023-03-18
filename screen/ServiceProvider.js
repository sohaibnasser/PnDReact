import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import React, { useContext } from "react";
import Icon from "../components/Icon";

import { API } from "../config";
import { AuthContext } from "../store/store";

const data = [
  { id: 1, name: "Asad Ullah", contact: "1123203333", RatingStar: "***" },
  { id: 2, name: "Asad Ullah", contact: "1123203333", RatingStar: "****" },
  { id: 3, name: "Asad Ullah", contact: "1123203333", RatingStar: "*****" },
  { id: 4, name: "Asad Ullah", contact: "1123203333", RatingStar: "***" },
  { id: 5, name: "Asad Ullah", contact: "1123203333", RatingStar: "***" },
  { id: 6, name: "Asad Ullah", contact: "1123203333", RatingStar: "***" },
  { id: 7, name: "Asad Ullah", contact: "1123203333", RatingStar: "***" },
  { id: 8, name: "Asad Ullah", contact: "1123203333", RatingStar: "*****" },
];

const ServiceProvider = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
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
  //   //     alert("An Otp is sent to your given Email");
  //   //     navigation.navigate("SignIn");

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
  // React.useEffect(() => {
  //   getUserData();
  // }, []);
  // console.log("stateData=>", state);
  return (
    <View style={styles.mainContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        key={(item) => item.id}
        numColumns={2}
        renderItem={(item, index) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("Service Provider Details", {
                  itemId: item.item.id,
                })
              }
              style={({ pressed }) => [
                pressed && styles.pressed,
                styles.services,
                { padding: 10 },
              ]}
            >
              <View>
                <Text style={styles.ServiceProviderName}>{item.item.name}</Text>
              </View>
              <Text style={styles.ServiceProviderName}>
                {" "}
                Contact:{item.item.contact}
              </Text>
              {/* <Text>{item.Type}</Text> */}
              <Text style={styles.ServiceProviderName}>
                Rating:{item.item.RatingStar}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default ServiceProvider;

const styles = StyleSheet.create({
  mainContainer: {
    // padding: 8,
    flex: 1,
    alignItems: "center",
    paddingVertical: 3,
    backgroundColor: "#ffffff",
  },
  services: {
    maxWidth: "100%",
    width: 150,
    maxHeight: "100%",
    height: 150,
    backgroundColor: "#55cd85",
    margin: 3,
    // borderRadius: 4,
    elevation: 3,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  service: {
    // maxWidth: "98%",
    borderRadius: 6,
    // maxHeight: "23%",
    // height: 150,
    alignItems: "center",
    // justifyContent: "center",
    color: "white",
  },
  pressed: {
    opacity: 0.7,
  },
  ServiceProviderName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
