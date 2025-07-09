import React, { useState, useEffect } from 'react';
import {
  Box, IconButton, Stack, Typography, Divider,
  Avatar, Rating, Chip, Button, Container, Snackbar, Alert
} from '@mui/material';
import { MagnifyingGlass, List, MapPin } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import {
  Search, SearchIconWrapper, StyledInputBase,
} from '../../components/Search';
import { useLocation, useNavigate } from 'react-router-dom';

const SchoolProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Use useNavigate here
  const [Instructors, setInstructors] = useState([]);
  const [schoolInfo, setSchool] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('info');
  const location = useLocation();
  const schoolId = location.state?.school.userId;
  const school = schoolInfo;

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${schoolId}`)
      .then(res => res.json())
      .then(setSchool)
      .catch(err => setError(err.message));
  }, [schoolId]);

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(user => user.role === 'INSTRUCTOR' && user.assignedTo === `${schoolId}`);
        setInstructors(filtered);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [schoolId]);

  const handleConnect = async (instructorId) => {
    const studentId = localStorage.getItem('userId');
    if (!studentId) {
      setSnackbarMessage('Please login as a student');
      setSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/users/${studentId}`);
      const student = await res.json();
      student.assignedTo = `PENDING-${instructorId}`;

      const updateRes = await fetch(`http://localhost:8080/api/users/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });

      if (updateRes.ok) {
        setSnackbarMessage('Request sent successfully!');
        setSeverity('success');
      } else {
        setSnackbarMessage('Failed to send request');
        setSeverity('error');
      }
      setOpenSnackbar(true);
    } catch (err) {
      console.error(err);
      setSnackbarMessage('Error sending request');
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const uniqueLocations = ['All', ...new Set(Instructors.map(i => i.location))];
  const filteredInstructors = selectedLocation === 'All'
    ? Instructors
    : Instructors.filter(ins => ins.location === selectedLocation);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: theme.palette.background.default, py: 5 }}>
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center">
          <Avatar src={school.img} alt={school.firstName} sx={{ width: 120, height: 120, boxShadow: 3 }} />
          <Typography variant="h4">{school.firstName}</Typography>
          <Typography color="text.secondary">{school.description}</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <MapPin size={18} />
            <Typography>{school.location}</Typography>
            <Rating value={school.rating ?? 0} precision={0.1} readOnly size="small" />
            <Typography>{(school.rating ?? 0).toFixed(1)} / 5</Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Stack spacing={3}>
          <Typography variant="h5">Instructors</Typography>
          <Search>
            <SearchIconWrapper><MagnifyingGlass color="#709CE6" /></SearchIconWrapper>
            <StyledInputBase placeholder="Search instructors..." />
          </Search>
          <Stack direction="row" spacing={1}>
            {uniqueLocations.map(loc => (
              <Chip
                key={loc}
                label={loc}
                onClick={() => setSelectedLocation(loc)}
                color={selectedLocation === loc ? 'primary' : 'default'}
                clickable
              />
            ))}
          </Stack>

          <Box>
            {filteredInstructors.map(ins => (
              <Box key={ins.id} sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1 }}>
                <Stack direction="row" spacing={2}>
                  <Avatar src={ins.img} />
                  <Stack>
                    <Typography>{ins.firstName} {ins.lastName}</Typography>
                    <Rating value={parseFloat(ins.rating)} readOnly size="small" />
                    <Button onClick={() => handleConnect(ins.id)}>Connect</Button>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity={severity}
          sx={{ width: '100%' }}
          action={
            severity === 'warning' && (
              <Button color="inherit" size="small" onClick={handleLoginRedirect}>
                Login
              </Button>
            )
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SchoolProfilePage;
