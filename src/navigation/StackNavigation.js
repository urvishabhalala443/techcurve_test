import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MusicPlayerScreen from '../screens/musicPlayer';
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
