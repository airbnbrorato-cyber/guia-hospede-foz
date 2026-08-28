import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { SectionDetail } from './pages/SectionDetail';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { Bookings } from './pages/admin/Bookings';
import { Expenses } from './pages/admin/Expenses';
import { ContentEditor } from './pages/admin/ContentEditor';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas do Guia do Hóspede */}
        <Route path="/" element={<Home />} />
        <Route path="/secao/:id" element={<SectionDetail />} />

        {/* Login Administrativo */}
        <Route path="/admin/login" element={<Login />} />

        {/* Rotas do Painel Administrativo */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="reservas" element={<Bookings />} />
          <Route path="despesas" element={<Expenses />} />
          <Route path="conteudo" element={<ContentEditor />} />
        </Route>

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
