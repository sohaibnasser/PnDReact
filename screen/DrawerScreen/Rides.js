import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Button from "../../components/auth/Button";
import { Tabbar } from "../../components/auth/Tabbar";
import Icon from "../../components/Icon";
import { Ionicons } from "@expo/vector-icons";

export const Rides = ({ navigation }) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{ marginLeft: 20 }}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);
  const [activeTab, setActiveTab] = React.useState("tab1");
  const tab1Styles =
    activeTab === "tab1" ? styles.activeTab : styles.inactiveTab;
  const tab2Styles =
    activeTab === "tab2" ? styles.activeTab : styles.inactiveTab;
  const tab3Styles =
    activeTab === "tab3" ? styles.activeTab : styles.inactiveTab;
  function Today() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.tabbar}>
            <View>
              <Tabbar
                title="Today Ride"
                handlePress={() => setActiveTab("tab1")}
                color={tab1Styles}
              />
            </View>
            <View>
              <Tabbar
                title="Previous Ride"
                handlePress={() => setActiveTab("tab2")}
              />
            </View>
            <View>
              <Tabbar
                title="Future Ride"
                handlePress={() => setActiveTab("tab3")}
              />
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardData}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.dayAndTime}>Monday</Text>
                <Text style={styles.dayAndTime}> Pending</Text>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="circle-outline" color="#49bece" size={15} />
                  <Text style={styles.fromAndtoTxt}>Pick Up</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 0.4,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  }}
                >
                  <Text style={styles.FromAndToPlace}>I-8/4 Islamabad</Text>
                  <Text style={styles.dayAndTime}>7:30 am</Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <Icon name="circle-outline" color="green" size={15} />
                  <Text style={styles.fromAndtoTxt}>Drop Off</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomColor: "gray",
                    paddingTop: 10,
                  }}
                >
                  <Text style={styles.FromAndToPlace}>I-8/4 Islamabad</Text>
                  <Text style={styles.dayAndTime}>2:30 pm</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  function Previous() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.tabbar}>
            <View>
              <Tabbar
                title="Today Ride"
                handlePress={() => setActiveTab("tab1")}
              />
            </View>
            <View>
              <Tabbar
                title="Previous Ride"
                handlePress={() => setActiveTab("tab2")}
                color={tab2Styles}
              />
            </View>
            <View>
              <Tabbar
                title="Future Ride"
                handlePress={() => setActiveTab("tab3")}
              />
            </View>
          </View>
          <View
            style={[styles.card, { backgroundColor: "rgba(54, 150, 249,0.9)" }]}
          >
            <View style={styles.cardData}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.dayAndTimePrevious}>Saturday</Text>
                <Text style={styles.dayAndTimePrevious}>Completed</Text>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="circle-outline" color="#49bece" size={15} />
                  <Text style={styles.fromAndtoTxtPrevious}>Pick Up</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 0.4,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  }}
                >
                  <Text style={styles.FromAndToPlace}>I-8/4 Islamabad</Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <Icon name="circle-outline" color="green" size={15} />
                  <Text style={styles.fromAndtoTxtPrevious}>Drop Off</Text>
                </View>
                <View
                  style={{
                    borderBottomColor: "gray",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.FromAndToPlace}>NUML H9-Islamabad</Text>
                  <Text style={styles.dayAndTimePrevious}>8: 00 am</Text>
                </View>
              </View>
            </View>
          </View>
          {/* <View style={styles.card}>
            <View style={styles.cardData}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.dayAndTimePrevious}>Friday</Text>
                <Text style={styles.dayAndTimePrevious}>Completed</Text>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="circle-outline" color="#49bece" size={15} />
                  <Text style={styles.fromAndtoTxt}>Pick Up</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 0.4,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  }}
                >
                  <Text style={styles.FromAndToPlace}>I-8/4 Islamabad</Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <Icon name="circle-outline" color="green" size={15} />
                  <Text style={styles.fromAndtoTxt}>Drop Off</Text>
                </View>
                <View
                  style={{
                    borderBottomColor: "gray",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.FromAndToPlace}>I-8/4 Islamabad</Text>
                  <Text style={styles.dayAndTimePrevious}>8: 00 am</Text>
                </View>
              </View>
            </View>
          </View> */}
        </View>
      </View>
    );
  }
  function Future() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.tabbar}>
            <View>
              <Tabbar
                title="Today Ride"
                handlePress={() => setActiveTab("tab1")}
              />
            </View>
            <View>
              <Tabbar
                title="Previous Ride"
                handlePress={() => setActiveTab("tab2")}
                color={tab2Styles}
              />
            </View>
            <View>
              <Tabbar
                title="Future Ride"
                handlePress={() => setActiveTab("tab3")}
                color={tab3Styles}
              />
            </View>
          </View>
          <View
            style={[styles.card, { backgroundColor: "rgba(85, 205, 133,0.9)" }]}
          >
            <View style={styles.cardData}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.dayAndTimeFuture}>Saturday</Text>
                <Text style={styles.dayAndTimeFuture}>Completed</Text>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="circle-outline" color="#49bece" size={15} />
                  <Text style={styles.fromAndtoTxt}>Pick Up</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 0.4,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  }}
                >
                  <Text style={styles.FromAndToPlace}>I-8/4 Islamabad</Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <Icon name="circle-outline" color="green" size={15} />
                  <Text style={styles.fromAndtoTxt}>Drop Off</Text>
                </View>
                <View
                  style={{
                    borderBottomColor: "gray",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.FromAndToPlace}>NUML H9-Islamabad</Text>
                  <Text style={styles.dayAndTimeFuture}>8: 00 am</Text>
                </View>
              </View>
            </View>
          </View>
          {/* <View style={[styles.card, { backgroundColor: "gray" }]}>
            <View style={styles.cardData}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.dayAndTime}>Friday</Text>
                <Text style={styles.dayAndTime}>Completed</Text>
              </View>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="circle-outline" color="#49bece" size={15} />
                  <Text style={styles.fromAndtoTxt}>Pick Up</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 0.4,
                    borderBottomColor: "gray",
                    paddingBottom: 10,
                  }}
                >
                  <Text style={styles.FromAndToPlace}>I-8/4 Islamabad</Text>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <Icon name="circle-outline" color="green" size={15} />
                  <Text style={styles.fromAndtoTxt}>Drop Off</Text>
                </View>
                <View
                  style={{
                    borderBottomColor: "gray",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.FromAndToPlace}>I-8/4 Islamabad</Text>
                  <Text style={styles.dayAndTime}>8: 00 am</Text>
                </View>
              </View>
            </View>
          </View> */}
        </View>
      </View>
    );
  }

  return (
    <View>
      {activeTab === "tab1" ? (
        <Today />
      ) : activeTab === "tab2" ? (
        <Previous />
      ) : (
        <Future />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 10,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  card: {
    width: "100%",
    height: 150,
    backgroundColor: "#fff",
    marginVertical: 10,
    elevation: 4,
    borderRadius: 4,
    justifyContent: "space-around",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  cardData: {
    paddingHorizontal: 10,
    justifyContent: "center",
    // alignItems: "center",
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
    fontWeight: "bold",
    color: "#3696f9",
  },
  dayAndTimePrevious: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  FromAndToPlace: {
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: 18,
  },
  fromAndtoTxt: {
    marginLeft: 5,
    color: "grey",
    fontSize: 14,
  },
  fromAndtoTxtPrevious: {
    marginLeft: 5,
    color: "#6dc691",
    fontSize: 14,
  },
  dayAndTimeFuture: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
});
