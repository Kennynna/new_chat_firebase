import React, { useEffect, useState } from 'react';
import './chat.css'
import Avatar from "@mui/material/Avatar";
import { Phone, Camera } from 'lucide-react'
import TextArea from "../../shared/text-area.jsx";
import { userStoreMessage } from "../../lib/userStore.js";
import { collection, query, where, getDocs, setDoc, doc, serverTimestamp, updateDoc, arrayUnion, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase.js";
import { useChatStore } from "../../lib/chatStore.js";
import { userStore } from "../../lib/userStore.js";

export function ChatHeader() {
    const { friendName } = useChatStore();
    return (
        <div className='border-b border-gray-500 border-opacity-50 bg-gray-800 p-4'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <Avatar className="w-10 h-10" />
                    <h3 className="text-white text-lg font-semibold">{friendName}</h3>
                </div>
                <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                    <Camera className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                </div>
            </div>
        </div>
    )
}

const Chat = () => {
    const [text, setText] = useState('');
    const [chat, setChat] = useState('');
    const { chatId, user } = useChatStore();
    const { currentUser } = userStore()

    const handleSend = async () => {
        console.log(chatId, user);
        if (text === '') return
        try {
            await updateDoc(doc(db, 'chats', chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                })
            })

            const userIDs = [currentUser.id, user.id];
            userIDs.forEach(async (id) => {
                const userChatsRef = doc(db, 'userchats', id);
                const userChatsSnapshot = await getDoc(userChatsRef);
                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();
                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);

                    console.log(userChatsData, 'userChatsData');
                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updateAt = Date.now();

                    await updateDoc(userChatsRef, {
                        chats: userChatsData.chats
                    })
                }
            })
        } catch (error) {
            console.error("Error sending message:", error);
        }
        finally {
            setText('')
        }
    }

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', chatId),
            (res) => { setChat(res.data()) }
        );
        return () => {
            unSub();
        }
    }, [chatId]);

    console.log(chat);
    console.log(user);

    return (
        <div className='chat border-r border-gray-500 border-opacity-50 flex flex-col  bg-gray-900'>
            <ChatHeader />
            <div className='flex-1 overflow-y-auto flex flex-col gap-4 p-4'>
                {chat?.messages?.map((message) => (
                    <div
                        key={message.id || message.createdAt}
                        className={`flex flex-col space-y-1 ${message.senderId === currentUser.id ? 'items-end' : 'items-start'}`}
                    >
                        <div className="text-sm font-medium text-gray-400">
                            {message.name}
                        </div>
                        <div className="flex flex-col">
                            <p className={`text-white break-words whitespace-pre-wrap max-w-[300px] w-fit px-4 py-2 rounded-2xl ${message.senderId === currentUser.id
                                    ? 'bg-blue-600 rounded-tr-none'
                                    : 'bg-gray-700 rounded-tl-none'
                                }`}>
                                {message.text}
                            </p>
                        </div>
                        <span className="text-xs text-gray-500">
                            {new Date(message.createdAt?.toDate()).toLocaleString()}
                        </span>
                    </div>
                ))}
                {chat?.messages?.length === 0 && <p className='text-white text-center'>У вас пока нет сообщений</p>}
            </div>
            <TextArea text={text} setText={setText} handleSend={handleSend} />
        </div>
    )
}

export default Chat;

