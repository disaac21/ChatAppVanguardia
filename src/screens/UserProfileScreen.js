import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, Pressable, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// Reusable Button Component
const Button = ({ icon, text, color = '#a4a2a7', onPress }) => (
    <TouchableOpacity
        style={{
            height: hp(7),
            backgroundColor: color,
            borderRadius: 10,
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

// Logo Section Component
const ProfilePicSection = () => (
    <View style={{ alignItems: 'center' }}>
        <Image
            source={require('../../assets/images/Option.png')}
            resizeMode="contain"
            style={{ width: '100%', aspectRatio: 1 }}
        />
    </View>
);

const UserInfoSection = () => (
    <View>
        <View style={{ alignItems: 'center', marginBottom: hp(5), marginTop: hp(6.5)}}>
            <Text style={{ fontSize: hp(2), fontWeight: 'light', color: '#333333'}}>
                Nombre del Usuario
            </Text>
        </View>
        <View style={{ marginTop: hp(5.5)}}>
            <View style={{ marginBottom: hp(3.5)}}>
                <Text style={{ fontSize: hp(2), fontWeight: '500', color: '#333333', marginHorizontal: wp(8)}}>
                    Correo Electrónico
                </Text>
                <Text style={{ fontSize: hp(1.75), fontWeight: '400', color: '#666666', marginHorizontal: wp(8)}}>
                    Acá se desplegará información sobre el usuario
                </Text>
            </View>
            <View style={{ marginBottom: hp(3.5)}}>
                <Text style={{ fontSize: hp(2), fontWeight: '500', color: '#333333', marginHorizontal: wp(8)}}>
                    Username
                </Text>
                <Text style={{ fontSize: hp(1.75), fontWeight: '400', color: '#666666', marginHorizontal: wp(8)}}>
                    Acá se desplegará información sobre el usuario
                </Text>
            </View>
            <View>
                <Text style={{ fontSize: hp(2), fontWeight: '500', color: '#333333', marginHorizontal: wp(8)}}>
                    Contraseña
                </Text>
                <Text style={{ fontSize: hp(1.75), fontWeight: '400', color: '#666666', marginHorizontal: wp(8)}}>
                    Acá se desplegará información sobre el usuario
                </Text>
            </View>
        </View>
    </View>
);

// Social Media Sign-In Section Component
const LogOutButtonSection = ({ navigation, email, password }) => (
    <View style={{ paddingHorizontal: wp(11), paddingTop: hp(14) }}>
        <Button
            text="Cerrar Sesión"
            onPress={() => {Alert.alert('Logging Out'), navigation.navigate('LogIn')}}
            color='#941c1b'
        />
    </View>    
);

export default function UserProfileScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="default" />
            <View style={{ paddingTop: hp(10)}}>
                <ProfilePicSection />
                <UserInfoSection />
                <LogOutButtonSection navigation={navigation} />
            </View>
        </View>
    );
}