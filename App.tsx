/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/HomeScreen";
import DetailScreen from "./src/DetailScreen";
import { SafeAreaView, StyleSheet, View } from "react-native";

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MOVIES">

        <Stack.Screen options={{
          headerStyle: {
            backgroundColor: "#000"
          },
          headerTintColor: "#989393",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}  name="MOVIES" component={HomeScreen} />
        <Stack.Screen options={{
          headerStyle: {
            backgroundColor: "#000"
          },
          headerTintColor: "#989393",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }} name="DETAIL" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  }
});
