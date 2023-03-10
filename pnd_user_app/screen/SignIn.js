import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from "react-native";
import React, { useState, useContext } from "react";
import axios from "axios";
import UserInput from "../components/auth/UserInput";
import Button from "../components/auth/Button";
import Icon from "../components/Icon";
import CountryCodePicker from "../components/auth/CountryCodePicker";
import DisButton from "../components/auth/DisButton";
import Radio from "../components/Radio";
import { UUid } from "../Util/UUid";
import { API } from "../config";

const Signin = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   const [state, setState] = useContext(AuthContext);
  const handleSubmit = async () => {
    // setIsLoading(true);
    if (!email || !password) {
      alert("all field are required");
      // setIsLoading(false);

      return;
    }
    try {
      const response = await fetch(`${API}/parent_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          token: UUid,
          uuid: UUid,
        }),
      });

      const responseData = await response.json();
      if (responseData.status !== "success") {
        console.log("Error", responseData.message);
        setEmail("");
        setPassword("");

        // setIsLoading(false);
      } else {
        // store to context
        // setState(data);
        // store to asyncstorage
        // await AsyncStorage.setItem("@auth", JSON.stringify(data));
        // setIsLoading(false);

        alert(responseData.message);
        navigation.navigate("services");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log("not ", error.message);
      alert(error.message);
      // setIsLoading(false);
    }
  };
  return (
    <View style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <View style={[styles.input__icon, styles.paddingVertical]}>
          <Icon name="email" size={30} color="gray" />
          {/* <UserInput
            placeholder="+92 321545"
            keyboardType="phone-pad"
            autoCorrect={false}
            value={phone}
            setValue={setPhone}
          /> */}
          {/* <Pressable style={styles.phoneInput__Icon}>
            <Text>Countary</Text>
          </Pressable> */}
          {/* <CountryCodePicker phone={phone} setPhone={setPhone} /> */}
          <UserInput
            placeholder="Email Address"
            keyboardType="email-address"
            autoCorrect={false}
            value={email}
            setValue={setEmail}
          />
        </View>
        <View style={[styles.input__icon, styles.paddingVertical]}>
          <Icon name="lock-outline" size={30} color="gray" />
          <UserInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            setValue={setPassword}
          />
        </View>

        <View style={styles.createAccount}>
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => navigation.navigate("Create Account")}
          >
            <Text style={styles.createAccount__text}>Sign Up</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => navigation.navigate("Forgot Password")}
          >
            <Text style={styles.createAccount__text}>Forgot Password</Text>
          </Pressable>
        </View>
      </View>
      <View>
        {email && password ? (
          <Pressable onPress={handleSubmit}>
            <Button>LOGIN</Button>
          </Pressable>
        ) : (
          <DisButton>LOGIN</DisButton>
        )}
      </View>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.75,
  },
  input__icon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 10,
    paddingLeft: 10,
    overflow: "hidden",
  },
  createAccount: { flexDirection: "row", justifyContent: "space-around" },
  createAccount__text: {
    color: "#49bece",
    fontSize: 15,
  },
  phoneInput__Icon: {
    backgroundColor: "grey",
    height: 50,
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 6,
  },
});
