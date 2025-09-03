import React from 'react';
import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <img src="src\images\dasa_logo.png"alt="Logo" className="logo-image" />
        <div className="logo">StockManager</div>
        <nav className="nav-menu">
            <ul>
            <li className="active"><a href="#">Dashboard</a></li>
            <li><a href="/estoque">Estoque</a></li>
            <li><a href="/funcionarios">Funcionários</a></li>
            <li><a href="/reconhecimentofacial">Reconhecimento Facial</a></li>
            <li><a href="/movimentacoes">Movimentações</a></li>
            <li><a href="/relatorios">Relatórios</a></li>
            </ul>
        </nav>
        <div className="user-profile">
            <img src="/images/user-image.png" alt="User" />
            <span>João Silva</span>
            <small>Administrador</small>
        </div>
        </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>Dashboard</h1>
          <p>Visão geral do almoxarifado</p>
          <div className="search-bar">
            <input type="text" placeholder="Buscar..." />
            <button>Search</button>
          </div>
        </header>

        <section className="kpi-section">
          <div className="kpi-card">
            <h3>Total Produtos</h3>
            <h2>1,247</h2>
            <p>+12% este mês</p>
          </div>
          <div className="kpi-card attention">
            <h3>Estoque Baixo</h3>
            <h2>23</h2>
            <p>Requer atenção</p>
          </div>
          <div className="kpi-card">
            <h3>Funcionários Ativos</h3>
            <h2>156</h2>
            <p>+3 novos</p>
          </div>
          <div className="kpi-card">
            <h3>Movimentações Hoje</h3>
            <h2>89</h2>
            <p>45 entradas, 44 saídas</p>
          </div>
        </section>

        <section className="panels-section">
          <div className="panel stock-movement">
            <h2>Movimentação do Estoque</h2>
            <div className="date-filter">Últimos 7 dias</div>
            <div className="chart-placeholder">Gráfico de movimentação do estoque</div>
          </div>
          <div className="panel recent-activity">
            <h2>Atividade Recente</h2>
            <ul>
              <li>Maria Santos - Retirou 10 unidades</li>
              <li>Pedro Lima - Adicionou 50 unidades</li>
              <li>Ana Costa - Cadastrou novo produto</li>
            </ul>
          </div>
        </section>


        <section className="low-stock-products">
          <h2>Produtos com Estoque Baixo</h2>
          <button className="view-all-button">Ver todos</button>
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
              <tr>
                <td>Parafusos M6</td>
                <td>PAR001</td>
                <td>Ferragens</td>
                <td>15</td>
                <td>50</td>
                <td className="status-critical">Crítico</td>
              </tr>
              <tr>
                <td>Tinta Branca</td>
                <td>TIN002</td>
                <td>Tintas</td>
                <td>8</td>
                <td>20</td>
                <td className="status-critical">Crítico</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;