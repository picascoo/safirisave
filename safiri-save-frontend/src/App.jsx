import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import { SOCKET_IO_URL } from './constants';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const { token } = useAuth();

  useEffect(() => {
    const socket = io(SOCKET_IO_URL);
    if (token) socket.emit('authenticate', token);
    
    socket.on('priceAlert', (data) => {
      alert(`🔔 PRICE ALERT: ${data.message}`);
    });

    return () => socket.disconnect();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </div>
  );
}