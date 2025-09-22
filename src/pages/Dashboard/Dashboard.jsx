import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import SideBar from '../SideBar/SideBar';
import { Package, AlertTriangle, UserCheck, Activity } from "lucide-react";

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
    requestAnimationFrame(step);
  }, [end, duration]);

  return <h2>{value.toLocaleString()}</h2>;
};

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1); 
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 5;

  const products = [
    { name: "Dipirona Sódica 500mg", code: "MED001", category: "Analgésicos", stock: 120, minStock: 50 },
    { name: "Paracetamol 750mg", code: "MED002", category: "Analgésicos", stock: 80, minStock: 40 },
    { name: "Amoxicilina 500mg", code: "MED003", category: "Antibióticos", stock: 35, minStock: 60 },
    { name: "Omeprazol 20mg", code: "MED004", category: "Gastrite/Refluxo", stock: 20, minStock: 50 },
    { name: "Losartana 50mg", code: "MED005", category: "Anti-hipertensivos", stock: 15, minStock: 30 },
    { name: "Ibuprofeno 600mg", code: "MED006", category: "Anti-inflamatórios", stock: 45, minStock: 25 },
    { name: "Metformina 850mg", code: "MED007", category: "Diabetes", stock: 60, minStock: 40 },
    { name: "Sertralina 50mg", code: "MED008", category: "Antidepressivos", stock: 10, minStock: 20 },
    { name: "Atenolol 25mg", code: "MED009", category: "Cardiovascular", stock: 50, minStock: 50 },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); 
  };

  return (
    <div className="dashboard-container">
      <SideBar />
      <main className="main-content">
        <header className="main-header">
          <h1>Dashboard</h1>
          <p>Visão geral do almoxarifado</p>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </header>
        <section className="kpi-section">
          <div className="kpi-card">
            <Package size={28} />
            <div>
              <h3>Total Produtos</h3>
              <Counter end={1247} duration={500} />
              <p>+12% este mês</p>
            </div>
          </div>
          <div className="kpi-card attention">
            <AlertTriangle size={28} />
            <div>
              <h3>Estoque Baixo</h3>
              <Counter end={23} duration={500} />
              <p>Requer atenção</p>
            </div>
          </div>
          <div className="kpi-card">
            <UserCheck size={28} />
            <div>
              <h3>Funcionários Ativos</h3>
              <Counter end={156} duration={500} />
              <p>+3 novos</p>
            </div>
          </div>
          <div className="kpi-card">
            <Activity size={28} />
            <div>
              <h3>Movimentações Hoje</h3>
              <Counter end={89} duration={500} />
              <p>45 entradas, 44 saídas</p>
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
                  <td className={product.stock <= product.minStock ? "status-critical" : ""}>
                    {product.stock <= product.minStock ? "Crítico" : "Ok"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {totalPages > 0 && (
            <div className="pagination">
              <span className="pagination-info">
                Mostrando {indexOfFirstProduct + 1} a {Math.min(indexOfLastProduct, filteredProducts.length)} de {filteredProducts.length} produtos
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
                  disabled={currentPage === totalPages}a
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