import { View, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat } from 'react-native-gifted-chat';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function MainChat({ navigation }) {
    const [messages, setMessages] = useState([]);
    const [userMessages, setUserMessages] = useState([]); 

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

    const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        );

        const userMessage = messages[0]?.text;

        if (userMessage) {
            setUserMessages(prev => [...prev, userMessage]); 

            try {
                const response = await axios.post(
                    'https://backenddav.onrender.com/webhook',
                    { message: userMessage }
                );

                const { fulfillmentText } = response.data;

                if (fulfillmentText) {
                    setMessages(previousMessages =>
                        GiftedChat.append(previousMessages, [
                            {
                                _id: Math.random().toString(), 
                                text: fulfillmentText,
                                createdAt: new Date(),
                                user: {
                                    _id: 2,
                                    name: 'Chatbot',
                                    avatar: '',
                                },
                            },
                        ]),
                    );
                } else {
                    Alert.alert('Error', 'No se pudo obtener una respuesta del chatbot.');
                }
            } catch (error) {
                console.error('Error al enviar el mensaje al backend:', error);
                Alert.alert('Error', 'No se pudo conectar con el servidor.');
            }
        }
    }, []);

    const handleBackButtonPress = useCallback(async () => {
        try {
            const response = await axios.post(
                'https://backenddav.onrender.com/analyze-sentiment',
                { messages: userMessages }
            );

            const { totalMessages, positivePercentage, negativePercentage, neutralPercentage } = response.data;

            Alert.alert(
                'Análisis de Sentimiento',
                `Mensajes analizados: ${totalMessages}\n\n` +
                    `Positivo: ${positivePercentage}%\n` +
                    `Negativo: ${negativePercentage}%\n` +
                    `Neutral: ${neutralPercentage}%`,
                [
                    {
                        text: 'Cerrar Chat',
                        onPress: () => navigation.navigate('LogIn'), 
                    },
                ],
            );
        } catch (error) {
            console.error('Error al analizar los mensajes:', error);
            Alert.alert('Error', 'No se pudo analizar los mensajes.');
        }
    }, [userMessages, navigation]);

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = navigation.addListener('beforeRemove', e => {
                e.preventDefault(); 
                handleBackButtonPress();
            });

            return unsubscribe;
        }, [handleBackButtonPress, navigation])
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
