import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Icon from "../../components/Icon";

const data = [
  {
    id: 1,
    DateFrom: "01/05/2023",
    DateTo: "01/05/2023",
    remarks: "abcd ...",
    announced: "announced",
    backgroundColor: "#3497fd",
  },
  {
    id: 2,
    DateFrom: "01/02/2022",
    DateTo: "01/05/2023",
    remarks: "abcd ...",
    announced: "announced",
    backgroundColor: "#55cd85",
  },
  {
    id: 3,
    DateTo: "01/05/2023",
    DateFrom: "01/02/2022",
    remarks: "abcd ...",
    announced: "announced",
    backgroundColor: "#55cd85",
  },
  {
    id: 4,
    DateTo: "01/05/2023",
    DateFrom: "01/02/2022",
    remarks: "abcd ...",
    announced: "announced",

    backgroundColor: "#3497fd",
  },
  {
    id: 5,
    DateTo: "01/05/2023",
    DateFrom: "01/02/2022",
    remarks: "abcd ...",
    announced: "announced",
    backgroundColor: "#3497fd",
  },
  {
    id: 6,
    DateTo: "01/05/2023",
    DateFrom: "01/02/2022",
    remarks: "abcd ...",
    announced: "announced",
    backgroundColor: "#55cd85",
  },
  {
    id: 7,
    DateTo: "01/05/2023",
    DateFrom: "01/02/2022",
    remarks: "abcd ...",
    announced: "announced",
    backgroundColor: "#55cd85",
  },
  {
    id: 8,
    DateTo: "01/05/2023",
    DateFrom: "01/02/2022",
    remarks: "abcd ...",
    announced: "announced",

    backgroundColor: "#3497fd",
  },
];

const Leaves = ({ navigation }) => {
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
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("Add Leave")}
          style={({ pressed }) => [
            pressed && styles.pressed,
            styles.headerRightButton,
          ]}
        >
          <Icon name="plus-box" color="#3696f9" size={33} />
        </Pressable>
        // <Pressable style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
        //   <Ionicons name="arrow-back-outline" size={24} color="white" />
        // </Pressable>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
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
              //   onPress={() =>
              //     navigation.navigate("Service Provider Details", {
              //       itemId: item.item.id,
              //       name: item.item.ServiceProvider1,
              //     })
              //   }
              style={({ pressed }) => [styles.button]}
            >
              <View style={styles.innerContainer}>
                <View>
                  <View style={styles.Date}>
                    <Text style={{ fontWeight: "bold" }}>
                      {item.item.DateFrom}
                    </Text>
                  </View>
                  <View style={styles.Date}>
                    <Text style={{ fontWeight: "bold" }}>
                      {item.item.DateTo}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[styles.serviceProviderText]}>
                    {item.item.remarks}
                  </Text>
                  <View>
                    <Text style={styles.serviceProviderText}>
                      {item.item.announced}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                {/* <Pressable
                  style={({ pressed }) => [
                    pressed && styles.pressed,
                    styles.detailsButton,
                  ]}
                >
                  <Text style={styles.serviceProviderText}>Ask For Bid</Text>
                </Pressable> */}
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default Leaves;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    stickyHeaderHiddenOnScroll: false,
  },
  headerRightButton: {
    justifyContent: "center",
    paddingTop: 10,
    paddingRight: 10,
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
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.7,
  },
  serviceProviderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  Date: {
    backgroundColor: "#90d9dd",
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
});
