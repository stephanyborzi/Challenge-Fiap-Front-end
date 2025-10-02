import React, { useState } from 'react'; // <-- Importar useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";

// Importações das páginas de dados que precisarão do filtro
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Estoque from "./pages/Estoque/Estoque.jsx";
import Funcionarios from "./pages/Funcionarios/Funcionarios.jsx";
import ReconhecimentoFacial from "./pages/ReconhecimentoFacial/ReconhecimentoFacial.jsx";
import Movimentacoes from "./pages/Movimentacoes/Movimentacoes.jsx";
import Relatorios from "./pages/Relatorios/Relatorios.jsx";
import Perfil from "./pages/Perfil/Perfil.jsx";

const App = () => {
  // 1. Criar o estado para o laboratório selecionado
  const [selectedLab, setSelectedLab] = useState('todos');

  // Função para atualizar o estado do laboratório
  const handleLabChange = (lab) => {
    setSelectedLab(lab);
  };

  // Funções auxiliares para passar props de filtro
  const renderPageWithFilter = (Component) => {
    return (
      <Component 
        currentLab={selectedLab} 
        onLabChange={handleLabChange} // Passa a função de mudança
      />
    );
  };

  return (
    <Router>
      <Routes>
        {/* Rotas sem o SideBar e sem filtro */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* 2. Rotas que usam o filtro do SideBar */}
        <Route 
          path="/dashboard" 
          element={renderPageWithFilter(Dashboard)} 
        />
        <Route 
          path="/estoque" 
          element={renderPageWithFilter(Estoque)} 
        />
        <Route 
          path="/funcionarios" 
          element={renderPageWithFilter(Funcionarios)} 
        />
        <Route 
          path="/reconhecimentofacial" 
          element={renderPageWithFilter(ReconhecimentoFacial)} 
        />
        <Route 
          path="/movimentacoes" 
          element={renderPageWithFilter(Movimentacoes)} 
        />
        <Route 
          path="/relatorios" 
          element={renderPageWithFilter(Relatorios)} 
        />

        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
};

export default App;