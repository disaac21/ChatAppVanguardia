import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
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

// Input Fields and Forgot Password Section Component
const InputFieldsSection = ({ navigation }) => (
    <View>
        <View>
            <InputField icon={<Octicons name="mail" size={hp(2.7)} color="gray" />} placeholder="Email address" />
            <View style={{ marginTop: hp(2) }}>
                <InputField icon={<Octicons name="lock" size={hp(2.7)} color="gray" />} placeholder="Password" secureTextEntry />
            </View>
        </View>
        <View style={{alignItems: 'stretch'}}>
            <Text style={{ fontSize: hp(1.5), fontWeight: '500', textAlign: 'left', color: '#757575', marginTop: hp(2) }}>
                Forgot password?
            </Text>
            <View style={{ alignItems: 'flex-end'}}>

                <TouchableOpacity
                    style={{ height: hp(5), width: wp(20), backgroundColor: '#a4a2a7', borderRadius: 17, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',}}
                    onPress={() => alert('Navigate to Main Page')}
                    accessibilityLabel={"Sign In"}
                >
                  {<Entypo name="arrow-right" size={30} color="white"/>}
                    {/* {<AntDesign name="caretright" size={30} color="white" /> && (
                        <View style={{ marginRight: wp(2) }}>
                            {<AntDesign name="caretright" size={30} color="white" />}
                        </View>
                    )}
                    <Text style={{ fontSize: hp(1.6), color: '#ffffff', fontWeight: '500' }}>
                        {"Sign In"}
                    </Text> */}
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

// Social Media Sign-In Section Component
const SocialSignInSection = ({ navigation }) => (
    <View style={{ paddingTop: hp(10) }}>
        <Button
            icon={<FontAwesome6 name="user-large" size={hp(2.7)} color="white" />}
            // icon={<FontAwesome6 name="user" size={hp(2.7)} color="white" />}
            // icon={<FontAwesome5 name="user-alt" size={hp(2.7)} color="white" />}
            text="Crear Cuenta"
            onPress={() => navigation.navigate('Welcome')}
        />
        <Button
            icon={<Fontisto name="google" size={hp(2.7)} color="white" />}
            text="Sign In con Google"
            onPress={() => alert('Google Sign In')}
        />
        <Button
            icon={<FontAwesome5 name="facebook" size={hp(2.7)} color="white" />}
            text="Sign In con Facebook"
            onPress={() => alert('Facebook Sign In')}
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
                <View style={{ paddingHorizontal: wp(12.5), marginTop: hp(2) }}>
                    <InputFieldsSection navigation={navigation} />
                    <SocialSignInSection navigation={navigation}/>
                </View>
            </View>
        </View>
    );
}