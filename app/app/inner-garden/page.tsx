'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function InnerGardenPage() {
  const [user, setUser] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [notebook, setNotebook] = useState({
    citacoes: '',
    reflexoes: '',
    perguntas: ''
  });
  const [savedNotebook, setSavedNotebook] = useState({
    citacoes: '',
    reflexoes: '',
    perguntas: ''
  });

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
        sub.product_name?.toLowerCase().includes('inner garden')
      );
      
      setHasAccess(access || false);
      setLoading(false);

      const saved = localStorage.getItem(`notebook-inner-garden-${user.email}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setNotebook(parsed);
        setSavedNotebook(parsed);
      }
    };
    checkAccess();
  }, []);

  const saveNotebook = () => {
    setSaving(true);
    localStorage.setItem(`notebook-inner-garden-${user.email}`, JSON.stringify(notebook));
    setSavedNotebook(notebook);
    setIsEditing(false);
    setTimeout(() => setSaving(false), 1000);
  };

  const hasChanges = JSON.stringify(notebook) !== JSON.stringify(savedNotebook);

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
          <img src="/seal-inner-garden.png" alt="Inner Garden" className="w-24 h-24 mx-auto mb-6" />
          <h1 className="font-serif text-3xl mb-4" style={{ color: '#C8AE7D' }}>Acesso restrito</h1>
          <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>Você precisa assinar Inner Garden para acessar este conteúdo.</p>
          <a href="https://go.hotmart.com/T103665431V" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 rounded-full font-medium hover:opacity-90" style={{ backgroundColor: '#B8D9C0', color: '#171717' }}>
            Assinar Inner Garden - R$29,90/mês
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
      <header className="py-4 px-6" style={{ backgroundColor: 'rgba(215,237,221,0.4)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/minha-conta" className="flex items-center gap-3">
            <img src="/seal-inner-garden.png" alt="Inner Garden" className="w-10 h-10" />
            <span className="font-serif text-lg" style={{ color: '#171717' }}>Inner Garden</span>
          </a>
          <a href="/minha-conta" className="text-sm hover:opacity-70" style={{ color: '#B8D9C0' }}>
            Voltar
          </a>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl mb-4" style={{ color: '#C8AE7D' }}>Inner Garden</h1>
          <p style={{ color: 'rgba(23,23,23,0.6)' }}>Autoconhecimento, calma e cuidado emocional</p>
        </div>

        {/* Livro do Mês */}
        <div className="rounded-3xl p-8 mb-8" style={{ backgroundColor: 'rgba(215,237,221,0.3)' }}>
          <h2 className="font-serif text-2xl mb-6 text-center" style={{ color: '#171717' }}>Livro do Mês - Janeiro/Fevereiro 2026</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src="/book-inner-garden.PNG" alt="Livro do mês" className="w-48 rounded-xl shadow-lg" />
            <div>
              <h3 className="font-serif text-xl mb-2" style={{ color: '#171717' }}>As coisas que você só vê quando desacelera</h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(23,23,23,0.6)' }}>Haemin Sunim</p>
              <p className="leading-relaxed" style={{ color: 'rgba(23,23,23,0.7)' }}>
                Um convite gentil para pausar, respirar e olhar para dentro. Haemin Sunim, um dos líderes espirituais mais influentes da Coreia do Sul, nos guia com sabedoria e compaixão através das pressões do dia a dia, oferecendo insights sobre autocompaixão, relacionamentos e a arte de viver com mais leveza.
              </p>
            </div>
          </div>
        </div>

        {/* Encontro */}
        <div className="rounded-3xl p-8 mb-8" style={{ backgroundColor: 'rgba(250,221,230,0.2)' }}>
          <h2 className="font-serif text-2xl mb-4 text-center" style={{ color: '#171717' }}>Próximo Encontro</h2>
          <div className="text-center">
            <p className="text-lg mb-2" style={{ color: '#C8AE7D' }}>Terça-feira, 11 de Fevereiro</p>
            <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>às 19h (horário de Brasília)</p>
            <a href="#" className="inline-block px-8 py-3 rounded-full font-medium hover:opacity-90" style={{ backgroundColor: '#B8D9C0', color: '#171717' }}>
              Entrar no encontro (Google Meet)
            </a>
            <p className="text-sm mt-4" style={{ color: 'rgba(23,23,23,0.5)' }}>O link será liberado no dia do encontro</p>
          </div>
        </div>

        {/* Grupo do WhatsApp */}
        <div className="rounded-3xl p-8 mb-8" style={{ backgroundColor: 'rgba(215,237,221,0.15)' }}>
          <h2 className="font-serif text-2xl mb-4 text-center" style={{ color: '#171717' }}>Grupo do WhatsApp</h2>
          <div className="text-center">
            <p className="mb-4" style={{ color: 'rgba(23,23,23,0.6)' }}>Participe do nosso grupo para trocar ideias, compartilhar citações e se conectar com outras leitoras</p>
            <a 
              href="https://chat.whatsapp.com/Jy7nxwUAB0bFO5nquZNnBZ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-full font-medium hover:opacity-90"
              style={{ backgroundColor: '#B8D9C0', color: '#171717' }}
            >
              Entrar no grupo
            </a>
          </div>
        </div>

        {/* Caderno de Reflexões - Estilo Elegante */}
        <div className="relative mb-8">
          {/* Lombada do caderno */}
          <div className="absolute left-0 top-0 bottom-0 w-4 rounded-l-lg" style={{ backgroundColor: '#B8D9C0' }} />
          
          {/* Caderno */}
          <div 
            className="ml-2 rounded-2xl overflow-hidden"
            style={{ 
              backgroundColor: '#FFFEF9',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(184,217,192,0.3)',
            }}
          >
            {/* Capa do caderno */}
            <div className="px-8 py-6" style={{ backgroundColor: 'rgba(215,237,221,0.3)', borderBottom: '2px solid #B8D9C0' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl" style={{ color: '#4A5D4F' }}>Meu Caderno de Reflexões</h2>
                  <p className="text-sm italic" style={{ color: 'rgba(74,93,79,0.6)' }}>Anote para compartilhar no encontro</p>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all"
                    style={{ backgroundColor: '#B8D9C0', color: '#2D3B2F' }}
                  >
                    ✎ Editar
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setNotebook(savedNotebook);
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 rounded-full text-sm font-medium hover:opacity-70 transition-all"
                      style={{ border: '1px solid #B8D9C0', color: '#4A5D4F' }}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={saveNotebook}
                      disabled={saving || !hasChanges}
                      className="px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all"
                      style={{ backgroundColor: '#B8D9C0', color: '#2D3B2F' }}
                    >
                      {saving ? 'Salvando...' : '✓ Salvar'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Páginas do caderno */}
            <div className="p-8" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(184,217,192,0.3) 31px, rgba(184,217,192,0.3) 32px)' }}>
              
              {/* Citações Favoritas */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#B8D9C0' }}>❝</span>
                  <label className="font-serif text-lg" style={{ color: '#4A5D4F' }}>
                    Citações Favoritas
                  </label>
                </div>
                {isEditing ? (
                  <textarea
                    value={notebook.citacoes}
                    onChange={(e) => setNotebook({...notebook, citacoes: e.target.value})}
                    placeholder="Copie aqui as frases do livro que mais te tocaram..."
                    className="w-full h-32 p-4 rounded-xl border-2 focus:outline-none resize-none transition-all"
                    style={{ 
                      backgroundColor: 'rgba(215,237,221,0.1)', 
                      borderColor: '#B8D9C0', 
                      color: '#171717',
                      fontStyle: 'italic'
                    }}
                  />
                ) : (
                  <div className="p-4 rounded-xl min-h-[80px]" style={{ backgroundColor: 'rgba(215,237,221,0.1)' }}>
                    <p className="italic" style={{ color: notebook.citacoes ? '#4A5D4F' : 'rgba(74,93,79,0.3)', whiteSpace: 'pre-wrap' }}>
                      {notebook.citacoes || 'Nenhuma citação adicionada ainda...'}
                    </p>
                  </div>
                )}
              </div>

              {/* Divisor elegante */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(184,217,192,0.4)' }} />
                <span style={{ color: '#B8D9C0' }}>✿</span>
                <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(184,217,192,0.4)' }} />
              </div>

              {/* Reflexões */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#B8D9C0' }}>♡</span>
                  <label className="font-serif text-lg" style={{ color: '#4A5D4F' }}>
                    Minhas Reflexões
                  </label>
                </div>
                {isEditing ? (
                  <textarea
                    value={notebook.reflexoes}
                    onChange={(e) => setNotebook({...notebook, reflexoes: e.target.value})}
                    placeholder="O que o livro te fez pensar? Como se conecta com sua vida?"
                    className="w-full h-32 p-4 rounded-xl border-2 focus:outline-none resize-none transition-all"
                    style={{ 
                      backgroundColor: 'rgba(215,237,221,0.1)', 
                      borderColor: '#B8D9C0', 
                      color: '#171717' 
                    }}
                  />
                ) : (
                  <div className="p-4 rounded-xl min-h-[80px]" style={{ backgroundColor: 'rgba(215,237,221,0.1)' }}>
                    <p style={{ color: notebook.reflexoes ? '#4A5D4F' : 'rgba(74,93,79,0.3)', whiteSpace: 'pre-wrap' }}>
                      {notebook.reflexoes || 'Nenhuma reflexão adicionada ainda...'}
                    </p>
                  </div>
                )}
              </div>

              {/* Divisor elegante */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(184,217,192,0.4)' }} />
                <span style={{ color: '#B8D9C0' }}>✿</span>
                <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(184,217,192,0.4)' }} />
              </div>

              {/* Perguntas para o Encontro */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#B8D9C0' }}>?</span>
                  <label className="font-serif text-lg" style={{ color: '#4A5D4F' }}>
                    Perguntas para o Encontro
                  </label>
                </div>
                {isEditing ? (
                  <textarea
                    value={notebook.perguntas}
                    onChange={(e) => setNotebook({...notebook, perguntas: e.target.value})}
                    placeholder="O que você gostaria de discutir com o grupo?"
                    className="w-full h-32 p-4 rounded-xl border-2 focus:outline-none resize-none transition-all"
                    style={{ 
                      backgroundColor: 'rgba(215,237,221,0.1)', 
                      borderColor: '#B8D9C0', 
                      color: '#171717' 
                    }}
                  />
                ) : (
                  <div className="p-4 rounded-xl min-h-[80px]" style={{ backgroundColor: 'rgba(215,237,221,0.1)' }}>
                    <p style={{ color: notebook.perguntas ? '#4A5D4F' : 'rgba(74,93,79,0.3)', whiteSpace: 'pre-wrap' }}>
                      {notebook.perguntas || 'Nenhuma pergunta adicionada ainda...'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Música Indicada */}
        <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(234,223,207,0.2)' }}>
          <h2 className="font-serif text-2xl mb-6 text-center" style={{ color: '#171717' }}>Música Indicada</h2>
          <div className="text-center">
            <p className="font-medium text-lg mb-1" style={{ color: '#171717' }}>River Flows in You</p>
            <p className="text-sm mb-4" style={{ color: 'rgba(23,23,23,0.6)' }}>Yiruma</p>
            <p className="text-sm mb-4" style={{ color: 'rgba(23,23,23,0.5)' }}>Uma melodia de piano suave e contemplativa, perfeita para acompanhar sua leitura</p>
            <a 
              href="https://open.spotify.com/intl-pt/track/2agBDIr9MYDUducQPC1sFU" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 rounded-full text-sm font-medium hover:opacity-90"
              style={{ backgroundColor: '#B8D9C0', color: '#171717' }}
            >
              Ouvir no Spotify
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}