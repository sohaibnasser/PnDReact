//Overlay ActivityIndicator / Progress Bar / Loading Spinner in React Native
//https://aboutreact.com/overlay-activityindicator-progress-bar-loading-spinner-in-react-native/

//import React in our code
import React, { useState } from "react";

//import all the components we are going to use
import { SafeAreaView, Text, View, StyleSheet, Button } from "react-native";

import Spinner from "react-native-loading-spinner-overlay";

const Activityindicator = ({ isLoading }) => {
  // const [loading, setLoading] = useState(true);

  //   const startLoading = () => {
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 3000);
  //   };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={isLoading}
          //Text with the Spinner
          textContent={"Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
        {/* <Button title="Start Loading" onPress={startLoading}></Button> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    // paddingTop: 30,
    // backgroundColor: "#ecf0f1",
    // padding: 8,
  },
  spinnerTextStyle: {
    // color: "#000000",
  },
});

export default Activityindicator;
