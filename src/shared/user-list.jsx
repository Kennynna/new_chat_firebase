import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';

import { useChatStore } from '../lib/chatStore';
import { userStore } from '../lib/userStore';
import { doc, updateDoc, } from "firebase/firestore";
import { db } from '../lib/firebase.js'

export default function UserList({ chats, loading }) {
    const { changeChat } = useChatStore();
    const { currentUser } = userStore();
    const [active, setActive] = useState(null)
    const handleSelectChat = async (chat, chatFriendNme, index) => {
        const userChats = chats.map(item => {
            const { user, ...rest } = item;
            return rest
        });
        const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId);
        userChats[chatIndex].isSeen = true;
        const userChatRef = doc(db, 'userchats', currentUser.id);
        setActive(index)
        try {
            await updateDoc(userChatRef, {
                chats: userChats,
            })
            changeChat(chat.chatId, chat.user, chatFriendNme);
        } catch (error) {
            console.log(error)
        }


    }
    return (
        <>
            {chats && (
                <List sx={{ width: '100%', maxWidth: 360, padding: 0 }}>
                    {chats.map((chat, index) => (
                        <React.Fragment key={index}>
                            <ListItem
                                alignItems="flex-start flex item-center "
                                className={`hover:bg-gray-600 transition-all mt-3 ${!chat.isSeen ? 'bg-blue-200' : ''
                                    }`}
                                onClick={() => handleSelectChat(chat, chat.user.username, index)}
                                sx={{ outline: active === index ? '2px solid #1C2025' : '', borderRadius: '10px' }}
                            >
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={chat.user.username}
                                    secondary={
                                        <p >
                                            {chat.lastMessage}
                                        </p>
                                    }
                                />
                            </ListItem>

                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
            )}

            {loading && Array.from({ length: 4 }).map((_, i) => {
                <Skeleton key={i} variant="rounded" width={'100%'} height={60} animation="wave" />
            })}

        </>


    );
}

// https://youtu.be/domt_Sx-wTY?t=9460