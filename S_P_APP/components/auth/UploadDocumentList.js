import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import UploadDocument from "./UploadDocument";
import { useRef } from "react";

function UploadDocumentList({
  documentUris = [],
  onAddDocument,
  onRemoveDocument,
}) {
  const scrollView = useRef();

  return (
    <ScrollView
      horizontal
      ref={scrollView}
      onContentSizeChange={() => scrollView.current.scrollToEnd()}
    >
      <View style={styles.container}>
        {documentUris.map((uri, index) => (
          <View key={index}>
            <UploadDocument
              documentUri={uri}
              onChangeDocument={() => onRemoveDocument(uri)}
            />
          </View>
        ))}
        <UploadDocument onChangeDocument={(uri) => onAddDocument(uri)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default UploadDocumentList;
