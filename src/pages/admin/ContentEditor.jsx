import React, { useState, useEffect } from 'react';
import { 
  FileEdit, Save, Plus, Trash2, Check, Image as ImageIcon, Sparkles, Eye, ArrowUpRight, ExternalLink 
} from 'lucide-react';
import { dataService } from '../../services/dbService';
import { DynamicIcon } from '../../components/DynamicIcon';

export const ContentEditor = () => {
  const [sections, setSections] = useState([]);
  const [settings, setSettings] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState('coisas-para-fazer');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => {
    loadAllContent();
  }, []);

  const loadAllContent = async () => {
    try {
      const [secList, sett] = await Promise.all([
        dataService.getSections(),
        dataService.getSettings()
      ]);
      setSections(secList);
      setSettings(sett);
      const sel = secList.find(s => s.id === selectedSectionId) || secList[0];
      if (sel) {
        setCurrentSection(JSON.parse(JSON.stringify(sel)));
        setSelectedSectionId(sel.id);
      }
    } catch (err) {
      console.error('Erro ao carregar conteúdo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSection = (id) => {
    setSelectedSectionId(id);
    const sel = sections.find(s => s.id === id);
    if (sel) {
      setCurrentSection(JSON.parse(JSON.stringify(sel)));
    }
  };

  const handleSaveSection = async (e) => {
    e.preventDefault();
    if (!currentSection) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      await dataService.updateSection(currentSection.id, {
        ...currentSection,
        lastUpdated: new Date().toISOString().split('T')[0]
      });

      const updated = sections.map(s => s.id === currentSection.id ? currentSection : s);
      setSections(updated);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Erro ao salvar seção:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await dataService.updateSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Erro ao salvar settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddItem = () => {
    if (!currentSection) return;
    const items = currentSection.items || [];
    items.push({
      title: 'Novo Item / Restaurante / Local',
      badge: 'Recomendado',
      description: 'Breve descrição dos pratos, ambiente ou atrações do local...',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      link: ''
    });
    setCurrentSection({ ...currentSection, items });
  };

  const handleUpdateItem = (idx, field, value) => {
    const items = [...currentSection.items];
    items[idx][field] = value;
    setCurrentSection({ ...currentSection, items });
  };

  const handleDeleteItem = (idx) => {
    const items = currentSection.items.filter((_, i) => i !== idx);
    setCurrentSection({ ...currentSection, items });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-2 border-[#C2847A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#C2847A] uppercase tracking-widest">
            Sem necessidade de deploy
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#2C221E]">
            Editor de Conteúdo do Guia
          </h1>
        </div>
        {saveSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl">
            <Check className="w-4 h-4" /> Alterações salvas com sucesso!
          </div>
        )}
      </div>

      {/* Editor de Configurações Básicas do Imóvel (Wi-Fi, Contato) */}
      <section className="bg-white p-5 rounded-3xl border border-[#EAE2DA] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-base font-bold text-[#2C221E]">
            Dados Rápidos da Casa (Wi-Fi, Contato, Horários)
          </h2>
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={saving}
            className="px-3.5 py-1.5 bg-[#C2847A] hover:bg-[#B17268] text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1"
          >
            <Save className="w-3.5 h-3.5" /> Salvar Wi-Fi & Casa
          </button>
        </div>

        {settings && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-[#6B5E57] mb-1">Nome da Rede Wi-Fi</label>
              <input
                type="text"
                value={settings.wifiName || ''}
                onChange={(e) => setSettings({ ...settings, wifiName: e.target.value })}
                className="w-full p-2 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#6B5E57] mb-1">Senha do Wi-Fi</label>
              <input
                type="text"
                value={settings.wifiPassword || ''}
                onChange={(e) => setSettings({ ...settings, wifiPassword: e.target.value })}
                className="w-full p-2 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#6B5E57] mb-1">WhatsApp Anfitrião (DDD+Número)</label>
              <input
                type="text"
                value={settings.hostWhatsapp || ''}
                onChange={(e) => setSettings({ ...settings, hostWhatsapp: e.target.value })}
                className="w-full p-2 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#6B5E57] mb-1">Horário Check-in / Out</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.checkInTime || ''}
                  onChange={(e) => setSettings({ ...settings, checkInTime: e.target.value })}
                  placeholder="In"
                  className="w-1/2 p-2 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                />
                <input
                  type="text"
                  value={settings.checkOutTime || ''}
                  onChange={(e) => setSettings({ ...settings, checkOutTime: e.target.value })}
                  placeholder="Out"
                  className="w-1/2 p-2 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Editor das 18 Seções do Guia */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Seletor de Seções (Esquerda) */}
        <div className="bg-white p-4 rounded-3xl border border-[#EAE2DA] shadow-xs space-y-2 lg:col-span-1 max-h-[650px] overflow-y-auto">
          <h2 className="font-serif text-sm font-bold text-[#2C221E] px-2 mb-2">
            Selecione uma Seção ({sections.length})
          </h2>
          <div className="space-y-1">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleSelectSection(sec.id)}
                className={'w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-all ' + (
                  selectedSectionId === sec.id
                    ? 'bg-[#C2847A] text-white shadow-xs'
                    : 'text-[#6B5E57] hover:bg-[#FAF7F2]'
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <DynamicIcon name={sec.icon} className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{sec.title}</span>
                </div>
                {sec.items && (
                  <span className="text-[10px] opacity-75 font-normal ml-1">
                    ({sec.items.length} locais)
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Formulário de Edição da Seção (Direita) */}
        <div className="bg-white p-6 rounded-3xl border border-[#EAE2DA] shadow-xs lg:col-span-2 space-y-6">
          {currentSection && (
            <form onSubmit={handleSaveSection} className="space-y-5 text-xs">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE2DA]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F5EFEB] text-[#C2847A] flex items-center justify-center">
                    <DynamicIcon name={currentSection.icon} className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#2C221E]">
                      {currentSection.title}
                    </h3>
                    <p className="text-[10px] text-[#6B5E57]">ID: {currentSection.id}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#C2847A] hover:bg-[#B17268] text-white font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>

              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">Título Exibido</label>
                <input
                  type="text"
                  value={currentSection.title || ''}
                  onChange={(e) => setCurrentSection({ ...currentSection, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">Descrição Curta / Subtítulo</label>
                <input
                  type="text"
                  value={currentSection.description || ''}
                  onChange={(e) => setCurrentSection({ ...currentSection, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                />
              </div>

              {/* Imagem de Capa Simbólica da Categoria */}
              <div>
                <label className="block font-semibold text-[#2C221E] mb-1">
                  Imagem de Capa da Categoria (URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentSection.coverImage || ''}
                    onChange={(e) => setCurrentSection({ ...currentSection, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E]"
                  />
                  {currentSection.coverImage && (
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#EAE2DA] flex-shrink-0">
                      <img src={currentSection.coverImage} alt="Capa" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Seção com Texto Corrido */}
              {currentSection.text !== undefined && (
                <div>
                  <label className="block font-semibold text-[#2C221E] mb-1">
                    Conteúdo de Texto (Suporta quebras de linha e tópicos)
                  </label>
                  <textarea
                    rows="8"
                    value={currentSection.text || ''}
                    onChange={(e) => setCurrentSection({ ...currentSection, text: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-[#2C221E] font-mono text-[11px]"
                  ></textarea>
                </div>
              )}

              {/* Seção Estruturada com Cards / Fotos (Atrações, Cafés, Bares, Restaurantes) com VISOR DE IMAGEM */}
              {currentSection.items && (
                <div className="space-y-4 pt-2 border-t border-[#EAE2DA]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#2C221E]">
                        Cards & Lugares ({currentSection.items.length})
                      </h4>
                      <p className="text-[11px] text-[#6B5E57]">
                        Visualize abaixo como a imagem e o card ficam para o hóspede.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="px-3 py-1 bg-[#FAF7F2] hover:bg-[#F5EFEB] text-[#C2847A] font-semibold rounded-lg flex items-center gap-1 border border-[#EAE2DA]"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar Card
                    </button>
                  </div>

                  <div className="space-y-6">
                    {currentSection.items.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE2DA] space-y-4">
                        
                        {/* Cabeçalho do Card */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#C2847A] uppercase flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" /> Local #{idx + 1}: {item.title || 'Sem título'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(idx)}
                            className="text-rose-600 hover:text-rose-800 p-1 flex items-center gap-1 text-[11px]"
                            title="Remover"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remover
                          </button>
                        </div>

                        {/* VISOR / PREVIEW DA IMAGEM E DO CARD */}
                        <div className="bg-white rounded-xl p-3 border border-[#EAE2DA] flex flex-col sm:flex-row gap-3 items-start">
                          {/* Miniatura da Imagem com Badge */}
                          <div className="relative w-full sm:w-36 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-[#EAE2DA]">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-[#6B5E57] text-[10px]">
                                <ImageIcon className="w-5 h-5 mb-1 opacity-50" />
                                <span>Sem imagem</span>
                              </div>
                            )}
                            {item.badge && (
                              <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-[#C2847A] text-white text-[9px] font-bold">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          {/* Prévia textual */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <span className="text-[9px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                              Visor do Hóspede
                            </span>
                            <h5 className="font-serif font-bold text-sm text-[#2C221E] truncate">
                              {item.title || 'Título do Restaurante / Atração'}
                            </h5>
                            <p className="text-[11px] text-[#6B5E57] line-clamp-2 leading-relaxed">
                              {item.description || 'Descrição do card aparecerá aqui...'}
                            </p>
                            {item.link && (
                              <span className="text-[10px] text-[#C2847A] flex items-center gap-1 font-semibold truncate pt-1">
                                <ExternalLink className="w-3 h-3" /> {item.link}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Campos de Edição */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-semibold text-[#6B5E57] mb-1">Título do Lugar</label>
                            <input
                              type="text"
                              placeholder="Ex: Restaurante Castelo Libanês"
                              value={item.title || ''}
                              onChange={(e) => handleUpdateItem(idx, 'title', e.target.value)}
                              className="w-full p-2 rounded-xl bg-white border border-[#EAE2DA] text-[#2C221E]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-[#6B5E57] mb-1">Selo / Badge</label>
                            <input
                              type="text"
                              placeholder="Ex: Imperdível, Tradicional Árabe, Pão Quentinho"
                              value={item.badge || ''}
                              onChange={(e) => handleUpdateItem(idx, 'badge', e.target.value)}
                              className="w-full p-2 rounded-xl bg-white border border-[#EAE2DA] text-[#2C221E]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-semibold text-[#6B5E57] mb-1">URL da Imagem</label>
                            <input
                              type="text"
                              placeholder="Cole o link da foto do restaurante/atração"
                              value={item.image || ''}
                              onChange={(e) => handleUpdateItem(idx, 'image', e.target.value)}
                              className="w-full p-2 rounded-xl bg-white border border-[#EAE2DA] text-[#2C221E]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-[#6B5E57] mb-1">Link Externo / Ingressos (Opcional)</label>
                            <input
                              type="text"
                              placeholder="https://instagram.com/restaurante"
                              value={item.link || ''}
                              onChange={(e) => handleUpdateItem(idx, 'link', e.target.value)}
                              className="w-full p-2 rounded-xl bg-white border border-[#EAE2DA] text-[#2C221E]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-semibold text-[#6B5E57] mb-1">Descrição e Dicas do Anfitrião</label>
                          <textarea
                            rows="2"
                            placeholder="Descreva os pratos imperdíveis, horário ou dicas exclusivas..."
                            value={item.description || ''}
                            onChange={(e) => handleUpdateItem(idx, 'description', e.target.value)}
                            className="w-full p-2 rounded-xl bg-white border border-[#EAE2DA] text-[#2C221E]"
                          ></textarea>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

      </div>

    </div>
  );
};
