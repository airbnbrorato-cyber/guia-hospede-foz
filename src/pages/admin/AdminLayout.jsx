import React, { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, CalendarDays, Receipt, FileEdit, ExternalLink, LogOut, ShieldCheck 
} from 'lucide-react';
import { dataService } from '../../services/dbService';

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!dataService.getAuthStatus()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    dataService.setAuthStatus(false);
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Reservas & Calendário', path: '/admin/reservas', icon: CalendarDays },
    { label: 'Despesas', path: '/admin/despesas', icon: Receipt },
    { label: 'Editor do Guia', path: '/admin/conteudo', icon: FileEdit },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col md:flex-row text-[#2C221E] selection:bg-[#C2847A] selection:text-white">
      
      {/* Sidebar Desktop / Navbar Mobile */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-[#EAE2DA] p-5 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F5EFEB] text-[#C2847A] flex items-center justify-center font-serif font-bold text-lg">
                R
              </div>
              <div>
                <h2 className="font-serif font-bold text-sm text-[#2C221E]">Refúgio Cataratas</h2>
                <p className="text-[10px] text-[#6B5E57] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Painel Anfitrião
                </p>
              </div>
            </div>
          </div>

          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ' + (
                    isActive
                      ? 'bg-[#C2847A] text-white shadow-sm'
                      : 'text-[#6B5E57] hover:bg-[#F5EFEB] hover:text-[#2C221E]'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

        </div>

        <div className="hidden md:flex flex-col gap-2 pt-6 border-t border-[#EAE2DA]">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-[#6B5E57] bg-[#F5EFEB] hover:bg-[#EAE2DA] transition-all"
          >
            <span>Ver Guia do Hóspede</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-all text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sair da Conta
          </button>
        </div>

      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};
