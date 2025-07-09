import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Container,
  Snackbar,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { SettingsContext } from "../../../contexts/SettingsContext";

const TOTAL_LESSONS = 10;

const InstructorProfilePage = () => {
  const instructorId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [studentsList, setStudentsList] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [instructorNotes, setNote] = useState("");
  const [completedLessons, setCompletedLessons] = useState([]);
  const [noteVisible, setNoteVisible] = useState(false);
  const { setNotes } = useContext(SettingsContext);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showMessage = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const users = await res.json();
        const assignedStudents = users.filter(
          (user) => user.role === "STUDENT" && user.assignedTo === instructorId
        );
        setStudentsList(assignedStudents);
      } catch (err) {
        showMessage("Error fetching students", "error");
      }
    };

    if (token) fetchStudents();
  }, [instructorId, token]);

  const handleSelectStudent = async (e) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);
    setNote("");
    setCompletedLessons([]);
    setNoteVisible(true);

    try {
      const res = await fetch(`http://localhost:8080/api/progress/${studentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch student progress");

      const data = await res.json();
      if (Array.isArray(data.completedLessons)) {
        setCompletedLessons(data.completedLessons);
      }
    } catch (error) {
      showMessage("Could not load student's progress", "warning");
    }
  };

  const handleLessonToggle = (lessonNumber) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonNumber)
        ? prev.filter((num) => num !== lessonNumber)
        : [...prev, lessonNumber]
    );
  };

  const handleSend = async () => {
    const student = studentsList.find((s) => s.userId === selectedStudentId);
    if (!student) return showMessage("Please select a valid student.", "warning");
    if (!instructorNotes.trim()) return showMessage("Please enter a note.", "warning");

    const progressValue = Math.round((completedLessons.length / TOTAL_LESSONS) * 100);

    try {
      const res = await fetch(`http://localhost:8080/api/progress/${student.userId}/note`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          note: instructorNotes,
          progress: progressValue,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to send note.");
      }

      const lessonRes = await fetch(`http://localhost:8080/api/progress/${student.userId}/lessons`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completedLessons,
        }),
      });

      if (!lessonRes.ok) {
        throw new Error("Failed to update completed lessons.");
      }

      const message = `To ${student.firstName} ${student.lastName}: ${instructorNotes}`;
      setNotes((prev) => [...prev, message]);

      setSelectedStudentId("");
      setNote("");
      setCompletedLessons([]);
      setNoteVisible(false);

      showMessage("Note and progress sent successfully!", "success");
    } catch (error) {
      showMessage("Failed to save note or lessons", "error");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#ffffff", py: 6 }}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 4, p: 4 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              ✉️ Send Message to Student
            </Typography>

            <TextField
              select
              label="Select Student"
              fullWidth
              size="large"
              value={selectedStudentId}
              onChange={handleSelectStudent}
              sx={{ mt: 3 }}
            >
              {studentsList.map((student) => (
                <MenuItem key={student.userId} value={student.userId}>
                  {student.firstName} {student.lastName}
                </MenuItem>
              ))}
            </TextField>

            {noteVisible && (
              <>
                <TextField
                  label="Write your instruction"
                  multiline
                  rows={6}
                  fullWidth
                  value={instructorNotes}
                  onChange={(e) => setNote(e.target.value)}
                  sx={{ mt: 4 }}
                />

                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                  Select Completed Lessons
                </Typography>

                <FormGroup row>
                  {Array.from({ length: TOTAL_LESSONS }, (_, i) => {
                    const lessonNumber = i + 1;
                    return (
                      <FormControlLabel
                        key={lessonNumber}
                        control={
                          <Checkbox
                            checked={completedLessons.includes(lessonNumber)}
                            onChange={() => handleLessonToggle(lessonNumber)}
                          />
                        }
                        label={`Lesson ${lessonNumber}`}
                      />
                    );
                  })}
                </FormGroup>

                <Typography variant="body1" sx={{ mt: 2 }}>
                  Progress: {Math.round((completedLessons.length / TOTAL_LESSONS) * 100)}%
                </Typography>

                <Box sx={{ mt: 3, textAlign: "right" }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSend}
                    disabled={!selectedStudentId || !instructorNotes.trim()}
                  >
                    Send
                  </Button>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InstructorProfilePage;