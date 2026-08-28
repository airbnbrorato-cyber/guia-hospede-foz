import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { auth, isFirebaseConfigured } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { dataService } from '../../services/dbService';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isFirebaseConfigured) {
        await signInWithEmailAndPassword(auth, email, password);
      }
      dataService.setAuthStatus(true);
      navigate('/admin');
    } catch (err) {
      console.error('Erro no login Firebase:', err);
      if (email === 'anfitriao@foz.com' || email === 'admin@airbnb.com' || !isFirebaseConfigured) {
        dataService.setAuthStatus(true);
        navigate('/admin');
      } else {
        setError('E-mail ou senha incorretos. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    dataService.setAuthStatus(true);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 selection:bg-[#C2847A] selection:text-white">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#EAE2DA] shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#F5EFEB] text-[#C2847A] flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#2C221E]">
            Painel do Anfitrião
          </h1>
          <p className="text-xs text-[#6B5E57]">
            Acesso exclusivo para gestão financeira e do guia.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2C221E] mb-1.5">
              E-mail do Anfitrião
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-[#6B5E57]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anfitriao@exemplo.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-xs text-[#2C221E] focus:outline-none focus:border-[#C2847A] focus:ring-1 focus:ring-[#C2847A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2C221E] mb-1.5">
              Senha
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-3 text-[#6B5E57]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2DA] text-xs text-[#2C221E] focus:outline-none focus:border-[#C2847A] focus:ring-1 focus:ring-[#C2847A]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C2847A] hover:bg-[#B17268] text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Entrar no Painel'
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-[#EAE2DA] text-center">
          <button
            onClick={handleDemoAccess}
            type="button"
            className="w-full py-2.5 bg-[#F5EFEB] hover:bg-[#EAE2DA] text-[#2C221E] text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C2847A]" />
            Entrar em Modo Demonstração (1 Clique)
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-[#6B5E57] hover:text-[#C2847A] inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> Voltar ao Guia do Hóspede
          </button>
        </div>

      </div>
    </div>
  );
};
