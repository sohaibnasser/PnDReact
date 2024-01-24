// import Checkbox from "expo-checkbox";
// import React, { useState } from "react";
// import { StyleSheet, Text, View } from "react-native";

// export default function Radio() {
//   const [male, setMale] = useState(false);
//   const [isChecked, setChecked] = useState(false);

//   return (
//     <View style={styles.container}>
//       <View style={styles.section}>
//         <Checkbox
//           style={styles.checkbox}
//           value={isChecked}
//           onValueChange={setChecked}
//         />
//         <Text style={styles.paragraph}>Normal checkbox</Text>
//       </View>
//       <View style={styles.section}>
//         <Checkbox
//           style={styles.checkbox}
//           value={isChecked}
//           onValueChange={setChecked}
//           color={isChecked ? "#4630EB" : undefined}
//         />
//         <Text style={styles.paragraph}>Custom colored checkbox</Text>
//       </View>
//       <View style={styles.section}>
//         <Checkbox
//           style={styles.checkbox}
//           value={isChecked}
//           onValueChange={setChecked}
//         />
//         <Text style={styles.paragraph}>Disabled checkbox</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginHorizontal: 16,
//     marginVertical: 32,
//     flexDirection: "row",
//   },
//   section: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   paragraph: {
//     fontSize: 15,
//   },
//   checkbox: {
//     margin: 8,
//   },
// });