/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/views/HomeScreen';
import DetailScreen from './src/views/DetailScreen';
import FavoriteScreen from './src/views/FavoriteScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MOVIES">
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#989393',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="MOVIES"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#989393',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="FAVS"
          component={FavoriteScreen} />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#989393',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="DETAIL"
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

