'use client';

import { useState, useEffect } from 'react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'Nosso Clube' },
    { href: '#reading-lines', label: 'Linhas de Leitura' },
    { href: '#books-of-the-month', label: 'Livros do Mês' },
    { href: '#how-it-works', label: 'Como Funciona' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`} style={{ backgroundColor: isScrolled ? 'rgba(246,241,236,0.95)' : 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="/logo.png" alt="Lory-Marie Club" className="w-full h-full object-cover" />
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: '#171717' }}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="/login" className="text-sm font-medium px-4 py-2 rounded-full border transition-all hover:opacity-70" style={{ color: '#171717', borderColor: '#D9A8B2' }}>
              Login
            </a>
            <a href="#join" className="text-sm font-medium px-6 py-2.5 rounded-full transition-all hover:opacity-90" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>
              Entrar no Clube
            </a>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2" style={{ color: '#171717' }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4" style={{ backgroundColor: 'rgba(246,241,236,0.98)', borderTop: '1px solid rgba(217,168,178,0.2)' }}>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium px-4 py-2" style={{ color: '#171717' }}>
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-4" style={{ borderTop: '1px solid rgba(217,168,178,0.2)' }}>
                <a href="/login" className="text-sm font-medium py-2" style={{ color: '#171717' }}>Login</a>
                <a hhref="/login" className="text-sm font-medium px-6 py-2.5 rounded-full text-center" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Entrar no Clube</a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero-books.png')" }} />
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(250,221,230,0.6)', backdropFilter: 'blur(2px)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(246,241,236,0.2) 0%, rgba(250,221,230,0.3) 50%, rgba(246,241,236,0.85) 100%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-32">
        <p className="font-script text-2xl sm:text-3xl mb-6" style={{ color: '#C8AE7D' }}>Lory-Marie Club – Salão de Leitura</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight" style={{ color: '#171717' }}>
          Um salão de leitura para <span style={{ color: '#C8AE7D' }}>corações</span> que amam histórias.
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#171717', opacity: 0.8 }}>
          Um clube do livro íntimo e feminino onde cada livro é tratado como um pequeno ritual de autocuidado.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/login" className="w-full sm:w-auto text-center font-medium px-8 py-4 rounded-full transition-all text-lg shadow-lg hover:opacity-90" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>
            Entrar no Salão de Leitura
          </a>
          <a href="#reading-lines" className="font-medium transition-colors hover:opacity-70" style={{ color: '#C8AE7D' }}>
            Ver as linhas de leitura →
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6" style={{ color: '#C8AE7D' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

function AboutAndIsForYou() {
  const items = [
    "você quer voltar a ler com carinho, sem pressão ou metas impossíveis.",
    "você sente falta de conversar sobre livros e, ao mesmo tempo, sobre a sua própria vida.",
    "você ama histórias que curam, romances que fazem chorar e ideias que fazem pensar.",
    "você procura um espaço delicado, seguro e feminino só para mulheres.",
  ];

  return (
    <section id="about" className="py-24 px-4" style={{ backgroundColor: '#F6F1EC' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl p-8 sm:p-10" style={{ backgroundColor: 'rgba(234,223,207,0.5)', boxShadow: '0 2px 12px rgba(200,174,125,0.1)' }}>
            <h2 className="font-serif text-3xl text-center mb-6" style={{ color: '#C8AE7D' }}>Nosso Clube</h2>
            <div className="space-y-4 text-center leading-relaxed" style={{ color: 'rgba(23,23,23,0.8)' }}>
              <p>O Lory-Marie Club nasceu como um refúgio emocional: um clube do livro íntimo e feminino onde os livros são tratados como pequenos rituais de autocuidado.</p>
              <p>Aqui não há pressa. Cada encontro é uma pausa gentil para ler, sentir, conversar e guardar memórias – como quem escreve num diário, dobra cartas antigas ou guarda fitas de seda numa caixa especial.</p>
            </div>
            <p className="text-center text-sm mt-6 font-medium" style={{ color: '#D9A8B2' }}>Encontros mensais online · 1h–1h30</p>
          </div>

          <div className="rounded-3xl p-8 sm:p-10" style={{ backgroundColor: 'rgba(250,221,230,0.4)', boxShadow: '0 2px 12px rgba(200,174,125,0.1)' }}>
            <h2 className="font-serif text-3xl text-center mb-6" style={{ color: '#C8AE7D' }}>É para você se...</h2>
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center">
                    <svg className="w-4 h-4" style={{ color: '#D9A8B2' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="leading-relaxed text-sm" style={{ color: 'rgba(23,23,23,0.8)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReadingLines() {
  const lines = [
    { name: "Inner Garden", description: "Livros de autoconhecimento, calma e cuidado emocional – para cuidar do seu jardim interno.", bgColor: 'rgba(215,237,221,0.5)', borderColor: '#B8D9C0', seal: "/seal-inner-garden.png" },
    { name: "Secret Chapters", description: "Romances intensos e emocionantes – o tipo de história que faz sentir, chorar e abraçar o livro no final.", bgColor: 'rgba(250,221,230,0.5)', borderColor: '#D9A8B2', seal: "/seal-secrets.png" },
    { name: "Mirrors", description: "Filosofia, clássicos e grandes ideias – livros que refletem quem você é e quem está se tornando.", bgColor: 'rgba(234,223,207,0.5)', borderColor: 'rgba(200,174,125,0.5)', seal: "/seal-mirrors.png" },
  ];

  return (
    <section id="reading-lines" className="py-24 px-4" style={{ backgroundColor: 'rgba(250,221,230,0.1)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl mb-4" style={{ color: '#C8AE7D' }}>Três Linhas de Leitura</h2>
          <p style={{ color: 'rgba(23,23,23,0.6)' }}>Para cada tipo de coração, um tipo de leitura.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {lines.map((line, index) => (
            <div key={index} className="rounded-3xl p-8 border-2 transition-shadow hover:shadow-lg" style={{ backgroundColor: line.bgColor, borderColor: line.borderColor }}>
              <div className="w-28 h-28 mx-auto mb-6">
                <img src={line.seal} alt={line.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="font-serif text-2xl text-center mb-4" style={{ color: '#171717' }}>{line.name}</h3>
              <p className="text-center leading-relaxed" style={{ color: 'rgba(23,23,23,0.7)' }}>{line.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm mt-12 font-medium" style={{ color: '#D9A8B2' }}>Todo mês você pode escolher uma ou mais linhas de leitura, de acordo com o que seu coração precisa.</p>
      </div>
    </section>
  );
}

function BooksOfTheMonth() {
  const books = [
    { title: "Verity", author: "Colleen Hoover", line: "Secret Chapters", month: "Janeiro 2026", image: "/book-secrets.PNG", bgColor: 'rgba(250,221,230,0.3)' },
    { title: "A Metamorfose", author: "Franz Kafka", line: "Mirrors", month: "Janeiro 2026", image: "/book-mirrors.PNG", bgColor: 'rgba(234,223,207,0.5)' },
    { title: "As coisas que você só vê quando desacelera", author: "Haemin Sunim", line: "Inner Garden", month: "Janeiro 2026", image: "/book-inner-garden.PNG", bgColor: 'rgba(215,237,221,0.3)' },
  ];

  return (
    <section id="books-of-the-month" className="py-24 px-4" style={{ backgroundColor: '#F6F1EC' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-sm font-medium uppercase tracking-wider" style={{ color: '#D9A8B2' }}>Livros do Mês</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-center mb-16" style={{ color: '#C8AE7D' }}>Janeiro 2026</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <div key={index} className="rounded-3xl p-6 transition-shadow hover:shadow-lg overflow-hidden" style={{ backgroundColor: book.bgColor, boxShadow: '0 2px 12px rgba(200,174,125,0.1)' }}>
              <div className="aspect-[3/4] rounded-2xl mb-6 overflow-hidden">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#D9A8B2' }}>{book.line} · {book.month}</p>
              <h3 className="font-serif text-xl mb-1" style={{ color: '#171717' }}>{book.title}</h3>
              <p className="text-sm" style={{ color: 'rgba(23,23,23,0.6)' }}>{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { number: "1", title: "Escolha sua(s) linha(s) de leitura", description: "Você escolhe Inner Garden, Secret Chapters, Mirrors – ou mais de uma, se quiser." },
    { number: "2", title: "Receba o calendário de leitura", description: "Você recebe o ritmo de leitura sugerido e a data do encontro mensal." },
    { number: "3", title: "Leia no seu ritmo", description: "Você lê durante o mês, sem pressão e com espaço para sentir a história." },
    { number: "4", title: "Encontro mensal online", description: "Nos encontramos por 1h–1h30 para conversar sobre o livro, as ideias e como tocou nossas vidas." },
    { number: "5", title: "Comunidade & anotações", description: "Você pode compartilhar anotações, citações e reflexões no nosso grupo entre os encontros." },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4" style={{ backgroundColor: 'rgba(234,223,207,0.3)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-center mb-16" style={{ color: '#C8AE7D' }}>Como o Clube Funciona</h2>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ backgroundColor: 'rgba(200,174,125,0.2)', borderColor: '#C8AE7D' }}>
                <span className="font-serif text-xl" style={{ color: '#C8AE7D' }}>{step.number}</span>
              </div>
              <div className="flex-1 pb-8" style={{ borderBottom: '1px solid rgba(217,168,178,0.2)' }}>
                <h3 className="font-serif text-xl mb-2" style={{ color: '#171717' }}>{step.title}</h3>
                <p className="leading-relaxed" style={{ color: 'rgba(23,23,23,0.7)' }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { question: "Quantos livros vamos ler por mês?", answer: "Cada linha de leitura tem um livro por mês. Se você assinar mais de uma linha, terá acesso a mais livros, mas a leitura é sempre no seu ritmo, sem pressão." },
    { question: "Posso participar de mais de uma linha de leitura?", answer: "Sim! Você pode assinar quantas linhas quiser. Cada linha tem seu próprio livro e encontro mensal." },
    { question: "Os encontros são gravados?", answer: "Por enquanto os encontros não são gravados, para manter a intimidade e espontaneidade das conversas. Mas estamos avaliando essa possibilidade para o futuro." },
    { question: "Qual plataforma usamos para os encontros?", answer: "Os encontros acontecem pelo Google Meet. Você receberá o link com antecedência no grupo do WhatsApp e por email." },
    { question: "O clube é só para mulheres?", answer: "Sim, o Lory-Marie Club é um espaço feminino, pensado para mulheres que buscam um ambiente seguro e acolhedor para falar de livros e de vida." },
    { question: "Como consigo o livro do mês?", answer: "Você pode adquirir o livro da forma que preferir: comprando em livrarias físicas ou online, emprestando de bibliotecas, ou em formato digital." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-4" style={{ backgroundColor: '#F6F1EC' }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl text-center mb-16" style={{ color: '#C8AE7D' }}>Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(250,221,230,0.2)' }}>
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full px-6 py-5 flex items-center justify-between text-left">
                <span className="font-medium pr-4" style={{ color: '#171717' }}>{faq.question}</span>
                <span className="flex-shrink-0" style={{ color: '#C8AE7D' }}>
                  {openIndex === index ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  )}
                </span>
              </button>
              {openIndex === index && <div className="px-6 pb-5 leading-relaxed" style={{ color: 'rgba(23,23,23,0.7)' }}>{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="join" className="py-24 px-4" style={{ background: 'linear-gradient(135deg, #FADDE6 0%, #EADFCF 50%, #EEC7CF 100%)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-4xl mb-6" style={{ color: '#171717' }}>Pronta para entrar no Salão de Leitura?</h2>
        <p className="text-lg mb-10 leading-relaxed" style={{ color: 'rgba(23,23,23,0.7)' }}>Escolha sua linha de leitura, mantenha uma xícara de chá por perto e venha compartilhar histórias, ideias e memórias conosco.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/login" className="w-full sm:w-auto text-center font-medium px-10 py-4 rounded-full transition-all text-lg shadow-lg hover:opacity-90" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Entrar no Clube</a>
          <a href="https://wa.me/5517992247704" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center font-medium border-2 px-8 py-3.5 rounded-full transition-all hover:opacity-70" style={{ color: '#171717', borderColor: '#D9A8B2' }}>Falar conosco primeiro</a>
        </div>
        <p className="text-sm mt-8" style={{ color: '#D9A8B2' }}>R$ 29,90/mês por linha de leitura</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-4" style={{ backgroundColor: '#171717' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-6">
            <img src="/logo.png" alt="Lory-Marie Club" className="w-full h-full object-cover" />
          </div>
          <p className="font-serif text-xl mb-2" style={{ color: '#F6F1EC' }}>Lory-Marie Club – Salão de Leitura</p>
          <p className="text-sm mb-8" style={{ color: 'rgba(246,241,236,0.6)' }}>Clube do livro feminino online · Encontros mensais</p>
          <div className="flex items-center gap-6 text-sm">
            <a href="https://instagram.com/lorymarieclub" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-70" style={{ color: 'rgba(246,241,236,0.8)' }}>Instagram</a>
            <span style={{ color: 'rgba(246,241,236,0.3)' }}>·</span>
            <a href="https://wa.me/5517992247704" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-70" style={{ color: 'rgba(246,241,236,0.8)' }}>WhatsApp</a>
            <span style={{ color: 'rgba(246,241,236,0.3)' }}>·</span>
            <a href="mailto:contato@lorymarieclub.com" className="transition-colors hover:opacity-70" style={{ color: 'rgba(246,241,236,0.8)' }}>Email</a>
            <span style={{ color: 'rgba(246,241,236,0.3)' }}>·</span>
            <a href="/login" className="transition-colors hover:opacity-70" style={{ color: 'rgba(246,241,236,0.8)' }}>Login</a>
          </div>
          <p className="text-xs mt-8" style={{ color: 'rgba(246,241,236,0.4)' }}>© 2026 Lory-Marie Club. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main style={{ backgroundColor: '#F6F1EC' }}>
      <Header />
      <Hero />
      <AboutAndIsForYou />
      <ReadingLines />
      <BooksOfTheMonth />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}