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
  {
    id: 1,
    name: "Irfan Ali",
    contact: "1123203333",
    ServiceProvider1: "Service Provider 1",
    RatingStar: "***",
  },
  {
    id: 2,
    name: "Muddasir Khan",
    contact: "1123203333",
    ServiceProvider1: "Service Provider 2",
    RatingStar: "****",
  },
  {
    id: 3,
    name: "M Afnan",
    contact: "1123203333",
    ServiceProvider1: "Service Provider 3",
    RatingStar: "*****",
  },
  {
    id: 4,
    name: "Adnan Khan",
    contact: "1123203333",
    ServiceProvider1: "Service Provider 4",
    RatingStar: "***",
  },
  {
    id: 5,
    name: "Asad Khan",
    contact: "1123203333",
    ServiceProvider1: "Service Provider 5",
    RatingStar: "***",
  },
  {
    id: 6,
    name: "Muhammed ali",
    contact: "1123203333",
    ServiceProvider1: "Service Provider 6",
    RatingStar: "***",
  },
  {
    id: 7,
    name: "Khan",
    contact: "1123203333",
    ServiceProvider1: "Service Provider 7",
    RatingStar: "***",
  },
  {
    id: 8,
    name: "Asad Ullah",
    contact: "1123203333",
    ServiceProvider1: "Service Provider 8",
    RatingStar: "*****",
  },
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
        renderItem={(item) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("Service Provider Details", {
                  itemId: item.item.id,
                  name: item.item.ServiceProvider1,
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
    flex: 1,
    paddingVertical: 3,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
    // maxWidth: "100%",
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
