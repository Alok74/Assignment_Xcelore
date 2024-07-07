import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './LoginContext'; 
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './ProtectedRoute';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Sidebar from './components/Sidebar';

const App = () => {
  const { isAuthenticated } = useAuth(); // Assuming useAuth provides isAuthenticated state

  return (
    <Router>
      <Navbar />
      { isAuthenticated && <Sidebar /> }
      <div style={{ flex: 1, marginLeft: isAuthenticated ? 240 : 0 }}>
      <Routes>
        {/* Define your routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} requiredRole="user" />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute element={<HomePage />} requiredRole="admin" />} />
        <Route path="/homepage" element={<ProtectedRoute element={<HomePage />} />} />
      </Routes>
      </div>

    </Router>
  );
};

export default App;
