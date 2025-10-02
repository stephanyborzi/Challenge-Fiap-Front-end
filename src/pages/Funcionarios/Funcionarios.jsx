import React, { useState, useMemo, useEffect, useRef } from 'react';
import './Funcionarios.css';
import SideBar from '../SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserCheck, faFingerprint, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Counter = ({ end, duration = 2000 }) => {
    const [value, setValue] = useState(0);
    const animationFrameId = useRef(null);

    useEffect(() => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setValue(Math.floor(progress * end));
            if (progress < 1) {
                animationFrameId.current = requestAnimationFrame(step);
            }
        };
        
        animationFrameId.current = requestAnimationFrame(step);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [end, duration]);

    return <h2>{value.toLocaleString()}</h2>;
};

const Funcionarios = ({ currentLab = 'todos', onLabChange }) => { 
    const allEmployees = [
        // Laboratório 1
        { id: 1, name: 'Ana Silva Santos', email: 'ana.silva@medstock.com', role: 'Farmacêutica Chefe', department: 'Farmácia', biometry: 'Configurado', status: 'Ativo', laboratory: 'laboratorio1', avatar: 'https://cdn-icons-png.flaticon.com/512/147/147144.png' },
        { id: 2, name: 'Carlos Oliveira', email: 'carlos.oliveira@medstock.com', role: 'Técnico em Enfermagem', department: 'Enfermagem', biometry: 'Pendente', status: 'Ativo', laboratory: 'laboratorio1', avatar: 'https://cdn-icons-png.flaticon.com/512/147/147142.png' },
        { id: 3, name: 'Maria Fernandes', email: 'maria.fernandes@medstock.com', role: 'Gerente Administrativo', department: 'Administração', biometry: 'Configurado', status: 'Inativo', laboratory: 'laboratorio1', avatar: 'https://cdn-icons-png.flaticon.com/512/147/147140.png' },
        { id: 4, name: 'João Pereira', email: 'joao.pereira@medstock.com', role: 'Estoquista Sênior', department: 'Almoxarifado', biometry: 'Configurado', status: 'Ativo', laboratory: 'laboratorio1', avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
        
        // Laboratório 2
        { id: 5, name: 'Fernanda Lima', email: 'fernanda.lima@medstock.com', role: 'Enfermeira Chefe', department: 'Enfermagem', biometry: 'Configurado', status: 'Ativo', laboratory: 'laboratorio2', avatar: 'https://cdn-icons-png.flaticon.com/512/147/147147.png' },
        { id: 6, name: 'Roberto Souza', email: 'roberto.souza@medstock.com', role: 'Assistente Administrativo', department: 'Administração', biometry: 'Pendente', status: 'Ativo', laboratory: 'laboratorio2', avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
        { id: 7, name: 'Camila Gomes', email: 'camila.gomes@medstock.com', role: 'Recepcionista', department: 'Atendimento', biometry: 'Configurado', status: 'Inativo', laboratory: 'laboratorio2', avatar: 'https://cdn-icons-png.flaticon.com/512/147/147140.png' },
        { id: 8, name: 'Pedro Martins', email: 'pedro.martins@medstock.com', role: 'Farmacêutico', department: 'Farmácia', biometry: 'Pendente', status: 'Ativo', laboratory: 'laboratorio2', avatar: 'https://cdn-icons-png.flaticon.com/512/147/147142.png' },
        { id: 9, name: 'Lúcia Dantas', email: 'lucia.dantas@medstock.com', role: 'Técnica de Laboratório', department: 'Laboratório', biometry: 'Configurado', status: 'Ativo', laboratory: 'laboratorio2', avatar: 'https://cdn-icons-png.flaticon.com/512/147/147147.png' },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5;

    useEffect(() => {
        setCurrentPage(1);
    }, [currentLab]);

    const filteredEmployees = useMemo(() => {
        let filtered = allEmployees;

        if (currentLab && currentLab !== 'todos') {
            filtered = filtered.filter(employee => employee.laboratory === currentLab);
        }

        if (searchTerm) {
            filtered = filtered.filter(employee =>
                employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.department.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter) {
            filtered = filtered.filter(employee => employee.status === statusFilter);
        }

        return filtered;
    }, [searchTerm, statusFilter, currentLab]); 

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalEmployees = filteredEmployees.length; 
    const activeEmployees = filteredEmployees.filter(emp => emp.status === 'Ativo').length;
    const configuredBiometry = filteredEmployees.filter(emp => emp.biometry === 'Configurado').length;
    const newEmployeesThisMonth = 2; 

    const formattedLabName = currentLab === 'todos' 
        ? 'Todos os Laboratórios' 
        : currentLab.replace('laboratorio', 'Laboratório ');

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3; 
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, currentPage + 1);

        if (currentPage === 1) endPage = Math.min(totalPages, maxVisiblePages);
        if (currentPage === totalPages) startPage = Math.max(1, totalPages - maxVisiblePages + 1);
        
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <div className="funcionario-container">
            <SideBar currentLab={currentLab} onLabChange={onLabChange} /> 
            <main className="funcionario-content">
                <header className="main-header employees-header">
                    <div className="header-text-content">
                        <h1>Gerenciar Funcionários</h1>
                    </div>
                    <div className="header-actions">
                        <div className="user-profile-icon">
                            <i className="fas fa-user-circle"></i>
                        </div>
                    </div>
                </header>
                <section className="employee-filters">
                    <input
                        type="text"
                        placeholder="Buscar funcionários..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); 
                        }}
                    />
                    <select
                        className="status-filter"
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">Status: Todos</option>
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                    </select>
                </section>
                <section className="kpi-section employees-kpi">
                    <div className="kpi-card">
                        <div className="kpi-content">
                            <FontAwesomeIcon icon={faUsers} />
                            <h3>Total de Funcionários</h3>
                            <Counter end={totalEmployees} duration={500} />
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-content">
                            <FontAwesomeIcon icon={faUserCheck} />
                            <h3>Funcionários Ativos</h3>
                            <Counter end={activeEmployees} duration={500} />
                        </div>
                    </div>
                    <div className="kpi-card attention">
                        <div className="kpi-content">
                            <FontAwesomeIcon icon={faFingerprint} />
                            <h3>Reconhecimento Facial</h3>
                            <Counter end={configuredBiometry} duration={500} />
                        </div>
                    </div>
                    <div className="kpi-card highlight">
                        <div className="kpi-content">
                            <FontAwesomeIcon icon={faUserPlus} />
                            <h3>Novos este mês</h3>
                            <Counter end={newEmployeesThisMonth} duration={500} />
                        </div>
                    </div>
                </section>
                <section className="employee-list-section">
                    <h2>Lista de Funcionários</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>FUNCIONÁRIO</th>
                                <th>CARGO</th>
                                <th>DEPARTAMENTO</th> 
                                <th>RECONHECIMENTO FACIAL</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.length > 0 ? (
                                currentEmployees.map(employee => (
                                    <tr key={employee.id}>
                                        <td>
                                            <div className="employee-info">
                                                <img src={employee.avatar} alt={employee.name} className="employee-avatar" />
                                                <div className="employee-details">
                                                    <span className="employee-name">{employee.name}</span>
                                                    <span className="employee-email">{employee.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{employee.role}</td>
                                        <td>{employee.department}</td>
                                        <td>
                                            <div className={`biometry-status ${employee.biometry.toLowerCase().replace(' ', '-')}`}>
                                                {employee.biometry === 'Configurado' ? '✓ Configurado' : '… Pendente'}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={`status-pill ${employee.status.toLowerCase()}`}>
                                                {employee.status}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="no-results-message">Nenhum funcionário encontrado.</td> 
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {totalPages > 0 && (
                        <div className="employee-pagination">
                            <span className="pagination-info">
                                Mostrando {indexOfFirstEmployee + 1} a {Math.min(indexOfLastEmployee, filteredEmployees.length)} de {filteredEmployees.length} funcionários
                            </span>
                            <div className="pagination-buttons">
                                <button
                                    className="pagination-btn"
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    &lt;
                                </button>
                                {renderPageNumbers().map((number) => (
                                    <button
                                        key={number}
                                        className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                                        onClick={() => paginate(number)}
                                    >
                                        {number}
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

export default Funcionarios;