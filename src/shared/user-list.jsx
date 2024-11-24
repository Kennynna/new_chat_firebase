import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function UserList({chats}) {


    return (
        <>
        {chats &&
        <List sx={{width: '100%', maxWidth: 360, padding: 0}}>
            {chats.map((chat, index) => (
                <>
                <ListItem alignItems="flex-start" key={index}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={chat.user.username}
                        secondary={
                            <React.Fragment>
                                <p className={'text-white w-full bg-cyan-950 p-4'}>
                                    {chat.message}
                                </p>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li"/>
                </>
            ))}
        </List>}
        </>


    );
}