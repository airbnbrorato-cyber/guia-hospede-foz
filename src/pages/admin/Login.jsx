import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { auth } from '../../services/firebase';
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
      // Autenticação oficial no Firebase Auth
      await signInWithEmailAndPassword(auth, email.trim(), password);
      dataService.setAuthStatus(true);
      navigate('/admin');
    } catch (err) {
      console.error('Erro de autenticação no Firebase:', err.code, err.message);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('E-mail ou senha incorretos. Verifique suas credenciais no Firebase.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Muitas tentativas sem sucesso. Aguarde alguns minutos e tente novamente.');
      } else {
        setError('Falha ao autenticar. Verifique seus dados e tente novamente.');
      }
      dataService.setAuthStatus(false);
    } finally {
      setLoading(false);
    }
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
            Acesso exclusivo para anfitriões autorizados.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs leading-relaxed font-medium">
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
                placeholder="seu-email@gmail.com"
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
            className="w-full py-3 bg-[#C2847A] hover:bg-[#B17268] text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
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
            onClick={() => navigate('/')}
            className="text-xs text-[#6B5E57] hover:text-[#C2847A] inline-flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Guia do Hóspede
          </button>
        </div>

      </div>
    </div>
  );
};
