import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Users, Student } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const AdminProfile = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    totalInstructors: 0,
    totalStudents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const schoolId = localStorage.getItem("userId");

  useEffect(() => {
    if (!schoolId) {
      setError("No school ID found. You must be logged in as a school admin.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [instructorsRes, studentsRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/users/role/INSTRUCTOR`),
          axios.get(`http://localhost:8080/api/users/role/STUDENT`),
        ]);

        const allInstructors = instructorsRes.data || [];
        const allStudents = studentsRes.data || [];

        const instructors = allInstructors.filter(
          (instructor) => String(instructor.assignedTo) === String(schoolId)
        );

        const instructorIds = instructors.map(
          (instructor) => String(instructor.userId || instructor.id)
        );

        const students = allStudents.filter(
          (student) => instructorIds.includes(String(student.assignedTo))
        );

        setStats({
          totalInstructors: instructors.length,
          totalStudents: students.length,
        });
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setStats({ totalInstructors: 0, totalStudents: 0 });
          setError(null);
        } else {
          setError("Failed to load user statistics.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [schoolId]);

  const adminStats = [
    { label: "Total Instructors", value: stats.totalInstructors, icon: <Users size={28} /> },
    { label: "Total Students", value: stats.totalStudents, icon: <Student size={28} /> },
  ];

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
          minHeight: "400px",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="bold">
            📊 School Statistics
          </Typography>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="150px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={3}>
            {adminStats.map(({ label, value, icon }, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card sx={{ borderRadius: 3, boxShadow: 2, textAlign: "center" }}>
                  <CardContent>
                    <Box display="flex" justifyContent="center" mb={1} color={theme.palette.primary.main}>
                      {icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold">{value}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Divider sx={{ my: 4 }} />
      </Box>
    </Stack>
  );
};

export default AdminProfile;
