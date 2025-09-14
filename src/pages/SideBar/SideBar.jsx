import React from 'react';
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  Users,
  ScanFace,
  RefreshCw,
  BarChart2,
  User,
  Settings,
} from "lucide-react";
import './SideBar.css';
import logo from "../../images/dasa_logo.png";

const SideBar = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <img src={logo} alt="Logo" className="logo-image" />
        <div className="logo">StockManager</div>

        <nav className="nav-menu">
          <ul>
            <li className="active">
              <Link to="/">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/estoque">
                <Boxes size={18} /> Estoque
              </Link>
            </li>
            <li>
              <Link to="/funcionarios">
                <Users size={18} /> Funcionários
              </Link>
            </li>
            <li>
              <Link to="/reconhecimentofacial">
                <ScanFace size={18} /> Reconhecimento Facial
              </Link>
            </li>
            <li>
              <Link to="/movimentacoes">
                <RefreshCw size={18} /> Movimentações
              </Link>
            </li>
            <li>
              <Link to="/relatorios">
                <BarChart2 size={18} /> Relatórios
              </Link>
            </li>
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
    </div>
  );
};

export default SideBar;