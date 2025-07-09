import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Stack, Avatar, Box, Divider, Button } from '@mui/material';
import { faker } from '@faker-js/faker';

const generateStudents = (num = 10) =>
  [...Array(num)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    profile: faker.image.avatar(),
    email: faker.internet.email(),
  }));

const InstructorStudents = () => {
  const { instructorId } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {

    const fetchedInstructor = {
      id: instructorId,
      name: faker.name.fullName(),
      location: faker.address.city(),
    };

    setInstructor(fetchedInstructor);
    setStudents(generateStudents(5));
  }, [instructorId]);

  return (
    <Container maxWidth="md">
      {instructor ? (
        <Stack spacing={3}>

          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>

          <Typography variant="h5">Students of {instructor.name}</Typography>
          <Typography variant="body2" color="text.secondary">Location: {instructor.location}</Typography>

          <Divider />

          <Stack spacing={2}>
            {students.map((student) => (
              <Box key={student.id} sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                <Avatar src={student.profile} alt={student.name} />
                <Stack spacing={0.5} sx={{ marginLeft: 2 }}>
                  <Typography variant="subtitle1">{student.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{student.email}</Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Stack>
      ) : (
        <Typography variant="h6">Loading instructor data...</Typography>
      )}
    </Container>
  );
};

export default InstructorStudents;

