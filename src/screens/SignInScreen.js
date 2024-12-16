import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

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

// Input Fields Section Component
const InputFieldsSection = ({ name, setName, email, setEmail, username, setUsername, password, setPassword }) => (
    <View>
        <InputField icon={<Feather name="user" size={hp(2.7)} color="gray" />} placeholder="Nombre" value={name} onChangeText={setName} />
        <View style={{ marginTop: hp(2) }}>
            <InputField icon={<Octicons name="mail" size={hp(2.7)} color="gray" />} placeholder="Correo Electrónico" value={email} onChangeText={setEmail} />
        </View>
        <View style={{ marginTop: hp(2) }}>
            <InputField icon={<Feather name="at-sign" size={hp(2.7)} color="gray" />} placeholder="Username" value={username} onChangeText={setUsername} />
        </View>
        <View style={{ marginTop: hp(2) }}>
            <InputField icon={<Octicons name="lock" size={hp(2.7)} color="gray" />} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
        </View>
    </View>
);

// Social Media Sign-In Section Component
const SocialSignInSection = ({ navigation, name, email, username, password, setUser }) => {
    const handleSignUp = async () => {
        try {
            const response = await fetch('https://backenddav.onrender.com/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: name,
                    email: email,
                    nUsuario: username,
                    password: password,
                }),
            });

            const result = await response.text();

            if (response.ok) {
                Alert.alert('¡Registro Exitoso!', result);
                const user = {
                    name: name,
                    email: email,
                    nUsuario: username,
                };
                setUser(user);
                navigation.navigate('MainChat');
            } else {
                Alert.alert('Error en el registro', result);
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
            console.error('Error en el registro:', error);
        }
    };

    return (
        <View style={{ paddingTop: hp(4) }}>
            <Button
                icon={<FontAwesome5 name="user-alt" size={hp(2.7)} color="white" />}
                text="Crear Cuenta"
                onPress={handleSignUp}
            />
            <Button
                icon={<Fontisto name="google" size={hp(2.7)} color="white" />}
                text="Registrarse con Google"
                onPress={() => Alert.alert('Google Sign Up', 'Esta funcionalidad aún no está implementada')}
            />
            <Button
                icon={<FontAwesome5 name="facebook" size={hp(2.7)} color="white" />}
                text="Registrarse con Facebook"
                onPress={() => Alert.alert('Facebook Sign Up', 'Esta funcionalidad aún no está implementada')}
            />
        </View>
    );
};

export default function SignIn({ setUser }) {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="default" />
            <View style={{ paddingHorizontal: wp(5), paddingTop: hp(2) }}>
                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ flexDirection: 'row', alignItems: 'center', marginBottom: hp(2) }}
                >
                    <FontAwesome5 name="arrow-left" size={hp(2.5)} color="#4a4a4a" />
                    <Text style={{ marginLeft: wp(2), fontSize: hp(2), color: '#4a4a4a' }}>
                        Regresar
                    </Text>
                </TouchableOpacity>
                <LogoSection />
                <View style={{ paddingHorizontal: wp(12.5), marginTop: hp(4) }}>
                    <InputFieldsSection
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                    />
                    <SocialSignInSection
                        navigation={navigation}
                        name={name}
                        email={email}
                        username={username}
                        password={password}
                        setUser={setUser}
                    />
                </View>
            </View>
        </View>
    );
}
