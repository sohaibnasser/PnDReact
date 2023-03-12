import { Button, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

import axios from "axios";
import { API } from "../../config";
// import {  } from 'react-native'

export const Pakages = async () => {
  const [state, setState] = useState([]);
  // const [selectedPackage, setSelectedPackage] = useState();

  // state

  //  const getPakage= async() =>  {
  try {
    const response = await fetch(`${API}/parent_packages`);
    // const packages = JSON.stringify(response);
    const responseData = await response.json();
    const resData = responseData.result;
    setState(resData);
    if (response.ok) {
      //   const responseData = await response.json();
      //   const data = responseData.result;
    } else {
    }
  } catch (error) {
    // Handle any errors that occurred during the fetch request
    alert("error", error);
  }
  // };
  // useEffect(() => {
  //   getPakage();
  // }, []);
  // return (
  // <View>
  //   <Picker
  //     selectedValue={selectedPackage}
  //     onValueChange={(itemValue) => setSelectedPackage(itemValue)}
  //   >
  //     {state.map((packeges) => {
  //       return (
  //         <Picker.Item
  //           key={packeges.id}
  //           label={packeges.packageName}
  //           value={packeges.packageName}
  //         />
  //       );
  //     })}
  //   </Picker>
  // </View>
  // );
};

// export default Pakages;

// const styles = StyleSheet.create({});
