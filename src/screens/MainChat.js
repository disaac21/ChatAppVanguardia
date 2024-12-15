import { View, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat } from 'react-native-gifted-chat';
import { useFocusEffect } from '@react-navigation/native';

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
            setUserMessages(prev => [...prev, userMessage]); // Guardar el mensaje en el historial

            try {
                const response = await fetch('http://localhost:3002/webhook', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userMessage }),
                });

                const result = await response.json();

                if (response.ok && result.fulfillmentText) {
                    setMessages(previousMessages =>
                        GiftedChat.append(previousMessages, [
                            {
                                _id: Math.random().toString(),
                                text: result.fulfillmentText,
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
            const response = await fetch('http://localhost:3002/analyze-sentiment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: userMessages }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert(
                    'Análisis de Sentimiento',
                    `Mensajes analizados: ${result.totalMessages}\n\n` +
                        `Positivo: ${result.positivePercentage}%\n` +
                        `Negativo: ${result.negativePercentage}%\n` +
                        `Neutral: ${result.neutralPercentage}%`,
                    [
                        {
                            text: 'Cerrar Chat',
                            onPress: () => navigation.navigate('LogIn'), // Navegar de vuelta
                        },
                    ],
                );
            } else {
                Alert.alert('Error', 'No se pudo analizar los mensajes.');
            }
        } catch (error) {
            console.error('Error al analizar los mensajes:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
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
