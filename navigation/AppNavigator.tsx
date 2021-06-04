import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Gallery from "../screens/Gallery";
import Duties from "../screens/Duties";
import Spicy from "../screens/Spicy";

const Stack = createStackNavigator();

const WeddingNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="Duties" component={Duties} />
      <Stack.Screen name="Spicy" component={Spicy} />
    </Stack.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <WeddingNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
