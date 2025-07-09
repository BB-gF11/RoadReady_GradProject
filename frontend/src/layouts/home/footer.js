import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  List,
  ListItem,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Phone,
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  Envelope,
} from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import Logo from '../../assets/Images/logo.png';
import { Nav_Menu } from '../../data';

function Footer({ onNavClick }) {
  const theme = useTheme();
  const [selected, setSelected] = useState(null);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: 4,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 4, md: 6 }}
        alignItems="flex-start"
      >

        <Stack spacing={2} flex={1}>
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{
              width: 95,
              height: 40,
              objectFit: 'contain',
              borderRadius: 1.5,
              cursor: 'pointer'
            }}
            onClick={() => onNavClick(-1)} 
          />
          <Typography variant="body2">
            Learn to drive with confidence.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              color="primary"
            >
              <FacebookLogo size={24} weight="fill" />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              color="primary"
            >
              <InstagramLogo size={24} weight="fill" />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
              color="primary"
            >
              <TwitterLogo size={24} weight="fill" />
            </IconButton>
          </Box>
        </Stack>

        <Stack spacing={2} flex={1}>
          <Typography variant="h6" fontWeight={700}>
            Company
          </Typography>
          <Stack direction="column" spacing={1}>
            {Nav_Menu.map((el) => (
              <Typography
                key={el.index}
                variant="body2"
                onClick={() => {
                  setSelected(el.index);
                  onNavClick(el.index);
                }}
                sx={{
                  cursor: 'pointer',
                  py: 0.5,
                  color:
                    selected === el.index
                      ? theme.palette.primary.main
                      : theme.palette.mode === 'light'
                        ? '#000'
                        : theme.palette.text.primary,
                  transition: 'color 0.3s',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {el.title}
              </Typography>
            ))}
          </Stack>
        </Stack>

        {/* Contact */}
        <Stack spacing={2} flex={1}>
          <Typography variant="h6" fontWeight={700}>
            Get in Touch
          </Typography>
          <List disablePadding>
            <ListItem disableGutters>
              <Phone size={20} color={theme.palette.text.primary} />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                +15993248-55125
              </Typography>
            </ListItem>
            <ListItem disableGutters>
              <Envelope size={20} color={theme.palette.text.primary} />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                RoadReady@mklnb.com
              </Typography>
            </ListItem>
          </List>
        </Stack>
      </Stack>

      <Divider sx={{ marginY: 2 }} />

      <Typography variant="body2" align="center" color="text.secondary">
        © 2025 RoadReady.com - All Rights Reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
