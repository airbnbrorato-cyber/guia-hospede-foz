import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { SectionDetail } from './pages/SectionDetail';
import { Login } from './pages/admin/Login';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { Bookings } from './pages/admin/Bookings';
import { Expenses } from './pages/admin/Expenses';
import { ContentEditor } from './pages/admin/ContentEditor';
import { dataService } from './services/dbService';

const ProtectedRoute = ({ children }) => {
  const isAuth = dataService.getAuthStatus();
  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <Router basename="/guia-hospede-foz">
      <Routes>
        {/* Rotas Públicas do Hóspede */}
        <Route path="/" element={<Home />} />
        <Route path="/secao/:id" element={<SectionDetail />} />

        {/* Rotas Administrativas */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="reservas" element={<Bookings />} />
          <Route path="despesas" element={<Expenses />} />
          <Route path="conteudo" element={<ContentEditor />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
