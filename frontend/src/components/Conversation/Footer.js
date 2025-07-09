import { Box, IconButton, InputAdornment, Stack, TextField, Tooltip, Fab } from '@mui/material';
import React, { useState } from 'react';
import { styled, useTheme } from "@mui/material/styles";
import { LinkSimple, PaperPlaneTilt, Smiley, Camera, File, Image, Sticker, User } from 'phosphor-react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import axios from 'axios';

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: '12px',
        paddingBottom: '12px',
    }
}));

const Actions = [
    {
        color: '#4da5fe',
        icon: <Image size={24} />,
        y: 102,
        title: 'Photo/Video'
    },
    {
        color: '#1b8cfe',
        icon: <Sticker size={24} />,
        y: 172,
        title: 'Stickers'
    },
    {
        color: '#0172e4',
        icon: <Camera size={24} />,
        y: 242,
        title: 'Image'
    },
    {
        color: '#0159b2',
        icon: <File size={24} />,
        y: 312,
        title: 'Document'
    },
    {
        color: '#013f7f',
        icon: <User size={24} />,
        y: 382,
        title: 'Contact'
    }
];

const ChatInput = ({ setOpenPicker, message, setMessage }) => {
    const [openAction, setOpenAction] = useState(false);
    return (
        <StyledInput
            fullWidth
            placeholder='Write a message...'
            variant='filled'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <Stack sx={{ width: 'max-content' }}>
                        <Stack sx={{ position: 'relative', display: openAction ? 'inline-block' : 'none' }}>
                            {Actions.map((el, index) => (
                                <Tooltip key={index} placement='right' title={el.title}>
                                    <Fab sx={{ position: 'absolute', top: -el.y, backgroundColor: el.color }}>
                                        {el.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>
                        <InputAdornment>
                            <IconButton onClick={() => setOpenAction((prev) => !prev)}>
                                <LinkSimple />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
                endAdornment: (
                    <InputAdornment>
                        <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
                            <Smiley />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

const Footer = ({ chatId, receiverId, setMessages }) => {
    const theme = useTheme();
    const [openPicker, setOpenPicker] = useState(false);
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const messageText = message;

        if (!token || !userId) {
            alert("No Firebase token found.");
            return;
        }

        if (!chatId) {
            alert("Missing chatId");
            return;
        }

        if (!messageText.trim()) return;

        const [userA, userB] = chatId.split('_');

        let senderId, receiverId;

        if (userA === userId) {
            senderId = userA;
            receiverId = userB;
        } else if (userB === userId) {
            senderId = userB;
            receiverId = userA;
        } else {
            alert("Current user is not a participant in this chat.");
            return;
        }

        const requestData = {
            chatId: chatId,
            senderId: senderId,
            receiverId: receiverId,
            message: messageText,
            subtype: "text",
            type: "msg",
            img: "",
            incoming: false,
            outgoing: true
        };

        try {
            const response = await axios.post(
                `http://localhost:8080/api/chats/${chatId}/createMessage`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 201) {
                setMessage('');
                setMessages(prevMessages => [...prevMessages, response.data]);
            } else {
                console.error("Failed to send message.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        }
    };

    return (
        <Box p={2} sx={{
            width: '100%',
            backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
            boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
        }}>
            <Stack direction='row' alignItems='center' spacing={3}>
                <Stack sx={{ width: '100%' }}>
                    <Box
                        sx={{
                            display: openPicker ? 'inline' : 'none',
                            zIndex: 10,
                            position: 'fixed',
                            bottom: 81,
                            right: 100
                        }}
                    >
                        <Picker
                            theme={theme.palette.mode}
                            data={data}
                            onEmojiSelect={(emoji) => setMessage((prev) => prev + emoji.native)}
                        />
                    </Box>
                    <ChatInput
                        setOpenPicker={setOpenPicker}
                        message={message}
                        setMessage={setMessage}
                    />
                </Stack>
                <Box
                    sx={{
                        height: 48,
                        width: 48,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1.5
                    }}
                >
                    <Stack
                        sx={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <IconButton onClick={sendMessage}>
                            <PaperPlaneTilt color='#fff' />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default Footer;
