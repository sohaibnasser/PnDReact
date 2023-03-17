import { AuthProvider, store } from "./store/store";

import { NavigationContainer } from "@react-navigation/native";

import ScreenNav from "./components/nav/ScreenNav";
// import { createDrawerNavigator } from "@react-navigation/drawer";

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
