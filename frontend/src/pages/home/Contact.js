import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";

const randomId = "  ";
const randomName = "  ";
const randomEmail = "  ";
const randomPhone = "  ";

const initialState = {
  name: randomName,
  email: randomEmail,
  message: "",
};

export const Contact = () => {
  const theme = useTheme();
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const contactData = {
    address: "📍Amman - Jerash Road, Amman, Jordan",
    phone: "+1 123 456 1234",
    email: "info@roadready.com",
  };

  return (
    <Box sx={{ padding: theme.spacing(4), backgroundColor: theme.palette.background.paper, minHeight: "100vh" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: theme.spacing(4), boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: theme.spacing(2) }}>
              Get In Touch
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: theme.spacing(3) }}>
              Please fill out the form below and we’ll get back to you.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={name}
                  onChange={handleChange}
                  required
                  sx={{
                    marginBottom: theme.spacing(2),
                    "& .MuiInputBase-root": {
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                  sx={{
                    marginBottom: theme.spacing(2),
                    "& .MuiInputBase-root": {
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  name="message"
                  value={message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                  sx={{
                    marginBottom: theme.spacing(2),
                    "& .MuiInputBase-root": {
                      backgroundColor: theme.palette.background.default,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                    "&:hover": { backgroundColor: theme.palette.primary.dark },
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: theme.spacing(4), boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: theme.spacing(2) }}>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: theme.spacing(1) }}>
              <strong>Address: </strong>
              {contactData.address}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: theme.spacing(1) }}>
              <strong>Phone: </strong>
              {contactData.phone}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: theme.spacing(1) }}>
              <strong>Email: </strong>
              {contactData.email}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
