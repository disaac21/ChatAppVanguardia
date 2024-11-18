// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from '../screens/LogInScreen';
import SignInScreen from '../screens/SignInScreen';
import MainChat from '../screens/MainChat';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='LogIn'>
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="MainChat" component={MainChat} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;