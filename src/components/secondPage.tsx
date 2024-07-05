import React from 'react';
import PostsTable from './PostsTable';
import DepartmentList from './DepartmentList';
import { Box, Container, Grid, Card, CardContent, Typography } from '@mui/material';

const SecondPage: React.FC = () => {
  const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

  return (
    <Container>
      <Box my={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
            <Typography variant="body1">Name: {userDetails.name}</Typography>
            <Typography variant="body1">Phone Number: {userDetails.phoneNumber}</Typography>
            <Typography variant="body1">Email: {userDetails.email}</Typography>
          </CardContent>
        </Card>
        <Grid container mt={4}>
          <Grid item xs={12}>
            <PostsTable />
          </Grid>
          <Grid item xs={12}>
            <DepartmentList />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SecondPage;
