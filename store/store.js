import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { API } from "../screens/config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    parentEmail: "",
    parentPassword: "",
  });

  // configure defaualt URl for the communication with backend
  //   axios.defaults.baseURL = API;
  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      const data = await AsyncStorage.getItem("@auth");
      const as = JSON.parse(data);
      setState({
        ...state,
        parentEmail: as.email,
        parentPassword: as.password,
      });
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
