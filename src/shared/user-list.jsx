import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useChatStore } from '../lib/chatStore';
import { userStore } from '../lib/userStore';

export default function UserList({ chats }) {
    const { changeChat } = useChatStore();
    const { currentUser } = userStore();
    const handleSelectChat = async (chat) => {
        changeChat(chat.chatId, chat.user);
    }
    return (
        <>
            {chats &&
                <List sx={{ width: '100%', maxWidth: 360, padding: 0 }}>
                    {chats.map((chat, index) => (
                        <>
                            <ListItem alignItems="flex-start flex item-center" key={index} className='hover:bg-gray-600 transition-all' onClick={() => handleSelectChat(chat)}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText

                                    primary={chat.user.username}
                                    secondary={
                                        <p className={'text-white w-full'}>
                                            {chat.message}
                                        </p>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    ))}
                </List>}
        </>


    );
}

// https://youtu.be/domt_Sx-wTY?t=9460