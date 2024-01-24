import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import SwipeButton from "rn-swipe-button";

const SwipButton = ({ onPress, title }) => {
  return (
    <View style={styles.container}>
      <SwipeButton
        disabled={false}
        swipeSuccessThreshold={70}
        height={40}
        width={288}
        title={`SWIPE TO ${title}`}
        titleColor="white"
        shouldResetAfterSuccess={true}
        onSwipeSuccess={onPress}
        railFillBackgroundColor="#3696f9"
        railFillBorderColor="#3696f9"
        thumbIconBackgroundColor="#49bece"
        thumbIconBorderColor="#3696f9"
        railBackgroundColor="#3696f9"
        railBorderColor="#3696f9"
      />
    </View>
  );
};

export default SwipButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    textAlign: "center",
    padding: 10,
  },
});
