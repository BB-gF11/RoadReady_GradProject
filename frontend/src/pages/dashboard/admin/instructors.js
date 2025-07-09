import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Divider,
  Avatar,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  CircularProgress,
} from '@mui/material';
import {
  MapPin,
  Eye,
  PencilSimple,
  TrashSimple,
} from 'phosphor-react';
import { useTheme } from '@mui/material/styles';

const InstructorsPage = () => {
  const theme = useTheme();
  const [users, setUsers] = useState({ instructors: [], students: [] }); // Initializing with empty arrays
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [instructorToDelete, setInstructorToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editInstructor, setEditInstructor] = useState(null);
  const [saving, setSaving] = useState(false);

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewInstructor, setViewInstructor] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState([]); // New state to store assigned students

  const schoolId = localStorage.getItem('userId');

  useEffect(() => {
    if (!schoolId) return;
    fetch('http://localhost:8080/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => {
        const instructors = data.filter(
          (user) => user.role === 'INSTRUCTOR' && user.assignedTo === schoolId
        );
        const students = data.filter(
          (user) => user.role === 'STUDENT' && user.assignedTo === schoolId
        );

        setUsers({ instructors, students });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [schoolId]);

  const filteredInstructors = (users && users.instructors) ? (
    selectedLocation === 'All'
      ? users.instructors
      : users.instructors.filter((ins) => ins.location === selectedLocation)
  ) : [];

  const uniqueLocations = users.instructors ? ['All', ...new Set(users.instructors.map((i) => i.location))] : [];

  const handleDeleteConfirm = () => {
    fetch(`http://localhost:8080/api/users/${instructorToDelete.userId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete instructor');
        setUsers((prev) => ({
          ...prev,
          instructors: prev.instructors.filter((ins) => ins.userId !== instructorToDelete.userId),
        }));
        setDeleteDialogOpen(false);
        setInstructorToDelete(null);
      })
      .catch((err) => alert(err.message));
  };

  const handleEditOpen = (instructor) => {
    setEditInstructor(instructor);
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    setEditInstructor({
      ...editInstructor,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSave = () => {
    const { firstName, lastName, location, rating } = editInstructor;
    if (!firstName || !lastName || !location || !rating) {
      alert('Please fill all required fields.');
      return;
    }

    setSaving(true);
    fetch(`http://localhost:8080/api/users/${editInstructor.userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        location,
        rating,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update instructor.');
        return res.text();
      })
      .then(() => {
        setUsers((prev) => ({
          ...prev,
          instructors: prev.instructors.map((ins) =>
            ins.userId === editInstructor.userId ? editInstructor : ins
          ),
        }));
        setSaving(false);
        setEditDialogOpen(false);
        setEditInstructor(null);
      })
      .catch((err) => {
        alert(err.message);
        setSaving(false);
      });
  };

  const handleViewOpen = (instructor) => {
    setViewInstructor(instructor);

    const studentsAssignedToInstructor = users.students.filter(
      (student) => student.assignedTo === instructor.userId
    );

    setAssignedStudents(studentsAssignedToInstructor);
    setViewDialogOpen(true);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: theme.palette.background.default, py: 5 }}>
      <Container maxWidth="md">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Instructors</Typography>
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', mb: 2 }}>
          {uniqueLocations.map((loc) => (
            <Button
              key={loc}
              variant={selectedLocation === loc ? 'contained' : 'outlined'}
              onClick={() => setSelectedLocation(loc)}
            >
              {loc}
            </Button>
          ))}
        </Stack>

        <Stack spacing={3}>
          <Box sx={{ overflowY: 'auto', maxHeight: '60vh', pr: 1 }}>
            {filteredInstructors.map((ins) => (
              <Box
                key={ins.userId}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: 1,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={2}>
                    <Avatar src={ins.profile} alt={ins.firstName} />
                    <Stack>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {ins.firstName} {ins.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        <MapPin size={14} /> {ins.location}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Rating: {ins.rating || 'N/A'}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEditOpen(ins)} aria-label="Edit Instructor">
                      <PencilSimple />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setInstructorToDelete(ins);
                        setDeleteDialogOpen(true);
                      }}
                      aria-label="Delete Instructor"
                    >
                      <TrashSimple />
                    </IconButton>
                    <IconButton onClick={() => handleViewOpen(ins)} aria-label="View Instructor">
                      <Eye />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>

      <Dialog open={deleteDialogOpen && instructorToDelete !== null} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete instructor{' '}
            <strong>{instructorToDelete?.firstName} {instructorToDelete?.lastName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Instructor Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Instructor</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="First Name"
              name="firstName"
              value={editInstructor?.firstName || ''}
              onChange={handleEditChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={editInstructor?.lastName || ''}
              onChange={handleEditChange}
              fullWidth
              required
            />
            <TextField
              label="Location"
              name="location"
              value={editInstructor?.location || ''}
              onChange={handleEditChange}
              fullWidth
              required
            />
            <TextField
              label="Rating"
              name="rating"
              type="number"
              value={editInstructor?.rating || ''}
              onChange={handleEditChange}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleEditSave} disabled={saving} variant="contained">
            {saving ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={viewDialogOpen && viewInstructor !== null}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Instructor Details</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">
              {viewInstructor?.firstName} {viewInstructor?.lastName}
            </Typography>
            <Typography variant="body1">Location: {viewInstructor?.location}</Typography>
            <Typography variant="body1">Rating: {viewInstructor?.rating || 'N/A'}</Typography>
            <Typography variant="body2" color="text.secondary">
              Profile Picture: {viewInstructor?.profile}
            </Typography>

            {/* List of Assigned Students */}
            <Typography variant="h6" sx={{ mt: 2 }}>Assigned Students:</Typography>
            {assignedStudents.length === 0 ? (
              <Typography variant="body2">No students assigned.</Typography>
            ) : (
              <ul>
                {assignedStudents.map((student) => (
                  <li key={student.userId}>
                    {student.firstName} {student.lastName}
                  </li>
                ))}
              </ul>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)} variant="contained">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InstructorsPage;
