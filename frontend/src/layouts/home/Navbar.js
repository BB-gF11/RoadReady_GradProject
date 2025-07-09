import React, { useState } from 'react';
import { Box, IconButton, Stack, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Nav_Menu } from '../../data';
import Logo from '../../assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onNavClick }) => {
  const theme = useTheme();
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  
  return (
    <Box p={2} sx={{
      backgroundColor: theme.palette.background.paper,
      boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: 'pointer'
    }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box sx={{
          backgroundColor: "white",
          maxWidth: "100%",
          height: 40,
          width: 40,
          borderRadius: 1.5
        }}
        onClick={() => onNavClick(-1)} 
        >
          <img src={Logo} alt={'Logo icon'} style={{ maxWidth: '300%' }} />
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        {Nav_Menu.map((el) => (
          <IconButton
            key={el.index}
            onClick={() => {
              setSelected(el.index);
              onNavClick(el.index);
            }}
            sx={{
              color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary,
              fontSize: '18px',
              borderBottom: selected === el.index ? `2px solid ${theme.palette.primary.main}` : 'none',
              borderRadius: 0,
            }}
          >
            {el.title}
          </IconButton>
        ))}
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <Button  variant="outlined"  onClick={() => navigate('/login')}>Sign In</Button>
        <Button  variant="contained" onClick={() => navigate('/login')}>Sign Up</Button>
      </Stack>
    </Box>
  );
};

export default Navbar;
