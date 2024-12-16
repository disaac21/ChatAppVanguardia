import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, Pressable, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '374231299348-v4ianurre127pud2n8sc33oulkvdr9ms.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
    try {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        // Get the user's ID token
        const signInResult = await GoogleSignin.signIn();
        let idToken = signInResult.idToken;

        if (!idToken) {
            throw new Error('No ID token found');
        }

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        await auth().signInWithCredential(googleCredential);

        // Return success
        return true;
    } catch (error) {
        console.error(error);
        // Return failure
        return false;
    }
}


// Reusable Button Component
const Button = ({ icon, text, color = '#a4a2a7', onPress }) => (
    <TouchableOpacity
        style={{
            height: hp(6.5),
            backgroundColor: color,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: hp(2),
        }}
        onPress={onPress}
        accessibilityLabel={text}
    >
        {icon && (
            <View style={{ marginRight: wp(2) }}>
                {icon}
            </View>
        )}
        {text && (
            <Text style={{ fontSize: hp(1.6), color: '#ffffff', fontWeight: '500' }}>
                {text}
            </Text>
        )}
    </TouchableOpacity>
);

// InputField Component
const InputField = ({ icon, placeholder, secureTextEntry = false, value, onChangeText }) => (
    <View style={{
        height: hp(7),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderColor: '#4a4a4a',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: wp(4),
    }}>
        {icon}
        <TextInput
            style={{ flex: 1, marginLeft: wp(2), fontWeight: '500', color: '#4a4a4a' }}
            placeholder={placeholder}
            placeholderTextColor="gray"
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);

// Logo Section Component
const LogoSection = () => (
    <View style={{ alignItems: 'center' }}>
        <Image
            source={require('../../assets/images/Option.png')}
            resizeMode="contain"
            style={{ width: '100%', aspectRatio: 1 }}
        />
    </View>
);

// Input Fields and Forgot Password Section Component
const InputFieldsSection = ({ navigation, email, setEmail, password, setPassword, setUser }) => {
    const handleLogin = async () => {
            try {
                const response = await fetch('https://backenddav.onrender.com/iniciarSesion', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const result = await response.json();

                if (response.ok) {
                    setUser(result.user);  // Usar setUser para actualizar el estado del usuario
                    Alert.alert('Inicio de sesión exitoso', 'Bienvenido ' + result.user.nombre);
                    navigation.navigate('MainChat'); // Navegamos a la pantalla principal
                } else {
                    Alert.alert('Error', result || 'Usuario o contraseña incorrectos');
                }
            } catch (error) {
                Alert.alert('Error', 'No se pudo conectar con el servidor. Por favor, intenta más tarde.');
                console.error(error);
            }
        };

    return (
        <View>
            <View>
                <InputField
                    icon={<Octicons name="mail" size={hp(2.7)} color="gray" />}
                    placeholder="Correo Electrónico"
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={{ marginTop: hp(2) }}>
                    <InputField
                        icon={<Octicons name="lock" size={hp(2.7)} color="gray" />}
                        placeholder="Contraseña"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            </View>
            <View style={{ alignItems: 'stretch' }}>
                <Pressable onPress={() => Alert.alert('Reset Password')}>
                    <Text style={{ fontSize: hp(1.5), fontWeight: '500', textAlign: 'left', color: '#757575', marginTop: hp(2) }}>

                    </Text>
                </Pressable>

                <View style={{ alignItems: 'flex-end'}}>
                    <TouchableOpacity
                        style={{
                            height: hp(5),
                            width: wp(20),
                            backgroundColor: '#a4a2a7',
                            borderRadius: 17,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}
                        onPress={handleLogin}
                        accessibilityLabel={"Sign In"}
                    >
                        <Entypo name="arrow-right" size={30} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// LogIn Component
export default function LogInScreen({ route, navigation }) {
    const { setUser } = route.params; // Acceder a setUser desde route.params

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="default" />
            <View style={{ paddingTop: hp(5), paddingHorizontal: wp(5) }}>
                <LogoSection />
                <View style={{ paddingHorizontal: wp(12.5), marginTop: hp(2) }}>
                    <InputFieldsSection
                        navigation={navigation}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        setUser={setUser}  // Se pasa la función setUser
                    />
                    <SocialSignInSection navigation={navigation} />
                </View>
            </View>
        </View>
    );
}



// Social Media Sign-In Section Component
const SocialSignInSection = ({ navigation }) => (
    <View style={{ paddingTop: hp(10) }}>
        <Button
            icon={<FontAwesome5 name="user-alt" size={hp(2.7)} color="white" />}
            text="Crear Cuenta"
            onPress={() => navigation.navigate('SignIn')}
        />
        <Button
            icon={<Fontisto name="google" size={hp(2.7)} color="white" />}
            text="Sign In con Google"
            onPress={async () => {
                const isSuccessful = await onGoogleButtonPress();
                if (isSuccessful) {
                    navigation.navigate('MainChat');
                } else {
                    Alert.alert('Error', 'Inicio de sesión con Google fallido. Intente de nuevo.');
                }
            }}
        />

        <Button
            icon={<FontAwesome5 name="facebook" size={hp(2.7)} color="white" />}
            text="Sign In con Facebook"
            onPress={() => Alert.alert('Facebook Sign In')}
        />
    </View>
);
