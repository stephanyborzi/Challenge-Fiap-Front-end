import { useState, useRef, useEffect } from "react";
import { FaUser, FaLock, FaCamera, FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./Login.css";

const LoginService = {
  login: async (data) => {
    console.log("Simulando login com dados:", data);
    return { code: 200, message: "Login realizado com sucesso!" };
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [facialStatus, setFacialStatus] = useState('idle'); 
  const videoRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [facialData, setFacialData] = useState(null);
  
  const [message, setMessage] = useState(null);

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
        setFacialStatus('camera-error');
        setCameraReady(false);
        setMessage("Erro: Acesso à câmera negado.");
      }
    };
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleFacialCapture = () => {
    if (!cameraReady || facialStatus === 'capturing' || facialStatus === 'processing') return;
    
    setFacialStatus('capturing');
    setMessage("Capturando foto...");
    
    setTimeout(() => {
      setFacialStatus('processing');
      setMessage("Analisando rosto...");
      
      setTimeout(() => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg');
        setFacialData(imageData);
        
        setFacialStatus('success');
        setMessage("Reconhecimento facial bem-sucedido!");
      }, 2000); 
    }, 1000); 
  };

  const getButtonContent = () => {
    switch (facialStatus) {
      case 'capturing':
        return <><FaSpinner className="icon spin" /> Capturando...</>;
      case 'processing':
        return <><FaSpinner className="icon spin" /> Analisando Rosto...</>;
      case 'success':
        return <><FaCheckCircle className="icon" /> Foto Capturada!</>;
      case 'camera-error':
        return <><FaTimesCircle className="icon" /> Erro na Câmera</>;
      default:
        return <><FaCamera className="icon" /> Capturar Foto do Rosto</>;
    }
  };

  const getButtonClass = () => {
    if (facialStatus === 'success') return 'capture-button success';
    if (facialStatus === 'camera-error') return 'capture-button failure';
    return 'capture-button';
  };
  
  async function handleLogin(event) {
    event.preventDefault();

    if (!email || !senha) {
      setMessage("Por favor, preença o e-mail e a senha.");
      return;
    }
    
    if (facialStatus !== 'success') {
      setMessage("Por favor, capture sua foto para o reconhecimento facial.");
      return;
    }
    
    const data = {
      email,
      senha,
      facialData
    };
    
    const result = await LoginService.login(data);
    
    if (result.code === 200) {
      console.log("Login bem-sucedido:", data);
      setMessage("Login realizado com sucesso!");
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="login-form">
        <img
          src="src\images\dasa_logo.png"
          alt="Logo"
          className="logo"
        />
        <h1>Bem-Vindo de Volta</h1>
        <h3>Faça login no ControlSystem</h3>

        <div className="input-field">
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
          />
          <FaLock className="icon" />
        </div>

        <div className="facial-recognition-container">
          <p>Use o reconhecimento facial para acessar sua conta.</p>
          <button
            type="button"
            className={getButtonClass()}
            onClick={handleFacialCapture}
            disabled={!cameraReady || facialStatus === 'capturing' || facialStatus === 'processing'}
          >
            {getButtonContent()}
          </button>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`face-circle ${facialStatus === 'processing' ? 'scanning-effect' : ''} ${facialStatus === 'success' ? 'success-border' : ''} ${facialStatus === 'failure' || facialStatus === 'camera-error' ? 'failure-border' : ''}`}
          ></video>
          {facialStatus === 'success' && (
            <div className="facial-success-message">
              <FaCheckCircle className="success-icon" />
            </div>
          )}
        </div>
        
        {message && <div className="message-box">{message}</div>}

        <nav>
          <a onClick={handleLogin} className="btn-link">Entrar</a>
        </nav>
        
        <div className="separator">ou</div>
        
        <div className="register">
          <span>Não tem uma conta?</span>
          <a href="/cadastro">Cadastre-se</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
