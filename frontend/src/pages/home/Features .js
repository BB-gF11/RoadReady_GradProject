import React from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import { Fire, Exam, BookOpen, MagnifyingGlass } from "phosphor-react";
import { useTheme } from "@mui/material/styles";

const Features = () => {
  const theme = useTheme();


  const FeaturesContent = [
    {
      icon: <MagnifyingGlass size={35} color="white" />,
      name: "Find Your Trainer",
      text: "Easily choose a qualified driving instructor that fits your needs.",
    },
    {
      icon: <Exam size={32} color="white" />,
      name: "Theory Exam Preparation",
      text: "Practice with our theory tests to be ready to pass the theory exam.",
    },
    {
      icon: <BookOpen size={32} color="white" />,
      name: "Flexible Learning Options",
      text: "Choose the most suitable lesson times at your convenience, based on the availability of your selected trainer.",
    },
    {
      icon: <Fire size={32} color="white" />,
      name: "Progress Tracking",
      text: "Monitor your learning journey and improve step by step.",
    },
  ];

  return (
    <Box
      id="features"
      textAlign="center"
      py={10}
      sx={{
        background: "fixed",
        width: "auto",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          color="white"
          sx={{ marginBottom: 6 }}
        >
          Features
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {FeaturesContent.length > 0 ? (
            FeaturesContent.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={`${item.name}-${index}`}>
                <Stack spacing={1} alignItems="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: "linear-gradient(to right, #f1c40f 0%, #f1c40f 100%)",
                      boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.05)",
                      mb: 2,
                      transition: "all 0.5s",
                      marginBottom: "20px",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" color="white">{item.name}</Typography>
                  <Typography variant="body2" color="white">{item.text}</Typography>
                </Stack>
              </Grid>
            ))
          ) : (
            <Typography color="white">Loading...</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
