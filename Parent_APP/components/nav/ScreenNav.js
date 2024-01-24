import React, { useContext } from "react";
import SignIn from "../../screen/SignIn";
import CreateUser from "../../screen/CreateUser";
import PhoneVerification from "../../screen/PhoneVerification";
import ForgotPassword from "../../screen/ForgotPassword";

import { Provider } from "react-redux";
import { AuthContext, AuthProvider, store } from "../../store/store.js";
import UserProfile from "../../components/UserProfile";
import DrawerNav from "../../screen/DrawerScreen/DrawerNav";
// import DrawerNav from "../../screen/DrawerScreen/DrawerNav";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPassenger from "../../screen/AddPassenger";
import Notification from "../../screen/Notification";
import ServiceProviderDetails from "../../screen/ServiceProviderDetails";
import AddComplain from "../../screen/AddComplain";
import AddLeaves from "../../screen/AddLeaves";
import AskForBid from "../../screen/AskForBid";
import UpdatePassenger from "../../screen/DrawerScreen/UpdatePassenger";
import Map from "../../screen/Map";
import UpdateBid from "../../screen/UpdateBid";
import UpdateComplain from "../../screen/UpdateComplain";
import TrackLocation from "../../screen/TrackLocation";
import ComplainDetails from "../../screen/ComplainDetails";
import BidDetails from "../../screen/DrawerScreen/BidDetails.js";

// import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
function Root() {
  return <DrawerNav />;
}

const ScreenNav = () => {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.parentEmail !== "";
  console.log("AUTHENTICATED => main", authenticated);
  return (
    <Stack.Navigator
      initialRouteName={authenticated ? "Services" : "SignIn"}
      // initialRouteName="PhoneVerification"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#191b28",
        },
        headerTintColor: "#ffffff",
      }}
    >
      {!authenticated ? (
        // <Stack.Group>
        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Create Account" component={CreateUser} />
          <Stack.Screen name="Verification" component={PhoneVerification} />
          <Stack.Screen name="Forgot Password" component={ForgotPassword} />

          {/* </Stack.Group> */}
        </>
      ) : (
        // <Stack.Group>
        <>
          <Stack.Screen
            name="Services"
            component={Root}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Add Passenger" component={AddPassenger} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen
            name="Service Provider Details"
            component={ServiceProviderDetails}
          />
          <Stack.Screen name="Bid Details" component={BidDetails} />
          <Stack.Screen name="Ask For Bid" component={AskForBid} />
          <Stack.Screen name="Add Complain" component={AddComplain} />
          <Stack.Screen name="Add Leave" component={AddLeaves} />
          <Stack.Screen name="Update Passenger" component={UpdatePassenger} />
          <Stack.Screen name="Update Bid" component={UpdateBid} />
          <Stack.Screen name="Update Complain" component={UpdateComplain} />
          <Stack.Screen name="Complain Details" component={ComplainDetails} />
          <Stack.Screen
            name="Map"
            component={Map}
            // options={{ headerShown: false }}
          />
          <Stack.Screen name="Track Location" component={TrackLocation} />
          {/* </Stack.Group> */}
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenNav;
