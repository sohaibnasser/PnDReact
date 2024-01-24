import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { API } from "../screens/config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    driverEmail: "",
    driverId: "",
    driverName: "",
    driverRating: "",
  });

  // configure defaualt URl for the communication with backend
  //   axios.defaults.baseURL = API;
  // useEffect(() => {
  //   const loadFromAsyncStorage = async () => {
  //     const data = await AsyncStorage.getItem("@auth");
  //     const as = JSON.parse(data);
  //     console.log("as data", as);
  //     setState({
  //       ...state,
  //       parentEmail: as.email,
  //       parentPassword: as.password,
  //       parentId: as.parentId,
  //     });
  //   };
  //   loadFromAsyncStorage();
  // }, []);
  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      try {
        const data = await AsyncStorage.getItem("@auth");
        if (data !== null) {
          const as = JSON.parse(data);
          console.log("as data", as);
          setState({
            ...state,
            driverEmail: as.driverEmail,
            driverId: as.driverId,
            driverName: as.driverName,
            driverRating: as.driverRating,
            // imageurl: as.imageUrl,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadFromAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
