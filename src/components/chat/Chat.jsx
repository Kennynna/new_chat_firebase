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
        <div className='border-b  border-gray-500 border-opacity-50'>
            <div className={'flex justify-between pb-3 px-2 '}>
                <div className={'flex items-center gap-4'}>
                    <Avatar />
                    <h3>{friendName}</h3>
                </div>

                <div className="flex items-center gap-2">
                    <Phone className="w-6 h-6 hover:fill-white" />
                    <Camera className="w-6 h-6" />
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

        <div className='chat border-r border-gray-500 border-opacity-50  flex flex-col justify-between'>


            <ChatHeader />

            <div className='flex-1 w-full overflow-y-auto flex flex-col gap-4 p-4'>
                {chat?.messages?.map((message) => (
                    <div
                        key={message.id || message.createdAt}
                        className={`flex flex-col space-y-1 ${message.senderId === currentUser.id ? 'items-end' : 'items-start'
                            }`}
                    >
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {message.name}
                        </div>
                        <div className="flex flex-col">
                            <p className={`text-white break-words whitespace-pre-wrap max-w-[300px] w-fit px-4 py-2 ${message.senderId === currentUser.id
                                ? 'bg-cyan-950 rounded-l-xl rounded-br-xl'
                                : 'bg-gray-700 rounded-r-xl rounded-bl-xl'
                                }`}>
                                {message.text}
                            </p>
                        </div>
                        <span className="text-[12px] text-gray-500">
                            {message.date}
                        </span>
                    </div>
                ))}
            </div>

            <TextArea text={text} setText={setText} handleSend={handleSend} />
        </div>
    )
}

export default Chat;


