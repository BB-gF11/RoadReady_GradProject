import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from './MsgTypes';

const Message = ({ menu, chat, messages_data }) => {
  console.log("chat ", chat)
  console.log("messages_data", messages_data)

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const currentUserId = localStorage.getItem("userId");

    if (
      messages_data &&
      Array.isArray(messages_data.messages) &&
      chat &&
      chat.id
    ) {
      const getOtherUserId = (chatId, currentUserId) => {
        const ids = chatId.split("_");
        return ids.find(id => id !== currentUserId);
      };

      const otherUserId = getOtherUserId(chat.id, currentUserId);

      const filteredMessages = messages_data.messages;


      setMessages(filteredMessages);
    } else {
      setMessages([]);
    }
  }, [messages_data, chat]);

  if (
    !messages ||
    messages.length === 0 ||
    messages.every(msg => !msg.incoming && !msg.outgoing)
  ) {
    return (
      <Box p={3}>
        <Typography variant="body2" color="text.secondary">
          no message yet
        </Typography>
      </Box>
    );
  }


  messages.forEach(msg => {
    const isOutgoing = msg.senderId === localStorage.getItem("userId");
    msg.outgoing = isOutgoing;
    msg.incoming = !isOutgoing;
  });

  return (
    <Box p={3}>
      <Stack spacing={3}>
        {messages.slice().map((el, idx) => {
          switch (el.type) {
            case 'divider':
              return <TimeLine key={idx} el={el} messages_data={messages} />;
            case 'msg':
              switch (el.subtype) {
                case 'img':
                  return <MediaMsg key={idx} el={el} menu={menu} messages_data={messages} />;
                case 'doc':
                  return <DocMsg key={idx} el={el} menu={menu} messages_data={messages} />;
                case 'link':
                  return <LinkMsg key={idx} el={el} menu={menu} messages_data={messages} />;
                case 'reply':
                  return <ReplyMsg key={idx} el={el} menu={menu} messages_data={messages} />;
                default:
                  return <TextMsg key={idx} el={el} menu={menu} messages_data={messages} />;
              }
            default:
              return null;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
