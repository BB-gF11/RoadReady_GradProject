import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormProvider from '../../components/hook-form/FormProvider';
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { RHFTextField } from '../../components/hook-form';
import { Eye, EyeSlash } from 'phosphor-react';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [schools, setSchools] = useState([]);
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    emailAddress: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    licenseeName: '',
    licenseeInstructor: '',
  };

  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors }
  } = methods;

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setusers(data);
        const schools = data.filter(user => user.role === "SCHOOL");
        setSchools(schools);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const onSubmit = async (data) => {
    try {
      let role = 'STUDENT';
      let assignedTo = null;
      let userId = ('user' + (users.length + 1))
      if (data.licenseeName && data.licenseeInstructor) {
        role = 'INSTRUCTOR';

        const matchedSchool = schools.find(school => school.username === data.licenseeName);
        assignedTo = matchedSchool ? matchedSchool.userId : '';
      } else if (data.licenseeName) {
        role = 'SCHOOL';
      }

      const username = `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}`;

      const payload = {
        ...data,
        username,
        role,
        userId,
        assignedTo,
      };
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Registration failed');
      }

      const message = await response.text();
      alert(message);
      reset();
    } catch (error) {
      setError('afterSubmit', {
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First Name" />
          <RHFTextField name="lastName" label="Last Name" />
        </Stack>

        <RHFTextField name="emailAddress" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        
        
        <RHFTextField
          name="licenseeName"
          label="Name of licensed driving school (schools only)"
          fullWidth
        />
        <RHFTextField
          name="licenseeInstructor"
          label="Instructor license ID (fill if you are an instructor)"
          fullWidth
        />
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: 'text.primary',
            color: (theme) =>
              theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) =>
                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            },
          }}
        >
          Create Account
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default RegisterForm;
