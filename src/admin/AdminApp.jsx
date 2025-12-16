import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VehicleTypes from './pages/VehicleTypes';
import Services from './pages/Services';
import Partners from './pages/Partners';
import Customers from './pages/Customers';
import Articles from './pages/Articles';
import VehicleImages from './pages/VehicleImages';
import Contacts from './pages/Contacts';

export default function AdminApp() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/vehicle-types" element={
                <ProtectedRoute>
                    <VehicleTypes />
                </ProtectedRoute>
            } />
            <Route path="/services" element={
                <ProtectedRoute>
                    <Services />
                </ProtectedRoute>
            } />
            <Route path="/partners" element={
                <ProtectedRoute>
                    <Partners />
                </ProtectedRoute>
            } />
            <Route path="/customers" element={
                <ProtectedRoute>
                    <Customers />
                </ProtectedRoute>
            } />
            <Route path="/articles" element={
                <ProtectedRoute>
                    <Articles />
                </ProtectedRoute>
            } />
            <Route path="/vehicle-images" element={
                <ProtectedRoute>
                    <VehicleImages />
                </ProtectedRoute>
            } />
            <Route path="/contacts" element={
                <ProtectedRoute>
                    <Contacts />
                </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
    );
}
