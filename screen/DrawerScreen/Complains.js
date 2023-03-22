import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import UserInput from "../../components/auth/UserInput";
import { TextInput } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import Icon from "../../components/Icon";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/auth/Button";

const data = [
  {
    id: 1,
    from: "Service Provider",
    against: "Admin",
    status: "pending",
    backgroundColor: "#55cd85",
  },
  {
    id: 2,
    from: "Service Provider",
    against: "Admin",
    status: "pending",
    remarks: "ABCD....",
    backgroundColor: "#3497fd",
  },
  {
    id: 3,
    from: "Admin",
    against: "Service Provider",
    status: "pending",
    remarks: "ABCD....",
    backgroundColor: "#3497fd",
  },
  {
    id: 4,
    from: "Service Provider",
    against: "Admin",
    status: "pending",
    remarks: "ABCD....",
    backgroundColor: "#55cd85",
  },
  {
    id: 5,
    from: "Service Provider",
    against: "Admin",
    status: "pending",
    remarks: "ABCD....",
    backgroundColor: "#55cd85",
  },
  {
    id: 6,
    from: "Admin",
    against: "Service Provider",
    status: "pending",
    remarks: "ABCD....",
    backgroundColor: "#3497fd",
  },
];

const Complains = ({ navigation }) => {
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
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("Add Complain")}
          style={({ pressed }) => [
            pressed && styles.pressed,
            styles.headerRightButton,
          ]}
        >
          <Icon name="plus-box" color="#3696f9" size={33} />
        </Pressable>
      ),
    });
  }, [navigation]);
  const [parentGender, setParentGender] = useState("");
  const [complainTo, setCompmlainTo] = useState("");
  // const [isChecked, setChecked] = useState(false);

  return (
    // <ScrollView>
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
            <Pressable style={styles.button}>
              <View style={styles.innerContainer}>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <View>
                      <Text style={styles.Text}>{item.item.from}</Text>
                    </View>
                    <View>
                      <Text style={styles.Text}>{item.item.status}</Text>
                    </View>
                  </View>
                  <View>
                    <View
                      style={{
                        maxHeight: "100%",
                        backgroundColor: "white",
                        opacity: 0.7,
                        // borderRadius: 4,
                        padding: 5,
                      }}
                    >
                      <Text>Remarks: {item.item.remarks}</Text>
                    </View>
                    <View>
                      <Text style={styles.Text}>
                        Against: {item.item.against}
                      </Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Pressable
                    style={({ pressed }) => [
                      pressed && styles.pressed,
                      styles.detailsButton,
                    ]}
                  >
                    <Text>Check Detalis</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default Complains;

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
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.5,
  },
  Text: { color: "#fff", fontSize: 14, fontWeight: "500" },
  detailsButton: {
    borderWidth: 0.4,
    maxWidth: "100%",
    width: 100,
    alignSelf: "center",
    borderRadius: 4,
    padding: 3,
    borderColor: "white",
    alignItems: "center",
  },
  headerRightButton: {
    justifyContent: "center",
    paddingTop: 10,
    paddingRight: 10,
  },
});
