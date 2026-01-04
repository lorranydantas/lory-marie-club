'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function MinhaConta() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F6F1EC' }}>
        <p style={{ color: '#C8AE7D' }}>Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F6F1EC' }}>
      {/* Header */}
      <header className="py-4 px-6" style={{ backgroundColor: 'rgba(250,221,230,0.3)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Lory-Marie Club" className="w-10 h-10 rounded-full" />
            <span className="font-serif text-lg" style={{ color: '#C8AE7D' }}>Lory-Marie Club</span>
          </a>
          <button onClick={handleLogout} className="text-sm hover:opacity-70" style={{ color: '#D9A8B2' }}>
            Sair
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-serif text-3xl mb-2" style={{ color: '#C8AE7D' }}>
          Olá, bem-vinda! 💕
        </h1>
        <p className="mb-8" style={{ color: 'rgba(23,23,23,0.6)' }}>{user?.email}</p>

        {/* Linhas de Leitura */}
        <h2 className="font-serif text-2xl mb-6" style={{ color: '#171717' }}>Suas Linhas de Leitura</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Inner Garden */}
          <div className="rounded-2xl p-6 border-2" style={{ backgroundColor: 'rgba(215,237,221,0.3)', borderColor: '#B8D9C0' }}>
            <img src="/seal-inner-garden.png" alt="Inner Garden" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-center mb-2" style={{ color: '#171717' }}>Inner Garden</h3>
            <p className="text-center text-sm mb-4" style={{ color: 'rgba(23,23,23,0.6)' }}>Autoconhecimento e cuidado emocional</p>
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(184,217,192,0.5)', color: '#171717' }}>
                🔒 Assine para acessar
              </span>
            </div>
          </div>

          {/* Secret Chapters */}
          <div className="rounded-2xl p-6 border-2" style={{ backgroundColor: 'rgba(250,221,230,0.3)', borderColor: '#D9A8B2' }}>
            <img src="/seal-secrets.png" alt="Secret Chapters" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-center mb-2" style={{ color: '#171717' }}>Secret Chapters</h3>
            <p className="text-center text-sm mb-4" style={{ color: 'rgba(23,23,23,0.6)' }}>Romances intensos e emocionantes</p>
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(217,168,178,0.5)', color: '#171717' }}>
                🔒 Assine para acessar
              </span>
            </div>
          </div>

          {/* Mirrors */}
          <div className="rounded-2xl p-6 border-2" style={{ backgroundColor: 'rgba(234,223,207,0.3)', borderColor: 'rgba(200,174,125,0.5)' }}>
            <img src="/seal-mirrors.png" alt="Mirrors" className="w-16 h-16 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-center mb-2" style={{ color: '#171717' }}>Mirrors</h3>
            <p className="text-center text-sm mb-4" style={{ color: 'rgba(23,23,23,0.6)' }}>Filosofia e grandes ideias</p>
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-full text-xs" style={{ backgroundColor: 'rgba(200,174,125,0.3)', color: '#171717' }}>
                🔒 Assine para acessar
              </span>
            </div>
          </div>
        </div>

        {/* CTA para assinar */}
        <div className="mt-12 text-center rounded-2xl p-8" style={{ backgroundColor: 'rgba(250,221,230,0.2)' }}>
          <h3 className="font-serif text-xl mb-4" style={{ color: '#C8AE7D' }}>Quer desbloquear as linhas de leitura?</h3>
          <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>Escolha sua linha e faça parte do nosso salão de leitura</p>
          <a href="/#join" className="inline-block px-8 py-3 rounded-full font-medium hover:opacity-90" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>
            Ver planos - R$29,90/mês
          </a>
        </div>
      </div>
    </main>
  );
}