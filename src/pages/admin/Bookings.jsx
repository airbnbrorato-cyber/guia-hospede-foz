import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, X, Search, Ban 
} from 'lucide-react';
import { dataService } from '../../services/dbService';

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  const [formData, setFormData] = useState({
    type: 'reserva',
    guestName: '',
    checkIn: '',
    checkOut: '',
    amount: 0,
    amountPaid: 0,
    paymentStatus: 'pago',
    source: 'Airbnb',
    status: 'confirmada',
    notes: ''
  });

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const list = await dataService.getBookings();
      setBookings(list);
    } catch (err) {
      console.error('Erro ao carregar reservas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingBooking(null);
    setFormData({
      type: 'reserva',
      guestName: '',
      checkIn: '',
      checkOut: '',
      amount: 0,
      amountPaid: 0,
      paymentStatus: 'pago',
      source: 'Airbnb',
      status: 'confirmada',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({ ...booking });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta reserva / bloqueio?')) {
      await dataService.deleteBooking(id);
      loadBookings();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dataService.saveBooking({
      ...formData,
      amount: Number(formData.amount),
      amountPaid: Number(formData.amountPaid)
    });
    setIsModalOpen(false);
    loadBookings();
  };

  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      (b.guestName && b.guestName.toLowerCase().includes(term)) ||
      (b.notes && b.notes.toLowerCase().includes(term)) ||
      (b.source && b.source.toLowerCase().includes(term)) ||
      b.checkIn.includes(term)
    );
  });

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#C2847A] uppercase tracking-widest">
            Gestão de Ocupação
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#2C221E]">
            Reservas & Bloqueios de Calendário
          </h1>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#C2847A] hover:bg-[#B17268] text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" /> Nova Reserva / Bloqueio
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#6B5E57]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por hóspede, data (YYYY-MM-DD), canal ou notas..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAE2DA] text-xs text-[#2C221E] focus:outline-none focus:border-[#C2847A]"
        />
      </div>

      <div className="bg-white rounded-3xl border border-[#EAE2DA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#2C221E]">
            <thead className="bg-[#FAF7F2] border-b border-[#EAE2DA] text-[10px] font-bold uppercase tracking-wider text-[#6B5E57]">
              <tr>
                <th className="p-4">Tipo / Hóspede</th>
                <th className="p-4">Check-in / Check-out</th>
                <th className="p-4">Canal</th>
                <th className="p-4">Valor Total</th>
                <th className="p-4">Pago (Caixa)</th>
                <th className="p-4">Status Pagamento</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE2DA]">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-[#6B5E57]">
                    Nenhuma reserva ou bloqueio encontrado.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-4">
                      {b.type === 'bloqueio' ? (
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                            <Ban className="w-3.5 h-3.5" />
                          </span>
                          <div>
                            <span className="font-bold text-amber-900">Bloqueio</span>
                            <p className="text-[10px] text-[#6B5E57] max-w-xs truncate">{b.notes || 'Sem motivo'}</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="font-bold text-[#2C221E]">{b.guestName}</p>
                          {b.notes && <p className="text-[10px] text-[#6B5E57]">{b.notes}</p>}
                        </div>
                      )}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <p className="font-semibold">{b.checkIn}</p>
                      <p className="text-[10px] text-[#6B5E57]">até {b.checkOut}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#F5EFEB] text-[#2C221E] text-[10px] font-semibold">
                        {b.source}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">
                      {b.type === 'bloqueio' ? '-' : ('R$ ' + formatCurrency(b.amount))}
                    </td>
                    <td className="p-4 font-bold text-emerald-700">
                      {b.type === 'bloqueio' ? '-' : ('R$ ' + formatCurrency(b.amountPaid))}
                    </td>
                    <td className="p-4">
                      <span className={'px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ' + (
                        b.paymentStatus === 'pago' ? 'bg-emerald-100 text-emerald-800' :
                        b.paymentStatus === 'parcial' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      )}>
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="p-1.5 rounded-lg text-[#6B5E57] hover:bg-[#F5EFEB] hover:text-[#C2847A]"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 border border-[#EAE2DA] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE2DA]">
              <h2 className="font-serif text-lg font-bold text-[#2C221E]">
                {editingBooking ? 'Editar Registro' : 'Novo Registro de Ocupação'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#6B5E57] flex items-center justify-center hover:bg-[#EAE2DA]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">Tipo de Registro</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'reserva' })}
                    className={'py-2 rounded-xl border text-center font-semibold ' + (
                      formData.type === 'reserva'
                        ? 'bg-[#C2847A] text-white border-[#8F5148]'
                        : 'bg-[#FAF7F2] text-[#6B5E57] border-[#EAE2DA]'
                    )}
                  >
                    Reserva de Hóspede
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'bloqueio', amount: 0, amountPaid: 0 })}
                    className={'py-2 rounded-xl border text-center font-semibold ' + (
                      formData.type === 'bloqueio'
                        ? 'bg-amber-600 text-white border-amber-700'
                        : 'bg-[#FAF7F2] text-[#6B5E57] border-[#EAE2DA]'
                    )}
                  >
                    Bloqueio / Manutenção
                  </button>
                </div>
              </div>

              {formData.type === 'reserva' && (
                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">Nome do Hóspede</label>
                  <input
                    type="text"
                    required
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    placeholder="Ex: Carlos Eduardo"
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">Check-in (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">Check-out (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                  />
                </div>
              </div>

              {formData.type === 'reserva' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#2C221E] mb-1">Valor Contratado (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#2C221E] mb-1">Valor Já Recebido (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.amountPaid}
                        onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#2C221E] mb-1">Canal de Origem</label>
                      <select
                        value={formData.source}
                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                      >
                        <option value="Airbnb">Airbnb</option>
                        <option value="Booking.com">Booking.com</option>
                        <option value="Direto">Direto (WhatsApp)</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#2C221E] mb-1">Status de Pagamento</label>
                      <select
                        value={formData.paymentStatus}
                        onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                      >
                        <option value="pago">Pago Integral</option>
                        <option value="parcial">Parcial (Sinal)</option>
                        <option value="pendente">Pendente</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">
                  {formData.type === 'bloqueio' ? 'Motivo do Bloqueio' : 'Observações'}
                </label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={formData.type === 'bloqueio' ? 'Ex: Limpeza pesada e dedetização' : 'Ex: Chegada às 20h'}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF7F2] text-[#6B5E57] font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#C2847A] hover:bg-[#B17268] text-white font-semibold shadow-xs"
                >
                  Salvar Registro
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
