import React, { useState, useEffect, useRef } from 'react';
import './ReconhecimentoFacial.css';
import SideBar from '../SideBar/SideBar';

const ReconhecimentoFacial = () => {
    const [status, setStatus] = useState('idle');
    const [statusMessage, setStatusMessage] = useState('Posicione seu rosto no círculo');
    const [infoMessage, setInfoMessage] = useState('Mantenha-se imóvel por 3 segundos para captura');
    const [lastResult, setLastResult] = useState(null);
    const [cameraReady, setCameraReady] = useState(false);

    const videoRef = useRef(null);

    const uncadastredEmployees = [
        'Alice Souza',
        'Bruno Costa',
        'Carla Dias',
        'Eduardo Mendes',
        'Fernanda Santos'
    ];

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
        if (status === 'capturing' || status === 'processing' || !cameraReady) return;

        setStatus('capturing');
        setStatusMessage('Capturando...');
        setInfoMessage('Não se mova. A captura está em andamento.');
        setLastResult(null);

        setTimeout(() => {
            setStatus('processing');
            setStatusMessage('Processando...');
            setInfoMessage('Analisando as características faciais...');

            setTimeout(() => {
                const isSuccess = true; 
                if (isSuccess) {
                    setStatus('success');
                    setStatusMessage('Reconhecimento Concluído!');
                    setInfoMessage('Acesso concedido. Bem-vindo(a)!');
                    setLastResult('success');
                } else {
                    setStatus('failure');
                    setStatusMessage('Falha no Reconhecimento');
                    setInfoMessage('Não foi possível identificar o rosto. Tente novamente.');
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
    };

    const getStatusDotClass = () => {
        if (status === 'success') return 'status-dot success';
        if (status === 'failure') return 'status-dot failure';
        if (status === 'capturing' || status === 'processing') return 'status-dot active';
        return 'status-dot pending';
    };

    const instructionItems = [
        { text: 'Posicione seu rosto no centro do círculo', icon: 'fas fa-crosshairs' },
        { text: 'Mantenha-se imóvel durante a captura', icon: 'fas fa-pause-circle' },
        { text: 'Remova óculos escuros ou máscaras', icon: 'fas fa-mask' },
        { text: 'Certifique-se de boa iluminação', icon: 'fas fa-lightbulb' },
    ];

    return (
        <div className="reconhecimentofacial-container">
            <SideBar />
            <main className="reconhecimento-main-content">
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
                                    <i className="fas fa-camera"></i> {status === 'capturing' ? 'Capturando...' : status === 'processing' ? 'Processando...' : 'Iniciar Captura'}
                                </button>
                            ) : (
                                <button className="retry-button" onClick={handleRetry}>
                                    <i className="fas fa-sync-alt"></i> Tentar Novamente
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="info-area">
                        <div className="info-card">
                            <h3 className="card-title">
                                <i className="fas fa-info-circle"></i> Status do Reconhecimento
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
                        <div className="info-card">
                            <h3 className="card-title">
                                <i className="fas fa-users-slash"></i> Pendentes
                            </h3>
                            <div className="uncadastred-list">
                                {uncadastredEmployees.length > 0 ? (
                                    uncadastredEmployees.map((name, index) => (
                                        <div key={index} className="uncadastred-item">
                                            <span className="uncadastred-dot"></span>
                                            <span>{name}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="uncadastred-item no-employees">
                                        Nenhum funcionário pendente.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReconhecimentoFacial;