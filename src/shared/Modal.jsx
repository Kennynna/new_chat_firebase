import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Input from "@mui/material/Input";
import { SquarePlus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    serverTimestamp,
    updateDoc,
    arrayUnion
} from "firebase/firestore";
import { db } from "../lib/firebase.js";
import { userStore } from "../lib/userStore.js";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
};

export default function ListModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { currentUser } = userStore()

    const [user, setUser] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const usersData = querySnapshot.docs.map(doc => ({
                    ...doc.data()
                }));
                setUser(usersData);
            } else {
                setUser([]); // Если пользователи не найдены
                toast.error("Пользователь не найден");
            }
        } catch (error) {
            console.error("Ошибка при поиске пользователя:", error);
            setUser([]);
            toast.error("Ошибка при поиске пользователя");
        }
    }

    const handleAddFriend = async () => {
        if (!user || user.length === 0) {
            toast.error("Пользователь не выбран");
            return;
        }

        const selectedUser = user[0]; // Берем первого пользователя из массива

        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");
        try {
            const newChatRef = doc(chatRef);
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: []
            });

            await updateDoc(doc(userChatsRef, selectedUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                })
            });

            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: selectedUser.id,
                    updatedAt: Date.now(),
                })
            });

            toast.success("Собеседник успешно добавлен");
            handleClose(); // Закрываем модальное окно после успешного добавления
        } catch (er) {
            console.error(er);
            toast.error("Ошибка при добавлении собеседника");
        }
    }

    return (
        <div>
            <SquarePlus style={{ cursor: 'pointer' }} size={20} onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='bg-[rgba(17,25,40,0.15)] backdrop-blur-[11px] backdrop-saturate-[130%] p-4 overflow-auto max-h-60'>
                        <div className='mb-10'>
                            <form className='flex item-center gap-4 justify-between' onSubmit={handleSearch}>
                                <Input placeholder='Найти собеседника...' style={{ color: 'white' }} name='username' />
                                <Button
                                    style={{ backgroundColor: '#111827', color: 'white', fontWeight: 'bold' }}
                                    type='submit'
                                >
                                    Искать
                                </Button>
                            </form>
                        </div>

                        {user ? user.map((user) => (
                            <div className='mt-4 flex items-center gap-4 justify-between' key={user.username}>
                                <p>{user.username}</p>
                                <Button
                                    onClick={handleAddFriend}
                                    style={{
                                        backgroundColor: '#111827',
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Добавить
                                </Button>
                            </div>
                        )) : null}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

