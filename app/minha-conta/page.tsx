'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function MinhaConta() {
  const [user, setUser] = useState<any>(null);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }

      // Verifica se já fez onboarding
      const didOnboarding = localStorage.getItem('lory-marie-onboarding-complete');
      if (!didOnboarding) {
        window.location.href = '/onboarding';
        return;
      }

      setUser(user);

      // Busca assinaturas do usuário
      const { data: subs } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('email', user.email?.toLowerCase())
        .eq('status', 'active');

      setSubscriptions(subs || []);
      setLoading(false);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const hasSubscription = (productName: string) => {
    return subscriptions.some(sub => 
      sub.product_name?.toLowerCase().includes(productName.toLowerCase())
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F6F1EC' }}>
        <p style={{ color: '#C8AE7D' }}>Carregando...</p>
      </main>
    );
  }

  const lines = [
    { 
      name: 'Inner Garden', 
      slug: 'inner-garden',
      desc: 'Autoconhecimento e cuidado emocional',
      color: 'rgba(215,237,221,0.3)', 
      border: '#B8D9C0',
      seal: '/seal-inner-garden.png',
      link: 'https://go.hotmart.com/T103665431V'
    },
    { 
      name: 'Secret Chapters', 
      slug: 'secret-chapters',
      desc: 'Romances intensos e emocionantes',
      color: 'rgba(250,221,230,0.3)', 
      border: '#D9A8B2',
      seal: '/seal-secrets.png',
      link: 'https://go.hotmart.com/C103665282D'
    },
    { 
      name: 'Mirrors', 
      slug: 'mirrors',
      desc: 'Filosofia e grandes ideias',
      color: 'rgba(234,223,207,0.3)', 
      border: 'rgba(200,174,125,0.5)',
      seal: '/seal-mirrors.png',
      link: 'https://go.hotmart.com/V103665744N'
    },
  ];

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
          Olá, bem-vinda!
        </h1>
        <p className="mb-8" style={{ color: 'rgba(23,23,23,0.6)' }}>{user?.email}</p>

        {/* Linhas de Leitura */}
        <h2 className="font-serif text-2xl mb-6" style={{ color: '#171717' }}>Suas Linhas de Leitura</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {lines.map((line) => {
            const hasAccess = hasSubscription(line.name);
            
            return (
              <div key={line.slug} className="rounded-2xl p-6 border-2" style={{ backgroundColor: line.color, borderColor: line.border }}>
                <img src={line.seal} alt={line.name} className="w-16 h-16 mx-auto mb-4" />
                <h3 className="font-serif text-xl text-center mb-2" style={{ color: '#171717' }}>{line.name}</h3>
                <p className="text-center text-sm mb-4" style={{ color: 'rgba(23,23,23,0.6)' }}>{line.desc}</p>
                <div className="text-center">
                  {hasAccess ? (
                    <a 
                      href={`/app/${line.slug}`}
                      className="inline-block w-full py-2 rounded-full text-sm font-medium hover:opacity-90"
                      style={{ backgroundColor: line.border, color: '#171717' }}
                    >
                      Acessar conteúdo
                    </a>
                  ) : (
                    <a 
                      href={line.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full py-2 rounded-full text-sm hover:opacity-90"
                      style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: 'rgba(23,23,23,0.6)' }}
                    >
                      Assinar - R$29,90/mês
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {subscriptions.length === 0 && (
          <div className="mt-12 text-center rounded-2xl p-8" style={{ backgroundColor: 'rgba(250,221,230,0.2)' }}>
            <h3 className="font-serif text-xl mb-4" style={{ color: '#C8AE7D' }}>Você ainda não tem nenhuma assinatura ativa</h3>
            <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>Escolha sua linha e faça parte do nosso clube de leitura</p>
            <a href="/#lines" className="inline-block px-8 py-3 rounded-full font-medium hover:opacity-90" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>
              Ver linhas de leitura
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
