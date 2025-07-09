import React, { useState } from 'react';
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { Gear } from "phosphor-react";
import useSettings from '../../hooks/useSettings';
import { faker } from '@faker-js/faker';
import AntSwitch from '../../components/AntSwitch';
import Logo from '../../assets/Images/logo.ico';
import { useNavigate } from 'react-router-dom';
import { sidebarConfig } from '../../config/sidebarConfig';


const getPath = (index) => {
  switch (index) {
    case 4:
      return '/settings';
    default:
      return '/';
  }
};

const SideBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const role = localStorage.getItem("userRole") || "STUDENT";
  const navButtons = sidebarConfig[role] || sidebarConfig["STUDENT"];

  const handleLogout = () => {

    localStorage.clear();
    navigate('/auth/login');
  };

  return (
    <Box p={2} sx={{
      backgroundColor: theme.palette.background.paper,
      boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      height: "100vh", width: 100, display: "flex"
    }}>
      <Stack direction="column" alignItems="center" justifyContent="space-between"
        sx={{ width: "100%", height: "100%" }} spacing={3}>


        <Stack alignItems="center" spacing={4}>
          <Box sx={{ backgroundColor: "white", height: 64, width: 64, borderRadius: 1.5 }}>
            <img src={Logo} alt="Logo icon" />
          </Box>


          <Stack sx={{ width: "max-content" }} direction="column" alignItems="center" spacing={3}>
            {navButtons.map((el) => (
              el.index === selected ? (
                <Box key={el.index} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                  <IconButton sx={{ color: "#fff" }}>{el.icon}</IconButton>
                </Box>
              ) : (
                <IconButton
                  key={el.index}
                  onClick={() => {
                    setSelected(el.index);
                    navigate(el.path);
                  }}
                  sx={{
                    color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary
                  }}
                >
                  {el.icon}
                </IconButton>
              )
            ))}
            <Divider sx={{ width: "48px" }} />
            <IconButton
              onClick={() => {
                setSelected(4);
                navigate(getPath(4));
              }}
              sx={{ color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary }}
            >
              <Gear />
            </IconButton>
          </Stack>
        </Stack>


        <Stack spacing={4}>
          <AntSwitch onChange={onToggleMode} defaultChecked />
          <Avatar
            id='basic-button'
            sx={{ cursor: 'pointer' }}
            src={faker.image.avatar()}
            onClick={handleClick}
          />
          
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Stack spacing={1} px={1}>
              <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                <span>Profile</span>
              </MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>
                <span>Settings</span>
              </MenuItem>
              <MenuItem onClick={() => { handleClose(); handleLogout(); }}>
                <span>Logout</span>
              </MenuItem>
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;

