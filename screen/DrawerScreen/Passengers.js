import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
// import React, { useContext } from "react";
import Icon from "../../components/Icon";

// import { API } from "../config";
// import { AuthContext } from "../store/store";

const data = [
  {
    id: 1,
    name: "Irfan Ali",
    Email: "Irfan@gmail.com",
    gender: "male",
    image: "IMAGE",
    backgroundColor: "#3497fd",
  },
  {
    id: 2,
    name: "Muddasir Khan",
    Email: "Irfan@gmail.com",
    gender: "male",
    image: "IMAGE",
    backgroundColor: "#55cd85",
  },
  {
    id: 3,
    name: "M Afnan",
    Email: "Irfan@gmail.com ",
    gender: "Female",
    image: "IMAGE",
    backgroundColor: "#55cd85",
  },
  {
    id: 4,
    name: "Adnan Khan",
    Email: "Irfan@gmail.com ",
    gender: "male",
    image: "IMAGE",

    backgroundColor: "#3497fd",
  },
  {
    id: 5,
    name: "Asad Khan",
    Email: "Irfan@gmail.com",
    gender: "Female",
    image: "IMAGE",
    backgroundColor: "#3497fd",
  },
  {
    id: 6,
    name: "Muhammed ali",
    Email: "Irfan@gmail.com",
    gender: "male",
    image: "IMAGE",
    backgroundColor: "#55cd85",
  },
  {
    id: 7,
    name: "Khan",
    Email: "Irfan@gmail.com",
    gender: "Female",
    image: "IMAGE",
    backgroundColor: "#55cd85",
  },
  {
    id: 8,
    name: "Asad Ullah",
    Email: "Irfan@gmail.com",
    gender: "male",
    image: "IMAGE",

    backgroundColor: "#3497fd",
  },
];

const ServiceProvider = ({ navigation }) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{ marginLeft: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </Pressable>
      ),
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
  // React.useEffect(() => {
  //   getUserData();
  // }, []);
  // console.log("stateData=>", state);
  return (
    <View style={styles.mainContainer}>
      <FlatList
        numColumns={2}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <View
            style={[
              styles.tilesItem,
              { backgroundColor: item.item.backgroundColor },
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
              <View style={styles.innerContainer}>
                <View>
                  <Text
                    style={[styles.serviceProviderText, { marginBottom: 5 }]}
                  >
                    {item.item.ServiceProvider1}
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#90d9dd",
                      paddingHorizontal: 4,
                      paddingVertical: 4,
                      borderRadius: 4,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <Text>{item.item.name}</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#90d9dd",
                      paddingHorizontal: 4,
                      paddingVertical: 4,
                      borderRadius: 4,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text>Type:{item.item.Email}</Text>
                  </View>

                  <Text
                    style={[
                      styles.serviceProviderText,
                      { alignSelf: "flex-end" },
                    ]}
                  >
                    {item.item.gender}
                  </Text>
                </View>
              </View>
              <View>
                <Pressable
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
      />
    </View>
  );
};

export default ServiceProvider;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  services: {
    maxWidth: "100%",
    width: 150,
    maxHeight: "100%",
    height: 150,

    margin: 3,
    elevation: 3,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    backgroundColor: "red",
  },
  service: {
    borderRadius: 6,
    alignItems: "center",
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
  tilesItem: {
    flex: 1,
    margin: 4,
    height: 150,
    elevation: 4,
    backgroundColor: "white",

    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    shadowOpacity: 0.25,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: { flex: 1 },
  innerContainer: {
    flex: 1,
    padding: 6,
  },
  pressed: {
    opacity: 0.7,
  },
  serviceProviderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
});
