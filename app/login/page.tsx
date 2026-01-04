'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Verifique seu email para confirmar o cadastro!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = '/minha-conta';
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F6F1EC' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/">
            <img src="/logo.png" alt="Lory-Marie Club" className="w-20 h-20 mx-auto rounded-full mb-4" />
          </a>
          <h1 className="font-serif text-3xl" style={{ color: '#C8AE7D' }}>
            {isSignUp ? 'Criar Conta' : 'Entrar no Salão'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(250,221,230,0.3)', boxShadow: '0 2px 12px rgba(200,174,125,0.1)' }}>
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(220,38,38,0.1)', color: '#DC2626' }}>
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors"
              style={{ backgroundColor: '#F6F1EC', borderColor: '#D9A8B2', color: '#171717' }}
              placeholder="seu@email.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: '#171717' }}>Senha</label>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full font-medium transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#EADFCF', color: '#171717' }}
          >
            {loading ? 'Aguarde...' : (isSignUp ? 'Criar Conta' : 'Entrar')}
          </button>

          <p className="text-center mt-6 text-sm" style={{ color: 'rgba(23,23,23,0.6)' }}>
            {isSignUp ? 'Já tem uma conta?' : 'Ainda não tem conta?'}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium hover:opacity-70"
              style={{ color: '#C8AE7D' }}
            >
              {isSignUp ? 'Entrar' : 'Criar conta'}
            </button>
          </p>
        </form>

        <p className="text-center mt-6">
          <a href="/" className="text-sm hover:opacity-70" style={{ color: '#D9A8B2' }}>
            ← Voltar para o início
          </a>
        </p>
      </div>
    </main>
  );
}