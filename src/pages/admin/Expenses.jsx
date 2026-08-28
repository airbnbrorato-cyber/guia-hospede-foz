import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Filter } from 'lucide-react';
import { dataService } from '../../services/dbService';

export const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('todas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [formData, setFormData] = useState({
    date: '2026-08-26',
    category: 'limpeza',
    amount: 0,
    description: ''
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const list = await dataService.getExpenses();
      setExpenses(list);
    } catch (err) {
      console.error('Erro ao carregar despesas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingExpense(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: 'limpeza',
      amount: 0,
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp) => {
    setEditingExpense(exp);
    setFormData({ ...exp });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja excluir este lançamento de despesa?')) {
      await dataService.deleteExpense(id);
      loadExpenses();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dataService.saveExpense({
      ...formData,
      amount: Number(formData.amount)
    });
    setIsModalOpen(false);
    loadExpenses();
  };

  const filteredExpenses = expenses.filter((e) => {
    if (categoryFilter !== 'todas' && e.category !== categoryFilter) return false;
    return true;
  });

  const totalFiltered = filteredExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  const categoryLabels = {
    limpeza: { label: 'Limpeza & Faxina', color: 'bg-blue-100 text-blue-800' },
    brindes: { label: 'Brindes & Amenities', color: 'bg-purple-100 text-purple-800' },
    manutencao: { label: 'Manutenção', color: 'bg-amber-100 text-amber-800' },
    taxas: { label: 'Taxas & Contas', color: 'bg-emerald-100 text-emerald-800' },
    outros: { label: 'Outros Custos', color: 'bg-gray-100 text-gray-800' }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#C2847A] uppercase tracking-widest">
            Controle de Custos
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#2C221E]">
            Despesas do Imóvel
          </h1>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#C2847A] hover:bg-[#B17268] text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" /> Nova Despesa
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#EAE2DA]">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-[#6B5E57] flex-shrink-0" />
          {['todas', 'limpeza', 'brindes', 'manutencao', 'taxas', 'outros'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={'px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ' + (
                categoryFilter === cat
                  ? 'bg-[#C2847A] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#6B5E57] hover:bg-[#F5EFEB]'
              )}
            >
              {cat === 'todas' ? 'Todas as Categorias' : cat}
            </button>
          ))}
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-[10px] text-[#6B5E57] uppercase font-bold block">Total Filtrado</span>
          <span className="text-base font-serif font-bold text-[#2C221E]">
            R$ {totalFiltered.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#EAE2DA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#2C221E]">
            <thead className="bg-[#FAF7F2] border-b border-[#EAE2DA] text-[10px] font-bold uppercase tracking-wider text-[#6B5E57]">
              <tr>
                <th className="p-4">Data</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Descrição</th>
                <th className="p-4">Valor</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE2DA]">
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-[#6B5E57]">
                    Nenhuma despesa encontrada para o filtro selecionado.
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-4 font-semibold whitespace-nowrap">
                      {exp.date}
                    </td>
                    <td className="p-4">
                      <span className={'px-2.5 py-1 rounded-full text-[10px] font-bold ' + (
                        categoryLabels[exp.category]?.color || 'bg-gray-100 text-gray-800'
                      )}>
                        {categoryLabels[exp.category]?.label || exp.category}
                      </span>
                    </td>
                    <td className="p-4 max-w-sm">
                      {exp.description}
                    </td>
                    <td className="p-4 font-bold text-rose-700 whitespace-nowrap">
                      R$ {Number(exp.amount)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleOpenEdit(exp)}
                        className="p-1.5 rounded-lg text-[#6B5E57] hover:bg-[#F5EFEB] hover:text-[#C2847A]"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
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
          <div className="bg-white w-full max-w-md rounded-3xl p-6 border border-[#EAE2DA] shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE2DA]">
              <h2 className="font-serif text-lg font-bold text-[#2C221E]">
                {editingExpense ? 'Editar Despesa' : 'Novo Lançamento de Despesa'}
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
                <label className="block font-semibold text-[#2C221E] mb-1">Data (YYYY-MM-DD)</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">Categoria</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                >
                  <option value="limpeza">Limpeza & Faxina</option>
                  <option value="brindes">Brindes & Amenities (Café, Sabonete, etc.)</option>
                  <option value="manutencao">Manutenção & Reparos</option>
                  <option value="taxas">Taxas, Condomínio & Contas</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">Valor da Despesa (R$)</label>
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
                <label className="block font-semibold text-[#2C221E] mb-1">Descrição</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ex: Compra de café Nespresso e sabonetes artesanais"
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
                  Salvar Despesa
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
