import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider
} from '@mui/material';

const Student = () => {
  const instructorId = localStorage.getItem('userId');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedStudents, setAcceptedStudents] = useState([]);

  useEffect(() => {
    if (!instructorId) return;

    const fetchStudents = async () => {
      try {
        const resPending = await fetch(`http://localhost:8080/api/users/instructors/${instructorId}/requests`);
        if (!resPending.ok) throw new Error('Failed to fetch pending requests');
        const pending = await resPending.json();
        setPendingRequests(pending);

        const resAllStudents = await fetch('http://localhost:8080/api/users/role/STUDENT');
        if (!resAllStudents.ok) throw new Error('Failed to fetch students');
        const allStudents = await resAllStudents.json();

        const accepted = allStudents.filter(
          student => student.assignedTo === instructorId && student.status === 'ACCEPTED'
        );
        setAcceptedStudents(accepted);

      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };

    fetchStudents();
  }, [instructorId]);

  const handleAccept = async (student) => {
    const updatePayload = {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.emailAddress,
      phoneNumber: student.phoneNumber || '',
      location: student.location || '',
      description: student.description || '',
      status: 'ACCEPTED',
      assignedTo: instructorId
    };

    try {
      const res = await fetch(`http://localhost:8080/api/users/${student.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload),
      });

      if (res.ok) {
        setPendingRequests(prev => prev.filter(s => s.userId !== student.userId));
        setAcceptedStudents(prev => [...prev, { ...student, status: 'ACCEPTED', assignedTo: instructorId }]);
      } else {
        console.error('Failed to accept student');
      }
    } catch (error) {
      console.error('Error in handleAccept:', error);
    }
  };

  const handleReject = async (student) => {
    const updatePayload = {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.emailAddress,
      phoneNumber: student.phoneNumber || '',
      location: student.location || '',
      description: student.description || '',
      status: 'NONE',
      assignedTo: null
    };

    try {
      const res = await fetch(`http://localhost:8080/api/users/${student.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload),
      });

      if (res.ok) {
        setPendingRequests(prev => prev.filter(s => s.userId !== student.userId));
      } else {
        console.error('Failed to reject student');
      }
    } catch (error) {
      console.error('Error in handleReject:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">🎓 Student Management</Typography>

      <Typography variant="h6" sx={{ mt: 4 }}>⏳ Pending Requests</Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {pendingRequests.length === 0 ? (
          <Typography sx={{ lineHeight: 5.5, fontSize: '1rem', fontWeight: 400, marginLeft: '69px', color: 'slategray' }}>
            No pending requests.
          </Typography>
        ) : pendingRequests.map(student => (
          <Card key={student.userId} sx={{ width: 'calc(50% - 16px)',
            width: "max-content",
            paddingRight: '85px', 
            height: '136px'
           }}>
            <CardContent>
              <Typography>{student.firstName} {student.lastName}</Typography>
              <Typography color="text.secondary">{student.emailAddress}</Typography>
              <Button sx={{ mt: 2, mr: 1 }} onClick={() => handleAccept(student)} variant="contained">
                Accept
              </Button>
              <Button sx={{ mt: 2 }} onClick={() => handleReject(student)} variant="outlined" color="error">
                Reject
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6">✅ Accepted Students</Typography>
      <Box>
        {acceptedStudents.length === 0 ? (
          <Typography sx={{ lineHeight: 5.5, fontSize: '1rem', fontWeight: 400, marginLeft: '69px', color: 'slategray' }}>
            No students accepted yet.
          </Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {acceptedStudents.map(student => (
              <Card key={student.userId}>
                <CardContent>
                  <Typography>{student.firstName} {student.lastName}</Typography>
                  <Typography color="text.secondary">{student.emailAddress}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Student;
