import React from 'react';
import { Box, Typography, Grid, Stack } from '@mui/material';
import { Car, Clock, ShieldCheck } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';

const Services = () => {
  const theme = useTheme();

  const services = [
    {
      icon: <Car size={35} color="white" />,
      title: 'Instructor Matching',
      description: 'Easily find and book experienced driving instructors based on your needs and location.',
    },
    {
      icon: <Clock size={35} color="white" />,
      title: 'Customizable Scheduling',
      description: 'By contacting your instructor, schedule your driving lessons at times that suit your availability.',
    },
    {
      icon: <ShieldCheck size={35} color="white" />,
      title: 'Comprehensive Safety Training',
      description: 'Our instructors prioritize safety, ensuring you are fully prepared for the road.',
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        py: 6,
        color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        Services
      </Typography>
      <Box
        sx={{
          width: 70,
          height: 4,
          backgroundColor: theme.palette.primary.main,
          borderRadius: 2,
          margin: '0 auto',
          mb: 4,
          marginBottom: "40px",
        }}
      />

      <Grid container spacing={4} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Stack spacing={2} alignItems="center"
              sx={{
                paddingBottom: "55px",
              }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main, // Using theme for icon background color
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {service.icon}
              </Box>
              <Typography variant="h6">{service.title}</Typography>
              <Typography variant="body2"
                sx={{ color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary }}>
                {service.description}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
