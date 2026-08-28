import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import { dataService } from '../services/dbService';
import { DynamicIcon } from '../components/DynamicIcon';

export const SectionDetail = () => {
  const { id } = useParams();
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSection() {
      try {
        const data = await dataService.getSectionById(id);
        setSection(data);
      } catch (err) {
        console.error('Erro ao carregar seção:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSection();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="w-8 h-8 border-2 border-[#C2847A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] p-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#2C221E] mb-2">Seção não encontrada</h2>
        <p className="text-xs text-[#6B5E57] mb-6">A seção que você tentou acessar não está disponível.</p>
        <Link
          to="/"
          className="px-5 py-2.5 bg-[#C2847A] text-white rounded-full text-xs font-semibold"
        >
          Voltar ao Guia
        </Link>
      </div>
    );
  }

  const hasHeroImage = Boolean(section.coverImage);

  return (
    <div className="min-h-screen flex justify-center selection:bg-[#C2847A] selection:text-white">
      <div className="w-full max-w-md min-h-screen bg-[#FAF7F2] flex flex-col pb-16 relative shadow-2xl md:my-6 md:rounded-[36px] md:overflow-hidden md:border md:border-[#EAE2DA]">
        
        {/* HERO BANNER FOTOGRÁFICO MARCANTE PARA CATEGORIAS QUE TÊM IMAGEM SIMBÓLICA */}
        {hasHeroImage ? (
          <div className="relative w-full h-56 overflow-hidden">
            <img
              src={section.coverImage}
              alt={section.title}
              className="w-full h-full object-cover brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-black/20 to-black/40"></div>

            {/* Botão de Voltar Flutuante */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <Link
                to="/"
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-center text-[#2C221E] hover:bg-white transition-all shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-medium shadow-xs">
                <DynamicIcon name={section.icon} className="w-3.5 h-3.5 text-[#C2847A]" />
                <span className="capitalize">{section.category || 'Guia'}</span>
              </div>
            </div>

            {/* Título Sobreposto no Hero */}
            <div className="absolute bottom-3 left-5 right-5">
              <span className="text-[10px] font-bold text-[#C2847A] uppercase tracking-widest bg-white/90 px-2 py-0.5 rounded-md shadow-xs inline-block mb-1">
                {section.shortTitle || section.title}
              </span>
              <h1 className="font-serif text-2xl font-bold text-[#2C221E] leading-tight drop-shadow-xs">
                {section.title}
              </h1>
            </div>
          </div>
        ) : (
          /* Header Padrão Minimalista (para categorias de listas de locais) */
          <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md px-5 py-4 border-b border-[#EAE2DA] flex items-center justify-between">
            <Link
              to="/"
              className="w-9 h-9 rounded-full bg-white border border-[#EAE2DA] flex items-center justify-center text-[#2C221E] hover:bg-[#F5EFEB] transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#F5EFEB] text-[#C2847A] flex items-center justify-center">
                <DynamicIcon name={section.icon} className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#2C221E] truncate max-w-[180px]">
                {section.title}
              </span>
            </div>
            <div className="w-9"></div>
          </header>
        )}

        {/* Conteúdo Principal */}
        <main className="p-5 space-y-6">
          
          {/* Subtítulo / Descrição se não for hero duplo */}
          {!hasHeroImage ? (
            <div>
              <span className="text-[10px] font-bold text-[#C2847A] uppercase tracking-widest">
                {section.category || 'Guia'}
              </span>
              <h1 className="font-serif text-2xl font-bold text-[#2C221E] mt-0.5">
                {section.title}
              </h1>
              {section.description && (
                <p className="text-xs text-[#6B5E57] mt-1 leading-relaxed">
                  {section.description}
                </p>
              )}
            </div>
          ) : (
            section.description && (
              <p className="text-xs text-[#6B5E57] -mt-2 leading-relaxed bg-[#F5EFEB]/50 p-3 rounded-xl border border-[#EAE2DA]/70">
                {section.description}
              </p>
            )
          )}

          {/* Cards Estruturados (Locais / Parceiros) */}
          {section.items && section.items.length > 0 && (
            <div className="space-y-4">
              {section.items.map((item, idx) => (
                <article
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden border border-[#EAE2DA] shadow-sm hover:shadow-md transition-shadow"
                >
                  {item.image && (
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {item.badge && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#C2847A] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-4 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#2C221E]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6B5E57] leading-relaxed">
                      {item.description}
                    </p>

                    {item.link && (
                      <div className="pt-2 flex items-center justify-end">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#C2847A] hover:text-[#8F5148] transition-colors"
                        >
                          Mais informações <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Texto Formatado da Seção (com estilo acolhedor) */}
          {section.text && (
            <div className="bg-white rounded-2xl p-5 border border-[#EAE2DA] shadow-sm text-xs text-[#2C221E] leading-relaxed space-y-3 whitespace-pre-line">
              {section.text}
            </div>
          )}

          {/* Dica da Anfitriã */}
          <div className="p-4 rounded-2xl bg-[#F5EFEB]/80 border border-[#EAE2DA] flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white text-[#C2847A] shadow-xs">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2C221E]">Dica da Anfitriã</p>
              <p className="text-[11px] text-[#6B5E57] mt-0.5">
                Deseja um roteiro sob medida para o seu tempo de estadia? Mande uma mensagem para nós!
              </p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B5E57] hover:text-[#C2847A]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao menu de seções
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
};
