// import "react-native-get-random-values";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";

import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import UserInput from "../../components/auth/UserInput";

import Icon from "../../components/Icon";

import { API, mobileApi, spApi } from "../../config";

import Activityindicator from "../../components/Activityindicator";

import SwipButton from "../../components/auth/SwipButton";
import { maskPhoneNumber } from "../../Util/masking";

import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo } from "react";
import { colors } from "../../Util/colors";
import Nodata from "../../components/Nodata";

const Profile = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [spEmail, setSpEmail] = useState("");
  const [spId, setSpId] = useState("");

  useEffect(() => {
    const PressHandler = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const id = JSON.parse(data);

      setSpEmail(id.email);
      setSpId(id.spId);
    };
    PressHandler();
  }, [setSpEmail]);

  const [spAddress, setSpAddress] = useState("");
  const [adminRole, setAdminRole] = useState();

  const [contactPerson, setContactPerson] = useState("");
  const [spContact, setSpContact] = useState("");

  const [sPEmail, setsPEmail] = useState("");
  const [spName, setSpName] = useState("");

  const [spPassword, setSpPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState();
  const [selectedPackage, setSelectedPackage] = useState("");

  const [spOtherContact, setSpOtherContact] = useState("");
  const [cityOperates, setCityOperates] = useState();
  const [cityArray, setCityArray] = useState([]);
  const [arr, setArr] = useState("");
  const [approvalStatus, setApprovalStatus] = useState();
  const [spStatus, setSpStatus] = useState("");
  const [spType, setSpType] = useState("");
  const [spOtherEmail, setSpOtherEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [responseDataOfProfile, setResponseDataOfProfile] = useState();
  const [inputErrors, setInputErrors] = useState({
    spContact: false,
    spPassword: false,
    spAddress: false,
    spOtherContact: false,
  });

  const handleFieldFocus = (fieldName) => {
    // Remove the error highlight when the user starts editing the field
    setInputErrors({ ...inputErrors, [fieldName]: false });
  };

  const validateForm = () => {
    let isValid = true;
    const regex = /^[a-zA-Z0-9\s]+$/;
    const emailPattern = /\S+@\S+\.\S+/;
    const newErrors = { ...inputErrors };
    if (!spContact || !spAddress || !spPassword || !spOtherContact) {
      // Display alert for empty fields
      Alert.alert("Error", "All fields are required.");
      return false;
    }

    // Validate each field and set error state

    if (!spContact) {
      newErrors.spContact = true;
      isValid = false;
    }
    if (spContact.length < 13) {
      newErrors.spContact = true;
      isValid = false;
    }
    if (spOtherContact.length < 13) {
      newErrors.spOtherContact = true;
      isValid = false;
    }

    if (!spAddress) {
      newErrors.spAddress = true;
      isValid = false;
    }
    if (!regex.test(spAddress)) {
      newErrors.spAddress = true;
      isValid = false;
    }

    if (!spPassword) {
      newErrors.spPassword = true;
      isValid = false;
    }
    if (!spOtherContact) {
      newErrors.spOtherContact = true;
      isValid = false;
    }

    // Add more validations for other fields here...

    setInputErrors(newErrors);

    return isValid;
  };

  // MASKING CONTACTS
  let pOtherContact;
  let Pcontact;

  if (spContact && spOtherContact) {
    Pcontact = maskPhoneNumber(spContact);
    pOtherContact = maskPhoneNumber(spOtherContact);
  }

  // get all cities
  const getAllCity = async () => {
    if (isFocused) {
      try {
        setIsLoading(true);
        const response = await fetch(`${mobileApi}/sp/getCityList`);

        const responseCity = await response.json();
        const CityArray = responseCity;
        setArr(CityArray);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    getAllCity();
  }, [isFocused]);

  // get profile data
  const ids = useMemo(
    () =>
      cityArray.map((item) => {
        return item.cityId;
      }),
    [cityArray]
  );

  useEffect(() => {
    setCityOperates(ids);
  }, [ids]);

  useEffect(() => {
    if (cityList) {
      const idObjects = cityList.map((item) => ({
        cityId: item.cityId,
        flexACol: "true",
      }));
      setCityArray(idObjects);
    }
  }, [cityList]);

  const getProfileDataHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${mobileApi}/sp/getServiceProviderByEmail/${spEmail}`
      );
      const responseData = await response.json();
      if (responseData.code === "200") {
        setResponseDataOfProfile(responseData);
        const resData = responseData?.result[0];

        setSpName(resData?.spName);
        setSpAddress(resData?.spAddress);
        setContactPerson(resData?.spContactPerson);
        setAdminRole(resData?.adminRoleDto?.roleId);
        setSpStatus(resData?.spStatus);
        setSpContact(resData?.spContactNumber);
        setsPEmail(resData?.spEmail);
        setSpType(resData?.spType);
        setSpOtherEmail(resData?.spOtherEmail);
        setSpPassword(resData?.spPassword);
        setSpOtherContact(resData?.spOtherNumber);
        setApprovalStatus(resData?.approvalStatus);

        setSelectedPackage(resData?.packageDto?.packageId);
        setCityList(resData?.cityList);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (spEmail) {
      getProfileDataHandler();
    }
  }, [spEmail]);

  const getPakage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${spApi}/package/getAllPackagesSignup`);
      const responseData = await response.json();
      const resData = responseData.result;
      console.log("Response of get all packages", resData);

      setState(resData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPakage();
  }, []);
  const toggleOption = (optionId) => {
    // console.log("optooind", optionId);
    if (cityOperates.includes(optionId)) {
      setCityOperates(cityOperates.filter((id) => id !== optionId));
    } else {
      setCityOperates([...cityOperates, optionId]);
    }
  };
  // operates in city
  const renderItem = ({ item }) => (
    <>
      <View style={styles.checkboxView}>
        <Text style={styles.text}>{item.cityName}</Text>
        <Pressable
          style={styles.checkbox}
          onPress={() => toggleOption(item.cityId)}
        >
          {cityOperates.includes(item.cityId) && (
            <Ionicons name="checkmark" size={22} color="#3696f9" />
          )}
        </Pressable>
      </View>
    </>
  );
  console.log("selected", selectedPackage);
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await fetch(`${mobileApi}/sp/updateServiceProvider`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminRoleDto: {
              roleId: adminRole,
            },
            approvalStatus: approvalStatus,
            cityList: cityArray,
            packageDto: {
              packageId: selectedPackage,
            },
            spAddress: spAddress,
            spContactNumber: spContact,
            spContactPerson: contactPerson,
            spEmail: spEmail,
            spId: spId,
            spName: spName,
            spOtherEmail: spOtherEmail,
            spOtherNumber: spOtherContact,
            spStatus: spStatus,
            spType: spType,
            spPassword: spPassword,
          }),
        });
        const responseData = await response.json();
        console.log("response data updated", responseData);
        if (responseData.code === "200") {
          return Alert.alert("Success", responseData.message, [
            {
              text: "OK",
              onPress: () => navigation.goBack(), // Navigate to "Leaves" screen on OK press
            },
          ]);
        }
      } catch (error) {
        console.log(error);
        return Alert.alert("Error", "Error while fetching profile data");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <Activityindicator isLoading={isLoading} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={[
                  styles.input__icon,
                  styles.paddingVertical,
                  styles.nameInput,
                ]}
              >
                <Icon name="account-outline" size={24} color="gray" />

                <UserInput
                  placeholder="Name"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={spName}
                  setValue={setSpName}
                  editable={false}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={[
                  styles.input__icon,
                  styles.paddingVertical,
                  styles.nameInput,
                ]}
              >
                <Icon name="face-man-outline" size={24} color="gray" />

                <UserInput
                  placeholder="Contact Person"
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={contactPerson}
                  setValue={setContactPerson}
                  editable={false}
                />
              </View>
            </View>
            {inputErrors.spContact && (
              <Text
                style={{
                  marginLeft: 5,
                  paddingVertical: 5,
                  color: "red",
                }}
              >
                Phone number must be 11 characters long
              </Text>
            )}
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                inputErrors.spContact ? { borderColor: "red" } : null,
              ]}
            >
              <Icon name="phone-outline" size={24} color="gray" />
              <UserInput
                onFocus={() => handleFieldFocus("spContact")}
                placeholder="Contact"
                autoCorrect={false}
                value={maskPhoneNumber(spContact)}
                setValue={setSpContact}
                keyboardType="phone-pad"
                maxLength={13}
              />
            </View>

            <View style={[styles.input__icon, styles.paddingVertical]}>
              <Icon name="email-outline" size={24} color="gray" />
              <UserInput
                placeholder="Email Address"
                keyboardType="email-address"
                autoCorrect={false}
                value={sPEmail}
                setValue={setsPEmail}
                editable={false}
              />
            </View>
            {inputErrors.spAddress && (
              <Text
                style={{
                  marginLeft: 5,
                  paddingVertical: 5,
                  color: "red",
                }}
              >
                Invalid address
              </Text>
            )}
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                inputErrors.spAddress ? { borderColor: "red" } : null,
              ]}
            >
              <Icon name="routes" size={24} color="gray" />
              <UserInput
                onFocus={() => handleFieldFocus("spAddress")}
                value={spAddress}
                setValue={setSpAddress}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Address"
              />
            </View>
            {inputErrors.spOtherContact && (
              <Text
                style={{
                  marginLeft: 5,
                  paddingVertical: 5,
                  color: "red",
                }}
              >
                Phone number must be 11 characters long
              </Text>
            )}
            <View
              style={[
                styles.input__icon,
                styles.paddingVertical,
                inputErrors.spOtherContact ? { borderColor: "red" } : null,
              ]}
            >
              <Icon name="phone-plus-outline" size={24} color="gray" />
              <UserInput
                onFocus={() => handleFieldFocus("spOtherContact")}
                placeholder="Other Contact"
                autoCorrect={false}
                value={spOtherContact && maskPhoneNumber(spOtherContact)}
                setValue={setSpOtherContact}
                keyboardType="phone-pad"
                maxLength={13}
              />
            </View>

            <View style={[styles.input__icon, styles.paddingVertical]}>
              <Icon name="lock-outline" size={24} color="gray" />
              <UserInput
                placeholder="Password"
                secureTextEntry={!isVisible}
                value={spPassword}
                setValue={setSpPassword}
              />
              <Pressable
                style={({ pressed }) => pressed && styles.pressed}
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Image
                    source={require("../../assets/eye_closed.png")}
                    style={{ height: 25, width: 25, marginRight: 5 }}
                  />
                ) : (
                  <Image
                    source={require("../../assets/eye.png")}
                    style={{ height: 25, width: 25, marginRight: 5 }}
                  />
                )}
              </Pressable>
            </View>

            <View style={[styles.dropDown, styles.nameInput]}>
              <View>
                {/* {state && ( */}
                <Picker
                  selectedValue={selectedPackage}
                  onValueChange={(itemValue) => setSelectedPackage(itemValue)}
                >
                  {state &&
                    state.map((packeges) => {
                      return (
                        <Picker.Item
                          key={packeges.packageId}
                          label={packeges.packageName}
                          value={packeges.packageId}
                        />
                      );
                    })}
                </Picker>
                {/* )} */}
              </View>
            </View>
            <View style={{ marginVertical: 5 }}>
              <Text
                style={{
                  color: colors.blue,
                  fontWeight: "500",
                  fontSize: 16,
                }}
              >
                Operate in Cities:
              </Text>
            </View>
            <FlatList
              data={arr.result}
              renderItem={renderItem}
              keyExtractor={(item) => item.cityId}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
            <SwipButton title="UPDATE" onPress={handleSubmit} />
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
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
    marginVertical: 5,
    paddingLeft: 10,
  },

  createAccount__text: {
    color: "#49bece",
    fontSize: 15,
  },
  phoneInput__Icon: {
    backgroundColor: "grey",
    height: 50,
    justifyContent: "center",
    borderRadius: 6,
  },
  termsAndconditions: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  createAccount: {
    flexDirection: "row",
    marginBottom: 5,
  },

  nameInput: {
    flex: 1,
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
  dropDown: {
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    marginVertical: 5,
    // paddingVertical: 0,
  },
  checkboxView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    maxWidth: "100%",
    // width: 150,
    //
  },
  text: {
    color: "gray",
    fontSize: 16,
    width: 80,
    // marginRight: 5,
    maxWidth: "100%",
  },
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 1,
    borderColor: "#3696f9",
    borderRadius: 12,
    marginHorizontal: 20,
  },
});
