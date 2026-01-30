'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

// Dados dos livros por mês
const booksHistory = [
  {
    month: '2026-01',
    monthLabel: 'Janeiro 2026',
    book: 'A Metamorfose',
    author: 'Franz Kafka',
    music: 'Gymnopédie No. 1 - Erik Satie',
    musicUrl: 'https://open.spotify.com/intl-pt/album/3neXwl7vEq2ZqIRxV3DwFp'
  },
  {
    month: '2026-02',
    monthLabel: 'Fevereiro 2026',
    book: 'A Morte de Ivan Ilitch',
    author: 'Liev Tolstói',
    music: 'How to Disappear Completely - Radiohead',
    musicUrl: 'https://open.spotify.com/intl-pt/track/2rtGaCAeYtmcIvuZsvgTf6'
  }
];

// Mês atual
const currentMonth = '2026-02';
const currentBook = booksHistory.find(b => b.month === currentMonth);

export default function MirrorsPage() {
  const [user, setUser] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  
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
  
  const [history, setHistory] = useState<{[key: string]: any}>({});

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
        sub.product_name?.toLowerCase().includes('mirrors')
      );
      
      setHasAccess(access || false);
      setLoading(false);

      // Carregar caderno atual
      const saved = localStorage.getItem(`notebook-mirrors-${user.email}-${currentMonth}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setNotebook(parsed);
        setSavedNotebook(parsed);
      }
      
      // Carregar histórico de todos os meses
      const historyData: {[key: string]: any} = {};
      booksHistory.forEach(book => {
        const monthData = localStorage.getItem(`notebook-mirrors-${user.email}-${book.month}`);
        if (monthData) {
          historyData[book.month] = JSON.parse(monthData);
        }
      });
      setHistory(historyData);
    };
    checkAccess();
  }, []);

  const saveNotebook = () => {
    setSaving(true);
    localStorage.setItem(`notebook-mirrors-${user.email}-${currentMonth}`, JSON.stringify(notebook));
    setSavedNotebook(notebook);
    setHistory(prev => ({ ...prev, [currentMonth]: notebook }));
    setIsEditing(false);
    setTimeout(() => setSaving(false), 1000);
  };

  const hasChanges = JSON.stringify(notebook) !== JSON.stringify(savedNotebook);
  
  const hasContent = (data: any) => {
    return data && (data.citacoes || data.reflexoes || data.perguntas);
  };

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
          <img src="/seal-mirrors.png" alt="Mirrors" className="w-24 h-24 mx-auto mb-6" />
          <h1 className="font-serif text-3xl mb-4" style={{ color: '#C8AE7D' }}>Acesso restrito</h1>
          <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>Você precisa assinar Mirrors para acessar este conteúdo.</p>
          <a href="https://go.hotmart.com/V103665744N" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 rounded-full font-medium hover:opacity-90" style={{ backgroundColor: '#C8AE7D', color: '#171717' }}>
            Assinar Mirrors - R$29,90/mês
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
      <header className="py-4 px-6" style={{ backgroundColor: 'rgba(234,223,207,0.4)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/minha-conta" className="flex items-center gap-3">
            <img src="/seal-mirrors.png" alt="Mirrors" className="w-10 h-10" />
            <span className="font-serif text-lg" style={{ color: '#171717' }}>Mirrors</span>
          </a>
          <a href="/minha-conta" className="text-sm hover:opacity-70" style={{ color: '#C8AE7D' }}>
            Voltar
          </a>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl mb-4" style={{ color: '#C8AE7D' }}>Mirrors</h1>
          <p style={{ color: 'rgba(23,23,23,0.6)' }}>Filosofia, clássicos e grandes ideias</p>
        </div>

        {/* Livro do Mês */}
        <div className="rounded-3xl p-8 mb-8" style={{ backgroundColor: 'rgba(234,223,207,0.3)' }}>
          <h2 className="font-serif text-2xl mb-6 text-center" style={{ color: '#171717' }}>Livro do Mês - Fevereiro 2026</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src="/book-mirrors-fev.png" alt="Livro do mês" className="w-48 rounded-xl shadow-lg" />
            <div>
              <h3 className="font-serif text-xl mb-2" style={{ color: '#171717' }}>A Morte de Ivan Ilitch</h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(23,23,23,0.6)' }}>Liev Tolstói</p>
              <p className="leading-relaxed" style={{ color: 'rgba(23,23,23,0.7)' }}>
                Um clássico curto e poderoso sobre finitude, vaidade e o sentido da vida. Ao acompanhar os últimos dias de Ivan Ilitch, Tolstói expõe o vazio das convenções sociais, o medo da morte e a angústia de perceber — tarde demais — que se viveu de forma superficial. Uma leitura incômoda, silenciosa e profundamente humana, que funciona como espelho.
              </p>
            </div>
          </div>
        </div>

        {/* Encontro */}
        <div className="rounded-3xl p-8 mb-8" style={{ backgroundColor: 'rgba(250,221,230,0.2)' }}>
          <h2 className="font-serif text-2xl mb-4 text-center" style={{ color: '#171717' }}>Próximo Encontro</h2>
          <div className="text-center">
            <p className="text-lg mb-2" style={{ color: '#C8AE7D' }}>Quinta-feira, 19 de Março</p>
            <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>às 19h (horário de Brasília)</p>
            <a href="#" className="inline-block px-8 py-3 rounded-full font-medium hover:opacity-90" style={{ backgroundColor: '#C8AE7D', color: '#171717' }}>
              Entrar no encontro (Google Meet)
            </a>
            <p className="text-sm mt-4" style={{ color: 'rgba(23,23,23,0.5)' }}>O link será liberado no dia do encontro</p>
          </div>
        </div>

        {/* Grupo do WhatsApp */}
        <div className="rounded-3xl p-8 mb-8" style={{ backgroundColor: 'rgba(234,223,207,0.15)' }}>
          <h2 className="font-serif text-2xl mb-4 text-center" style={{ color: '#171717' }}>Grupo do WhatsApp</h2>
          <div className="text-center">
            <p className="mb-4" style={{ color: 'rgba(23,23,23,0.6)' }}>Participe do nosso grupo para trocar ideias, compartilhar citações e se conectar com outras leitoras</p>
            <a 
              href="https://chat.whatsapp.com/LC3lPliVAKzLsbvJqVZqA0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-full font-medium hover:opacity-90"
              style={{ backgroundColor: '#C8AE7D', color: '#171717' }}
            >
              Entrar no grupo
            </a>
          </div>
        </div>

        {/* Caderno de Reflexões Atual */}
        <div className="relative mb-8">
          <div className="absolute left-0 top-0 bottom-0 w-4 rounded-l-lg" style={{ backgroundColor: '#C8AE7D' }} />
          
          <div 
            className="ml-2 rounded-2xl overflow-hidden"
            style={{ 
              backgroundColor: '#FFFEF9',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(200,174,125,0.3)',
            }}
          >
            <div className="px-8 py-6" style={{ backgroundColor: 'rgba(234,223,207,0.3)', borderBottom: '2px solid #C8AE7D' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl" style={{ color: '#6B5D4A' }}>Meu Caderno de Reflexões</h2>
                  <p className="text-sm italic" style={{ color: 'rgba(107,93,74,0.6)' }}>Fevereiro 2026 • Anote para compartilhar no encontro</p>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all"
                    style={{ backgroundColor: '#C8AE7D', color: '#4A4035' }}
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
                      style={{ border: '1px solid #C8AE7D', color: '#6B5D4A' }}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={saveNotebook}
                      disabled={saving || !hasChanges}
                      className="px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all"
                      style={{ backgroundColor: '#C8AE7D', color: '#4A4035' }}
                    >
                      {saving ? 'Salvando...' : '✓ Salvar'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(200,174,125,0.3) 31px, rgba(200,174,125,0.3) 32px)' }}>
              
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#C8AE7D' }}>❝</span>
                  <label className="font-serif text-lg" style={{ color: '#6B5D4A' }}>Citações Favoritas</label>
                </div>
                {isEditing ? (
                  <textarea
                    value={notebook.citacoes}
                    onChange={(e) => setNotebook({...notebook, citacoes: e.target.value})}
                    placeholder="Copie aqui as frases do livro que mais te tocaram..."
                    className="w-full h-32 p-4 rounded-xl border-2 focus:outline-none resize-none transition-all"
                    style={{ backgroundColor: 'rgba(234,223,207,0.1)', borderColor: '#C8AE7D', color: '#171717', fontStyle: 'italic' }}
                  />
                ) : (
                  <div className="p-4 rounded-xl min-h-[80px]" style={{ backgroundColor: 'rgba(234,223,207,0.1)' }}>
                    <p className="italic" style={{ color: notebook.citacoes ? '#6B5D4A' : 'rgba(107,93,74,0.3)', whiteSpace: 'pre-wrap' }}>
                      {notebook.citacoes || 'Nenhuma citação adicionada ainda...'}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(200,174,125,0.4)' }} />
                <span style={{ color: '#C8AE7D' }}>◆</span>
                <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(200,174,125,0.4)' }} />
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#C8AE7D' }}>✧</span>
                  <label className="font-serif text-lg" style={{ color: '#6B5D4A' }}>Minhas Reflexões</label>
                </div>
                {isEditing ? (
                  <textarea
                    value={notebook.reflexoes}
                    onChange={(e) => setNotebook({...notebook, reflexoes: e.target.value})}
                    placeholder="O que o livro te fez pensar? Como se conecta com sua vida?"
                    className="w-full h-32 p-4 rounded-xl border-2 focus:outline-none resize-none transition-all"
                    style={{ backgroundColor: 'rgba(234,223,207,0.1)', borderColor: '#C8AE7D', color: '#171717' }}
                  />
                ) : (
                  <div className="p-4 rounded-xl min-h-[80px]" style={{ backgroundColor: 'rgba(234,223,207,0.1)' }}>
                    <p style={{ color: notebook.reflexoes ? '#6B5D4A' : 'rgba(107,93,74,0.3)', whiteSpace: 'pre-wrap' }}>
                      {notebook.reflexoes || 'Nenhuma reflexão adicionada ainda...'}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(200,174,125,0.4)' }} />
                <span style={{ color: '#C8AE7D' }}>◆</span>
                <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(200,174,125,0.4)' }} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: '#C8AE7D' }}>?</span>
                  <label className="font-serif text-lg" style={{ color: '#6B5D4A' }}>Perguntas para o Encontro</label>
                </div>
                {isEditing ? (
                  <textarea
                    value={notebook.perguntas}
                    onChange={(e) => setNotebook({...notebook, perguntas: e.target.value})}
                    placeholder="O que você gostaria de discutir com o grupo?"
                    className="w-full h-32 p-4 rounded-xl border-2 focus:outline-none resize-none transition-all"
                    style={{ backgroundColor: 'rgba(234,223,207,0.1)', borderColor: '#C8AE7D', color: '#171717' }}
                  />
                ) : (
                  <div className="p-4 rounded-xl min-h-[80px]" style={{ backgroundColor: 'rgba(234,223,207,0.1)' }}>
                    <p style={{ color: notebook.perguntas ? '#6B5D4A' : 'rgba(107,93,74,0.3)', whiteSpace: 'pre-wrap' }}>
                      {notebook.perguntas || 'Nenhuma pergunta adicionada ainda...'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Meu Histórico de Leituras */}
        <div className="rounded-3xl p-8 mb-8" style={{ backgroundColor: 'rgba(234,223,207,0.15)' }}>
          <h2 className="font-serif text-2xl mb-2 text-center" style={{ color: '#171717' }}>Meu Histórico de Leituras</h2>
          <p className="text-center text-sm mb-8" style={{ color: 'rgba(23,23,23,0.5)' }}>Suas anotações guardadas para reler quando quiser</p>
          
          <div className="grid gap-4">
            {booksHistory.map((book) => {
              const monthData = history[book.month];
              const isOpen = openFolder === book.month;
              const hasNotes = hasContent(monthData);
              
              return (
                <div key={book.month}>
                  {/* Pasta fechada */}
                  <button
                    onClick={() => setOpenFolder(isOpen ? null : book.month)}
                    className="w-full text-left transition-all hover:scale-[1.01]"
                  >
                    <div 
                      className="relative rounded-2xl p-5 flex items-center gap-4"
                      style={{ 
                        backgroundColor: isOpen ? 'rgba(200,174,125,0.3)' : '#FFFEF9',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(200,174,125,0.2)',
                      }}
                    >
                      {/* Ícone da pasta */}
                      <div 
                        className="w-14 h-12 rounded-lg flex items-center justify-center relative"
                        style={{ backgroundColor: '#C8AE7D' }}
                      >
                        <div 
                          className="absolute -top-1 left-1 w-6 h-2 rounded-t-md"
                          style={{ backgroundColor: '#B59D6E' }}
                        />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="font-serif text-lg" style={{ color: '#6B5D4A' }}>{book.monthLabel}</h3>
                        <p className="text-sm" style={{ color: 'rgba(107,93,74,0.6)' }}>{book.book}</p>
                      </div>
                      
                      {/* Indicador */}
                      <div className="flex items-center gap-2">
                        {hasNotes && (
                          <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(200,174,125,0.3)', color: '#6B5D4A' }}>
                            Com anotações
                          </span>
                        )}
                        <span style={{ color: '#C8AE7D', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                          ▼
                        </span>
                      </div>
                    </div>
                  </button>
                  
                  {/* Conteúdo da pasta aberta */}
                  {isOpen && (
                    <div 
                      className="mt-2 ml-4 rounded-2xl p-6 border-l-4"
                      style={{ 
                        backgroundColor: '#FFFEF9',
                        borderColor: '#C8AE7D',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      }}
                    >
                      {hasNotes ? (
                        <>
                          {monthData.citacoes && (
                            <div className="mb-6">
                              <p className="text-sm font-medium mb-2" style={{ color: '#6B5D4A' }}>❝ Citações Favoritas</p>
                              <p className="italic text-sm" style={{ color: 'rgba(107,93,74,0.8)', whiteSpace: 'pre-wrap' }}>{monthData.citacoes}</p>
                            </div>
                          )}
                          {monthData.reflexoes && (
                            <div className="mb-6">
                              <p className="text-sm font-medium mb-2" style={{ color: '#6B5D4A' }}>✧ Minhas Reflexões</p>
                              <p className="text-sm" style={{ color: 'rgba(107,93,74,0.8)', whiteSpace: 'pre-wrap' }}>{monthData.reflexoes}</p>
                            </div>
                          )}
                          {monthData.perguntas && (
                            <div>
                              <p className="text-sm font-medium mb-2" style={{ color: '#6B5D4A' }}>? Perguntas</p>
                              <p className="text-sm" style={{ color: 'rgba(107,93,74,0.8)', whiteSpace: 'pre-wrap' }}>{monthData.perguntas}</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-center py-4" style={{ color: 'rgba(107,93,74,0.4)' }}>
                          Nenhuma anotação salva para este mês ainda.
                        </p>
                      )}
                      
                      {/* Info do livro */}
                      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(200,174,125,0.3)' }}>
                        <a 
                          href={book.musicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs hover:opacity-70 transition-all"
                          style={{ color: '#6B5D4A' }}
                        >
                          🎵 {book.music} → Ouvir no Spotify
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Música Indicada */}
        <div className="rounded-3xl p-8" style={{ backgroundColor: 'rgba(250,221,230,0.15)' }}>
          <h2 className="font-serif text-2xl mb-6 text-center" style={{ color: '#171717' }}>Música Indicada</h2>
          <div className="text-center">
            <p className="font-medium text-lg mb-1" style={{ color: '#171717' }}>How to Disappear Completely</p>
            <p className="text-sm mb-4" style={{ color: 'rgba(23,23,23,0.6)' }}>Radiohead</p>
            <p className="text-sm mb-4" style={{ color: 'rgba(23,23,23,0.5)' }}>Uma melodia etérea e melancólica, perfeita para acompanhar a reflexão sobre finitude</p>
            <a 
              href="https://open.spotify.com/intl-pt/track/2rtGaCAeYtmcIvuZsvgTf6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 rounded-full text-sm font-medium hover:opacity-90"
              style={{ backgroundColor: '#C8AE7D', color: '#171717' }}
            >
              Ouvir no Spotify
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}