import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';
import ProfessorDashboard from './components/ProfessorDashboard';

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  if (user.role === 'professor') {
    return <ProfessorDashboard />;
  }

  // Default to Student Layout
  return <Layout />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
