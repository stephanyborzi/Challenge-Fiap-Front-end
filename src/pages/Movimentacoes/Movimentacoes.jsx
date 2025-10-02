import React, { useState, useMemo, useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import './Movimentacoes.css';

const today = '22/09/2025';
const initialMovements = [
    ...Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        date: today,
        time: `09:${(i + 1).toString().padStart(2, '0')}`,
        type: 'Entrada',
        product: `Produto Entrada ${i + 1}`,
        quantity: 50 + i,
        user: `User Entrada ${i + 1}`,
        value: `R$ ${(100 + i * 5).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        status: 'Confirmado',
        laboratory: 'laboratorio1', 
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
        id: 25 + i + 1,
        date: today,
        time: `10:${(i + 1).toString().padStart(2, '0')}`,
        type: 'Saída',
        product: `Produto Saída ${i + 1}`,
        quantity: 20 + i,
        user: `User Saída  ${i + 1}`,
        value: `R$ ${(50 + i * 2).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        status: 'Confirmado',
        laboratory: 'laboratorio1',
    })),
    
    ...Array.from({ length: 5 }, (_, i) => ({
        id: 35 + i + 1,
        date: today,
        time: `11:${(i + 1).toString().padStart(2, '0')}`,
        type: 'Saída',
        product: `Produto Saída L2 ${i + 1}`,
        quantity: 15 + i,
        user: `User Saída L2 ${i + 1}`,
        value: `R$ ${(70 + i * 3).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        status: 'Confirmado',
        laboratory: 'laboratorio2',
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
        id: 40 + i + 1,
        date: '21/09/2025',
        time: `14:${(i + 1).toString().padStart(2, '0')}`,
        type: 'Transferência',
        product: `Produto Transf. ${i + 1}`,
        quantity: 10 + i,
        user: `User Transf. ${i + 1}`,
        value: `R$ ${(30 + i * 3).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        status: 'Confirmado',
        laboratory: 'laboratorio1', 
    })),
];

const Movimentacoes = ({ currentLab = 'todos', onLabChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [movementType, setMovementType] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [movements] = useState(initialMovements);

    const [animatedEntradas, setAnimatedEntradas] = useState(0);
    const [animatedSaidas, setAnimatedSaidas] = useState(0);
    const [animatedTransferencias, setAnimatedTransferencias] = useState(0);
    const [animatedValorTotal, setAnimatedValorTotal] = useState(0);

    useEffect(() => {
        setCurrentPage(1);
    }, [currentLab]);
    
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const animateCounter = (setter, targetValue, duration = 1000) => {
        let start = 0;
        const increment = targetValue / (duration / 10);
        const timer = setInterval(() => {
            start += increment;
            if (start >= targetValue) {
                setter(targetValue);
                clearInterval(timer);
            } else {
                setter(Math.ceil(start));
            }
        }, 10);
    };

    const animateValueCounter = (setter, targetValue, duration = 1000) => {
        let start = 0;
        const increment = targetValue / (duration / 10);
        const timer = setInterval(() => {
            start += increment;
            if (start >= targetValue) {
                setter(targetValue);
                clearInterval(timer);
            } else {
                setter(start);
            }
        }, 10);
    };

    useEffect(() => {
        const today = new Date().toLocaleDateString('pt-BR');
        const labFilteredMovements = currentLab === 'todos' 
            ? movements 
            : movements.filter(mov => mov.laboratory === currentLab);

        const totalEntradas = labFilteredMovements.filter(mov => mov.type === 'Entrada' && mov.date === today).length;
        const totalSaidas = labFilteredMovements.filter(mov => mov.type === 'Saída' && mov.date === today).length;
        const totalTransferencias = labFilteredMovements.filter(mov => mov.type === 'Transf.').length;
        
        const totalValor = labFilteredMovements.reduce((sum, mov) => {
            const value = parseFloat(mov.value.replace('R$', '').replace(',', '.'));
            return sum + (isNaN(value) ? 0 : value);
        }, 0);

        animateCounter(setAnimatedEntradas, totalEntradas);
        animateCounter(setAnimatedSaidas, totalSaidas);
        animateCounter(setAnimatedTransferencias, totalTransferencias);
        animateValueCounter(setAnimatedValorTotal, totalValor);
    }, [movements, currentLab]); 

    const handleExport = () => {
        const table = document.querySelector('table');
        if (!table) {
            console.error('Table element not found.');
            return;
        }

        const rows = table.querySelectorAll('tr');
        const csv = Array.from(rows).map(row => {
            const cells = Array.from(row.querySelectorAll('td, th'));
            return cells.map(cell => `"${cell.innerText.replace(/"/g, '""')}"`).join(',');
        }).join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'movimentacoes.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredMovements = useMemo(() => {
        let filtered = movements;
        if (currentLab && currentLab !== 'todos') {
            filtered = filtered.filter(mov => mov.laboratory === currentLab);
        }
        return filtered.filter(mov => {
            const matchesSearch = searchTerm.trim() === '' ||
                mov.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                mov.user.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = movementType === '' || mov.type === movementType;

            const formattedFilterDate = filterDate ? formatDate(filterDate.split('/').reverse().join('-')) : '';
            const matchesDate = formattedFilterDate === '' || mov.date === formattedFilterDate;

            return matchesSearch && matchesType && matchesDate;
        });
    }, [movements, searchTerm, movementType, filterDate, currentLab]); 

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = filteredMovements.slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(filteredMovements.length / itemsPerPage);

    const pageNumbers = useMemo(() => {
        const numbers = [];
        for (let i = 1; i <= totalPages; i++) {
            numbers.push(i);
        }
        return numbers;
    }, [totalPages]);

    const handleClearDate = () => {
        setFilterDate('');
        setCurrentPage(1);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prevPage => prevPage < totalPages ? prevPage + 1 : prevPage);
    const prevPage = () => setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
    
    const formattedLabName = currentLab === 'todos' 
        ? 'Todos os Laboratórios' 
        : currentLab.replace('laboratorio', 'Laboratório ');

    return (
        <div className="movimentacao-container">
            <SideBar currentLab={currentLab} onLabChange={onLabChange} />
            <main className="movimentacoes-main-content">
                <header className="movimentacoes-header">
                    <div className="movimentacoes-title-group">
                        <h1>Movimentações</h1>
                        <p>Controle de entrada e saída de medicamentos </p>
                    </div>
                </header>

                <section className="filters-and-search">
                    <div className="search-and-filters-group">
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Buscar movimentações..."
                                value={searchTerm}
                                onChange={e => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        <div className="filter-group">
                            <select
                                name="movement-type"
                                value={movementType}
                                onChange={e => {
                                    setMovementType(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="">Tipo de Movimento</option>
                                <option value="Entrada">Entrada</option>
                                <option value="Saída">Saída</option>
                                <option value="Transferência">Transf.</option>
                            </select>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                    type="date"
                                    value={filterDate.split('/').reverse().join('-')}
                                    onChange={e => {
                                        setFilterDate(formatDate(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                />
                                {filterDate && (
                                    <button onClick={handleClearDate} className="clear-date-button">
                                        &times;
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="filter-actions">
                        <button className="icon-button" onClick={handleExport}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Exportar para CSV
                        </button>
                    </div>
                </section>

                <section className="kpi-movimentacoes-section">
                    <div className="kpi-movimentacao-card">
                        <div className="kpi-mov-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="17 11 12 6 7 11"></polyline>
                                <line x1="12" y1="18" x2="12" y2="6"></line>
                            </svg>
                        </div>
                        <div>
                            <h3>Entradas Hoje</h3>
                            <h2>{animatedEntradas}</h2>
                        </div>
                    </div>
                    <div className="kpi-movimentacao-card">
                        <div className="kpi-mov-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="7 13 12 18 17 13"></polyline>
                                <line x1="12" y1="6" x2="12" y2="18"></line>
                            </svg>
                        </div>
                        <div>
                            <h3>Saídas Hoje</h3>
                            <h2>{animatedSaidas}</h2>
                        </div>
                    </div>
                    <div className="kpi-movimentacao-card">
                        <div className="kpi-mov-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </div>
                        <div>
                            <h3>Transf.</h3>
                            <h2>{animatedTransferencias}</h2>
                        </div>
                    </div>
                    <div className="kpi-movimentacao-card value-card">
                        <div>
                            <h3>Valor Total</h3>
                            <h2>
                                {
                                    animatedValorTotal.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })
                                }
                            </h2>
                        </div>
                        <div className="kpi-mov-icon value-icon">
                            <span className="currency-symbol">$</span>
                        </div>
                    </div>
                </section>

                <section className="movimentacoes-table-section">
                    <table>
                        <thead>
                            <tr>
                                <th>DATA/HORA</th>
                                <th>TIPO</th>
                                <th>PRODUTO</th>
                                <th>QUANTIDADE</th>
                                <th>FUNCIONÁRIO</th>
                                <th>VALOR</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((mov) => (
                                    <tr key={mov.id}>
                                        <td>
                                            <div className="table-date-time">
                                                <span>{mov.date}</span>
                                                <span className="table-time">{mov.time}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-tag status-${mov.type.toLowerCase()}`}>{mov.type}</span>
                                        </td>
                                        <td>{mov.product}</td>
                                        <td>{mov.quantity} unidades</td>
                                        <td>{mov.user}</td>
                                        <td>{mov.value}</td>
                                        <td>
                                            <span className={`status-tag status-${mov.status.toLowerCase()}`}>{mov.status}</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8"> 
                                        <div className="no-results-message">
                                            Nenhuma movimentação encontrada.
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <span>Mostrando {firstItemIndex + 1} a {Math.min(lastItemIndex, filteredMovements.length)} de {filteredMovements.length} resultados</span>
                        <div className="pagination-controls">
                            <button onClick={prevPage} disabled={currentPage === 1}>{'<'}</button>
                            {pageNumbers.map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={currentPage === number ? 'active' : ''}
                                >
                                    {number}
                                </button>
                            ))}
                            <button onClick={nextPage} disabled={currentPage === totalPages}>{'>'}</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Movimentacoes;