'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function SecretChaptersPage() {
  const [user, setUser] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }
      setUser(user);

      const { data: subs } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('email', user.email?.toLowerCase())
        .eq('status', 'active');

      const access = subs?.some(sub => 
        sub.product_name?.toLowerCase().includes('secret')
      );
      
      setHasAccess(access || false);
      setLoading(false);
    };
    checkAccess();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F6F1EC' }}>
        <p style={{ color: '#C8AE7D' }}>Carregando...</p>
      </main>
    );
  }

  if (!hasAccess) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F6F1EC' }}>
        <div className="text-center max-w-md">
          <img src="/seal-secrets.png" alt="Secret Chapters" className="w-24 h-24 mx-auto mb-6" />
          <h1 className="font-serif text-3xl mb-4" style={{ color: '#C8AE7D' }}>Acesso restrito</h1>
          <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>Você precisa assinar Secret Chapters para acessar este conteúdo.</p>
          <a href="https://go.hotmart.com/C103665282D" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 rounded-full font-medium hover:opacity-90" style={{ backgroundColor: '#D9A8B2', color: '#171717' }}>
            Assinar Secret Chapters - R$29,90/mês
          </a>
          <p className="mt-4">
            <a href="/minha-conta" className="text-sm hover:opacity-70" style={{ color: '#D9A8B2' }}>Voltar para minha conta</a>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F6F1EC' }}>
      {/* Header */}
      <header className="py-4 px-6" style={{ backgroundColor: 'rgba(250,221,230,0.4)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/minha-conta" className="flex items-center gap-3">
            <img src="/seal-secrets.png" alt="Secret Chapters" className="w-10 h-10" />
            <span className="font-serif text-lg" style={{ color: '#171717' }}>Secret Chapters</span>
          </a>
          <a href="/minha-conta" className="text-sm hover:opacity-70" style={{ color: '#D9A8B2' }}>
            Voltar
          </a>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl mb-4" style={{ color: '#C8AE7D' }}>Secret Chapters</h1>
          <p style={{ color: 'rgba(23,23,23,0.6)' }}>Romances intensos e emocionantes</p>
        </div>

        {/* Livro do Mês */}
        <div className="rounded-3xl p-8 mb-8" style={{ backgroundColor: 'rgba(250,221,230,0.3)' }}>
          <h2 className="font-serif text-2xl mb-6 text-center" style={{ color: '#171717' }}>Livro do Mês - Janeiro 2026</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src="/book-secrets.PNG" alt="Livro do mês" className="w-48 rounded-xl shadow-lg" />
            <div>
              <h3 className="font-serif text-xl mb-2" style={{ color: '#171717' }}>Título do Livro</h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(23,23,23,0.6)' }}>Autor do Livro</p>
              <p className="leading-relaxed" style={{ color: 'rgba(23,23,23,0.7)' }}>
                Descrição do livro e por que escolhemos ele para este mês. 
                Uma breve sinopse que desperte a curiosidade sem dar spoilers.
              </p>
            </div>
          </div>
        </div>

        {/* Encontro */}
        <div className="rounded-3xl p-8 mb-8" style={{ backgroundColor: 'rgba(215,237,221,0.2)' }}>
          <h2 className="font-serif text-2xl mb-4 text-center" style={{ color: '#171717' }}>Próximo Encontro</h2>
          <div className="text-center">
            <p className="text-lg mb-2" style={{ color: '#C8AE7D' }}>Sábado, 25 de Janeiro</p>
            <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>às 18h (horário de Brasília)</p>
            <a href="#" className="inline-block px-8 py-3 rounded-full font-medium hover:opacity-90" style={{ backgroundColor: '#D9A8B2', color: '#171717' }}>
              Entrar no encontro (Google Meet)
            </a>
            <p className="text-sm mt-4" style={{ color: 'rgba(23,23,23,0.5)' }}>O link será liberado no dia do encontro</p>
          </div>
        </div>

        {/* Materiais */}
        <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(234,223,207,0.2)' }}>
          <h2 className="font-serif text-2xl mb-6 text-center" style={{ color: '#171717' }}>Materiais de Apoio</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
              <span style={{ color: '#171717' }}>Guia de reflexões para a leitura</span>
              <span className="text-sm" style={{ color: 'rgba(23,23,23,0.4)' }}>Em breve</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
              <span style={{ color: '#171717' }}>Playlist do mês</span>
              <span className="text-sm" style={{ color: 'rgba(23,23,23,0.4)' }}>Em breve</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}