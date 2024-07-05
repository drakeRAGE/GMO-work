import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FormPage from './components/formComponents';
import SecondPage from './components/secondPage';
import { CssBaseline } from '@mui/material';

const App: React.FC = () => {
  const userDetails = localStorage.getItem('userDetails');

  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route
          path="/posts"
          element={userDetails ? <SecondPage /> : <Navigate to="/" replace state={{ from: '/posts' }} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
