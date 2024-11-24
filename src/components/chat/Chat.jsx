import React, {useEffect, useState} from 'react';
import './chat.css'
import Avatar from "@mui/material/Avatar";
import {Phone, Camera} from 'lucide-react'
import TextArea from "../../shared/text-area.jsx";
import {userStoreMessage} from "../../lib/userStore.js";
import {collection,  query, where, getDocs, setDoc, doc,serverTimestamp,updateDoc,arrayUnion,onSnapshot} from "firebase/firestore";
import {db} from "../../lib/firebase.js";

const Chat = () => {
    return (<div className='chat border-r border-gray-500 ml-2 flex flex-col justify-between'>
        <ChatHeader/>
        <ChatCenter/>
        <ChatFooter/>
    </div>);
}

export default Chat;


export function ChatHeader() {




    return (<div className={'flex justify-between border-b pb-3 px-2 '}>
        <div className={'flex items-center gap-4'}>
            <Avatar/>
            <h3>Name</h3>
        </div>

        <div className="flex items-center gap-2">
            <Phone className="w-6 h-6 hover:fill-white"/>
            <Camera className="w-6 h-6"/>
        </div>
    </div>)
}

export function ChatFooter() {
    return (<div className={'w-full'}>
        <TextArea/>
    </div>)
}


export function ChatCenter() {
    // useEffect(() => {
    //     const unSub = onSnapshot(doc(db,'userchats', ),
    //
    //     );
    //     return () => {
    //         unSub();
    //     }
    // }, []);
    // https://youtu.be/domt_Sx-wTY?t=8832

    const {message} = userStoreMessage()
    console.log(message)
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
        {message.length <= 0 ?
            null : message.map((item) => (

            <div className={'flex  flex-col self-end px-4 text-end'} key={item.id}>
                <div>
                    {item.name}
                </div>
                <p className={'bg-cyan-950 w-max px-4 py-2 rounded-l-xl rounded-br-xl'}>
                    {item.message}
                </p>
                <span className={'text-[12px]'}>{item.date}</span>
            </div>
        ))
        }

    </div>)
}
