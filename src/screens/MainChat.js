import { View, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat } from 'react-native-gifted-chat';
import { useFocusEffect } from '@react-navigation/native';

export default function MainChat({ navigation }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Chatbot',
                    avatar: '',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);

    // Custom Back Button Behavior
    useFocusEffect(
        useCallback(() => {
            const handleBackButtonPress = () => {
                Alert.alert(
                    'Análisis de Sentimiento',
                    'Acá se podrá ver el análisis de sentimiento después del procesamiento del chat con la IA',
                    [
                        {
                            text: 'Close Chat',
                            onPress: () => navigation.navigate('LogIn'), // Navigate back
                        },
                    ],
                );
                return true; // Prevent default back behavior
            };

            const unsubscribe = navigation.addListener('beforeRemove', e => {
                e.preventDefault(); // Prevent the screen from being removed
                handleBackButtonPress();
            });

            return unsubscribe;
        }, [navigation])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{ _id: 1 }}
            />
        </SafeAreaView>
    );
}
