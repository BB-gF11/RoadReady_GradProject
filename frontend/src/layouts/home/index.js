import React, { useRef, useState, useEffect } from 'react';
import { Button, Stack, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from './header';
import Navbar from './Navbar';
import Features from '../../pages/home/Features ';
import Contact from '../../pages/home/Contact';
import SchoolCardRow from '../../pages/home/SchoolCardRow';
import About from '../../pages/home/About';
import Footer from './footer';
import Services from '../../pages/home/Services';
import { useNavigate } from 'react-router-dom';

const HomeLayout = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const headerRef = useRef(null);
    const aboutRef = useRef(null);
    const featuresRef = useRef(null);
    const contactRef = useRef(null);
    const ServicesRef = useRef(null);
    const drivingSchoolsRef = useRef(null);
    
    const [previewSchools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const schools = data.filter(user => user.role === "SCHOOL");
                setSchools(schools.slice(0, 5));
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleScrollTo = (section) => {
        switch (section) {
            case -1:
                headerRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 0:
                aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 1:
                ServicesRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 2:
                featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 3:
                drivingSchoolsRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 4:
                contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            default:
                
                break;
        }
    };

    return (
        <Stack sx={{ width: '80%', margin: 'auto' }}>
            <Navbar onNavClick={handleScrollTo} />
            <div ref={headerRef}><Header /></div>
            <div ref={ServicesRef}><Services /></div>
            <div ref={featuresRef}><Features /></div>
            <div ref={aboutRef}><About /></div>

            <div ref={drivingSchoolsRef}><Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                mt: 4,
                mb: 4,
            }}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                    Driving Schools
                </Typography>

                <Box sx={{
                    width: 140,
                    height: 4,
                    backgroundColor: "#f1c40f",
                    borderRadius: 2,
                }} />
            </Box>
            </div>
            <Stack direction='row' spacing={2} sx={{
                overflowX: 'auto',
                justifyContent: "center",
                mb: 3
            }}>
                {previewSchools.map((school) => (
                    <SchoolCardRow key={school.schoolId} school={school} />
                ))}
            </Stack>
            <Stack alignItems='center' sx={{
                mb: 5,
            }}>
                <Button variant='contained' onClick={() => navigate('/AllSchool')}>
                    View All Schools
                </Button>
            </Stack>
            <div ref={contactRef}><Contact /></div>
            <Footer onNavClick={handleScrollTo} />
        </Stack >
    );
};

export default HomeLayout;