import React, { useState, useMemo } from 'react';
import SideBar from '../SideBar/SideBar';
import './Movimentacoes.css';

const Movimentacoes = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); 

    // Estados para os filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [movementType, setMovementType] = useState('');
    const [filterDate, setFilterDate] = useState(''); 

    // Estado que armazena a lista de movimentações
    const [movements, setMovements] = useState([
        { id: 1, date: '15/01/2025', time: '09:30', type: 'Entrada', product: 'Paracetamol 500mg', quantity: 100, user: 'João Silva', value: 'R$ 250,00', status: 'Confirmado' },
        { id: 2, date: '15/01/2025', time: '08:15', type: 'Saída', product: 'Ibuprofeno 400mg', quantity: 50, user: 'Maria Santos', value: 'R$ 180,00', status: 'Pendente' },
        { id: 3, date: '14/01/2025', time: '16:45', type: 'Transferência', product: 'Dipirona 500mg', quantity: 25, user: 'Carlos Lima', value: 'R$ 75,00', status: 'Confirmado' },
        { id: 4, date: '14/01/2025', time: '10:00', type: 'Entrada', product: 'Omeprazol 20mg', quantity: 200, user: 'Ana Paula', value: 'R$ 400,00', status: 'Confirmado' },
        { id: 5, date: '13/01/2025', time: '14:20', type: 'Saída', product: 'Amoxicilina 500mg', quantity: 75, user: 'Pedro Costa', value: 'R$ 250,00', status: 'Confirmado' },
        { id: 6, date: '13/01/2025', time: '11:55', type: 'Entrada', product: 'Aspirina 100mg', quantity: 300, user: 'Fernanda Lima', value: 'R$ 120,00', status: 'Confirmado' },
        { id: 7, date: '12/01/2025', time: '17:00', type: 'Transferência', product: 'Soro Fisiológico', quantity: 150, user: 'Ricardo Almeida', value: 'R$ 90,00', status: 'Pendente' },
        { id: 8, date: '11/01/2025', time: '09:00', type: 'Saída', product: 'Loratadina 10mg', quantity: 40, user: 'Mariana Santos', value: 'R$ 60,00', status: 'Confirmado' },
        { id: 9, date: '11/01/2025', time: '10:15', type: 'Entrada', product: 'Novalgina 1g', quantity: 120, user: 'João Silva', value: 'R$ 300,00', status: 'Confirmado' },
        { id: 10, date: '10/01/2025', time: '14:30', type: 'Saída', product: 'Buscopan', quantity: 30, user: 'Carla Dias', value: 'R$ 90,00', status: 'Pendente' },
        { id: 11, date: '09/01/2025', time: '16:00', type: 'Entrada', product: 'Paracetamol 500mg', quantity: 50, user: 'João Silva', value: 'R$ 125,00', status: 'Confirmado' },
        { id: 12, date: '08/01/2025', time: '12:00', type: 'Transferência', product: 'Ibuprofeno 400mg', quantity: 20, user: 'Carlos Lima', value: 'R$ 72,00', status: 'Confirmado' },
        { id: 13, date: '07/01/2025', time: '11:00', type: 'Entrada', product: 'Dipirona 500mg', quantity: 100, user: 'Maria Santos', value: 'R$ 300,00', status: 'Confirmado' },
    ]);
    
    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta movimentação?')) {
            const updatedMovements = movements.filter(mov => mov.id !== id);
            setMovements(updatedMovements);
            setCurrentPage(1); 
        }
    };

    const handleEdit = (id) => {
        alert(`Você clicou em editar a movimentação com ID: ${id}`);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const filteredMovements = useMemo(() => {
        return movements.filter(mov => {
            const matchesSearch = searchTerm.trim() === '' || 
                mov.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                mov.user.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = movementType === '' || mov.type === movementType;
            const matchesDate = filterDate === '' || mov.date === filterDate;
            return matchesSearch && matchesType && matchesDate;
        });
    }, [movements, searchTerm, movementType, filterDate]); 

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = filteredMovements.slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(filteredMovements.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prevPage => prevPage < totalPages ? prevPage + 1 : prevPage);
    const prevPage = () => setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    
    const handleClearDate = () => {
        setFilterDate('');
        setCurrentPage(1);
    };

    const handleExport = () => {
        const table = document.querySelector('table');
        const filename = 'movimentacoes';

        if (!table) {
            console.error('Table element not found.');
            return;
        }

        let csv = [];
        const rows = table.querySelectorAll('tr');

        for (const row of rows) {
            const rowData = Array.from(row.querySelectorAll('td, th'))
                                 .map(cell => `"${cell.innerText.replace(/"/g, '""')}"`)
                                 .join(',');
            csv.push(rowData);
        }

        const csvString = csv.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="dashboard-container">
            <SideBar />
            <main className="movimentacoes-main-content">
                <header className="movimentacoes-header">
                    <div className="movimentacoes-title-group">
                        <h1>Movimentações</h1>
                        <p>Controle de entrada e saída de medicamentos</p>
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
                                <option value="Transferência">Transferência</option>
                            </select>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input 
                                    type="date" 
                                    value={filterDate ? formatDate(filterDate).split('/').reverse().join('-') : ''}
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
                            <h2>24</h2>
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
                            <h2>18</h2>
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
                            <h3>Transferências</h3>
                            <h2>7</h2>
                        </div>
                    </div>
                    <div className="kpi-movimentacao-card value-card">
                        <div>
                            <h3>Valor Total</h3>
                            <h2>R$ 8.450</h2>
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
                            {currentItems.map((mov) => (
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
                            ))}
                        </tbody>
                    </table>
                    
                    {currentItems.length === 0 && (
                        <div className="no-results-message">
                            Nenhuma movimentação encontrada.
                        </div>
                    )}
                    
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