import React, { useState, useEffect } from 'react';
import './Dashboard.css'; 
import { LayoutDashboard, Boxes, Users, ScanFace, RefreshCw, BarChart2, Package, AlertTriangle, UserCheck, Activity, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

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
  const [currentPage, setCurrentPage] = useState(0);
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
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    currentPage * productsPerPage + productsPerPage
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(0); 
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <img src="src\\images\\dasa_logo.png" alt="Logo" className="logo-image" />
        <div className="logo">StockManager</div>
        <nav className="nav-menu">
          <ul>
            <li className="active"><a href="#"><LayoutDashboard size={18} /> Dashboard</a></li>
            <li><a href="/estoque"><Boxes size={18} /> Estoque</a></li>
            <li><a href="/funcionarios"><Users size={18} /> Funcionários</a></li>
            <li><a href="/reconhecimentofacial"><ScanFace size={18} /> Reconhecimento Facial</a></li>
            <li><a href="/movimentacoes"><RefreshCw size={18} /> Movimentações</a></li>
            <li><a href="/relatorios"><BarChart2 size={18} /> Relatórios</a></li>
          </ul>
        </nav>
        <div className="user-profile">
          <User size={40} />
          <div className="user-info">
            <span>João Silva</span>
            <small>Administrador</small>
          </div>
          <Link to="/perfil" className="settings-link">
            <Settings size={24} />
          </Link>
        </div>
      </aside>

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
              <tr>
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
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={i === currentPage ? "active" : ""}
                onClick={() => setCurrentPage(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
