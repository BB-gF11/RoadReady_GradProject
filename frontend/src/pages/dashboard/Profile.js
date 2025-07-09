import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Grid,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { PencilSimple } from "phosphor-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [instructorName, setInstructorName] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!userId || !token) {
      setError("Missing login credentials. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to load user profile");

      const data = await res.json();

      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        username: data.username || "",
        email: data.emailAddress || "",
        phone: data.phoneNumber || "",
        location: data.location || "",
        description: data.description || "",
      });

      if (role === "student") {
        if (data.assignedTo) {
          const instructorRes = await fetch(
            `http://localhost:8080/api/users/${data.assignedTo}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (instructorRes.ok) {
            const instructorData = await instructorRes.json();
            setInstructorName(`${instructorData.firstName} ${instructorData.lastName}`);
          }
        } else {
          setInstructorName("NO_INSTRUCTOR");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    setSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          emailAddress: formData.email,
          phoneNumber: formData.phone,
        }),
      });

      if (!res.ok) throw new Error("Failed to save changes");

      setSuccessMessage("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        Profile
      </Typography>

      {(error || successMessage) && (
        <Alert
          severity={error ? "error" : "success"}
          onClose={() => {
            setError("");
            setSuccessMessage("");
          }}
          sx={{ mb: 2 }}
        >
          {error || successMessage}
        </Alert>
      )}

      {instructorName === "NO_INSTRUCTOR" && (
        <Alert
          severity="warning"
          action={
            <Button color="inherit" size="small" onClick={() => navigate("/display/AllSchoolsStudent")}></Button>
          }
        >
        </Alert>
      )}

      {instructorName && instructorName !== "NO_INSTRUCTOR" && (
        <Alert severity="info">: {instructorName}</Alert>
      )}

      <Card elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src=".\src\assets\Images\img_avatar.png"
              alt={formData.firstName + formData.lastName}
              sx={{ width: 80, height: 80, border: "3px solid gold" }}
            />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {formData.firstName} {formData.lastName}
              </Typography>
              <Typography color="text.secondary">@{formData.username}</Typography>
            </Box>
          </Box>
          <IconButton onClick={() => setIsEditing((prev) => !prev)}>
            <PencilSimple size={24} />
          </IconButton>
        </Box>

        <CardContent>
          <Grid container spacing={2} mt={1}>
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Username", name: "username" },
              { label: "Email Address", name: "email" },
              { label: "Phone Number", name: "phone" },
              { label: "Location", name: "location" },
            ].map((field) => (
              <Grid item xs={12} md={6} key={field.name}>
                <TextField
                  label={field.label}
                  fullWidth
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
          </Grid>

          {isEditing && (
            <Button
              variant="contained"
              sx={{ mt: 3, float: "right" }}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
