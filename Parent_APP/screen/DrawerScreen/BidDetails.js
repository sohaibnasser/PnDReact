import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatTimeWithAMPM } from "../../Util/date";

const BidDetails = ({ route }) => {
  const { bidDetails } = route?.params;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Service Provider: </Text>
        <Text style={styles.value}>
          {bidDetails?.serviceProviderDto?.spName}
        </Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Bid Amount: </Text>
        <Text style={styles.value}>{bidDetails?.bidAmount}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Drop Location: </Text>
        <Text style={styles.value}>{bidDetails?.bidDropLocation}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Drop Time: </Text>
        <Text style={styles.value}>
          {formatTimeWithAMPM(bidDetails?.bidDropTime)}
        </Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Pickup Location: </Text>
        <Text style={styles.value}>{bidDetails?.bidPickupLocation}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Pickup Time: </Text>
        <Text style={styles.value}>
          {formatTimeWithAMPM(bidDetails?.bidPickupTime)}
        </Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Return Trip: </Text>
        <Text style={styles.value}>{bidDetails?.returnTrip}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Message: </Text>
        <Text style={styles.value}>{bidDetails?.message}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Num Passenger: </Text>
        <Text style={styles.value}>{bidDetails?.numPassenger}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Bid Status: </Text>
        <Text style={styles.value}>{bidDetails?.bidStatus}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#3497fd",
    flex: 1,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    marginRight: 8,
    fontSize: 15,
  },
  value: {
    flex: 1,
    color: "#FFF",
  },
});

export default BidDetails;
