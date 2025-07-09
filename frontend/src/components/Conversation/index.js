import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import { ChatCenteredText } from 'phosphor-react';

const Conversation = ({ chat, receiverName }) => {
  const [messages, setMessages] = useState(chat?.messages || []);

  useEffect(() => {
    setMessages(chat?.messages || []);
  }, [chat]);
  if (!chat || !receiverName || receiverName === "Unknown") {
    return (
      <Box
        p={4}
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={2}
      >
        <ChatCenteredText size={60} />
        <Typography variant="h6" color="textSecondary" textAlign="center">
          Select a chat to start messaging
        </Typography>
      </Box>
    );
  }

  return (
    <Stack height="100%" maxHeight="100vh" width="auto">
      <Header receiverName={receiverName} />

      <Box
        width="100%"
        sx={{
          flexGrow: 1,
          height: "100%",
          overflowY: "scroll",
          backgroundColor: "#F0F4FA",
        }}
      >
        {messages.length > 0 ? (
          <Message chat={chat} messages_data={{ messages }} />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%" }}
            alignItems="center"
            justifyContent="center"
          >
            <ChatCenteredText size={40} />
            <Typography variant="subtitle2">No messages yet</Typography>
          </Stack>
        )}
      </Box>

      <Footer chatId={chat?.id} receiverId={chat?.receiverId} setMessages={setMessages} />

    </Stack>
  );
};

export default Conversation;
