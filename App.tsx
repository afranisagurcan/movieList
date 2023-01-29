/**
   * Sample React Native App
   * https://github.com/facebook/react-native
   *
   * @format
   */

import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from "./src/HomeScreen";
import DetailScreen from "./src/DetailScreen";
import { SafeAreaView, StyleSheet, View } from "react-native";

const Stack = createNativeStackNavigator();


function App(): JSX.Element {


  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#cec3bd" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "#cec3bd" }}>

            <NavigationContainer >
              <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen options={{
                  headerStyle: {
                    backgroundColor: '#cec3bd',
                  },
                  headerTintColor: '#39729b',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
                 name="MOVIES" component={HomeScreen} />
                <Stack.Screen Screen options={{
                  headerStyle: {
                    backgroundColor: '#cec3bd',
                  },
                  headerTintColor: '#39729b',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }} name="Detail" component={DetailScreen} />
              </Stack.Navigator>
            </NavigationContainer>



        </SafeAreaView>
            </>
  );


}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a976c8",
    alignItems: "center",
    justifyContent: "center",
  },
});
