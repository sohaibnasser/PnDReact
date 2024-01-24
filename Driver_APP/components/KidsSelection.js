import React, { useState } from "react";
import { View, Text } from "react-native";
import { CheckBox } from "expo-checkbox";

const KidsSelection = ({ kids }) => {
  const [selectedKids, setSelectedKids] = useState([]);

  const handleKidSelection = (kid) => {
    if (selectedKids.includes(kid)) {
      setSelectedKids(
        selectedKids.filter((selectedKid) => selectedKid.id !== kid.id)
      );
    } else {
      setSelectedKids([...selectedKids, kid]);
    }
  };

  return (
    <View>
      {kids.map((kid) => (
        <View key={kid.id}>
          <CheckBox
            value={selectedKids.some(
              (selectedKid) => selectedKid.id === kid.id
            )}
            onValueChange={() => handleKidSelection(kid)}
          />
          <Text>{kid.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default KidsSelection;
