import React, { useState } from 'react'; 
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
  FlaskConical, 
} from "lucide-react";
import './SideBar.css';
import logo from "../../images/dasa_logo.png";

const SideBar = ({ onLabChange }) => { 
  const [selectedLab, setSelectedLab] = useState('laboratorio1'); 

  const handleLabChange = (event) => {
    const newLab = event.target.value;
    setSelectedLab(newLab);
    if (onLabChange) {
      onLabChange(newLab);
    }
  };

  return (
    <div className="teste-container">
      <aside className="sidebar">
        <img src={logo} alt="Logo" className="logo-image" />
        <div className="logo">ControlSystem</div>
        <div className="lab-filter-container">
      <label htmlFor="lab-select">Unidades</label>
        <select 
          id="lab-select" 
          className="lab-select"
          value={selectedLab}
          onChange={handleLabChange} 
        >
          <option value="laboratorio1">Laboratório 1</option>
          <option value="laboratorio2">Laboratório 2</option>
        </select>
      </div>
        <nav className="nav-menu">
          <ul>
            <li className="active">
              <Link to="/dashboard">
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
            <span>Maria Silva</span>
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