import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const MAX_STARS = 5;

const Rating = ({ rating }) => {
  const filledStars = Math.round(rating);
  const emptyStars = MAX_STARS - filledStars;
  return (
    <View style={styles.container}>
      {[...Array(filledStars)].map((_, index) => (
        <FontAwesome name="star" key={index} style={styles.star} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FontAwesome name="star" key={index} style={styles.emptyStars} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "white",
  },
  star: {
    fontSize: 12,
    color: "goldenrod",
    marginRight: 0.5,
  },
  emptyStars: {
    color: "#d8d8d8",
    fontSize: 12,
    marginRight: 0.5,
  },
});

export default Rating;
