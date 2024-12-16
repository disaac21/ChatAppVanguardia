import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import LogInScreen from '../screens/LogInScreen';
import SignInScreen from '../screens/SignInScreen';
import MainChat from '../screens/MainChat';
import UserProfileScreen from '../screens/UserProfileScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    const [user, setUser] = useState(null);  // Definir el estado para almacenar la información del usuario

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='LogIn' screenOptions={{navigationBarColor: '#ffffff', statusBarBackgroundColor: '#a4a2a7'}}>
                <Stack.Screen 
                    name="LogIn" 
                    component={LogInScreen} 
                    options={{headerShown: false}} 
                    initialParams={{ setUser }}  // Asegúrate de pasarlo como prop en cada llamada
                />
                <Stack.Screen
                    name="SignIn"
                    options={{ headerShown: false }}
                >
                    {props => <SignInScreen {...props} setUser={setUser} />}
                </Stack.Screen>
                <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{headerShown: false}} />
                <Stack.Screen
                    name="MainChat"
                    component={MainChat}
                    options={({ navigation }) => ({
                        title: "Chat",
                        headerTitleAlign: 'center',
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen', { user })}>
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

