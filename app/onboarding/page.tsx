export default function Home() {
  return (
    <main>
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

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6" style={{ backgroundColor: 'rgba(246,241,236,0.95)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Lory-Marie Club" className="w-10 h-10 rounded-full" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#about" className="transition-colors hover:opacity-70" style={{ color: '#171717' }}>Nosso Clube</a>
          <a href="#lines" className="transition-colors hover:opacity-70" style={{ color: '#171717' }}>Linhas de Leitura</a>
          <a href="#books" className="transition-colors hover:opacity-70" style={{ color: '#171717' }}>Livros do Mês</a>
          <a href="#how" className="transition-colors hover:opacity-70" style={{ color: '#171717' }}>Como Funciona</a>
          <a href="#faq" className="transition-colors hover:opacity-70" style={{ color: '#171717' }}>FAQ</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm transition-colors hover:opacity-70" style={{ color: '#C8AE7D' }}>Login</a>
          <a href="#lines" className="text-sm px-5 py-2 rounded-full transition-all hover:opacity-90" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Entrar no Clube</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20" style={{ backgroundColor: '#F6F1EC' }}>
      <div className="absolute inset-0 overflow-hidden">
        <img src="/hero-books.png" alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(246,241,236,0.7)' }} />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-sm tracking-widest uppercase mb-4" style={{ color: '#D9A8B2' }}>Lory-Marie Club – Salão de Leitura</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight mb-6" style={{ color: '#171717' }}>
          Um salão de leitura para <span style={{ color: '#D9A8B2' }}>corações</span> que amam histórias.
        </h1>
        <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(23,23,23,0.7)' }}>
          Um clube do livro íntimo e feminino onde cada livro é tratado como um pequeno ritual de autocuidado.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#lines" className="w-full sm:w-auto text-center font-medium px-8 py-3.5 rounded-full transition-all hover:opacity-90" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Entrar no Salão de Leitura</a>
          <a href="#lines" className="w-full sm:w-auto text-center text-sm transition-colors hover:opacity-70" style={{ color: '#C8AE7D' }}>Ver as linhas de leitura →</a>
        </div>
        <div className="mt-8 animate-bounce">
          <span style={{ color: '#C8AE7D' }}>↓</span>
        </div>
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
    {
      name: "Inner Garden",
      subtitle: "Autocuidado & Autoconhecimento",
      description: "Livros que ajudam a cultivar a calma, entender as emoções e cuidar de si mesma com mais carinho.",
      color: "rgba(215,237,221,0.4)",
      borderColor: "#B8D9C0",
      seal: "/seal-inner-garden.png",
      link: "https://go.hotmart.com/T103665431V"
    },
    {
      name: "Secret Chapters",
      subtitle: "Romance & Emoção",
      description: "Histórias de amor que fazem o coração acelerar, suspirar e, às vezes, chorar de emoção.",
      color: "rgba(250,221,230,0.4)",
      borderColor: "#D9A8B2",
      seal: "/seal-secrets.png",
      link: "https://go.hotmart.com/C103665282D"
    },
    {
      name: "Mirrors",
      subtitle: "Filosofia & Reflexão",
      description: "Clássicos e obras que convidam a pensar sobre a vida, o mundo e quem somos.",
      color: "rgba(234,223,207,0.4)",
      borderColor: "rgba(200,174,125,0.5)",
      seal: "/seal-mirrors.png",
      link: "https://go.hotmart.com/V103665744N"
    }
  ];

  return (
    <section id="lines" className="py-24 px-4" style={{ backgroundColor: '#F6F1EC' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: '#D9A8B2' }}>Escolha sua jornada</p>
          <h2 className="font-serif text-4xl mb-4" style={{ color: '#C8AE7D' }}>Linhas de Leitura</h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'rgba(23,23,23,0.7)' }}>Três caminhos, três formas de sentir. Escolha a linha que mais ressoa com você neste momento.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {lines.map((line, index) => (
            <div key={index} className="rounded-3xl p-8 border-2 transition-all hover:shadow-lg" style={{ backgroundColor: line.color, borderColor: line.borderColor }}>
              <div className="flex justify-center mb-6">
                <img src={line.seal} alt={line.name} className="w-20 h-20" />
              </div>
              <h3 className="font-serif text-2xl text-center mb-2" style={{ color: '#171717' }}>{line.name}</h3>
              <p className="text-center text-sm mb-4" style={{ color: '#D9A8B2' }}>{line.subtitle}</p>
              <p className="text-center text-sm mb-6 leading-relaxed" style={{ color: 'rgba(23,23,23,0.7)' }}>{line.description}</p>
              <div className="text-center">
                <p className="text-lg font-medium mb-4" style={{ color: '#C8AE7D' }}>R$29,90<span className="text-sm font-normal">/mês</span></p>
                <a href={line.link} target="_blank" rel="noopener noreferrer" className="inline-block w-full py-3 rounded-full text-sm font-medium transition-all hover:opacity-90" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>
                  Assinar {line.name}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-sm" style={{ color: 'rgba(23,23,23,0.5)' }}>
          Você pode assinar mais de uma linha e participar de todos os encontros.
        </p>
      </div>
    </section>
  );
}

function BooksOfTheMonth() {
  const books = [
    {
      line: "Inner Garden",
      title: "Livro de Janeiro",
      image: "/book-inner-garden.PNG",
      color: "rgba(215,237,221,0.4)"
    },
    {
      line: "Secret Chapters",
      title: "Livro de Janeiro",
      image: "/book-secrets.PNG",
      color: "rgba(250,221,230,0.4)"
    },
    {
      line: "Mirrors",
      title: "Livro de Janeiro",
      image: "/book-mirrors.PNG",
      color: "rgba(234,223,207,0.4)"
    }
  ];

  return (
    <section id="books" className="py-24 px-4" style={{ backgroundColor: 'rgba(250,221,230,0.2)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: '#D9A8B2' }}>Janeiro 2026</p>
          <h2 className="font-serif text-4xl mb-4" style={{ color: '#C8AE7D' }}>Livros do Mês</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <div key={index} className="rounded-3xl p-6 text-center" style={{ backgroundColor: book.color }}>
              <p className="text-sm font-medium mb-4" style={{ color: '#D9A8B2' }}>{book.line}</p>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg">
                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-sm" style={{ color: 'rgba(23,23,23,0.6)' }}>{book.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Escolha sua linha",
      description: "Assine a linha que mais combina com você: Inner Garden, Secret Chapters ou Mirrors."
    },
    {
      number: "02",
      title: "Receba o livro do mês",
      description: "No início de cada mês, você descobre qual livro vamos ler juntas."
    },
    {
      number: "03",
      title: "Leia no seu ritmo",
      description: "Você tem o mês inteiro para ler, sem pressa e sem pressão."
    },
    {
      number: "04",
      title: "Participe do encontro",
      description: "No final do mês, nos reunimos online para conversar sobre o livro e sobre a vida."
    }
  ];

  return (
    <section id="how" className="py-24 px-4" style={{ backgroundColor: '#F6F1EC' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: '#D9A8B2' }}>Simples assim</p>
          <h2 className="font-serif text-4xl mb-4" style={{ color: '#C8AE7D' }}>Como Funciona</h2>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(250,221,230,0.5)' }}>
                <span className="font-serif text-lg" style={{ color: '#C8AE7D' }}>{step.number}</span>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-2" style={{ color: '#171717' }}>{step.title}</h3>
                <p style={{ color: 'rgba(23,23,23,0.7)' }}>{step.description}</p>
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
    {
      question: "Como são os encontros?",
      answer: "Os encontros acontecem uma vez por mês, online (Google Meet), duram entre 1h e 1h30, e são um espaço seguro para conversar sobre o livro e sobre a vida."
    },
    {
      question: "Preciso comprar o livro?",
      answer: "Sim, cada participante adquire seu próprio livro. Sempre escolhemos edições acessíveis e disponíveis nas principais livrarias."
    },
    {
      question: "Posso assinar mais de uma linha?",
      answer: "Sim! Você pode assinar quantas linhas quiser e participar de todos os encontros."
    },
    {
      question: "E se eu não conseguir terminar o livro?",
      answer: "Sem problemas! O encontro é um espaço acolhedor, mesmo que você não tenha terminado a leitura."
    },
    {
      question: "Como cancelo minha assinatura?",
      answer: "Você pode cancelar a qualquer momento, sem burocracia, direto pela plataforma de pagamento."
    }
  ];

  return (
    <section id="faq" className="py-24 px-4" style={{ backgroundColor: 'rgba(234,223,207,0.3)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: '#D9A8B2' }}>Dúvidas?</p>
          <h2 className="font-serif text-4xl mb-4" style={{ color: '#C8AE7D' }}>Perguntas Frequentes</h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(246,241,236,0.8)' }}>
              <h3 className="font-medium mb-2" style={{ color: '#171717' }}>{faq.question}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(23,23,23,0.7)' }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 px-4" style={{ backgroundColor: '#F6F1EC' }}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-4xl mb-6" style={{ color: '#C8AE7D' }}>Pronta para entrar no Salão de Leitura?</h2>
        <p className="mb-10" style={{ color: 'rgba(23,23,23,0.7)' }}>Escolha sua linha e faça parte de um clube do livro feito com carinho, para mulheres que amam histórias.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#lines" className="w-full sm:w-auto text-center font-medium px-8 py-3.5 rounded-full transition-all hover:opacity-90" style={{ backgroundColor: '#EADFCF', color: '#171717' }}>Ver as linhas de leitura</a>
          <a href="https://wa.me/5517992247704" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center font-medium border-2 px-8 py-3.5 rounded-full transition-all hover:opacity-70" style={{ color: '#171717', borderColor: '#D9A8B2' }}>Falar conosco primeiro</a>
        </div>
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
            <a href="/login" className="transition-colors hover:opacity-70" style={{ color: 'rgba(246,241,236,0.8)' }}>Login</a>
          </div>
          <p className="text-xs mt-8" style={{ color: 'rgba(246,241,236,0.4)' }}>© 2026 Lory-Marie Club. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}