import React, { useEffect, useState } from 'react';
import Chats from './Chats';
import Conversation from '../../components/Conversation';
import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Contact from '../../components/Contact';
import { useSelector } from 'react-redux';
import SharedMessages from '../../components/SharedMessages';
import StarredMessages from '../../components/StarredMessages';

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);
  const [selectedChat, setSelectedChat] = useState(null);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const [receiverName, setReceiverName] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users");
      const data = await response.json();
      setUserList(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to get users");
      setLoading(false);
    }
  };
 console.log("gen ",selectedChat)
  useEffect(() => {
    fetchUsers();
  }, []);


  useEffect(() => {
    if (selectedChat) {
      let rName = "Unknown";
      if (userId === selectedChat.senderId) {
        const receiver = userList.find(u => String(u.userId) === String(selectedChat.receiverId));
        rName = receiver ? `${receiver.firstName} ${receiver.lastName}` : "Unknown";
      } else if (userId === selectedChat.receiverId) {
        const receiver = userList.find(u => String(u.userId) === String(selectedChat.senderId));
        rName = receiver ? `${receiver.firstName} ${receiver.lastName}` : "Unknown";
      }
      setReceiverName(rName);  
    }
  }, [selectedChat, userList, userId]);  



  return (
    <Stack direction="row" sx={{ width: '100%' }}>
      <Chats onSelectChat={setSelectedChat} userId={userId} />
      <Box
        sx={{
          height: '100%',
          width: sidebar.open
            ? 'calc(100vw - 740px)'
            : 'calc(100vw - 420px)',
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#F0F4FA'
              : theme.palette.background.default,
        }}
      >
        <Conversation chat={selectedChat} receiverName={receiverName} />
      </Box>

      {sidebar.open && (() => {
        switch (sidebar.type) {
          case 'CONTACT':
            return <Contact chat={selectedChat} receiverName={receiverName} />;
          case 'STARRED':
            return <StarredMessages />;
          case 'SHARED':
            return <SharedMessages />;
          default:
            return null;
        }
      })()}
    </Stack>
  );
};

export default GeneralApp;