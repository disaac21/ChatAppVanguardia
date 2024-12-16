import React from 'react';
import { View, Text, Image, Alert, StatusBar, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de instalar react-native-vector-icons

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
        {icon && <View style={{ marginRight: wp(2) }}>{icon}</View>}
        {text && <Text style={{ fontSize: hp(1.6), color: '#ffffff', fontWeight: '500' }}>{text}</Text>}
    </TouchableOpacity>
);

// Back Button Component
const BackButton = ({ onPress }) => (
    <TouchableOpacity
        style={{
            position: 'absolute',
            top: hp(5),
            left: wp(5),
            zIndex: 10,
        }}
        onPress={onPress}
        accessibilityLabel="Volver a la pantalla anterior"
    >
        <Icon name="arrow-back" size={hp(3.5)} color="#333" />
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

// User Info Section Component (dinámico)
const UserInfoSection = ({ user }) => (
    <View>
        <View style={{ alignItems: 'center', marginBottom: hp(5), marginTop: hp(6.5) }}>
            <Text style={{ fontSize: hp(2), fontWeight: '600', color: '#333333' }}>
                {user.nombre || 'Nombre del Usuario'}
            </Text>
        </View>
        <View style={{ marginTop: hp(5.5) }}>
            <View style={{ marginBottom: hp(3.5) }}>
                <Text style={{ fontSize: hp(2), fontWeight: '500', color: '#333333', marginHorizontal: wp(8) }}>
                    Correo Electrónico
                </Text>
                <Text style={{ fontSize: hp(1.75), fontWeight: '400', color: '#666666', marginHorizontal: wp(8) }}>
                    {user.email || 'Sin información'}
                </Text>
            </View>
            <View style={{ marginBottom: hp(3.5) }}>
                <Text style={{ fontSize: hp(2), fontWeight: '500', color: '#333333', marginHorizontal: wp(8) }}>
                    Username
                </Text>
                <Text style={{ fontSize: hp(1.75), fontWeight: '400', color: '#666666', marginHorizontal: wp(8) }}>
                    {user.nUsuario || 'Sin información'}
                </Text>
            </View>
            <View>
                <Text style={{ fontSize: hp(2), fontWeight: '500', color: '#333333', marginHorizontal: wp(8) }}>
                    Contraseña
                </Text>
                <Text style={{ fontSize: hp(1.75), fontWeight: '400', color: '#666666', marginHorizontal: wp(8) }}>
                    ********
                </Text>
            </View>
        </View>
    </View>
);

// LogOut Section Component
const LogOutButtonSection = ({ navigation }) => (
    <View style={{ paddingHorizontal: wp(11), paddingTop: hp(14) }}>
        <Button
            text="Cerrar Sesión"
            onPress={() => {
                Alert.alert('Sesión Cerrada', 'Has cerrado sesión exitosamente.');
                navigation.navigate('LogIn');
            }}
            color="#941c1b"
        />
    </View>
);

export default function UserProfileScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = route.params || { user: {} }; // Extraer los datos del usuario desde params

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="default" />
            {/* Back Button */}
            <BackButton onPress={() => navigation.goBack()} />

            <View style={{ paddingTop: hp(10) }}>
                <ProfilePicSection />
                <UserInfoSection user={user} />
                <LogOutButtonSection navigation={navigation} />
            </View>
        </View>
    );
}
