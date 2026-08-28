import React, { useEffect, useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';

export const LanguageTranslator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('pt');

  const popularLanguages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh-CN', name: '中文 (Mandarim)', flag: '🇨🇳' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ar', name: 'العربية (Árabe)', flag: '🇸🇦' },
    { code: 'ja', name: '日本語 (Japonês)', flag: '🇯🇵' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ko', name: '한국어 (Coreano)', flag: '🇰🇷' },
    { code: 'he', name: 'עברית (Hebraico)', flag: '🇮🇱' }
  ];

  useEffect(() => {
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'pt',
              autoDisplay: false
            },
            'google_translate_element'
          );
        }
      };
    }
  }, []);

  const changeLanguage = (langCode) => {
    setSelectedLang(langCode);
    setIsOpen(false);

    // Seleciona no elemento oculto do Google Translate
    const selectElem = document.querySelector('.goog-te-combo');
    if (selectElem) {
      selectElem.value = langCode;
      selectElem.dispatchEvent(new Event('change'));
    }
  };

  return (
    <div className="relative inline-block text-left z-50">
      {/* Elemento oculto */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      {/* Botão de Tradução Estilizado */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#EAE2DA] text-[#2C221E] hover:bg-white transition-all shadow-xs flex items-center gap-1.5 text-xs font-semibold"
      >
        <Globe className="w-3.5 h-3.5 text-[#C2847A]" />
        <span>Traduzir / Translate</span>
        <ChevronDown className="w-3 h-3 text-[#6B5E57] opacity-70" />
      </button>

      {/* Dropdown de Idiomas */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl p-2 border border-[#EAE2DA] shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1.5 border-b border-[#EAE2DA] mb-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#C2847A]">
              Idioma / Language / 语言
            </p>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-0.5 text-xs">
            {popularLanguages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => changeLanguage(lang.code)}
                className={'w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-colors ' + (
                  selectedLang === lang.code
                    ? 'bg-[#F5EFEB] text-[#C2847A] font-bold'
                    : 'text-[#2C221E] hover:bg-[#FAF7F2]'
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
                {selectedLang === lang.code && (
                  <Check className="w-3.5 h-3.5 text-[#C2847A]" />
                )}
              </button>
            ))}
          </div>

          <div className="p-2 border-t border-[#EAE2DA] mt-1 text-center bg-[#FAF7F2] rounded-xl">
            <p className="text-[9px] text-[#6B5E57]">
              Google Translate • 100+ idiomas
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
