import {View, Text} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {GiftedChat} from 'react-native-gifted-chat';

export default function MainChat() {

    const [messages, setMessages] = useState([])

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
        ])
        }, [])

        const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{ _id: 1, }}
            />
        </SafeAreaView>
    );
}
