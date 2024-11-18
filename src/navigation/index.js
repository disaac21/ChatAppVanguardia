// In App.js in a new project

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import LogInScreen from '../screens/LogInScreen';
import SignInScreen from '../screens/SignInScreen';
import MainChat from '../screens/MainChat';
import UserProfileScreen from '../screens/UserProfileScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='LogIn' screenOptions={{navigationBarColor: '#ffffff', statusBarBackgroundColor: '#a4a2a7'}}>
                <Stack.Screen name="LogIn" component={LogInScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
                <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{headerShown: false}}/>
                {/* <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{title: "User Profile", headerTitleAlign: 'center'}} /> */}
                <Stack.Screen name="MainChat" component={MainChat} 
                    options={({ navigation }) => ({ title: "Chat", headerTitleAlign: 'center',
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
                                <Feather name="user" size={hp(3)} color="gray" />
                            </TouchableOpacity>
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;