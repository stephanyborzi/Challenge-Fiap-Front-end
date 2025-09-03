import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Funcionarios from "./pages/Funcionarios/Funcionarios.jsx";
import ReconhecimentoFacial from "./pages/ReconhecimentoFacial/ReconhecimentoFacial.jsx";
import Movimentacoes from "./pages/Movimentacoes/Movimentacoes.jsx";
import Relatorios from "./pages/Relatorios/Relatorios.jsx";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/funcionarios" element={<Funcionarios/>} />
        <Route path="/reconhecimentofacial" element={<ReconhecimentoFacial/>} />
        <Route path="/movimentacoes" element={<Movimentacoes/>} />
        <Route path="/relatorios" element={<Relatorios/>} />
      </Routes>
    </Router>
  );
};

export default App;
