import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Divider,
  Avatar,
  Rating,
  Chip,
  Button,
} from '@mui/material';
import { MagnifyingGlass } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '../../components/Search';
import { useNavigate } from 'react-router-dom';

const AllSchools = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = React.useState('All');
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const uniqueLocations = ['All', ...new Set(schools.map((s) => s.location))];

  useEffect(() => {
    fetch("http://localhost:8080/api/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const schools = data.filter(user => user.role === "SCHOOL");
        setSchools(schools);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [token]);

  const filteredSchools =
    selectedLocation === 'All'
      ? schools
      : schools.filter((school) => school.location === selectedLocation);

  return (
    <Box
      sx={{
        position: 'relative',
        width: "100%",
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#F8FAFF'
            : theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: '100vh' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">All Schools</Typography>
        </Stack>
        <Stack sx={{ width: '95%' }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search schools..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto' }}>
          {uniqueLocations.map((loc) => (
            <Chip
              key={loc}
              label={loc}
              onClick={() => setSelectedLocation(loc)}
              color={selectedLocation === loc ? 'primary' : 'default'}
              clickable
              sx={{ borderRadius: '16px', fontWeight: 500 }}
            />
          ))}
        </Stack>
        <Divider />
        <Box
          className="scrollbar"
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            height: '100%',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 2,
            p: 2,
          }}
        >
          {filteredSchools.map((school) => (
            <Box
              key={school.schoolId}
              sx={{
                width: '100%',
                height: 150,
                p: 1.5,
                borderRadius: 2,
                backgroundColor:
                  theme.palette.mode === 'light'
                    ? '#fff'
                    : theme.palette.background.default,
                boxShadow:
                  theme.palette.mode === 'light'
                    ? '0 1px 3px rgba(0,0,0,0.1)'
                    : '0 0 1px rgba(255,255,255,0.1)',
                display: 'flex',
                gap: 2,
                alignItems: 'center',
              }}
            >
              <Avatar src={school.img} alt={school.firstName} />
              <Stack spacing={0.8} sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {school.firstName} {school.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {school.location}
                </Typography>
                <Rating
                  value={parseFloat(school.rating)}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
                  onClick={() => navigate('/schoolProfile', { state: { school } })}
                >
                  View Details
                </Button>
              </Stack>
            </Box>
          ))}
        </Box>

      </Stack>
    </Box>
  );
};

export default AllSchools;