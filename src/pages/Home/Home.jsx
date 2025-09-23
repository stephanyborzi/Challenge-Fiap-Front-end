import React, { useState, useEffect } from 'react';
import './Home.css';
import logo from "../../images/dasa_logo.png";
import headerImage from "../../images/header_image1.png"; 

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselContent = [
    (
      <div className="carousel-item">
        <h1>Bem-vindo ao DASA Almoxarifado</h1>
        <p>A tecnologia do futuro para a gestão de materiais médicos.</p>
      </div>
    ),
    (
      <div className="carousel-item">
        <h1>Gestão Inteligente</h1>
        <p>Controle de estoque, rastreabilidade e relatórios em tempo real.</p>
      </div>
    ),
    (
      <div className="carousel-item">
        <h1>Segurança Reforçada</h1>
        <p>Acesso controlado com reconhecimento facial para sua tranquilidade.</p>
      </div>
    )
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselContent.length]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="logo-image" />
          <div className="header-info">
            <div className="header-title">
              <h1>DASA ControlSystem</h1>
              <p>Sistema Inteligente de Gestão</p>
            </div>
          </div>
        </div>

        <nav className="header-nav">
          <a href="#">Início</a>
          <a href="#">Recursos</a>
          <a href="#">Tecnologia</a>
          <a href="#">Como Funciona</a>
          <a href="#" onClick={() => scrollToSection('kpi-section')}>Estatística</a>
          <button onClick={toggleDarkMode} className="toggle-dark-mode">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>

      <main>
        <img src={headerImage} alt="Logo" className="logo-image-carousel" />
        <section 
          className="carousel" 
          style={{ backgroundImage: `url(${headerImage})` }} 
        >
          <div className="carousel-overlay"></div>
          <div className="carousel-content">
            {carouselContent[carouselIndex]}
          </div>
        </section>

        <section className="features">
          <h2>Principais Funcionalidades</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🙂</div>
              <h3>Reconhecimento Facial</h3>
              <p>Identificação automática de funcionários para controle de acesso e rastreabilidade de movimentações.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💊</div>
              <h3>Materiais Médicos</h3>
              <p>Gestão especializada para equipamentos médicos, reagentes e materiais hospitalares com controle de validade.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Compliance Hospitalar</h3>
              <p>Atendimento às normas ANVISA e protocolos hospitalares com rastreabilidade completa.</p>
            </div>
          </div>
        </section>

        <section id="kpi-section" className="kpi-section">
          <h2>Visão Geral</h2>
          <div className="kpi-grid">
            <div className="kpi-card">
              <span>Materiais Cadastrados</span>
              <span>📊</span>
              <p>2,847</p>
              <small>+18% este mês</small>
            </div>
            <div className="kpi-card">
              <span>Vencimentos Próximos</span>
              <span>📅</span>
              <p>12</p>
              <small>Próximos 30 dias</small>
            </div>
            <div className="kpi-card">
              <span>Unidades DASA</span>
              <span>📍</span>
              <p>45</p>
              <small>Conectadas</small>
            </div>
            <div className="kpi-card">
              <span>Eficiência Operacional</span>
              <span>⚙️</span>
              <p>98%</p>
              <small>+5% vs. anterior</small>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;