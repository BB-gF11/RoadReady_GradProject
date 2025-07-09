import React from "react";
import {
  Paper,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AboutImage from "../../assets/Images/About/About.png";
import { Check } from "phosphor-react";


const aboutData = {
  paragraph:
    "At Road Ready, we believe that every journey should start the right way, and our mission is to provide everything our users need to ensure a smooth learning experience for trainees and a unique and supportive environment for schools and trainers.",
  Why: [
    "Innovative Training Solutions – A personalized platform designed to enhance the learning experience and guide trainees on a structured, nearly error-free journey.",
    "Premium Training Services – Exclusive features and tools to ensure trainees are fully prepared for the road. ",
  ],
  Why2: [
    "Seamless Learning Process – Tailored solutions to meet the unique needs of both instructors and trainees.",
    "Comprehensive Support – Personalized assistance to make your training journey smooth, efficient, and effective.",
  ],
};

function About() {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        maxWidth: "100%",
        margin: "auto",
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>

        <Box
          component="img"
          src={AboutImage}
          alt="About"
          sx={{
            width: { xs: "100%", md: "50%" },
            height: "auto",
            borderRadius: 2,
            objectFit: "cover",
          }}
        />
        <Stack spacing={2} sx={{ flex: 1 }}>
          <Box>
            <Typography variant="h4" fontWeight={700}>
              About Us
            </Typography>
            <Box
              sx={{
                height: "4px",
                width: "110px",
                backgroundColor: theme.palette.primary.main,
                mt: 1,
                borderRadius: 2,
              }}
            />
          </Box>
          <Typography variant="body1" sx={{ color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary }}>
            {aboutData.paragraph}
          </Typography>
          <Divider />
          <Typography variant="h6" fontWeight={600}>
            Why Choose Us?
          </Typography>
          <List>
            {[...aboutData.Why, ...aboutData.Why2].map((item, index) => (
              <ListItem key={index} alignItems="flex-start" disableGutters>
                <ListItemIcon sx={{ minWidth: "30px", mt: "5px" }}>
                  <Check size={24} weight="fill" color={theme.palette.primary.main} />
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    variant: "body1",
                    sx: { fontSize: "1rem", color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default About;