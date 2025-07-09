import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const handlejoin = () =>{
    navigate('/auth/register');
  };

  const headerContent = [{
    title: "Your road ready journey starts here.",
    paragraph: "At Road Ready, we connect you with driving schools and experienced instructors to ensure a safe and effective learning experience, from instructor selection to certification."
  }];
  const { title, paragraph } = headerContent[0];

  return (
    <Box
      sx={{
        height: '45vw',
        // margin: '10px auto',
        backgroundImage: `url('/header.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <Stack
        spacing="1.5vw"
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '6vw',
          maxWidth: { xs: '65%', sm: '45%', md: '50%' },
          animation: 'fadeIn 3s',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 500,
            color: 'white',
            fontSize: { xs: '22px', sm: 'max(4.5vw, 22px)' },
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: 'white',
            fontSize: { xs: '12px', sm: '1vw' },
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {paragraph}
        </Typography>

        <Button
         onClick={handlejoin}
          sx={{
            fontFamily: 'Raleway, sans-serif',
            textTransform: 'uppercase',
            color: theme.palette.common.white,
            backgroundColor: theme.palette.warning.main,
            backgroundImage: `linear-gradient(to right, ${theme.palette.warning.main}, ${theme.palette.warning.main})`,
            padding: { xs: theme.spacing(1, 2), sm: '14px 34px' },
            letterSpacing: '1px',
            fontSize: '15px',
            fontWeight: 500,
            borderRadius: '25px',
            transition: 'all 0.5s linear',
            border: 'none',
            width: 'fit-content',
            marginTop: theme.spacing(2),
          }}
        >
          Join us
        </Button>
      </Stack>


      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default Header;
