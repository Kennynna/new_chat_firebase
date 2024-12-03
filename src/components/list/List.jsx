import React, { useEffect, useState } from 'react';
import './list.css'
import Input from "@mui/material/Input";
import { Ellipsis, Video, PencilLine } from "lucide-react"
import UserList from "../../shared/user-list.jsx";
import { userStore } from "../../lib/userStore.js";
import { db } from '../../lib/firebase.js'
import { doc, getDoc, onSnapshot, } from "firebase/firestore";
import { SquarePlus } from 'lucide-react'
import ListModal from "../../shared/Modal.jsx";


const List = ({ user }) => {
    const [chats, setChats] = useState([]);
    const { currentUser } = userStore()
    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'userchats', currentUser.id),
            async (res) => {
                const items = res.data().chats;
                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);

                    const user = userDocSnap.data()
                    console.log(user);
                    return { ...item, user }
                })
                const chatData = await Promise.all(promises)
                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
            }

        );
        console.log('Чаты для списка слева', chats)
        return () => {
            unSub();
        }
    }, [currentUser.id]);
    return (
        <div className='list border-r border-gray-500 border-opacity-50 flex flex-col px-4 pt-4'>
            <div className={'flex flex-col gap-4'} >
                <div className={'flex justify-between  gap-8 items-center'}>
                    {user ? <p className='text-2xl uppercase'>{user.username}</p> : <p>user</p>}
                    <div className={'flex justify-between gap-3 item-center'}>
                        <Ellipsis size={20} />
                        <Video size={20} />
                        <PencilLine size={20} />
                    </div>
                </div>

                <div className={'flex items-start gap-4 flex-col justify-start w-full'}>
                    <div className='flex items-center gap-2'>
                        <p>Добавить</p>
                        <ListModal />
                    </div>
                </div>
                <div>
                    <UserList chats={chats} />
                </div>
            </div>
        </div>
    );
}

export default List;
