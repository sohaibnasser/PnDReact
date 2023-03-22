import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

const TermsAndConditions = ({ navigation }) => {
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{ marginLeft: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </Pressable>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: "https://google.com" }} />
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({});
