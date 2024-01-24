// import React from "react";
// import { StyleSheet, View } from "react-native";
// import PhoneInput from "react-native-phone-number-input";

// const CountryCodePicker = ({ phone, setPhone }) => {
//   // const [phoneNumber, setPhoneNumber] = React.useState("");
//   const phoneInput = React.useRef(null);

//   return (
//     <View style={styles.container}>
//       <PhoneInput
//         countryPickerButtonStyle={styles.buttonStyle}
//         ref={phoneInput}
//         defaultValue={phone}
//         containerStyle={styles.phoneContainer}
//         textContainerStyle={styles.textInput}
//         onChangeFormattedText={(text) => {
//           setPhone(text);
//         }}
//         defaultCode="IN"
//         layout="first"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   buttonStyle: {
//     backgroundColor: "#dadfe8",
//     borderRadius: 4,
//   },
//   phoneContainer: {
//     width: "100%",
//     flexDirection: "row-reverse",

//     height: 50,
//     borderRadius: 4,
//   },
//   textInput: {
//     backgroundColor: "#ffffff",
//   },
//   text: {
//     color: "white",
//     fontWeight: "600",
//   },
// });

// export default CountryCodePicker;
