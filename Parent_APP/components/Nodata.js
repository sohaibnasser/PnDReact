import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Nodata = ({ text }) => {
  return (
    <View style={[styles.noData]}>
      <Text style={styles.noDataText}>{text ? text : "No Data"}</Text>
    </View>
  );
};

export default Nodata;

const styles = StyleSheet.create({
  noData: {
    backgroundColor: "#55cd85",
    height: 150,
    marginTop: 20,
    maxWidth: "100%",
    width: "95%",
    elevation: 4,
    borderRadius: 6,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    shadowOpacity: 0.25,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  noDataText: { fontWeight: "700", fontSize: 25, color: "#ffffff" },
});
