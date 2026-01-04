'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    seeking: '',
    storyType: '',
    readingTime: '',
    clubExperience: '',
    preferredLine: '',
    dreamBooks: '',
    howFound: '',
  });

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenHash = params.get('token_hash');
      const type = params.get('type');
      
      if (tokenHash && type === 'signup') {
        await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'signup'
        });
        window.history.replaceState({}, '', '/onboarding');
      }
    };
    handleEmailConfirmation();
  }, []);

  const totalSteps = 10;

  const updateForm = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const seekingOptions = [
    { value: 'conhecimento', label: 'Expandir conhecimento e cultura', desc: 'Aprender coisas novas através da leitura' },
    { value: 'grupo', label: 'Um grupo de mulheres', desc: 'Conexão e amizades verdadeiras' },
    { value: 'reconexao', label: 'Reconexão comigo mesma', desc: 'Um tempo só meu, de autocuidado' },
    { value: 'menos-redes', label: 'Menos tempo nas redes sociais', desc: 'Trocar a tela por páginas' },
    { value: 'outro', label: 'Outro', desc: 'Tenho meus próprios motivos' },
  ];

  const storyTypeOptions = [
    { value: 'cuidado', label: 'Histórias de cura e autocuidado' },
    { value: 'romance', label: 'Romances que fazem o coração acelerar' },
    { value: 'suspense', label: 'Tramas envolventes e misteriosas' },
    { value: 'filosofia', label: 'Reflexões profundas sobre a vida' },
    { value: 'classicos', label: 'Clássicos que marcaram gerações' },
    { value: 'varios', label: 'Um pouco de tudo, depende do momento' },
  ];

  const readingTimeOptions = [
    { value: '15min', label: '15 minutinhos por dia', desc: 'Pequenos momentos fazem diferença' },
    { value: '30min', label: 'Cerca de 30 minutos', desc: 'Um tempinho dedicado à leitura' },
    { value: '1hora', label: 'Uma hora ou mais', desc: 'Adoro mergulhar nas histórias' },
    { value: 'fds', label: 'Só nos fins de semana', desc: 'Minha rotina não permite durante a semana' },
    { value: 'irregular', label: 'Varia muito', desc: 'Depende da fase da vida' },
  ];

  const clubExperienceOptions = [
    { value: 'nunca', label: 'Nunca participei', desc: 'Será minha primeira vez' },
    { value: 'ja', label: 'Já participei de um', desc: 'Tenho experiência com encontros' },
    { value: 'varios', label: 'Já participei de vários', desc: 'Adoro a experiência de clube' },
  ];

  const lineOptions = [
    { value: 'inner-garden', label: 'Inner Garden', desc: 'Autoconhecimento, calma e cuidado emocional. Para quem busca se reconectar consigo mesma.', color: 'rgba(215,237,221,0.5)', border: '#B8D9C0', seal: '/seal-inner-garden.png' },
    { value: 'secret-chapters', label: 'Secret Chapters', desc: 'Romances intensos e emocionantes. Para quem ama sentir o coração acelerar.', color: 'rgba(250,221,230,0.5)', border: '#D9A8B2', seal: '/seal-secrets.png' },
    { value: 'mirrors', label: 'Mirrors', desc: 'Filosofia, clássicos e grandes ideias. Para quem ama refletir sobre a vida.', color: 'rgba(234,223,207,0.5)', border: '#C8AE7D', seal: '/seal-mirrors.png' },
  ];

  const howFoundOptions = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'indicacao', label: 'Indicação de uma amiga' },
    { value: 'google', label: 'Pesquisa no Google' },
    { value: 'outro', label: 'Outro' },
  ];

  const getLineRecommendation = () => {
    return lineOptions.find(l => l.value === formData.preferredLine);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#F6F1EC' }}>
      <div className="w-full max-w-lg">
        {/* Progress */}
        {step < 10 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium" style={{ color: '#D9A8B2' }}>Passo {step} de {totalSteps}</span>
              <a href="/minha-conta" className="text-xs hover:opacity-70" style={{ color: 'rgba(23,23,23,0.4)' }}>Pular</a>
            </div>
            <div className="h-1 rounded-full" style={{ backgroundColor: 'rgba(217,168,178,0.2)' }}>
              <div className="h-1 rounded-full transition-all duration-500" style={{ backgroundColor: '#D9A8B2', width: `${(step / totalSteps) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Step 1: Nome */}
        {step === 1 && (
          <div className="text-center">
            <img src="/logo.png" alt="Lory-Marie Club" className="w-20 h-20 mx-auto mb-6 rounded-full" />
            <h1 className="font-serif text-3xl mb-3" style={{ color: '#C8AE7D' }}>Bem-vinda ao Clube de Leitura</h1>
            <p className="mb-8" style={{ color: 'rgba(23,23,23,0.6)' }}>Estamos felizes em te conhecer. Como podemos te chamar?</p>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateForm('name', e.target.value)}
              placeholder="Seu nome"
              className="w-full px-6 py-4 rounded-2xl border-2 text-center text-lg focus:outline-none mb-6"
              style={{ backgroundColor: 'white', borderColor: '#D9A8B2', color: '#171717' }}
            />
            <button
              onClick={nextStep}
              disabled={!formData.name.trim()}
              className="w-full py-4 rounded-full font-medium transition-all hover:opacity-90 disabled:opacity-40"
              style={{ backgroundColor: '#EADFCF', color: '#171717' }}
            >
              Continuar
            </button>
          </div>
        )}

        {/* Step 2: Idade */}
        {step === 2 && (
          <div className="text-center">
            <h1 className="font-serif text-3xl mb-3" style={{ color: '#C8AE7D' }}>Prazer, {formData.name}</h1>
            <p className="mb-8" style={{ color: 'rgba(23,23,23,0.6)' }}>Qual a sua idade?</p>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => updateForm('age', e.target.value)}
              placeholder="Sua idade"
              min="13"
              max="99"
              className="w-full px-6 py-4 rounded-2xl border-2 text-center text-lg focus:outline-none mb-6"
              style={{ backgroundColor: 'white', borderColor: '#D9A8B2', color: '#171717' }}
            />
            <div className="flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 rounded-full border-2 hover:opacity-70" style={{ borderColor: '#D9A8B2', color: '#D9A8B2' }}>Voltar</button>
              <button onClick={nextStep} disabled={!formData.age} className="flex-1 py-4 rounded-full font-medium hover:opacity-90 disabled:opacity-40" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Continuar</button>
            </div>
          </div>
        )}

        {/* Step 3: O que busca */}
        {step === 3 && (
          <div className="text-center">
            <h1 className="font-serif text-3xl mb-3" style={{ color: '#C8AE7D' }}>O que você busca, {formData.name}?</h1>
            <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>Escolha o que mais ressoa com você</p>
            <div className="space-y-3 mb-6">
              {seekingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateForm('seeking', option.value)}
                  className="w-full p-4 rounded-2xl border-2 text-left transition-all"
                  style={{ 
                    backgroundColor: formData.seeking === option.value ? 'rgba(250,221,230,0.4)' : 'white',
                    borderColor: formData.seeking === option.value ? '#D9A8B2' : 'rgba(217,168,178,0.3)'
                  }}
                >
                  <span className="font-medium block" style={{ color: '#171717' }}>{option.label}</span>
                  <span className="text-sm" style={{ color: 'rgba(23,23,23,0.5)' }}>{option.desc}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 rounded-full border-2 hover:opacity-70" style={{ borderColor: '#D9A8B2', color: '#D9A8B2' }}>Voltar</button>
              <button onClick={nextStep} disabled={!formData.seeking} className="flex-1 py-4 rounded-full font-medium hover:opacity-90 disabled:opacity-40" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Continuar</button>
            </div>
          </div>
        )}

        {/* Step 4: Tipo de história */}
        {step === 4 && (
          <div className="text-center">
            <h1 className="font-serif text-3xl mb-3" style={{ color: '#C8AE7D' }}>Que tipo de história você mais gosta?</h1>
            <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>Aquela que te faz perder a noção do tempo</p>
            <div className="space-y-3 mb-6">
              {storyTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateForm('storyType', option.value)}
                  className="w-full p-4 rounded-2xl border-2 transition-all"
                  style={{ 
                    backgroundColor: formData.storyType === option.value ? 'rgba(250,221,230,0.4)' : 'white',
                    borderColor: formData.storyType === option.value ? '#D9A8B2' : 'rgba(217,168,178,0.3)'
                  }}
                >
                  <span style={{ color: '#171717' }}>{option.label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 rounded-full border-2 hover:opacity-70" style={{ borderColor: '#D9A8B2', color: '#D9A8B2' }}>Voltar</button>
              <button onClick={nextStep} disabled={!formData.storyType} className="flex-1 py-4 rounded-full font-medium hover:opacity-90 disabled:opacity-40" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Continuar</button>
            </div>
          </div>
        )}

        {/* Step 5: Tempo de leitura */}
        {step === 5 && (
          <div className="text-center">
            <h1 className="font-serif text-3xl mb-3" style={{ color: '#C8AE7D' }}>Quanto tempo por dia você pode dedicar à leitura?</h1>
            <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>Não existe resposta errada</p>
            <div className="space-y-3 mb-6">
              {readingTimeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateForm('readingTime', option.value)}
                  className="w-full p-4 rounded-2xl border-2 text-left transition-all"
                  style={{ 
                    backgroundColor: formData.readingTime === option.value ? 'rgba(250,221,230,0.4)' : 'white',
                    borderColor: formData.readingTime === option.value ? '#D9A8B2' : 'rgba(217,168,178,0.3)'
                  }}
                >
                  <span className="font-medium block" style={{ color: '#171717' }}>{option.label}</span>
                  <span className="text-sm" style={{ color: 'rgba(23,23,23,0.5)' }}>{option.desc}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 rounded-full border-2 hover:opacity-70" style={{ borderColor: '#D9A8B2', color: '#D9A8B2' }}>Voltar</button>
              <button onClick={nextStep} disabled={!formData.readingTime} className="flex-1 py-4 rounded-full font-medium hover:opacity-90 disabled:opacity-40" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Continuar</button>
            </div>
          </div>
        )}

        {/* Step 6: Experiência com clube */}
        {step === 6 && (
          <div className="text-center">
            <h1 className="font-serif text-3xl mb-3" style={{ color: '#C8AE7D' }}>Já participou de um clube do livro?</h1>
            <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>Queremos saber mais sobre você</p>
            <div className="space-y-3 mb-6">
              {clubExperienceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateForm('clubExperience', option.value)}
                  className="w-full p-4 rounded-2xl border-2 text-left transition-all"
                  style={{ 
                    backgroundColor: formData.clubExperience === option.value ? 'rgba(250,221,230,0.4)' : 'white',
                    borderColor: formData.clubExperience === option.value ? '#D9A8B2' : 'rgba(217,168,178,0.3)'
                  }}
                >
                  <span className="font-medium block" style={{ color: '#171717' }}>{option.label}</span>
                  <span className="text-sm" style={{ color: 'rgba(23,23,23,0.5)' }}>{option.desc}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 rounded-full border-2 hover:opacity-70" style={{ borderColor: '#D9A8B2', color: '#D9A8B2' }}>Voltar</button>
              <button onClick={nextStep} disabled={!formData.clubExperience} className="flex-1 py-4 rounded-full font-medium hover:opacity-90 disabled:opacity-40" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Continuar</button>
            </div>
          </div>
        )}

        {/* Step 7: Linha preferida */}
        {step === 7 && (
          <div className="text-center">
            <h1 className="font-serif text-3xl mb-3" style={{ color: '#C8AE7D' }}>Com qual linha você mais se identifica?</h1>
            <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>Cada linha é uma jornada única</p>
            <div className="space-y-4 mb-6">
              {lineOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateForm('preferredLine', option.value)}
                  className="w-full p-5 rounded-2xl border-2 transition-all text-left"
                  style={{ 
                    backgroundColor: formData.preferredLine === option.value ? option.color : 'white',
                    borderColor: option.border,
                    borderWidth: formData.preferredLine === option.value ? '3px' : '2px'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <img src={option.seal} alt={option.label} className="w-14 h-14 flex-shrink-0" />
                    <div>
                      <span className="font-serif text-xl block mb-1" style={{ color: '#171717' }}>{option.label}</span>
                      <span className="text-sm leading-snug" style={{ color: 'rgba(23,23,23,0.6)' }}>{option.desc}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 rounded-full border-2 hover:opacity-70" style={{ borderColor: '#D9A8B2', color: '#D9A8B2' }}>Voltar</button>
              <button onClick={nextStep} disabled={!formData.preferredLine} className="flex-1 py-4 rounded-full font-medium hover:opacity-90 disabled:opacity-40" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Continuar</button>
            </div>
          </div>
        )}

        {/* Step 8: Livros dos sonhos */}
        {step === 8 && (
          <div className="text-center">
            <h1 className="font-serif text-3xl mb-3" style={{ color: '#C8AE7D' }}>Tem algum livro que você sonha em discutir?</h1>
            <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>Pode ser um que já leu, ou um da sua lista de desejos</p>
            <textarea
              value={formData.dreamBooks}
              onChange={(e) => updateForm('dreamBooks', e.target.value)}
              placeholder="Escreva aqui os livros que você gostaria de discutir com outras mulheres..."
              className="w-full px-5 py-4 rounded-2xl border-2 focus:outline-none mb-6 resize-none h-32"
              style={{ backgroundColor: 'white', borderColor: '#D9A8B2', color: '#171717' }}
            />
            <div className="flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 rounded-full border-2 hover:opacity-70" style={{ borderColor: '#D9A8B2', color: '#D9A8B2' }}>Voltar</button>
              <button onClick={nextStep} className="flex-1 py-4 rounded-full font-medium hover:opacity-90" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Continuar</button>
            </div>
          </div>
        )}

        {/* Step 9: Como conheceu */}
        {step === 9 && (
          <div className="text-center">
            <h1 className="font-serif text-3xl mb-3" style={{ color: '#C8AE7D' }}>Como você conheceu o Lory-Marie Club?</h1>
            <p className="mb-6" style={{ color: 'rgba(23,23,23,0.6)' }}>Isso nos ajuda a alcançar mais mulheres como você</p>
            <div className="space-y-3 mb-6">
              {howFoundOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateForm('howFound', option.value)}
                  className="w-full p-4 rounded-2xl border-2 transition-all"
                  style={{ 
                    backgroundColor: formData.howFound === option.value ? 'rgba(250,221,230,0.4)' : 'white',
                    borderColor: formData.howFound === option.value ? '#D9A8B2' : 'rgba(217,168,178,0.3)'
                  }}
                >
                  <span style={{ color: '#171717' }}>{option.label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prevStep} className="px-6 py-4 rounded-full border-2 hover:opacity-70" style={{ borderColor: '#D9A8B2', color: '#D9A8B2' }}>Voltar</button>
              <button onClick={nextStep} disabled={!formData.howFound} className="flex-1 py-4 rounded-full font-medium hover:opacity-90 disabled:opacity-40" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Ver meu resultado</button>
            </div>
          </div>
        )}

        {/* Step 10: Card Final */}
        {step === 10 && (
          <div className="text-center">
            <div className="rounded-3xl overflow-hidden mb-8" style={{ boxShadow: '0 8px 32px rgba(200,174,125,0.2)' }}>
              <div className="py-8 px-6" style={{ background: 'linear-gradient(135deg, rgba(250,221,230,0.6) 0%, rgba(234,223,207,0.6) 100%)' }}>
                {getLineRecommendation() && (
                  <img src={getLineRecommendation()?.seal} alt="" className="w-24 h-24 mx-auto mb-4" />
                )}
                <p className="text-sm font-medium tracking-wide uppercase mb-1" style={{ color: '#D9A8B2' }}>Sua linha</p>
                <h2 className="font-serif text-3xl" style={{ color: '#C8AE7D' }}>{getLineRecommendation()?.label}</h2>
              </div>
              
              <div className="py-8 px-6" style={{ backgroundColor: 'white' }}>
                <p className="font-serif text-2xl mb-6" style={{ color: '#171717' }}>
                  {formData.name}, esse é o seu momento.
                </p>
                <div className="space-y-4 text-left max-w-sm mx-auto">
                  <p style={{ color: 'rgba(23,23,23,0.7)' }}>
                    Um tempo só seu, para se reconectar com as histórias que fazem seu coração bater mais forte.
                  </p>
                  <p style={{ color: 'rgba(23,23,23,0.7)' }}>
                    Um espaço seguro, entre mulheres que, assim como você, acreditam no poder transformador da leitura.
                  </p>
                  <p style={{ color: 'rgba(23,23,23,0.7)' }}>
                    Sua melhor versão está a uma página de distância.
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-3 my-8">
                  <div className="h-px w-12" style={{ backgroundColor: 'rgba(200,174,125,0.3)' }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C8AE7D' }} />
                  <div className="h-px w-12" style={{ backgroundColor: 'rgba(200,174,125,0.3)' }} />
                </div>
                
                <p className="font-serif text-lg italic" style={{ color: '#C8AE7D' }}>
                  "Ler é encontrar-se em palavras que outra pessoa escreveu."
                </p>
              </div>
            </div>
            
            <h2 className="font-serif text-xl mb-3" style={{ color: '#171717' }}>Pronta para começar?</h2>
            <p className="mb-6 text-sm" style={{ color: 'rgba(23,23,23,0.6)' }}>Seu lugar no Clube de Leitura te espera</p>
            
            <a href="/#lines" className="block w-full py-4 rounded-full font-medium text-center hover:opacity-90 mb-4" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>
              Entrar no Clube
            </a>
            <a href="/minha-conta" className="text-sm hover:opacity-70 block" style={{ color: '#D9A8B2' }}>
              Voltar para minha conta
            </a>
          </div>
        )}
      </div>
    </main>
  );
}