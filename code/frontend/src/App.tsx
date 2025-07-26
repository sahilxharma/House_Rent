// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ❌ NO BrowserRouter here
import { AuthProvider } from './contexts/AuthContext';
import { PropertyProvider } from './contexts/PropertyContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import AddProperty from './pages/owner/AddProperty';
import ManageProperties from './pages/owner/ManageProperties';
import Bookings from './pages/Bookings';
import AdminPanel from './pages/admin/AdminPanel';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/bookings" element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            } />

            {/* Owner Routes */}
            <Route path="/add-property" element={
              <ProtectedRoute requiredRole="owner">
                <AddProperty />
              </ProtectedRoute>
            } />

            <Route path="/manage-properties" element={
              <ProtectedRoute requiredRole="owner">
                <ManageProperties />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;
