import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    parentEmail: "",
    parentName: "",
    parentPassword: null,
    parentId: null,
    imageUrl: "",
  });

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      try {
        const data = await AsyncStorage.getItem("@auth");
        if (data !== null) {
          const as = JSON.parse(data);
          console.log("as data", as);
          setState({
            ...state,
            parentEmail: as.email,
            parentPassword: as.password,
            parentId: as.parentId,
            parentName: as.parentName,
            imageUrl: as.imageUrl,
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
