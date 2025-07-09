import React, { useState, useEffect } from 'react';
import ChatElement from '../../components/ChatElement';
import { Box, Stack, Typography, IconButton, Button, Divider } from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import axios from 'axios';

const Chats = ({ onSelectChat, userId }) => {
  const theme = useTheme();
  const [chatList, setChatList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const endpoint = "http://localhost:8080";

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !userId) {
        setError("Token or User ID not found. Please log in.");
        setLoading(false);
        return;
      }

      const { data } = await axios.get(`${endpoint}/api/chats`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId }
      });
       
      console.log(data)
      const chatMap = new Map();

      data.forEach((msg) => {
        console.log("msg.chatId",msg)
        if (!chatMap.has(msg.chatId)) {
          chatMap.set(msg.chatId, {
            id: msg.chatId,
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            pinned: msg.pinned || false,
            time: new Date(msg.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            lastMessageTime: new Date(msg.timestamp).toLocaleString(),
            messages: [],
            online: msg.online,
          });
        }
        chatMap.get(msg.chatId).messages.push(msg);
      });

      const uniqueChats = Array.from(chatMap.values());
      setChatList(uniqueChats);

      // if (uniqueChats.length > 0 && onSelectChat) {
      //   // onSelectChat({ data });
      //   onSelectChat(uniqueChats[0]); 
      // }

      setLoading(false);
    } catch (err) {
      console.log(err)
      setError("Failed to load chats.");
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${endpoint}/api/users`);
      setUserList(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to get users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchChats();
  }, [userId]);

  const handleSelectChat = async (chatId) => {
    try {
      const chatDetails = chatList.find(c => c.id === chatId);
      if (chatDetails && onSelectChat) {
        onSelectChat(chatDetails);
      }
    } catch (err) {
      console.error("Error fetching chat messages", err);
    }
  };

  const startNewChat = async (selectedUserId) => {
    try {
      const token = localStorage.getItem("token");
      const chatId = `${userId}_${selectedUserId}`;

      const { data: existingChat } = await axios.get(`${endpoint}/api/chats/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!existingChat) {
        await axios.post(`${endpoint}/api/chats/create`, {
          chatId: chatId,
          senderId: userId,
          receiverId: selectedUserId,
          users: [userId, selectedUserId]
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        onSelectChat({ id: chatId, senderId: userId, receiverId: selectedUserId, messages: [] });
      }
    } catch (err) {
      console.error("Failed to create new chat", err);
    }
  };

  const pinnedChats = chatList.filter(chat => chat.pinned);
  const allChats = chatList.filter(chat => !chat.pinned);

  const filteredUsers = userList.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <Box sx={{
      position: "relative",
      width: 320,
      backgroundColor: theme.palette.mode === 'light' ? "#F8FAFF" : theme.palette.background.paper,
      boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
    }}>
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack direction="row" alignItems='center' justifyContent='space-between'>
          <Typography variant='h5'>Chats</Typography>
          <IconButton><CircleDashed /></IconButton>
        </Stack>

        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search users...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>

        <Stack spacing={1}>
          <Stack direction='row' alignItems='center' spacing={1.5}>
            <ArchiveBox size={24} />
            <Button>Archive</Button>
          </Stack>
          <Divider />
        </Stack>

        {loading && <Typography variant="body2" color="textSecondary">Loading chats...</Typography>}
        {error && <Typography variant="body2" color="error">{error}</Typography>}

        <Stack
          className='scrollbar'
          spacing={2}
          direction='column'
          sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}
        >
          {pinnedChats.length > 0 && (
            <Stack spacing={2.4}>
              <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                Pinned
              </Typography>
              {pinnedChats.map(chat => (
                <ChatElement
                  key={chat.id}
                  {...chat}
                  onClick={() => handleSelectChat(chat.id)}
                />
              ))}
            </Stack>
          )}

          <Stack spacing={2.4}>
            <Typography variant='subtitle2' sx={{ color: "#676767" }}>
              All Chats
            </Typography>
            {allChats.map(chat => {
              let receiverName = "Unknown";
              if (userId === chat.senderId) {
                const receiver = userList.find(user => String(user.userId) === String(chat.receiverId));
                receiverName = receiver ? `${receiver.firstName} ${receiver.lastName}` : "Unknown";
                console.log(receiverName)
                console.log(chat.senderId)
                console.log(chat.receiverId)
              } else {
                const receiver = userList.find(user => String(user.userId) === String(chat.senderId));
                receiverName = receiver ? `${receiver.firstName} ${receiver.lastName}` : "Unknown";
              }
              return (
                <ChatElement
                  key={chat.id}
                  {...chat}
                  receiverName={receiverName}
                  chat={chat}
                  onClick={() => handleSelectChat(chat.id)}
                />
              );
            })}
          </Stack>

          {searchQuery && (
            <Stack spacing={2.4}>
              <Typography variant='subtitle2' sx={{ color: "#676767" }}>
                Search Results
              </Typography>
              {filteredUsers.map(user => {
                return (
                  <ChatElement
                    key={user.userId}
                    receiverName={`${user.firstName} ${user.lastName}`}
                    onClick={() => startNewChat(user.userId)}
                  />
                );
              })}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
