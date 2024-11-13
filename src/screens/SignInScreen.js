import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
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
const InputField = ({ icon, placeholder, secureTextEntry = false }) => (
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
const InputFieldsSection = ({ navigation }) => (
    <View>
        <View>
            <InputField icon={<FontAwesome6 name="user" size={hp(2.7)} color="gray" />} placeholder="Nombre" />
            <View style={{ marginTop: hp(2) }}>
                <InputField icon={<Octicons name="mail" size={hp(2.7)} color="gray" />} placeholder="Correo Electrónico" />
            </View>
            <View style={{ marginTop: hp(2) }}>
                <InputField icon={<Feather name="at-sign" size={hp(2.7)} color="gray" />} placeholder="Username" />
            </View>
            <View style={{ marginTop: hp(2) }}>
                <InputField icon={<Octicons name="lock" size={hp(2.7)} color="gray" />} placeholder="Password" secureTextEntry />
            </View>
        </View>
    </View>
);

// Social Media Sign-In Section Component
const SocialSignInSection = ({ navigation }) => (
    <View style={{ paddingTop: hp(4) }}>
        <Button
            icon={<FontAwesome6 name="user-large" size={hp(2.7)} color="white" />}
            // icon={<FontAwesome6 name="user" size={hp(2.7)} color="white" />}
            // icon={<FontAwesome5 name="user-alt" size={hp(2.7)} color="white" />}
            text="Crear Cuenta"
            onPress={() => alert('Create Account')}
        />
        <Button
            icon={<Fontisto name="google" size={hp(2.7)} color="white" />}
            text="Registrarse con Google"
            onPress={() => alert('Google Sign Up')}
        />
        <Button
            icon={<FontAwesome5 name="facebook" size={hp(2.7)} color="white" />}
            text="Registrarse con Facebook"
            onPress={() => alert('Facebook Sign Up')}
        />
    </View>    
);

export default function SignIn() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="default" />
            <View style={{ paddingTop: hp(5), paddingHorizontal: wp(5) }}>
                <LogoSection />
                <View style={{ paddingHorizontal: wp(12.5), marginTop: hp(4) }}>
                    <InputFieldsSection navigation={navigation} />
                    <SocialSignInSection navigation={navigation}/>
                </View>
            </View>
        </View>
    );
}
