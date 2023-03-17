import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import Activityindicator from "../../components/Activityindicator";
import Icon from "../../components/Icon";
import UserInput from "../../components/auth/UserInput";
import Button from "../../components/auth/Button";

const Passengers = ({ navigation }) => {
  const [parentName, setParentName] = useState("");
  const [parentCnic, setParentCnic] = useState("");

  const [parentContact, setParentContact] = useState("");

  const [age, setAge] = useState(5);
  const [gender, setGender] = useState("");

  const inreaseAge = () => {
    setAge(age + 1);
  };
  const decreaseAge = () => {
    if (age <= 1) {
      return;
    }
    setAge(age - 1);
  };
  const selectMaleHandler = () => {
    setGender("Male");
  };
  const selectFemaleHandler = () => {
    setGender("Female");
  };
  // React.useEffect(() => {
  //   console.log("focused");
  // }, []);
  return (
    <View style={styles.container}>
      <View>
        <Activityindicator />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <ImagePicker /> */}
          {/* <UploadImage /> */}
          <Pressable style={styles.profileImage}>
            <View>
              <Image source={{}} />
            </View>

            <View
              style={{
                width: 70,
                height: 70,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="camera" size={30} />
            </View>
          </Pressable>
          <View
            style={[
              styles.input__icon,
              styles.paddingVertical,
              styles.nameInput,
            ]}
          >
            <Icon name="account-outline" size={30} color="gray" />

            <UserInput
              placeholder="Name"
              autoCapitalize="words"
              autoCorrect={false}
              value={parentName}
              setValue={setParentName}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.YearsAndGender}>
            <Pressable
              style={({ pressed }) => pressed && styles.pressed}
              onPress={inreaseAge}
            >
              <Icon name="plus" size={20} color="#fff" />
            </Pressable>
            <Text style={{ color: "#fff", fontSize: 20 }}>{age} Years</Text>
            <Pressable
              style={({ pressed }) => pressed && styles.pressed}
              onPress={decreaseAge}
            >
              <Icon name="minus-thick" size={16} color="#fff" />
            </Pressable>
          </View>
          <View style={styles.YearsAndGender}>
            <Pressable
              onPress={selectMaleHandler}
              style={({ pressed }) => [
                pressed && styles.pressed,
                styles.bgColor,
              ]}
            >
              <Text>Male</Text>
            </Pressable>
            <Pressable
              onPress={selectFemaleHandler}
              style={({ pressed }) => [
                pressed && styles.pressed,
                ,
                styles.bgColor,
              ]}
            >
              <Text>Female</Text>
            </Pressable>
          </View>
        </View>
        <View style={[styles.input__icon, styles.paddingVertical]}>
          <Icon name="card-bulleted-outline" size={30} color="gray" />
          <UserInput
            placeholder="CNIC No._ _ _ _ _ - _ _ _ _ _ _ _ - _"
            autoCorrect={false}
            value={parentCnic}
            setValue={setParentCnic}
            keyboardType="number-pad"
          />
        </View>
        <View style={[styles.input__icon, styles.paddingVertical]}>
          <Icon name="cellphone" size={30} color="gray" />
          <UserInput
            placeholder="phone"
            autoCorrect={false}
            value={parentContact}
            setValue={setParentContact}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.addMorePassengerContainer}>
          <Pressable
            onPress={() => navigation.navigate("Add Passengers")}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Icon name="plus-box" color="#3696f9" size={33} />
          </Pressable>
          <Text style={styles.addMorePassenger}>Add More Passenger</Text>
        </View>
      </View>
      <View>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={() => {}}
        >
          <Button>CONTINUE</Button>
        </Pressable>
      </View>
    </View>
  );
};

export default Passengers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  input__icon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 5,
    paddingLeft: 10,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.75,
  },
  profileImage: {
    width: 70,
    height: 70,
    backgroundColor: "#ffffff",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginRight: 10,
    borderWidth: 0.1,
    borderColorL: "black",
  },
  nameInput: {
    flex: 1,
  },
  addMorePassengerContainer: { flexDirection: "row", marginVertical: 10 },
  addMorePassenger: {
    color: "#3696f9",
    alignSelf: "center",
    fontWeight: "bold",
    marginLeft: 12,
  },
  YearsAndGender: {
    backgroundColor: "#3696f9",
    width: "48%",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    alignItems: "center",
    borderRadius: 4,
  },
  bgColor: {
    // backgroundColor: bgColor,
    width: "40%",
    height: "50%",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
