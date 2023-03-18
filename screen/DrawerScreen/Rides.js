import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Button from "../../components/auth/Button";
import { Tabbar } from "../../components/auth/Tabbar";
import Icon from "../../components/Icon";

export const Rides = () => {
  const [activeTab, setActiveTab] = React.useState("tab1");
  const tab1Styles =
    activeTab === "tab1" ? styles.activeTab : styles.inactiveTab;
  const tab2Styles =
    activeTab === "tab2" ? styles.activeTab : styles.inactiveTab;
  function Schedule() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.tabbar}>
            <View>
              <Tabbar
                title="Schedule"
                handlePress={() => setActiveTab("tab1")}
                color={tab1Styles}
              />
            </View>
            <View>
              <Tabbar
                title="History"
                handlePress={() => setActiveTab("tab2")}
              />
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardData}>
              <Text style={styles.dayAndTime}>Tommorow , 7:30 PM</Text>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="circle-outline" color="#49bece" size={15} />
                  <Text style={styles.fromAndtoTxt}>From</Text>
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
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                  <Icon name="circle-outline" color="green" size={15} />
                  <Text style={styles.fromAndtoTxt}>To</Text>
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
                  <Icon name="pencil" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  function History() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.tabbar}>
            <View>
              <Tabbar
                title="Schedule"
                handlePress={() => setActiveTab("tab1")}
              />
            </View>
            <View>
              <Tabbar
                title="History"
                handlePress={() => setActiveTab("tab2")}
                color={tab2Styles}
              />
            </View>
          </View>
          <View style={styles.card}>
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
          </View>
        </View>
      </View>
    );
  }

  return <View>{activeTab === "tab1" ? <Schedule /> : <History />}</View>;
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
});
