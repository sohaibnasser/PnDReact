import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import Icon from "../components/Icon";
import { Badge } from "react-native-paper";
import Rating from "../components/Rating";

const data = [
  {
    id: 1,
    name: "Irfan Ali",
    contact: "1123203333",
    ServiceProvider: "Service Provider 1",
    RatingStar: "***",
  },
  {
    id: 2,
    name: "Muddasir Khan",
    contact: "1123203333",
    ServiceProvider: "Service Provider 2",
    RatingStar: "****",
  },
  {
    id: 3,
    name: "M Afnan",
    contact: "1123203333",
    ServiceProvider: "Service Provider 3",
    RatingStar: "*****",
  },
  {
    id: 4,
    name: "Adnan Khan",
    contact: "1123203333",
    ServiceProvider: "Service Provider 4",
    RatingStar: "***",
  },
  {
    id: 5,
    name: "Asad Khan",
    contact: "1123203333",
    ServiceProvider: "Service Provider 5",
    RatingStar: "***",
  },
  {
    id: 6,
    name: "Muhammed ali",
    contact: "1123203333",
    ServiceProvider: "Service Provider 6",
    RatingStar: "***",
  },
  {
    id: 7,
    name: "Khan",
    contact: "1123203333",
    ServiceProvider: "Service Provider 7",
    RatingStar: "***",
  },
  {
    id: 8,
    name: "Asad Ullah",
    contact: "1123203333",
    ServiceProvider: "Service Provider 8",
    RatingStar: "*****",
  },
];

const ServiceProviderDetails = ({ route, navigation }) => {
  const Itemid = route.params.itemId;
  const name = route.params.name;
  const displayData = data.filter((item) => {
    return item.id === Itemid;
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  }, []);
  function renderItem(providerData) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <Badge style={{ backgroundColor: "#328dfa" }} size={15}>
                  1
                </Badge>
                <Image
                  style={{ width: 50, height: 15, marginRight: 8 }}
                  source={require("../assets/favicon.png")}
                />
              </View>
              <Text style={styles.text}>ABC 123</Text>
              <Icon name="chevron-right" color="green" size={28} />
            </View>
            <View>
              <Rating rating={3} />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <Image
                style={styles.img}
                source={require("../assets/favicon.png")}
              />
            </View>
            <View style={styles.provider}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text}>{providerData.item.name}</Text>
                  <Icon name="chevron-right" color="green" size={28} />
                </View>
                <Icon name="message-text-outline" color="#328dfa" size={20} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={displayData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ServiceProviderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
  },
  card: {
    maxHeight: "50%",
    maxWidth: "100%",
    width: 350,
    height: 280,
    backgroundColor: "#fff",
    borderRadius: 4,
    elevation: 4,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    padding: 10,
    marginTop: 10,
  },
  cardHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 0.4,
    borderBottomColor: "gray",
  },
  img: {
    width: 30,
    height: 30,
    marginRight: 8,
    borderRadius: 15,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  provider: {
    paddingTop: 10,
    flexDirection: "row",
  },
  text: { fontWeight: "", fontSize: 20 },
});
