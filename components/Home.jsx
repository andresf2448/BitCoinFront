import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "./Dashboard";
import Transactions from "./Transactions";
import Trade from "./Trade";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        activeTintColor: "black",
      }}
    >
      <Tab.Screen
        name="DASHBOARD"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="information-circle"
              color={"#black"}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="TRANSACCIONES"
        component={Transactions}
        options={{
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="book-sharp"
              color={"black"}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="TRADE"
        component={Trade}
        options={{
          tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="cash-sharp"
              color={"#black"}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
