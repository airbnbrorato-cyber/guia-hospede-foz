import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Clock, Copy, Check, MessageCircle, PhoneCall, Heart, Lock } from 'lucide-react';
import { dataService } from '../services/dbService';
import { IconCard } from '../components/IconCard';
import { LanguageTranslator } from '../components/LanguageTranslator';

export const Home = () => {
  const [settings, setSettings] = useState(null);
  const [sections, setSections] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [loadedSettings, loadedSections] = await Promise.all([
          dataService.getSettings(),
          dataService.getSections()
        ]);
        setSettings(loadedSettings);
        setSections(loadedSections);
      } catch (err) {
        console.error('Erro ao carregar dados da home:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCopyWifi = () => {
    if (settings?.wifiPassword) {
      navigator.clipboard.writeText(settings.wifiPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-[#C2847A] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-[#6B5E57] font-medium tracking-wide">Carregando seu guia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center selection:bg-[#C2847A] selection:text-white">
      <div className="w-full max-w-md min-h-screen bg-[#FAF7F2] flex flex-col pb-16 relative shadow-2xl md:my-6 md:rounded-[36px] md:overflow-hidden md:border md:border-[#EAE2DA]">
        
        {/* Header com Imagem de Boas-Vindas */}
        <header className="relative w-full h-72 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
            alt={settings?.houseName || 'Acomodação'}
            className="w-full h-full object-cover brightness-[0.88]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/30"></div>
          
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
            <LanguageTranslator />
            <span className="px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md text-[#2C221E] text-xs font-semibold tracking-wider uppercase shadow-sm">
              Guia do Hóspede
            </span>
            <div className="flex gap-2">
              <Link
                to="/admin/login"
                title="Acesso do Anfitrião"
                className="w-9 h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-[#6B5E57] hover:text-[#C2847A] hover:bg-white transition-all shadow-sm"
              >
                <Lock className="w-4 h-4" />
              </Link>
              <a
                href={'https://wa.me/' + (settings?.hostWhatsapp || '')}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-[#C2847A] hover:bg-white transition-all shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <p className="text-xs font-medium text-[#C2847A] uppercase tracking-widest mb-1">
              {settings?.city || 'Foz do Iguaçu • PR'}
            </p>
            <h1 className="font-serif text-3xl font-bold text-[#2C221E] leading-tight">
              {settings?.houseName}
            </h1>
            <p className="text-xs text-[#6B5E57] mt-1">{settings?.tagline}</p>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="px-5 -mt-2 space-y-6">
          
          {/* Card de Acesso Rápido (Wi-Fi e Horários) */}
          <section className="bg-white rounded-2xl p-4 border border-[#EAE2DA] shadow-sm">
            <div className="grid grid-cols-2 gap-3 divide-x divide-[#EAE2DA]">
              {/* Wi-Fi */}
              <div className="pr-2 flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-[#F5EFEB] text-[#C2847A] flex-shrink-0">
                  <Wifi className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E57]">Wi-Fi da Casa</p>
                  <p className="text-xs font-bold text-[#2C221E] truncate">{settings?.wifiName}</p>
                  <button
                    onClick={handleCopyWifi}
                    className="text-[10px] text-[#C2847A] font-medium hover:underline flex items-center gap-1 mt-0.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar senha</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Check-in / Out */}
              <div className="pl-3 flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-[#F5EFEB] text-[#C2847A] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E57]">Horários</p>
                  <p className="text-xs font-medium text-[#2C221E]">In: <strong className="font-bold">{settings?.checkInTime}</strong></p>
                  <p className="text-xs font-medium text-[#2C221E]">Out: <strong className="font-bold">{settings?.checkOutTime}</strong></p>
                </div>
              </div>
            </div>
          </section>

          {/* Mensagem de Boas-Vindas */}
          {settings?.welcomeMessage && (
            <section className="p-4 rounded-2xl bg-[#F5EFEB]/70 border border-[#EAE2DA]">
              <p className="text-xs text-[#6B5E57] italic leading-relaxed text-center">
                "{settings.welcomeMessage}"
              </p>
            </section>
          )}

          {/* Grade de Ícones do Menu */}
          <section>
            <div className="flex items-center justify-between mb-3 px-1">
              <h2 className="font-serif text-lg font-bold text-[#2C221E]">Explore o seu Guia</h2>
              <span className="text-[11px] text-[#6B5E57]">{sections.length} seções</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {sections.map(section => (
                <IconCard
                  key={section.id}
                  section={section}
                  isFeatured={section.id === 'coisas-para-fazer'}
                />
              ))}
            </div>
          </section>

          {/* Rodapé / Contato */}
          <footer className="pt-6 pb-2 text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#F5EFEB] text-[#C2847A] border border-[#EAE2DA] mb-1">
              <Heart className="w-5 h-5 fill-[#C2847A]/20" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2C221E]">Precisa de ajuda com a estadia?</h3>
            <p className="text-xs text-[#6B5E57] max-w-xs mx-auto">
              Sua anfitriã {settings?.hostName} está à disposição para ajudar com dúvidas e dicas exclusivas.
            </p>
            <a
              href={'https://wa.me/' + (settings?.hostWhatsapp || '')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C2847A] hover:bg-[#B17268] text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp com o Anfitrião
            </a>
            <p className="text-[10px] text-[#6B5E57]/70 pt-4">
              © 2026 {settings?.houseName} • Feito com carinho para o seu descanso
            </p>
          </footer>

        </main>
      </div>
    </div>
  );
};
