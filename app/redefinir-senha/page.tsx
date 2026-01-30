'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function RedefinirSenhaPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Supabase automaticamente pega o token da URL
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // Usuário chegou pelo link de recuperação
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao redefinir a senha');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F6F1EC' }}>
        <div className="w-full max-w-md text-center">
          <div className="rounded-3xl p-10" style={{ backgroundColor: 'rgba(250,221,230,0.3)', boxShadow: '0 2px 12px rgba(200,174,125,0.1)' }}>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(215,237,221,0.5)' }}>
              <svg className="w-8 h-8" style={{ color: '#B8D9C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl mb-3" style={{ color: '#C8AE7D' }}>Senha redefinida!</h1>
            <p className="mb-8" style={{ color: 'rgba(23,23,23,0.6)' }}>
              Sua senha foi alterada com sucesso. Agora você pode entrar com sua nova senha.
            </p>
            <a 
              href="/login" 
              className="inline-block px-8 py-3 rounded-full font-medium hover:opacity-90" 
              style={{ backgroundColor: '#EADFCF', color: '#171717' }}
            >
              Ir para o login
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F6F1EC' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/">
            <img src="/logo.png" alt="Lory-Marie Club" className="w-20 h-20 mx-auto rounded-full mb-4" />
          </a>
          <h1 className="font-serif text-3xl" style={{ color: '#C8AE7D' }}>
            Criar nova senha
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'rgba(23,23,23,0.6)' }}>
            Digite sua nova senha abaixo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(250,221,230,0.3)', boxShadow: '0 2px 12px rgba(200,174,125,0.1)' }}>
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(220,38,38,0.1)', color: '#DC2626' }}>
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>Nova senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors"
              style={{ backgroundColor: '#F6F1EC', borderColor: '#D9A8B2', color: '#171717' }}
              placeholder="••••••••"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>Confirmar nova senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors"
              style={{ backgroundColor: '#F6F1EC', borderColor: '#D9A8B2', color: '#171717' }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full font-medium transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#EADFCF', color: '#171717' }}
          >
            {loading ? 'Salvando...' : 'Redefinir senha'}
          </button>
        </form>

        <p className="text-center mt-6">
          <a href="/login" className="text-sm hover:opacity-70" style={{ color: '#D9A8B2' }}>
            ← Voltar para o login
          </a>
        </p>
      </div>
    </main>
  );
}