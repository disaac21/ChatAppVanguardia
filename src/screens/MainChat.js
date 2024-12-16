import { View, Alert, BackHandler } from 'react-native';
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
                text: '¡Bienvenido!',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Chatbot',
                    avatar: '',
                },
            },
        ]);
    }, []);

    // Handle back button press
    const handleBackButtonPress = useCallback(async () => {
        try {
            const response = await fetch('https://backenddav.onrender.com/analyze-sentiment', {
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

    // Handle the back button behavior
    useFocusEffect(
        useCallback(() => {
            const onBackPress = async () => {
                await handleBackButtonPress();
                return true; // Prevent default behavior
            };

            // Add listener for physical back button press (Android)
            const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            // Prevent default navigation behavior when removing this screen
            const unsubscribe = navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
                onBackPress();
            });

            return () => {
                // Clean up listeners when leaving the screen
                unsubscribe();
                backHandler.remove();
            };
        }, [handleBackButtonPress, navigation])
    );

    const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        );

        const userMessage = messages[0]?.text;

        if (userMessage) {
            setUserMessages(prev => [...prev, userMessage]); // Guardar el mensaje en el historial

            try {
                console.log('Sending user message:', userMessage); // Log the user message

                const response = await fetch('https://backenddav.onrender.com/webhook', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userMessage }),
                });

                console.log('Response status:', response.status); // Log response status
                const result = await response.json();
                console.log('Bot response:', result); // Log the bot's response

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