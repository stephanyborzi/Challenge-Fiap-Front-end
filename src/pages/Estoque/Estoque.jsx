import React from 'react';
import './Estoque.css'; 

const Estoque = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <img src="src\images\dasa_logo.png"alt="Logo" className="logo-image" />
        <div className="logo">StockManager</div>1
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
          <h1>Estoque</h1>
          <p>Visão geral do almoxarifado</p>
          <div className="search-bar">
            <button>Adicionar Itens</button>
            <input type="text" placeholder="Buscar..." />
          </div>
        </header>
        <section className="filters-section-types">
          <a href="/estoque">Medicamentos</a>
          <a href="/login">Materiais de Enfermagem</a>
          <a href="/login">Materiais de Escritorio</a>
        </section>
        <section className="kpi-section">
          <div className="kpi-card">
            <h3>Total Medicamentos</h3>
            <h2>342</h2>
            <p>12 tipos diferentes</p>
          </div>
          <div className="kpi-card attention">
            <h3>Proximos do Vencimento</h3>
            <h2>8</h2>
            <p>Vencimento em ate 30 dias</p>
          </div>
          <div className="kpi-card">
            <h3>Estoque Critico</h3>
            <h2>5</h2>
            <p>Abaixo do minimo</p>
          </div>
          <div className="kpi-card">
            <h3>Valor Total</h3>
            <h2>R$ 45.8K</h2>
            <p>Em estoque</p>
          </div>
        </section>
        <section className="medicine-filter-section">
          <label>
            <label htmlFor="medicine-filter-categoria">Categoria</label>
            <select id="medicine-filter-categoria" name="medicine">
            <option value="" disabled>Selecione uma categoria </option>
            <option value="todos medicamentos">Todos</option>
            <option value="analgésicos">Analgésicos e Antipiréticos</option>
            <option value="antibióticos">Antibióticos</option>
            <option value="antifúngicos">Antifúngicos</option>
            <option value="anti-inflamatórios">Anti-inflamatórios</option>
            <option value="anti-hipertensivos">Anti-hipertensivos</option>
          </select>
          </label>
          <label>
            <label htmlFor="medicine-filter-status">Status</label>
            <select id="medicine-filter-status" name="medicine_status">
            <option value="" disabled>Selecione um status </option>
            <option value="todos medicamentos">Todos</option>
            <option value="normal">Normal</option>
            <option value="vencem_em_breve">Vencem em breve</option>
            <option value="estoque_baixo">Estoque baixo</option>
            <option value="vencido">Vencido</option>
            <option value="indisponível">Indisponível</option>
          </select>
          </label>
           <label>
            <label htmlFor="medicine-filter-categoria">Ordernar por</label>
            <select id="medicine-filter-categoria" name="medicine">
            <option value="nome">Nome</option>
            <option value="categoria">Categoria</option>
            <option value="validade">Validade</option>
            <option value="quantidade">Quantidade</option>
            <option value="status">Status</option>
            <option value="codigo">Código</option>
          </select>
          </label>
        </section>
        <section className="low-stock-products">
          <h2>Medicamentos em Estoque</h2>
          <button className="view-all-button">Ver todos</button>
          <table>
            <thead>
              <tr>
                <th>MEDICAMENTO</th>
                <th>CÓDIGO</th>
                <th>CATEGORIA</th>
                <th>VALIDADE</th>
                <th>LOTE</th>
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
                <td className="status-critical">Normal</td>
              </tr>
              <tr>
                <td>Tinta Branca</td>
                <td>TIN002</td>
                <td>Tintas</td>
                <td>8</td>
                <td>20</td>
                <td className="status-critical">Baixo</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};
export default Estoque