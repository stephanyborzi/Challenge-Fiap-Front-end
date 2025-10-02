import React, { useState, useEffect, useMemo } from 'react';
import SideBar from '../SideBar/SideBar.jsx'; 
import { Package, AlertTriangle, UserCheck, Activity, Search } from "lucide-react";

const Counter = ({ end, duration = 2000 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    const animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <h2>{value.toLocaleString()}</h2>;
};

const allProducts = [
  // --- LABORATÓRIO 1 (laboratorio1) ---
  { name: "Dipirona Sódica 500mg", code: "MED001", category: "Analgésicos", stock: 120, minStock: 50, laboratory: "laboratorio1" },
  { name: "Paracetamol 750mg", code: "MED002", category: "Analgésicos", stock: 80, minStock: 40, laboratory: "laboratorio1" },
  { name: "Amoxicilina 500mg", code: "MED003", category: "Antibióticos", stock: 35, minStock: 60, laboratory: "laboratorio1" }, 
  { name: "Omeprazol 20mg", code: "MED004", category: "Gastrite/Refluxo", stock: 20, minStock: 50, laboratory: "laboratorio1" }, 
  { name: "Losartana 50mg", code: "MED005", category: "Anti-hipertensivos", stock: 15, minStock: 30, laboratory: "laboratorio1" }, 
  { name: "Ibuprofeno 600mg", code: "MED006", category: "Anti-inflamatórios", stock: 45, minStock: 25, laboratory: "laboratorio1" },
  { name: "Metformina 850mg", code: "MED007", category: "Diabetes", stock: 60, minStock: 40, laboratory: "laboratorio1" },
  { name: "Sertralina 50mg", code: "MED008", category: "Antidepressivos", stock: 10, minStock: 20, laboratory: "laboratorio1" }, 
  { name: "Atenolol 25mg", code: "MED009", category: "Cardiovascular", stock: 50, minStock: 50, laboratory: "laboratorio1" },
  // --- LABORATÓRIO 2 (laboratorio2) ---
  { name: "Insulina Humana", code: "DIA010", category: "Diabetes", stock: 150, minStock: 50, laboratory: "laboratorio2" },
  { name: "Atenolol 25mg", code: "MED009", category: "Cardiovascular", stock: 50, minStock: 50, laboratory: "laboratorio2" },
  { name: "Sertralina 50mg", code: "MED008", category: "Antidepressivos", stock: 10, minStock: 20, laboratory: "laboratorio2" }, 
  { name: "Metformina 850mg", code: "MED007", category: "Diabetes", stock: 60, minStock: 40, laboratory: "laboratorio2" },
  { name: "Vacina Gripe", code: "VAC001", category: "Imunização", stock: 25, minStock: 40, laboratory: "laboratorio2" }, 
  { name: "Analgésico Forte", code: "MED012", category: "Analgésicos", stock: 100, minStock: 50, laboratory: "laboratorio2" },
];

const mockKPIData = {
  laboratorio1: {
    funcionariosAtivos: 85,
    movimentacoesHoje: 50,
    movimentacoesDetalhes: '25 entradas, 25 saídas',
  },
  laboratorio2: {
    funcionariosAtivos: 65,
    movimentacoesHoje: 39,
    movimentacoesDetalhes: '20 entradas, 19 saídas',
  },
  todos: {
    funcionariosAtivos: 150,
    movimentacoesHoje: 89,
    movimentacoesDetalhes: '45 entradas, 44 saídas',
  }
};

const Dashboard = ({ currentLab = 'todos', onLabChange }) => { 
  const [currentPage, setCurrentPage] = useState(1); 
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 5;

  const labFilteredProducts = useMemo(() => {
    if (currentLab === 'todos') {
      return allProducts;
    }
    return allProducts.filter(p => p.laboratory === currentLab);
  }, [currentLab]);

  const filteredProductsBySearch = labFilteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUniqueProducts = labFilteredProducts.length;
  const lowStockCount = labFilteredProducts.filter(p => p.stock <= p.minStock).length;
  const kpiData = mockKPIData[currentLab] || mockKPIData.todos; 

  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm("");
  }, [currentLab]);

  const totalPages = Math.ceil(filteredProductsBySearch.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProductsBySearch.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); 
  };
  
  const formattedLabName = currentLab === 'todos' 
    ? 'Todos os Laboratórios' 
    : currentLab.replace('laboratorio', 'Laboratório ');

  return (
    <div className="dashboard-container">
      <SideBar currentLab={currentLab} onLabChange={onLabChange} /> 
      
      <main className="dashboard-main-content">
        <header className="main-header">
          <h1>Dashboard</h1>
          <p>Visão geral do almoxarifado</p>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar produtos, códigos ou categorias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </header>
        
        <section className="kpi-section">
          <div className="kpi-card">
            <Package size={28} />
            <div>
              <h3>Itens Únicos</h3>
              <Counter end={totalUniqueProducts} duration={500} />
              <p>Total de itens no filtro</p>
            </div>
          </div>
          <div className="kpi-card attention">
            <AlertTriangle size={28} />
            <div>
              <h3>Estoque Baixo</h3>
              <Counter end={lowStockCount} duration={500} />
              <p>Requer atenção</p>
            </div>
          </div>
          <div className="kpi-card">
            <UserCheck size={28} />
            <div>
              <h3>Funcionários Ativos</h3>
              <Counter end={kpiData.funcionariosAtivos} duration={500} />
              <p>Dados do RH</p>
            </div>
          </div>
          <div className="kpi-card">
            <Activity size={28} />
            <div>
              <h3>Movimentações Hoje</h3>
              <Counter end={kpiData.movimentacoesHoje} duration={500} />
              <p>{kpiData.movimentacoesDetalhes}</p>
            </div>
          </div>
        </section>

        <section className="low-stock-products">
          <h2>Produtos com Estoque Baixo</h2>
          <table>
            <thead>
              <tr className='table-header'>
                <th>PRODUTO</th>
                <th>CÓDIGO</th>
                <th>CATEGORIA</th>
                <th>ESTOQUE ATUAL</th>
                <th>MÍN. REQUERIDO</th>
                <th>LABORATÓRIO</th> 
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.code}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>{product.minStock}</td>
                  <td>{product.laboratory === 'laboratorio1' ? 'L1' : 'L2'}</td> 
                  <td className={product.stock <= product.minStock ? "status-critical" : "status-ok"}>
                    {product.stock <= product.minStock ? "Crítico" : "Ok"}
                  </td>
                </tr>
              ))}
              {filteredProductsBySearch.length === 0 && (
                 <tr><td colSpan="7">Nenhum produto encontrado para o filtro atual.</td></tr>
              )}
            </tbody>
          </table>
          
          {totalPages > 0 && (
            <div className="pagination">
              <span className="pagination-info">
                Mostrando {indexOfFirstProduct + 1} a {Math.min(indexOfLastProduct, filteredProductsBySearch.length)} de {filteredProductsBySearch.length} produtos
              </span>
              <div className="pagination-buttons">
                <button
                  className="pagination-btn"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="pagination-btn"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
