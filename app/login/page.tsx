'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('criar') === 'true') {
      setIsSignUp(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: 'https://lory-marie-club.vercel.app/auth/callback'
          }
        });
        if (error) throw error;
        setShowConfirmation(true);
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

  if (showConfirmation) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F6F1EC' }}>
        <div className="w-full max-w-md text-center">
          <div className="rounded-3xl p-10" style={{ backgroundColor: 'rgba(250,221,230,0.3)', boxShadow: '0 2px 12px rgba(200,174,125,0.1)' }}>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(215,237,221,0.5)' }}>
              <svg className="w-8 h-8" style={{ color: '#B8D9C0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl mb-3" style={{ color: '#C8AE7D' }}>Verifique seu email</h1>
            <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>
              Enviamos um link de confirmação para <strong style={{ color: '#171717' }}>{email}</strong>
            </p>
            <p className="text-sm mb-8" style={{ color: 'rgba(23,23,23,0.5)' }}>
              Clique no link do email para ativar sua conta e começar sua jornada no clube.
            </p>
            <a href="/" className="inline-block px-8 py-3 rounded-full font-medium hover:opacity-90" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>
              Voltar para o início
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
            {isSignUp ? 'Criar Conta' : 'Entrar no Clube de Leitura'}
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