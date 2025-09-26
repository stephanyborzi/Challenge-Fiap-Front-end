import React, { useState, useEffect, useRef } from 'react';
import './ReconhecimentoFacial.css';
import SideBar from '../SideBar/SideBar';

const ReconhecimentoFacial = () => {
    const [status, setStatus] = useState('idle');
    const [statusMessage, setStatusMessage] = useState('Posicione seu rosto no círculo');
    const [infoMessage, setInfoMessage] = useState('Mantenha-se imóvel por 3 segundos para captura');
    const [lastResult, setLastResult] = useState(null);
    const [cameraReady, setCameraReady] = useState(false);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const videoRef = useRef(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    setCameraReady(true);
                }
            } catch (err) {
                console.error("Erro ao acessar a câmera: ", err);
                setStatus('failure');
                setStatusMessage('Erro: Câmera não acessível.');
                setInfoMessage('Verifique as permissões do seu navegador.');
                setLastResult('failure');
                setCameraReady(false);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleStartCapture = () => {
        if (!employeeName.trim() || !employeeId.trim()) {
            alert('Por favor, preencha o nome e o ID do funcionário.');
            return;
        }

        if (status === 'capturing' || status === 'processing' || !cameraReady) return;

        setStatus('capturing');
        setStatusMessage('Capturando...');
        setInfoMessage(`Capturando o rosto de ${employeeName}. Não se mova.`);
        setLastResult(null);

        setTimeout(() => {
            setStatus('processing');
            setStatusMessage('Processando...');
            setInfoMessage('Analisando as características faciais...');

            setTimeout(() => {
                const isSuccess = true; 
                if (isSuccess) {
                    setStatus('success');
                    setStatusMessage(`Seja bem-vindo(a), ${employeeName}!`);
                    setInfoMessage('Reconhecimento facial cadastrado com sucesso.');
                    setLastResult('success');
                } else {
                    setStatus('failure');
                    setStatusMessage('Falha no Cadastro');
                    setInfoMessage('Não foi possível capturar o rosto. Tente novamente.');
                    setLastResult('failure');
                }
            }, 2000);
        }, 3000);
    };

    const handleRetry = () => {
        setStatus('idle');
        setStatusMessage('Posicione seu rosto no círculo');
        setInfoMessage('Mantenha-se imóvel por 3 segundos para captura');
        setLastResult(null);
        setEmployeeName('');
        setEmployeeId('');
    };

    const getStatusDotClass = () => {
        if (status === 'success') return 'status-dot success';
        if (status === 'failure') return 'status-dot failure';
        if (status === 'capturing' || status === 'processing') return 'status-dot active';
        return 'status-dot pending';
    };

    const instructionItems = [
        { text: 'Preencha os dados do funcionário', icon: 'fas fa-id-card' },
        { text: 'Posicione seu rosto no centro do círculo', icon: 'fas fa-crosshairs' },
        { text: 'Mantenha-se imóvel durante a captura', icon: 'fas fa-pause-circle' },
        { text: 'Remova óculos escuros ou máscaras', icon: 'fas fa-mask' },
    ];

    return (
        <div className="reconhecimentofacial-container">
            <SideBar />
            <main className="reconhecimento-main-content">
                <div className="reconhecimento-header">
                    <h1>Cadastro de Reconhecimento Facial</h1>
                    <p>Preencha os dados abaixo e siga as instruções para cadastrar o reconhecimento facial de um novo funcionário.</p>
                </div>
                <div className="reconhecimento-content">
                    <div className="recognition-area">
                        <div className={`camera-view ${status}`}>
                            <video ref={videoRef} className={`face-circle ${status}`} autoPlay playsInline muted></video>
                            <p className="camera-instruction">{statusMessage}</p>
                        </div>
                        <div className="action-buttons">
                            {lastResult === null ? (
                                <button
                                    className="capture-button"
                                    onClick={handleStartCapture}
                                    disabled={status === 'capturing' || status === 'processing' || !cameraReady}
                                >
                                    <i className="fas fa-camera"></i> {status === 'capturing' ? 'Capturando...' : status === 'processing' ? 'Processando...' : 'Iniciar Cadastro'}
                                </button>
                            ) : (
                                <button className="retry-button" onClick={handleRetry}>
                                    <i className="fas fa-sync-alt"></i> Cadastrar Outro
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="info-area">
                        <div className="info-card">
                            <h3 className="card-title">
                                <i className="fas fa-user-plus"></i> Dados do Novo Funcionário
                            </h3>
                            <div className="employee-info-form">
                                <input
                                    type="text"
                                    placeholder="Nome do Funcionário"
                                    value={employeeName}
                                    onChange={e => setEmployeeName(e.target.value)}
                                    disabled={status !== 'idle' && status !== 'failure'}
                                />
                                <input
                                    type="text"
                                    placeholder="ID do Funcionário"
                                    value={employeeId}
                                    onChange={e => setEmployeeId(e.target.value)}
                                    disabled={status !== 'idle' && status !== 'failure'}
                                />
                            </div>
                        </div>
                        <div className="info-card">
                            <h3 className="card-title">
                                <i className="fas fa-info-circle"></i> Status do Cadastro
                            </h3>
                            <div className="status-item">
                                <span className={getStatusDotClass()}></span>
                                <span>{statusMessage}</span>
                            </div>
                            <p className="status-message">{infoMessage}</p>
                        </div>
                        <div className="info-card">
                            <h3 className="card-title">
                                <i className="fas fa-list-ul"></i> Instruções
                            </h3>
                            <div className="instruction-cards-container">
                                {instructionItems.map((item, index) => (
                                    <div key={index} className="instruction-card">
                                        <i className={`${item.icon} instruction-icon`}></i>
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReconhecimentoFacial;