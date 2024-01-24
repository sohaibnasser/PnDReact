import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const MAX_STARS = 5;

const Rating = ({ rating }) => {
  if (rating === null) {
    return (
      <View style={{ flexDirection: "row" }}>
        <FontAwesome name="star" style={styles.emptyStars} />
        <FontAwesome name="star" style={styles.emptyStars} />
        <FontAwesome name="star" style={styles.emptyStars} />
        <FontAwesome name="star" style={styles.emptyStars} />
        <FontAwesome name="star" style={styles.emptyStars} />
      </View>
    );
  }

  const filledStars = Math.floor(Number(rating));
  const emptyStars = MAX_STARS - filledStars;

  const renderedFilledStars = Array.from(
    { length: filledStars },
    (_, index) => <FontAwesome name="star" key={index} style={styles.star} />
  );

  const renderedEmptyStars = Array.from({ length: emptyStars }, (_, index) => (
    <FontAwesome
      name="star"
      key={index + filledStars}
      style={styles.emptyStars}
    />
  ));

  return (
    <View style={styles.container}>
      {renderedFilledStars}
      {renderedEmptyStars}
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
