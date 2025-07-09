import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Stack,
  Avatar,
  CircularProgress,
  Alert,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Avatar logic based on role
const getAvatarUrl = (role) => {
  switch (role) {
    case "STUDENT":
      return "https://i.pravatar.cc/150?img=10";
    case "INSTRUCTOR":
      return "https://i.pravatar.cc/150?img=11";
    case "SCHOOL":
      return "https://i.pravatar.cc/150?img=12";
    default:
      return "https://i.pravatar.cc/150";
  }
};

const ProfileForm = ({ isEditing }) => {
  const theme = useTheme();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // New password handling
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fetchProfile = async () => {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    if (!userId || !userRole || !token) {
      setError("Missing authentication data. Please log in again.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);

      const user = await res.json();
      setProfile({
        ...user,
        email: user.emailAddress || "",
        phone: user.phoneNumber || "",
        avatar: getAvatarUrl(userRole),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProfile();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchProfile();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!profile) return;

    if (newPassword && newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setSaving(true);
    const token = localStorage.getItem("token");

    try {
      const updatedProfile = {
        ...profile,
        emailAddress: profile.email,
        phoneNumber: profile.phone,
        password: newPassword || profile.password || null, // keep or update
      };

      const res = await fetch(`http://localhost:8080/api/users/${profile.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!res.ok) throw new Error(`Failed to update profile: ${res.status}`);

      alert("Profile updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (error) {
    return (
      <Stack alignItems="center" mt={4}>
        <Alert severity="error">{error}</Alert>
      </Stack>
    );
  }

  if (!profile) {
    return (
      <Stack alignItems="center" mt={4}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Grid container spacing={3} sx={{ height: "100vh", p: 3 }}>
      <Grid item xs={12} md={4}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Avatar
            src={profile.avatar}
            sx={{
              width: 100,
              height: 100,
              border: `3px solid ${theme.palette.primary.main}`,
              mb: 2,
            }}
          />
          <Typography variant="h6" fontWeight="bold">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{profile.username}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={profile.firstName || ""}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={profile.lastName || ""}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                name="username"
                value={profile.username || ""}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address"
                name="email"
                value={profile.email || ""}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phone"
                value={profile.phone || ""}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Location"
                name="location"
                value={profile.location || ""}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={profile.description || ""}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                disabled={!isEditing}
              />
            </Grid>

            {isEditing && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </>
            )}
          </Grid>

          {isEditing && (
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              disabled={saving}
              sx={{ mt: 3, float: "right" }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfileForm;
