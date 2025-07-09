import React, { useState, useEffect } from 'react';
import {
  Box, Avatar, Stack, Typography, Divider,
  Rating, Chip, Button, Container
} from '@mui/material';
import { MagnifyingGlass, MapPin } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import {
  Search, SearchIconWrapper, StyledInputBase,
} from '../../../components/Search';
import { useLocation } from 'react-router-dom';

const SchoolProfileStudentPage = () => {
  const theme = useTheme();
  const [instructors, setInstructors] = useState([]);
  const [schoolInfo, setSchool] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [connectedInstructor, setConnectedInstructor] = useState(null);

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

  useEffect(() => {
    const studentId = localStorage.getItem('userId');
    if (!studentId) return;

    fetch(`http://localhost:8080/api/users/${studentId}`)
      .then(res => res.json())
      .then(student => {
        if (student.assignedTo && (student.status === 'PENDING' || student.status === 'ACCEPTED')) {
          setConnectedInstructor(student.assignedTo);
        } else {
          setConnectedInstructor(null);
        }
      })
      .catch(err => console.error('Failed to fetch student data:', err));
  }, []);

  const handleConnect = async (instructorId) => {
    const studentId = localStorage.getItem('userId');

    try {
      const res = await fetch(`http://localhost:8080/api/users/${studentId}`);
      if (!res.ok) throw new Error('Failed to fetch student data');

      const student = await res.json();

      const updatePayload = {
        ...student,
        status: "PENDING",
        assignedTo: instructorId
      };

      const updateRes = await fetch(`http://localhost:8080/api/users/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload),
      });

      if (updateRes.ok) {
        setConnectedInstructor(instructorId);
      } else {
        console.error('Failed to send request');
      }
    } catch (err) {
      console.error('Error sending request:', err);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const uniqueLocations = ['All', ...new Set(instructors.map(i => i.location))];
  const filteredInstructors = selectedLocation === 'All'
    ? instructors
    : instructors.filter(ins => ins.location === selectedLocation);

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      py: 5
    }}>
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center">
          <Avatar src={school.img} alt={school.firstName} sx={{ width: 120, height: 120, boxShadow: 3 }} />
          <Typography variant="h4" color="text.primary">{school.firstName}</Typography>
          <Typography color="text.secondary">{school.description}</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <MapPin size={18} color={theme.palette.text.secondary} />
            <Typography>{school.location}</Typography>
            <Rating value={school.rating ?? 0} precision={0.1} readOnly size="small" />
            <Typography>{(school.rating ?? 0).toFixed(1)} / 5</Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 4, borderColor: theme.palette.divider }} />

        <Stack spacing={3}>
          <Typography variant="h5" color="text.primary">Instructors</Typography>

          <Search sx={{ border: `1px solid ${theme.palette.primary.main}` }}>
            <SearchIconWrapper><MagnifyingGlass color={theme.palette.primary.main} /></SearchIconWrapper>
            <StyledInputBase placeholder="Search instructors..." />
          </Search>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {uniqueLocations.map(loc => (
              <Chip
                key={loc}
                label={loc}
                onClick={() => setSelectedLocation(loc)}
                color={selectedLocation === loc ? 'primary' : 'default'}
                clickable
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>

          <Box>
            {filteredInstructors.map(ins => (
              <Box
                key={ins.userId}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: 2,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={ins.img} sx={{ width: 64, height: 64 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                      {ins.firstName} {ins.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ins.location}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Rating value={parseFloat(ins.rating)} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        {parseFloat(ins.rating).toFixed(1)} / 5
                      </Typography>
                    </Stack>
                    {connectedInstructor === ins.userId && (
                      <Typography variant="body2" color="success.main" mt={1}>
                        Request sent
                      </Typography>
                    )}
                  </Box>
                </Stack>

                {connectedInstructor === null && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleConnect(ins.userId)}
                    sx={{
                      borderRadius: 5,
                      px: 3,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    Send Request
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default SchoolProfileStudentPage;
