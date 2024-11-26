import React, { useEffect, useState } from 'react';
import './chat.css'
import Avatar from "@mui/material/Avatar";
import { Phone, Camera } from 'lucide-react'
import TextArea from "../../shared/text-area.jsx";
import { userStoreMessage } from "../../lib/userStore.js";
import { collection, query, where, getDocs, setDoc, doc, serverTimestamp, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase.js";
import { useChatStore } from "../../lib/chatStore.js";
import { userStore } from "../../lib/userStore.js";
const Chat = () => {
    return (<div className='chat border-r border-gray-500 border-opacity-50  flex flex-col justify-between'>
        <ChatHeader />
        <ChatCenter />
        <ChatFooter />
    </div>);
}

export default Chat;


export function ChatHeader() {

    return (
        <div className='border-b  border-gray-500 border-opacity-50 border-opacity-50'>
            <div className={'flex justify-between pb-3 px-2 '}>
                <div className={'flex items-center gap-4'}>
                    <Avatar />
                    <h3>Name</h3>
                </div>

                <div className="flex items-center gap-2">
                    <Phone className="w-6 h-6 hover:fill-white" />
                    <Camera className="w-6 h-6" />
                </div>
            </div>

        </div>
    )
}

export function ChatFooter() {
    return (<div className={'w-full'}>
        <TextArea />
    </div>)
}


export function ChatCenter() {
    const [text, setText] = useState('');
    const [chat, setChat] = useState('');
    const { chatId, user } = useChatStore();
    const { currentUser } = userStore()

    const handleSend = async () => {
        if (!text === '') return
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

                const userChatRef = doc(db, 'userchats', id);
                const userChatSnapshot = await getDoc(userChatRef);
                if (userChatSnapshot.exists()) {
                    const userChatData = userChatSnapshot.data();
                    const chatIndex = userChatData.chats.findIndex(c => c.chatId === chatId);
                    userChatData.chats[chatIndex].lastMessage = text;
                    userChatData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatData.chats[chatIndex].updateAt = Data.now();

                    await updateDoc(userChatRef, {
                        chats: userChatData.chats
                    })
                }
            })
        } catch (error) {

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

    const { message } = userStoreMessage()
    console.log(chat)
    return (<div className={'flex-1 w-full overflow-y-auto flex flex-col gap-4'}>
        <div className={'flex  flex-col self-start px-4'}>
            <div>
                Magomed Gubatev
            </div>
            <p className={'bg-cyan-950 w-max px-4 py-2 rounded-r-xl rounded-bl-xl'}>
                awdawdawd
            </p>
            <span className={'text-[12px]'}>5 минут назад</span>
        </div>
        <div className={'flex  flex-col self-end px-4'}>
            <div>
                Magomed Gubatev
            </div>
            <p className={'bg-cyan-950 w-max px-4 py-2 rounded-l-xl rounded-br-xl'}>
                awdawdawd
            </p>
            <span className={'text-[12px]'}>5 минут назад</span>
        </div>
        {chat?.message?.map((message) => (
            <div
                className="flex flex-col items-end space-y-1 pr-4"
                key={message.createdAt}
            >
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {message.name}
                </div>
                <div className="flex flex-col messages-end">
                    <p className="bg-cyan-950 text-white break-words whitespace-pre-wrap max-w-[300px] w-fit px-4 py-2 rounded-l-xl rounded-br-xl">
                        {message.text}
                    </p>
                </div>
                <span className="text-[12px] text-gray-500">
                    {message.date}
                </span>
            </div>
        ))
        }

    </div>)
}
