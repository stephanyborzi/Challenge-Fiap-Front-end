import React, { useState } from 'react';
import { FaCamera, FaEdit, FaSave, FaTimes, FaPills, FaBoxOpen, FaFileInvoice, FaFingerprint, FaCheck } from 'react-icons/fa';
import SideBar from '../SideBar/SideBar';
import './Perfil.css';

const Perfil = () => {
    const [userData, setUserData] = useState({
        fullName: 'Maria Silva Santos',
        email: 'maria.silva@imedstock.com',
        phone: '(11) 99999-9999',
        crf: '12345-SP',
        cargo: 'Almoxarife',
        departamento: 'Almoxarifado Central',
        profileImage: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [imageError, setImageError] = useState('');
    const iconColor = '#030444';
    const iconColorCheck = '#2ecc71';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { 
                setImageError('O arquivo é muito grande. Tamanho máximo é de 2MB.');
                return;
            }
            if (!['image/jpeg', 'image/png'].includes(file.type)) {
                setImageError('Formato de arquivo inválido. Use JPG ou PNG.');
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setUserData({ ...userData, profileImage: imageUrl });
            setImageError('');
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        alert('Informações salvas com sucesso!');
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setImageError('');
    };

    return (
        <div className="perfil-container">
            <SideBar />
            <main className="perfil-main-content">
                <header className="perfil-header">
                    <div className="perfil-title-group">
                        <h1 className='perfil-user-imagem'>Perfil do Usuário</h1>
                        <p>Gerenciar informações do usuário</p>
                    </div>
                </header>
                <div className="perfil-content">
                    <section className="profile-info-section">
                        <div className="profile-header">
                            <div className="profile-image-container">
                                <label htmlFor="profile-image-upload" className="editable">
                                    {userData.profileImage ? (
                                        <img 
                                            src={userData.profileImage} 
                                            alt="Perfil do Usuário" 
                                            className="profile-image" 
                                        />
                                    ) : (
                                        <div className="profile-initials">
                                            {userData.fullName.split(' ').map(name => name[0]).join('')}
                                        </div>
                                    )}
                                    <div className="profile-image-overlay">
                                        <FaCamera /> 
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="profile-image-upload"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                    accept="image/png, image/jpeg"
                                />
                                {imageError && <span className="image-error-message">{imageError}</span>}
                                <div className="user-profile-details">
                                    <h2>Maria Silva</h2>
                                    <p className="user-role">{userData.cargo}</p>
                                    <p className="last-activity">Última atividade: 15 de Janeiro, 2025 às 14:30</p>
                                </div>
                            </div>
                            <div className="profile-actions">
                                {!isEditing ? (
                                    <button className="edit-button" onClick={handleEditClick}>
                                        <FaEdit /> 
                                        Editar Perfil
                                    </button>
                                ) : (
                                    <>
                                        <button className="save-button" onClick={handleSaveClick}>
                                            <FaSave />
                                            Salvar
                                        </button>
                                        <button className="cancel-button" onClick={handleCancelClick}>
                                            <FaTimes />
                                            Cancelar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="info-cards-container">
                            <div className="info-card personal-info">
                                <h3 className="card-title">Informações Pessoais</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Nome Completo</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={userData.fullName}
                                            onChange={handleInputChange}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={userData.email}
                                            onChange={handleInputChange}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Telefone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={userData.phone}
                                            onChange={handleInputChange}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CRF</label>
                                        <input
                                            type="text"
                                            name="crf"
                                            value={userData.crf}
                                            onChange={handleInputChange}
                                            readOnly={!isEditing}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Cargo</label>
                                        <select
                                            name="cargo"
                                            value={userData.cargo}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        >
                                            <option value="Farmacêutica Responsável">Farmacêutica Responsável</option>
                                            <option value="Técnico de Enfermagem">Técnico de Enfermagem</option>
                                            <option value="Administrador">Administrador</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Departamento</label>
                                        <select
                                            name="departamento"
                                            value={userData.departamento}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        >
                                            <option value="Almoxarifado Central">Almoxarifado Central</option>
                                            <option value="Farmácia Interna">Farmácia Interna</option>
                                            <option value="Gestão">Gestão</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="info-card recent-activity">
                                <h3 className="card-title">Atividade Recente</h3>
                                <div className="activity-item">
                                    <div className="activity-icon-container">
                                        <FaPills color={iconColor} />
                                    </div>
                                    <div className="activity-details">
                                        <h4>Retirada de medicamento</h4>
                                        <p>Hoje, 14:30</p>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-icon-container">
                                        <FaBoxOpen color={iconColor} />
                                    </div>
                                    <div className="activity-details">
                                        <h4>Cadastro de produto</h4>
                                        <p>Ontem, 16:45</p>
                                    </div>
                                </div>
                                <div className="activity-item">
                                    <div className="activity-icon-container">
                                        <FaFileInvoice color={iconColor} />
                                    </div>
                                    <div className="activity-details">
                                        <h4>Relatório gerado</h4>
                                        <p>2 dias atrás</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-cards-container">
                            <div className="info-card security-settings">
                                <h3 className="card-title">Configurações de Segurança</h3>
                                <div className="setting-item">
                                    <FaFingerprint color={iconColor} className="setting-icon" />
                                    <div className="setting-details">
                                        <h4>Reconhecimento Facial</h4>
                                        <p>Biometria ativa e configurada</p>
                                    </div>
                                    <span className="status-pill active">Ativo</span>
                                </div>
                            </div>
                            <div className="info-card permissions">
                                <h3 className="card-title">Permissões</h3>
                                <div className="permission-item">
                                    <span>Gerenciar Estoque</span>
                                    <FaCheck color={iconColorCheck} /> 
                                </div>
                                <div className="permission-item">
                                    <span>Cadastrar Produtos</span>
                                    <FaCheck color={iconColorCheck} /> 
                                </div>
                                <div className="permission-item">
                                    <span>Visualizar Relatórios</span>
                                    <FaCheck color={iconColorCheck} /> 
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Perfil;