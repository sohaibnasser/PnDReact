import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "../components/Icon";
import { Tabbar } from "../components/auth/Tabbar";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Notification = ({ navigation }) => {
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

  function General() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.tabbar}>
            <View>
              <Tabbar
                title="General"
                handlePress={() => setActiveTab("tab1")}
                color={tab1Styles}
              />
            </View>
            <View>
              <Tabbar
                title="Packages"
                handlePress={() => setActiveTab("tab2")}
              />
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardData}>
              <View>
                <Text style={{ lineHeight: 20 }}>
                  Copy of the following link on the web you will be Copy of the
                  following link on the web you will be following link on the
                  web you will be
                </Text>
              </View>
              <Pressable>
                <Text style={styles.dayAndTime}>March 06, 2023</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardData}>
              <View>
                <Text style={{ lineHeight: 20 }}>
                  Copy of the following link on the web you will be Copy of the
                  following link on the web you will be following link on the
                  web you will be
                </Text>
              </View>
              <Pressable>
                <Text style={styles.dayAndTime}>March 06, 2023</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  }
  function Packeges() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.tabbar}>
            <View>
              <Tabbar
                title="General"
                handlePress={() => setActiveTab("tab1")}
              />
            </View>
            <View>
              <Tabbar
                title="Packages"
                handlePress={() => setActiveTab("tab2")}
                color={tab2Styles}
              />
            </View>
          </View>
          {/* <View style={styles.card}>
              <View style={styles.cardData}>
                <Text style={styles.dayAndTime}>Saturday , 7:30 PM</Text>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Icon name="circle-outline" color="#49bece" size={15} />
                    <Text style={styles.fromAndtoTxt}>From</Text>
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
                    <Text style={styles.fromAndtoTxt}>To</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "gray",
                    }}
                  >
                    <Text style={styles.FromAndToPlace}>NUML H9-Islamabad</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardData}>
                <Text style={styles.dayAndTime}>Friday , 7:30 PM</Text>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Icon name="circle-outline" color="#49bece" size={15} />
                    <Text style={styles.fromAndtoTxt}>From</Text>
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
                    <Text style={styles.fromAndtoTxt}>To</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "gray",
                    }}
                  >
                    <Text style={styles.FromAndToPlace}>I-8/4 Islamabad</Text>
                  </View>
                </View>
              </View>
            </View> */}
        </View>
      </View>
    );
  }
  return <View>{activeTab === "tab1" ? <General /> : <Packeges />}</View>;
};
export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 10,
  },
  card: {
    width: "100%",
    height: 100,
    backgroundColor: "#eef3f9",
    // marginVertical: 10,
    marginTop: 20,
    elevation: 4,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  cardData: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
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
});
