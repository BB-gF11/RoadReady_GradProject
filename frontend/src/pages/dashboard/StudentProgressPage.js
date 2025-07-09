import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Warning, CheckCircle, CaretDown } from 'phosphor-react';

const lessons = [
  { id: 1, label: 'Driving Lesson 1' },
  { id: 2, label: 'Driving Lesson 2' },
  { id: 3, label: 'Driving Lesson 3' },
  { id: 4, label: 'Driving Lesson 4' },
  { id: 5, label: 'Driving Lesson 5' },
];

const StudentProgressPage = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem('token');
  const [notes, setNotes] = useState([]);
  const [exams, setExams] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progress, setProgress] = useState(0); // ← جديد

  useEffect(() => {
    if (!userId || !token) return;

    const fetchProgress = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/progress/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) throw new Error('Failed to fetch progress');

        const data = await res.json();
        setNotes(data.instructorNotes || []);
        setCompletedLessons(data.completedLessons || []);
        setProgress(data.progress || 0); // ← جديد
      } catch (err) {
        console.error("Failed to load progress:", err);
      }
    };

    const fetchExamSummary = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/progress/summary?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!res.ok) throw new Error('Failed to fetch exam summary');

        const data = await res.json();
        setExams(data.exams || []);
      } catch (err) {
        console.error("Failed to load exam summary:", err);
      }
    };

    fetchProgress();
    fetchExamSummary();
  }, [userId, token]);

  const handleLessonToggle = async (lessonId, checked) => {
    let updatedLessons;
    if (checked) {
      updatedLessons = [...completedLessons, lessonId];
    } else {
      updatedLessons = completedLessons.filter(id => id !== lessonId);
    }

    setCompletedLessons(updatedLessons);

    try {
      const res = await fetch(`http://localhost:8080/api/progress/${userId}/lessons`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completedLessons: updatedLessons }),
      });

      if (!res.ok) throw new Error("Failed to update lessons");

      const updated = await res.json();
      setProgress(updated.progress || 0); // ← جلب القيمة الجديدة من الخادم
    } catch (err) {
      console.error("Error updating lessons:", err);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: '100vh', width: '95%' }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        🛣️ Student Progress
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Driving Lessons
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: 12, borderRadius: 6, mt: 2 }}
                color={
                  progress >= 70
                    ? "success"
                    : progress >= 40
                      ? "warning"
                      : "error"
                }
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {progress}% completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📝 Instructor Notes
              </Typography>
              <List>
                {notes.map((note, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Warning size={20} color="orange" />
                    </ListItemIcon>
                    <ListItemText primary={note} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📘 Theory Exams
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exams.map((exam, index) => (
                    <TableRow key={index}>
                      <TableCell>{exam.date}</TableCell>
                      <TableCell>{exam.score}%</TableCell>
                      <TableCell sx={{ color: exam.score >= 70 ? "green" : "red" }}>
                        {exam.score >= 70 ? (
                          <>
                            Passed{" "}
                            <CheckCircle size={18} style={{ verticalAlign: "middle", marginLeft: 4 }} />
                          </>
                        ) : (
                          <>Failed ❌</>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentProgressPage;
