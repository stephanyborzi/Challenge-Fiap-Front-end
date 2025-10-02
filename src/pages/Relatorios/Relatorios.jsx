import React, { useState, useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import './Relatorios.css';
import { fakeData } from '../../fakeApiData/apiData';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Relatorios = ({ currentLab = 'todos', onLabChange }) => { 
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedMonth, setSelectedMonth] = useState('Outubro');
    const [selectedYear, setSelectedYear] = useState('2025');

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            try {
                if (!fakeData) {
                    throw new Error('Dados não encontrados.');
                }
                setData(fakeData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [currentLab]); 

    const formatCurrency = (value) => {
        if (typeof value !== 'number') return 'R$ 0,00';
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatDate = (isoString) => {
        if (!isoString) return 'N/A';
        const date = new Date(isoString);
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const exportToCSV = (data, headers, filename) => {
        const csvContent = [
            headers.join(';'),
            ...data.map(row => row.map(item => `"${item}"`).join(';'))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportExpenseForecast = () => {
        const headers = ['Mês', 'Valor'];
        const dataRows = expenseForecast.map(item => [item.month, formatCurrency(item.value)]);
        exportToCSV(dataRows, headers, 'previsao_gastos_completa.csv');
    };

    const exportStockItems = () => {
        const headers = ['ID', 'Nome do Item', 'Categoria', 'Estoque Atual', 'Valor Unitário', 'Valor Total', 'Localização', 'Laboratório'];
        const dataRows = stockItemsFiltered.map(item => [ 
            item.productId,
            item.name,
            item.category,
            item.currentStock,
            formatCurrency(item.unitPrice),
            formatCurrency(item.currentStock * item.unitPrice),
            item.location,
            item.laboratory,
        ]);
        exportToCSV(dataRows, headers, 'itens_em_estoque.csv');
    };
    const exportMovements = () => {
        const headers = ['ID', 'Produto', 'Tipo', 'Quantidade', 'Valor', 'Data', 'Motivo', 'Responsável', 'Fornecedor', 'Laboratório'];
        const dataRows = filteredMovements.map(movement => {
            const item = stockItems.find(i => i.productId === movement.productId);
            const itemName = item?.name || 'N/A';
            const movementValue = item ? movement.quantity * item.unitPrice : 0;
            const supplierName = movement.supplier ? suppliers.find(s => s.supplierId === movement.supplier)?.name : 'N/A';
            return [
                movement.movementId,
                itemName,
                movement.type,
                movement.quantity,
                formatCurrency(movementValue),
                formatDate(movement.date),
                movement.reason,
                movement.responsible,
                supplierName,
                item?.laboratory || 'N/A' 
            ];
        });
        exportToCSV(dataRows, headers, 'historico_movimentacoes.csv');
    };

    const exportToPDF = (tableId, filename) => {
        const input = document.getElementById(tableId);
        if (!input) {
            console.error(`Element with id "${tableId}" not found.`);
            return;
        }

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save(filename);
        });
    };

    if (loading) {
        return (
            <div className="relatorios-page">
                <SideBar currentLab={currentLab} onLabChange={onLabChange} />
                <div className="relatorios-content-wrapper">
                    <div className="loading-state-modern">
                        <div className="loading-spinner"></div>
                        <p className="loading-message">Carregando relatórios...</p>
                        <p className="loading-sub-message">Aguarde um momento, estamos organizando os dados para você. ⏳</p>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="relatorios-page">
                <SideBar currentLab={currentLab} onLabChange={onLabChange} />
                <div className="relatorios-content-wrapper">
                    <div className="error-state">Erro: {error}</div>
                </div>
            </div>
        );
    }

    const {
        stockItems,
        stockMovements,
        expenseForecast,
        suppliers
    } = data;

    const stockItemsFiltered = currentLab === 'todos' 
        ? stockItems 
        : stockItems.filter(item => item.laboratory === currentLab);

    const getMonthsAndYears = (movements) => {
        const dates = movements.map(m => new Date(m.date));
        const months = [...new Set(dates.map(d => d.toLocaleString('default', { month: 'long' })))].sort((a, b) => {
            const monthOrder = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
            return monthOrder.indexOf(a.toLowerCase()) - monthOrder.indexOf(b.toLowerCase());
        });
        const years = [...new Set(dates.map(d => d.getFullYear().toString()))].sort();
        return { months, years };
    };

    const { months, years } = getMonthsAndYears(stockMovements);

    const filteredMovements = stockMovements.filter(movement => {
        const item = stockItems.find(i => i.productId === movement.productId);
        const movementDate = new Date(movement.date);
        const movementMonth = movementDate.toLocaleString('default', { month: 'long' });
        const movementYear = movementDate.getFullYear().toString();

        const matchesCategory = selectedCategory === 'Todos' || (item && item.category === selectedCategory);
        const matchesMonth = selectedMonth === 'Todos' || movementMonth.toLowerCase() === selectedMonth.toLowerCase();
        const matchesYear = selectedYear === 'Todos' || movementYear === selectedYear;
        const matchesLaboratory = currentLab === 'todos' || (item && item.laboratory === currentLab);

        return matchesCategory && matchesMonth && matchesYear && matchesLaboratory; 
    });
    const inventorySummaryFiltered = (() => {
        const stockMap = {};
        stockItemsFiltered.forEach(item => {
            stockMap[item.productId] = {
                ...item,
                currentStock: 0 
            };
        });

        filteredMovements.forEach(movement => {
            const item = stockMap[movement.productId];
            if (item) {
                if (movement.type === 'entrada') {
                    item.currentStock += movement.quantity;
                } else if (movement.type === 'saida') {
                    item.currentStock -= movement.quantity;
                }
            }
        });

        const totalItems = Object.values(stockMap).reduce((acc, item) => acc + item.currentStock, 0);
        const lowStockItems = Object.values(stockMap).filter(item => item.currentStock > 0 && item.currentStock <= item.minStock).length;
        const outOfStockItems = Object.values(stockMap).filter(item => item.currentStock === 0).length;
        const totalValue = Object.values(stockMap).reduce((acc, item) => acc + (item.currentStock * item.unitPrice), 0);

        return { totalItems, lowStockItems, outOfStockItems, totalValue };
    })();

    const financialSummaryFiltered = {
        monthlyExpenses: filteredMovements.filter(m => m.type === 'saida').reduce((acc, movement) => {
            const item = stockItems.find(i => i.productId === movement.productId);
            return acc + (item ? movement.quantity * item.unitPrice : 0);
        }, 0),
    };

    const formattedLabName = currentLab === 'todos'
        ? 'Todos os Laboratórios'
        : currentLab.replace('laboratorio', 'Laboratório ');
    return (
        <div className="relatorios-page">
            <SideBar currentLab={currentLab} onLabChange={onLabChange} />
            <div className="relatorios-content-wrapper">
                <header className="relatorios-header">
                    <div className="relatorios-title-group">
                        <h1 className='main-title'>Relatórios</h1>
                        <p>Geração e exportação de relatórios detalhados</p>
                    </div>
                </header>

                <main className="relatorios-main-content">
                    <section className="filters-section card">
                        <div className="filter-group">
                            <div className="filter-item">
                                <label htmlFor="category-filter">Filtrar por Categoria</label>
                                <select id="category-filter" value={selectedCategory} onChange={handleCategoryChange}>
                                    <option value="Todos">Todos</option>
                                    <option value="Medicamentos">Medicamentos</option>
                                    <option value="Materiais de Enfermagem">Materiais de Enfermagem</option>
                                    <option value="Materiais de Escritório">Materiais de Escritório</option>
                                </select>
                            </div>
                            <div className="filter-item">
                                <label htmlFor="month-filter">Filtrar por Mês</label>
                                <select id="month-filter" value={selectedMonth} onChange={handleMonthChange}>
                                    <option value="Todos">Todos</option>
                                    {months.map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter-item">
                                <label htmlFor="year-filter">Filtrar por Ano</label>
                                <select id="year-filter" value={selectedYear} onChange={handleYearChange}>
                                    <option value="Todos">Todos</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className="report-cards-section">
                        <div className="report-card card">
                            <div className="report-card-header">
                                <h3>Resumo de Estoque ({selectedCategory})</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 10h-1.26a2 2 2 0 0-1.74 1.25L14 14l-1.25-2.75A2 2 0 0 0 11.01 10H10a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zM4 14a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zM20 14a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"></path>
                                </svg>
                            </div>
                            <p className="subtitle">Situação do estoque em {selectedMonth} de {selectedYear}.</p>
                            <div className="report-stats">
                                <div>
                                    <h4>Total de itens:</h4>
                                    <span className="value">{inventorySummaryFiltered.totalItems.toLocaleString()}</span>
                                </div>
                                <div>
                                    <h4>Baixo estoque:</h4>
                                    <span className="value">{inventorySummaryFiltered.lowStockItems}</span>
                                </div>
                                <div>
                                    <h4>Valor total:</h4>
                                    <span className="value">{formatCurrency(inventorySummaryFiltered.totalValue)}</span>
                                </div>
                                <div>
                                    <h4>Itens sem estoque:</h4>
                                    <span className="value">{inventorySummaryFiltered.outOfStockItems}</span>
                                </div>
                            </div>
                        </div>

                        <div className="report-card card">
                            <div className="report-card-header">
                                <h3>Resumo Financeiro ({selectedCategory})</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 20V10M12 20V4M6 20V14"></path>
                                </svg>
                            </div>
                            <p className="subtitle">Gastos do período filtrado: {selectedMonth} de {selectedYear}</p>
                            <div className="report-stats">
                                <div>
                                    <h4>Gastos do período:</h4>
                                    <span className="value">{formatCurrency(financialSummaryFiltered.monthlyExpenses)}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="predictions-section">
                        <h2>Previsões e Análises</h2>
                        <div className="predictions-cards-container">
                            <div className="prediction-card card">
                                <div className="card-header">
                                    <h3>Previsão de Gastos - Próximos 6 Meses</h3>
                                </div>
                                {expenseForecast.map((item, index) => (
                                    <div className="prediction-item" key={index}>
                                        <span className="month">{item.month}</span>
                                        <span className="value-p">{formatCurrency(item.value)}</span>
                                    </div>
                                ))}
                                <button className="export-full-button" onClick={exportExpenseForecast}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" y1="15" x2="12" y2="3"></line>
                                    </svg>
                                    Exportar Previsão Completa
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="detailed-reports-section">
                        <h2>Relatórios Detalhados</h2>

                        <div className="detailed-report-table card" id="stock-items-table">
                            <div className="table-header">
                                <h3>Itens em Estoque ({formattedLabName})</h3>
                                <div className="header-actions">
                                    <button className="export-table-btn" onClick={exportStockItems}>Exportar itens em Estoque </button>
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome do Item</th>
                                        <th>Categoria</th>
                                        <th>Estoque Atual</th>
                                        <th>Valor Unitário</th>
                                        <th>Valor Total</th>
                                        <th>Localização</th>
                                        <th>Laboratório</th> {/* Adicionada coluna */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {stockItemsFiltered.map(item => (
                                        <tr key={item.productId}>
                                            <td>{item.productId}</td>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.currentStock}</td>
                                            <td>{formatCurrency(item.unitPrice)}</td>
                                            <td>{formatCurrency(item.currentStock * item.unitPrice)}</td>
                                            <td>{item.location}</td>
                                            <td>{item.laboratory === 'laboratorio1' ? 'Laboratório 1' : 'Laboratório 2'}</td> {/* Renderiza o Laboratório */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="detailed-report-table card mt-4" id="movements-table">
                            <div className="table-header">
                                <h3>Histórico de Movimentações (Filtrado)</h3>
                                <div className="table-actions">
                                    <button className="export-table-btn" onClick={exportMovements}>Exportar CSV</button>
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Produto</th>
                                        <th>Tipo</th>
                                        <th>Quantidade</th>
                                        <th>Valor do Movimento</th>
                                        <th>Data</th>
                                        <th>Motivo</th>
                                        <th>Responsável</th>
                                        <th>Fornecedor</th>
                                        <th>Laboratório</th> {/* Adicionada coluna */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMovements.map(movement => {
                                        const item = stockItems.find(i => i.productId === movement.productId);
                                        const itemName = item?.name || 'N/A';
                                        const movementValue = item ? movement.quantity * item.unitPrice : 0;
                                        const supplierName = movement.supplier ? suppliers.find(s => s.supplierId === movement.supplier)?.name : 'N/A';
                                        return (
                                            <tr key={movement.movementId}>
                                                <td>{movement.movementId}</td>
                                                <td>{itemName}</td>
                                                <td><span className={`movement-type ${movement.type}`}>{movement.type}</span></td>
                                                <td>{movement.quantity}</td>
                                                <td>{formatCurrency(movementValue)}</td>
                                                <td>{formatDate(movement.date)}</td>
                                                <td>{movement.reason}</td>
                                                <td>{movement.responsible || 'N/A'}</td>
                                                <td>{supplierName}</td>
                                                <td>{item?.laboratory === 'laboratorio1' ? 'Laboratório 1' : item?.laboratory === 'laboratorio2' ? 'Laboratório 2' : 'N/A'}</td> {/* Renderiza o Laboratório */}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Relatorios;