import { View, Text, Pressable, StyleSheet } from "react-native";
import Button from "../../components/auth/Button";
import { Tabbar } from "../../components/auth/Tabbar";
import Icon from "../../components/Icon";

export const Rides = () => {
  return (
    <View style={styles.container}>
      <View>
        <Tabbar />
        <View style={styles.card}>
          <View style={styles.cardData}>
            <Text style={{ marginBottom: 5 }}>Tommorow , 7:30 PM</Text>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Icon name="circle-outline" color="#49bece" size={15} />
                <Text style={{ marginLeft: 5 }}>From</Text>
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
                <Text style={{ marginLeft: 20 }}>I-8/4 Islamabad</Text>
                <Icon name="pencil" />
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", paddingTop: 10 }}>
                <Icon name="circle-outline" color="#49bece" size={15} />
                <Text style={{ marginLeft: 5 }}>From</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomColor: "gray",
                  paddingTop: 10,
                }}
              >
                <Text style={{ marginLeft: 20 }}>I-8/4 Islamabad</Text>
                <Icon name="pencil" />
              </View>
            </View>
          </View>
        </View>
      </View>
      <Pressable>
        <Button>BOOK ANOTHER RIDE</Button>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  card: {
    width: "100%",
    height: 150,
    backgroundColor: "#fff",
    marginVertical: 8,
    elevation: 4,
    borderRadius: 4,
  },
  cardData: {
    padding: 10,
    justifyContent: "center",
  },
});
