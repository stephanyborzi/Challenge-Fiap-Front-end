import React from 'react';
import SideBar from '../SideBar/SideBar'; 
import './Relatorios.css'; 

const Relatorios = () => {
    return (
        <div className="dashboard-container">
            <SideBar />
            <main className="relatorios-main-content">
                <header className="relatorios-header">
                    <div className="relatorios-title-group">
                        <p>Geração e exportação de relatórios detalhados</p>
                    </div>
                    <div className="header-actions">
                        <button className="icon-button notification-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 1 1-3.46 0"></path>
                            </svg>
                            Notificações
                        </button>
                        <button className="icon-button user-profile-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Admin User
                        </button>
                    </div>
                </header>

                <section className="filters-section">
                    <div className="filter-group">
                        <div className="filter-item">
                            <label htmlFor="period">Filtros de Relatório</label>
                            <select id="period">
                                <option>Último mês</option>
                                <option>Última semana</option>
                                <option>Último ano</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label htmlFor="category">Categoria</label>
                            <select id="category">
                                <option>Todas</option>
                                <option>Medicamentos</option>
                                <option>Equipamentos</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label htmlFor="report-type">Tipo de Relatório</label>
                            <select id="report-type">
                                <option>Estoque Atual</option>
                                <option>Movimentações</option>
                            </select>
                        </div>
                    </div>
                    <div className="filter-buttons">
                        <button className="filter-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                            </svg>
                            Filtros
                        </button>
                        <button className="export-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Exportar Tudo
                        </button>
                        <button className="apply-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
                                <path d="M8 12l2.67 2.67L16 9"></path>
                            </svg>
                            Aplicar
                        </button>
                    </div>
                </section>

                <section className="report-cards-section">
                    <div className="report-card">
                        <div className="report-card-header">
                            <h3>Relatório de Estoque</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 10h-1.26a2 2 0 0 0-1.74 1.25L14 14l-1.25-2.75A2 2 0 0 0 11.01 10H10a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zM4 14a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zM20 14a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"></path>
                            </svg>
                        </div>
                        <p className="subtitle">Situação atual do estoque com itens em baixa</p>
                        <div className="report-stats">
                            <div>
                                <h4>Total de itens:</h4>
                                <span className="value">1,247</span>
                            </div>
                            <div>
                                <h4>Baixo estoque:</h4>
                                <span className="value">23</span>
                            </div>
                            <div>
                                <h4>Valor total:</h4>
                                <span className="value">R$ 89,340</span>
                            </div>
                        </div>
                        <div className="report-actions">
                            <button><img src="/excel_icon.png" alt="Excel" /> Excel</button>
                            <button><img src="/txt_icon.png" alt="TXT" /> TXT</button>
                        </div>
                    </div>
                    <div className="report-card">
                        <div className="report-card-header">
                            <h3>Relatório Financeiro</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 20V10M12 20V4M6 20V14"></path>
                            </svg>
                        </div>
                        <p className="subtitle">Gastos e movimentação financeira</p>
                        <div className="report-stats">
                            <div>
                                <h4>Gastos do mês:</h4>
                                <span className="value">R$ 12,850</span>
                            </div>
                            <div>
                                <h4>Economia:</h4>
                                <span className="value">R$ 2,340</span>
                            </div>
                            <div>
                                <h4>Previsão próx. mês:</h4>
                                <span className="value">R$ 14,200</span>
                            </div>
                        </div>
                        <div className="report-actions">
                            <button><img src="/excel_icon.png" alt="Excel" /> Excel</button>
                            <button><img src="/txt_icon.png" alt="TXT" /> TXT</button>
                        </div>
                    </div>
                </section>

                <section className="predictions-section">
                    <h2>Previsões e Análises</h2>
                    <div className="predictions-cards-container">
                        <div className="prediction-card full-width">
                            <div className="card-header">
                                <h3>Previsão de Gastos - Próximos 6 Meses</h3>
                            </div>
                            <div className="prediction-item">
                                <span className="month">Janeiro 2025</span>
                                <span className="value-p">R$ 14,200</span>
                            </div>
                            <div className="prediction-item">
                                <span className="month">Fevereiro 2025</span>
                                <span className="value-p">R$ 13,800</span>
                            </div>
                            <div className="prediction-item">
                                <span className="month">Março 2025</span>
                                <span className="value-p">R$ 15,100</span>
                            </div>
                            <button className="export-full-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Exportar Previsão Completa
                            </button>
                        </div>
                        <div className="prediction-card">
                            <div className="card-header">
                                <h3>Próximas Compras Sugeridas</h3>
                            </div>
                            <div className="suggestion-item">
                                <div className="item-info">
                                    <span className="item-name">Dipirona 500mg</span>
                                    <span className="item-details">Estoque atual: 12 unidades</span>
                                    <span className="item-details">Sugestão compra: 500 unidades</span>
                                    <span className="item-details">Valor estimado: R$ 850</span>
                                </div>
                                <span className="urgency urgent">Urgente</span>
                            </div>
                            <div className="suggestion-item">
                                <div className="item-info">
                                    <span className="item-name">Seringas 10ml</span>
                                    <span className="item-details">Estoque atual: 45 unidades</span>
                                    <span className="item-details">Sugestão compra: 200 unidades</span>
                                    <span className="item-details">Valor estimado: R$ 340</span>
                                </div>
                                <span className="urgency medium">Médio</span>
                            </div>
                            <button className="view-list-button">Ver Lista Completa</button>
                        </div>
                    </div>
                </section>

                <section className="export-options-section">
                    <h2>Opções de Exportação</h2>
                    <div className="export-cards-container">
                        <div className="export-card">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <line x1="10" y1="9" x2="8" y2="9"></line>
                            </svg>
                            <h3>Excel Completo</h3>
                            <p>Todos os dados em planilha</p>
                        </div>
                        <div className="export-card">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            <h3>Arquivo TXT</h3>
                            <p>Dados em texto simples</p>
                        </div>
                        <div className="export-card">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <line x1="10" y1="9" x2="8" y2="9"></line>
                            </svg>
                            <h3>Relatório PDF</h3>
                            <p>Documento formatado</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Relatorios;