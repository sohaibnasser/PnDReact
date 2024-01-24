import { useContext } from "react";
import ScreenNav from "./components/nav/ScreenNav";
import { AuthContext, AuthProvider } from "./store/store";

import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";

// import ScreenNav from "./components/nav/ScreenNav";

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ScreenNav />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default RootNavigation;
