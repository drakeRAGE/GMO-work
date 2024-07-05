import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  name: string;
  phoneNumber: string;
  email: string;
}

const FormComponent: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    // Clear error message when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form fields
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (formValues.name.trim() === '') {
      newErrors.name = 'Please enter your name';
      isValid = false;
    }
    if (formValues.phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Please enter your phone number';
      isValid = false;
    }
    if (formValues.email.trim() === '') {
      newErrors.email = 'Please enter your email';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    // Handle form submission logic here, e.g., submit to backend or display data
    localStorage.setItem('userDetails', JSON.stringify(formValues));
    navigate('/posts');
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={11} sm={8} md={6} lg={4}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: 3, border: '1px solid grey', borderRadius: 2, boxShadow: 3 }}
        >
          <Typography variant="h6" gutterBottom>
            User Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                value={formValues.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                variant="outlined"
                value={formValues.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formValues.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FormComponent;
