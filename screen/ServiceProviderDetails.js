import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const ServiceProviderDetails = ({ route, navigation }) => {
  const Itemid = route.params.itemId;

  return (
    <View>
      <Text>ServiceProviderDetails--{Itemid}</Text>
    </View>
  );
};

export default ServiceProviderDetails;

const styles = StyleSheet.create({});
