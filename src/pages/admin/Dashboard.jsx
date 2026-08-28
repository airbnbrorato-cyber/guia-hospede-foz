import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, Calendar, Plus, ChevronLeft, ChevronRight, RefreshCw, Sparkles 
} from 'lucide-react';
import { dataService } from '../../services/dbService';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inicializa na data atual do sistema ou Agosto/2026 como base de teste
  const [currentDate, setCurrentDate] = useState(() => {
    // Se preferir começar no ano de 2026 onde temos dados:
    return new Date(2026, 7, 1); // Agosto de 2026 (mês 7)
  });

  const selectedYear = currentDate.getFullYear();
  const selectedMonth = currentDate.getMonth(); // 0 a 11
  const currentYearMonth = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}`;

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const loadDashboardData = async () => {
    try {
      const [loadedBookings, loadedExpenses] = await Promise.all([
        dataService.getBookings(),
        dataService.getExpenses()
      ]);
      setBookings(loadedBookings);
      setExpenses(loadedExpenses);
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Navegação entre meses
  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleCurrentMonth = () => {
    setCurrentDate(new Date(2026, 7, 1));
  };

  // Dias no mês selecionado
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayIndex = new Date(selectedYear, selectedMonth, 1).getDay(); // 0 (Dom) a 6 (Sáb)

  // Identificar quais dias estão ocupados no mês selecionado (Comparação estrita de strings YYYY-MM-DD)
  // Uma reserva/bloqueio ocupa o dia D se: (checkIn <= D) e (D < checkOut)
  const occupiedMap = {}; // { '2026-08-01': bookingObject }
  let occupiedCount = 0;

  for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    
    // Procura reserva ou bloqueio ativo nesta data
    const activeItem = bookings.find(b => {
      if (b.status === 'cancelada') return false;
      if (!b.checkIn || !b.checkOut) return false;
      return dateStr >= b.checkIn && dateStr < b.checkOut;
    });

    if (activeItem) {
      occupiedMap[dateStr] = activeItem;
      occupiedCount++;
    }
  }

  // Reservas que tocam o mês selecionado (para métricas e listagem)
  const monthStartStr = `${currentYearMonth}-01`;
  const monthEndStr = `${currentYearMonth}-${String(daysInMonth).padStart(2, '0')}`;

  const monthlyBookings = bookings.filter(b => {
    if (b.status === 'cancelada') return false;
    // Ocorre no mês se começar no mês ou terminar no mês
    return (b.checkIn <= monthEndStr && b.checkOut > monthStartStr);
  });

  const onlyReservas = monthlyBookings.filter(b => b.type === 'reserva');
  const monthlyExpenses = expenses.filter(e => e.date && e.date.startsWith(currentYearMonth));

  const totalRevenue = onlyReservas.reduce((sum, b) => sum + (Number(b.amountPaid) || 0), 0);
  const totalExpense = monthlyExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const netProfit = totalRevenue - totalExpense;
  const occupancyRate = Math.round((occupiedCount / daysInMonth) * 100);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-2 border-[#C2847A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Topo do Dashboard com Navegação de Mês */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-[#EAE2DA] shadow-xs">
        <div>
          <span className="text-[10px] font-bold text-[#C2847A] uppercase tracking-widest block">
            Visão Geral Financeira & Ocupação
          </span>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="font-serif text-2xl font-bold text-[#2C221E]">
              {monthNames[selectedMonth]} de {selectedYear}
            </h1>
            <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#EAE2DA]">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#2C221E] hover:bg-[#F5EFEB] transition-colors shadow-xs"
                title="Mês Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#2C221E] hover:bg-[#F5EFEB] transition-colors shadow-xs"
                title="Próximo Mês"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleCurrentMonth}
                className="px-2 py-1 text-[10px] font-semibold text-[#C2847A] hover:underline"
              >
                Agosto/26
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/reservas"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C2847A] hover:bg-[#B17268] text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" /> Nova Reserva / Bloqueio
          </Link>
          <Link
            to="/admin/despesas"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF7F2] hover:bg-[#F5EFEB] text-[#2C221E] border border-[#EAE2DA] text-xs font-semibold rounded-xl shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" /> Nova Despesa
          </Link>
        </div>
      </div>

      {/* 4 Cards de Métricas Principais do Mês Selecionado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Receita do Mês (amountPaid) */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2DA] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B5E57]">Receita em Caixa</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-[#2C221E]">
            R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-[#6B5E57] flex items-center gap-1">
            <span className="text-emerald-600 font-semibold">{onlyReservas.length} reservas</span> no período
          </p>
        </div>

        {/* Despesas do Mês */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2DA] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B5E57]">Despesas Totais</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-[#2C221E]">
            R$ {totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-[#6B5E57]">
            {monthlyExpenses.length} lançamentos de custos
          </p>
        </div>

        {/* Lucro Líquido */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2DA] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B5E57]">Lucro Líquido</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5EFEB] text-[#C2847A] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className={'text-2xl font-serif font-bold ' + (netProfit >= 0 ? 'text-[#2C221E]' : 'text-rose-600')}>
            R$ {netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11px] text-[#6B5E57]">
            Margem de {totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0}% sobre receita
          </p>
        </div>

        {/* Taxa de Ocupação */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2DA] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B5E57]">Taxa de Ocupação</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-[#2C221E]">
            {occupancyRate}%
          </div>
          <p className="text-[11px] text-[#6B5E57]">
            <strong className="text-[#2C221E]">{occupiedCount}</strong> de {daysInMonth} noites ocupadas/bloqueadas
          </p>
        </div>

      </div>

      {/* Calendário Visual de Ocupação Dinâmico */}
      <section className="bg-white p-6 rounded-3xl border border-[#EAE2DA] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#2C221E]">
              Calendário de Ocupação — {monthNames[selectedMonth]} de {selectedYear}
            </h2>
            <p className="text-xs text-[#6B5E57]">
              Exibição das noites de hospedagem e bloqueios cadastrados.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#C2847A]"></span>
              <span className="text-[#6B5E57]">Reserva</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-amber-200 border border-amber-400"></span>
              <span className="text-[#6B5E57]">Bloqueio</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#FAF7F2] border border-[#EAE2DA]"></span>
              <span className="text-[#6B5E57]">Livre</span>
            </div>
          </div>
        </div>

        {/* Grade de Dias do Mês Selecionado */}
        <div className="grid grid-cols-7 gap-2 pt-2 text-center">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
            <div key={dia} className="text-[10px] font-bold text-[#6B5E57] uppercase pb-1">
              {dia}
            </div>
          ))}

          {/* Espaçadores automáticos baseados no primeiro dia da semana do mês selecionado */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={'empty-' + i} className="h-16 rounded-xl bg-transparent opacity-30"></div>
          ))}

          {/* Dias do Mês */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const dayNum = i + 1;
            const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const activeBooking = occupiedMap[dateStr];
            const isOccupied = Boolean(activeBooking);

            return (
              <div
                key={dayNum}
                className={'h-16 p-2 rounded-xl border flex flex-col justify-between text-left transition-all ' + (
                  isOccupied
                    ? activeBooking.type === 'bloqueio'
                      ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs ring-1 ring-amber-300'
                      : 'bg-[#F5EFEB] border-[#C2847A] text-[#2C221E] shadow-xs ring-1 ring-[#C2847A]/30'
                    : 'bg-[#FAF7F2]/40 border-[#EAE2DA] text-[#6B5E57] hover:border-[#C2847A]/30'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold">{dayNum}</span>
                  {isOccupied && (
                    <span className={'w-2 h-2 rounded-full ' + (activeBooking.type === 'bloqueio' ? 'bg-amber-500' : 'bg-[#C2847A]')}></span>
                  )}
                </div>
                {isOccupied && (
                  <span className={'text-[9px] font-bold truncate px-1.5 py-0.5 rounded shadow-2xs ' + (
                    activeBooking.type === 'bloqueio' 
                      ? 'bg-amber-200/90 text-amber-900' 
                      : 'bg-white text-[#C2847A] border border-[#EAE2DA]'
                  )}>
                    {activeBooking.type === 'bloqueio' ? 'Bloqueio' : (activeBooking.guestName ? activeBooking.guestName.split(' ')[0] : 'Hóspede')}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Lista de Reservas & Bloqueios do Período */}
      <section className="bg-white p-6 rounded-3xl border border-[#EAE2DA] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-[#2C221E]">
            Reservas & Bloqueios de {monthNames[selectedMonth]} ({monthlyBookings.length})
          </h2>
          <Link to="/admin/reservas" className="text-xs font-semibold text-[#C2847A] hover:underline">
            Gerenciar todas as reservas
          </Link>
        </div>

        <div className="divide-y divide-[#EAE2DA]">
          {monthlyBookings.length === 0 ? (
            <div className="py-6 text-center text-[#6B5E57] text-xs">
              Nenhuma reserva registrada para {monthNames[selectedMonth]} de {selectedYear}.
            </div>
          ) : (
            monthlyBookings.map((b) => (
              <div key={b.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-[#2C221E]">
                      {b.type === 'bloqueio' ? (b.notes || 'Bloqueio de Manutenção') : b.guestName}
                    </p>
                    <span className={'text-[10px] px-2 py-0.5 rounded-full font-semibold ' + (
                      b.type === 'bloqueio' ? 'bg-amber-100 text-amber-800' :
                      b.paymentStatus === 'pago' ? 'bg-emerald-100 text-emerald-800' :
                      b.paymentStatus === 'parcial' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    )}>
                      {b.type === 'bloqueio' ? 'Bloqueio' : b.paymentStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B5E57]">
                    {b.checkIn} até {b.checkOut} • Origem: {b.source}
                  </p>
                </div>
                <div className="text-right">
                  {b.type === 'reserva' ? (
                    <>
                      <p className="text-xs font-bold text-[#2C221E]">
                        R$ {b.amountPaid?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      {b.amount !== b.amountPaid && (
                        <p className="text-[10px] text-[#6B5E57]">
                          Total: R$ {b.amount?.toLocaleString('pt-BR')}
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-1 rounded-md">
                      Data Indisponível
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
};
