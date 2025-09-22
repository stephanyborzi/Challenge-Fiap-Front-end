import React, { useState, useEffect, useMemo, useRef } from 'react';
import './Estoque.css';
import SideBar from '../SideBar/SideBar';

// Componente Counter
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

const Estoque = () => {
    const allMedicines = [
        { id: 1, name: 'Paracetamol 500mg', code: 'MED001', category: 'Analgésicos e Antipiréticos', type: 'Medicamentos', expiration: '2026-05-15', lot: 'LOTE001', status: 'Normal' },
        { id: 2, name: 'Amoxicilina 875mg', code: 'MED002', category: 'Antibióticos', type: 'Medicamentos', expiration: '2024-11-20', lot: 'LOTE002', status: 'Vencem em breve' },
        { id: 3, name: 'Ibuprofeno 400mg', code: 'MED003', category: 'Anti-inflamatórios', type: 'Medicamentos', expiration: '2025-08-30', lot: 'LOTE003', status: 'Estoque baixo' },
        { id: 4, name: 'Dipirona 1g', code: 'MED004', category: 'Analgésicos e Antipiréticos', type: 'Medicamentos', expiration: '2026-02-10', lot: 'LOTE004', status: 'Normal' },
        { id: 5, name: 'Cefalexina 500mg', code: 'MED005', category: 'Antibióticos', type: 'Medicamentos', expiration: '2024-09-01', lot: 'LOTE005', status: 'Vencem em breve' },
        { id: 6, name: 'Losartana Potássica 50mg', code: 'MED006', category: 'Anti-hipertensivos', type: 'Medicamentos', expiration: '2025-10-25', lot: 'LOTE006', status: 'Normal' },
        { id: 7, name: 'Cetoconazol', code: 'MED007', category: 'Antifúngicos', type: 'Medicamentos', expiration: '2024-07-05', lot: 'LOTE007', status: 'Vencido' },
        { id: 8, name: 'Cloridrato de Propranolol', code: 'MED008', category: 'Anti-hipertensivos', type: 'Medicamentos', expiration: '2025-11-28', lot: 'LOTE008', status: 'Normal' },
        { id: 9, name: 'Nimesulida 100mg', code: 'MED009', category: 'Anti-inflamatórios', type: 'Medicamentos', expiration: '2026-03-01', lot: 'LOTE009', status: 'Normal' },
        { id: 10, name: 'Clindamicina 300mg', code: 'MED010', category: 'Antibióticos', type: 'Medicamentos', expiration: '2024-10-15', lot: 'LOTE010', status: 'Vencem em breve' },
        { id: 11, name: 'Fluconazol 150mg', code: 'MED011', category: 'Antifúngicos', type: 'Medicamentos', expiration: '2025-04-22', lot: 'LOTE011', status: 'Estoque baixo' },
        { id: 12, name: 'AAS 100mg', code: 'MED012', category: 'Analgésicos e Antipiréticos', type: 'Medicamentos', expiration: '2024-06-01', lot: 'LOTE012', status: 'Vencido' },
        { id: 13, name: 'Omeprazol 20mg', code: 'MED013', category: 'Antiácido', type: 'Medicamentos', expiration: '2026-09-05', lot: 'LOTE013', status: 'Normal' },
        { id: 14, name: 'Sinvastatina 20mg', code: 'MED014', category: 'Hipolipemiante', type: 'Medicamentos', expiration: '2025-07-19', lot: 'LOTE014', status: 'Estoque baixo' },
        { id: 15, name: 'Captopril 25mg', code: 'MED015', category: 'Anti-hipertensivos', type: 'Medicamentos', expiration: '2026-01-12', lot: 'LOTE015', status: 'Normal' },
        { id: 16, name: 'Luva de Procedimento Estéril', code: 'ENF001', category: 'Luvas', type: 'Materiais de Enfermagem', expiration: '2027-03-20', lot: 'LOTE016', status: 'Normal' },
        { id: 17, name: 'Seringa Descartável 5ml', code: 'ENF002', category: 'Seringas', type: 'Materiais de Enfermagem', expiration: '2026-11-10', lot: 'LOTE017', status: 'Estoque baixo' },
        { id: 18, name: 'Bisturi Cirúrgico n.º 15', code: 'ENF003', category: 'Bisturis', type: 'Materiais de Enfermagem', expiration: '2028-05-01', lot: 'LOTE018', status: 'Normal' },
        { id: 19, name: 'Máscara Cirúrgica Tripla', code: 'ENF004', category: 'Equipamentos de Proteção', type: 'Materiais de Enfermagem', expiration: '2026-09-10', lot: 'LOTE019', status: 'Normal' },
        { id: 20, name: 'Gaze Estéril 7,5cm x 7,5cm', code: 'ENF005', category: 'Curativos e Gaze', type: 'Materiais de Enfermagem', expiration: '2025-12-25', lot: 'LOTE020', status: 'Normal' },
        { id: 21, name: 'Caneta Esferográfica Bic', code: 'ESC001', category: 'Canetas', type: 'Materiais de Escritório', expiration: '2030-01-01', lot: 'LOTE021', status: 'Normal' },
        { id: 22, name: 'Papel Sulfite A4 75g', code: 'ESC002', category: 'Papelaria', type: 'Materiais de Escritório', expiration: '2030-01-01', lot: 'LOTE022', status: 'Normal' },
        { id: 23, name: 'Calculadora de Mesa', code: 'ESC003', category: 'Eletrônicos', type: 'Materiais de Escritório', expiration: '2030-01-01', lot: 'LOTE023', status: 'Estoque baixo' },
        { id: 24, name: 'Grampeador', code: 'ESC004', category: 'Utensílios de Escritório', type: 'Materiais de Escritório', expiration: '2030-01-01', lot: 'LOTE024', status: 'Normal' },
    ];

    const [typeFilter, setTypeFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortBy, setSortBy] = useState('nome');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const medicinesPerPage = 5;

    const filteredAndSortedMedicines = useMemo(() => {
        let filtered = [...allMedicines];

        if (typeFilter) {
            filtered = filtered.filter(item => item.type === typeFilter);
        }
        if (categoryFilter) {
            filtered = filtered.filter(item => item.category === categoryFilter);
        }
        if (statusFilter) {
            filtered = filtered.filter(item => item.status === statusFilter);
        }
        
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.code.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query) ||
                item.lot.toLowerCase().includes(query)
            );
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'nome':
                    return a.name.localeCompare(b.name);
                case 'categoria':
                    return a.category.localeCompare(b.category);
                case 'validade':
                    return new Date(a.expiration) - new Date(b.expiration);
                case 'codigo':
                    return a.code.localeCompare(b.code);
                case 'status':
                    return a.status.localeCompare(b.status);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [allMedicines, typeFilter, categoryFilter, statusFilter, sortBy, searchQuery]);

    const indexOfLastMedicine = currentPage * medicinesPerPage;
    const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;
    const currentMedicines = filteredAndSortedMedicines.slice(indexOfFirstMedicine, indexOfLastMedicine);

    const totalPages = Math.ceil(filteredAndSortedMedicines.length / medicinesPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const getCategoriesByType = (type) => {
        const categories = allMedicines
            .filter(item => !type || item.type === type)
            .map(item => item.category);
        return [...new Set(categories)];
    };

    const availableCategories = getCategoriesByType(typeFilter);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 2; 

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let startPage = currentPage > 1 ? currentPage - 1 : 1;
            let endPage = startPage + maxVisiblePages - 1;

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
        }
        return pageNumbers;
    };

    const totalItems = filteredAndSortedMedicines.length;
    const itemsVencemEmBreve = filteredAndSortedMedicines.filter(m => m.status === 'Vencem em breve').length;
    const itemsEstoqueBaixo = filteredAndSortedMedicines.filter(m => m.status === 'Estoque baixo').length;
    const totalValue = 45800; // Valor fixo para o exemplo

    return (
        <div className="dashboard-container">
            <SideBar />
            <main className="main-content">
                <header className="main-header">
                    <h1>Estoque</h1>
                    <p>Visão geral do almoxarifado</p>
                    <div className="search-bar">
                        <button>Adicionar Itens</button>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </header>
                <section className="kpi-section">
                    <div className="kpi-card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 8H3" />
                            <path d="M10 12v-2a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v2" />
                            <path d="M3 10v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-1a2 2 0 0 1-2-2v-1" />
                            <path d="M12 2v2" />
                        </svg>
                        <div>
                            <h3>Total de Itens</h3>
                            {/* Uso do componente Counter */}
                            <Counter end={totalItems} duration={500} />
                            <p>Em estoque</p>
                        </div>
                    </div>
                    <div className="kpi-card attention">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12" y2="17" />
                        </svg>
                        <div>
                            <h3>Próximos do Vencimento</h3>
                            {/* Uso do componente Counter */}
                            <Counter end={itemsVencemEmBreve} duration={500} />
                            <p>Vencimento em até 30 dias</p>
                        </div>
                    </div>
                    <div className="kpi-card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                            <path d="M10 15h4" />
                            <path d="M10 18h4" />
                            <path d="M10 12h4" />
                        </svg>
                        <div>
                            <h3>Estoque Crítico</h3>
                            {/* Uso do componente Counter */}
                            <Counter end={itemsEstoqueBaixo} duration={500} />
                            <p>Abaixo do mínimo</p>
                        </div>
                    </div>
                    <div className="kpi-card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <div>
                            <h3>Valor Total</h3>
                            {/* Uso do componente Counter */}
                            <h2><Counter end={totalValue} duration={500} /></h2>
                            <p>Em estoque</p>
                        </div>
                    </div>
                </section>
                <section className="medicine-filter-section">
                    <label>
                        <label htmlFor="type-filter">Tipo de Material</label>
                        <select
                            id="type-filter"
                            name="type_filter"
                            value={typeFilter}
                            onChange={(e) => {
                                setTypeFilter(e.target.value);
                                setCategoryFilter('');
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">Todos</option>
                            <option value="Medicamentos">Medicamentos</option>
                            <option value="Materiais de Enfermagem">Materiais de Enfermagem</option>
                            <option value="Materiais de Escritório">Materiais de Escritório</option>
                        </select>
                    </label>
                    <label>
                        <label htmlFor="medicine-filter-categoria">Categoria do Item</label>
                        <select
                            id="medicine-filter-categoria"
                            name="medicine"
                            value={categoryFilter}
                            onChange={(e) => {
                                setCategoryFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">Todos</option>
                            {availableCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <label htmlFor="medicine-filter-status">Status</label>
                        <select
                            id="medicine-filter-status"
                            name="medicine_status"
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">Todos</option>
                            <option value="Normal">Normal</option>
                            <option value="Vencem em breve">Vencem em breve</option>
                            <option value="Estoque baixo">Estoque baixo</option>
                            <option value="Vencido">Vencido</option>
                        </select>
                    </label>
                    <label>
                        <label htmlFor="medicine-filter-order">Ordenar por</label>
                        <select
                            id="medicine-filter-order"
                            name="medicine_order"
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="nome">Nome</option>
                            <option value="categoria">Categoria</option>
                            <option value="validade">Validade</option>
                            <option value="codigo">Código</option>
                            <option value="status">Status</option>
                        </select>
                    </label>
                </section>
                <section className="low-stock-products">
                    <h2>Itens em Estoque</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ITEM</th>
                                <th>CÓDIGO</th>
                                <th>CATEGORIA</th>
                                <th>VALIDADE</th>
                                <th>LOTE</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMedicines.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.code}</td>
                                    <td>{item.category}</td>
                                    <td>{item.expiration}</td>
                                    <td>{item.lot}</td>
                                    <td className={`status-${item.status.toLowerCase().replace(/ /g, '-')}`}>
                                        {item.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {totalPages > 0 && (
                        <div className="pagination">
                            <span className="pagination-info">
                                Mostrando {indexOfFirstMedicine + 1} a {Math.min(indexOfLastMedicine, filteredAndSortedMedicines.length)} de {filteredAndSortedMedicines.length} itens
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

export default Estoque;