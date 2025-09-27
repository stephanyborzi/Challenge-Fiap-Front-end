import { FaUser, FaLock, FaSmile, FaCamera, FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import "./Cadastro.css";
import logo from "../../images/dasa_logo.png";
const CadastroService = {
  cadastro: async (data) => {
    console.log("Simulating registration with data:", data);
    return { code: 201, message: "Cadastro realizado com sucesso!" };
  }
};

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const [facialStatus, setFacialStatus] = useState('idle'); 
  const videoRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [facialData, setFacialData] = useState(null);

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
    console.log("Iniciando captura facial...");

    setTimeout(() => {
      setFacialStatus('processing');
      console.log("Captura bem-sucedida. Processando reconhecimento...");

      setTimeout(() => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/jpeg');
        setFacialData(imageData);

        setFacialStatus('success');
        console.log("Reconhecimento facial bem-sucedido!");
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

  async function cadastro(data) {
    await CadastroService.cadastro(data);
    console.log("Cadastro successful:", data);
    return true;
  }

  async function handleCadastro (event) {
    if (nome === "" || sobrenome === "" || email === "" || usuario === "" || senha === "" || cargo === "") {
      console.log("Por favor, preencha todos os campos obrigatórios.");
    } else if (!aceitouTermos) {
      console.log("Você deve aceitar os termos e políticas de privacidade.");
    } else if (facialStatus !== 'success') {
      console.log("Você deve capturar a foto do rosto para o cadastro.");
    } else {
      const data = {
        nome,
        sobrenome,
        email,
        usuario,
        senha,
        cargo,
        facialData
      };
      const result = await cadastro(data);
      if (result) {
        window.location.href = "/";
        console.log("Cadastro realizado com sucesso! Por favor, faça o login.");
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={(e) => { e.preventDefault(); handleCadastro(); }} className="login-form">
        <img src={logo} alt="Logo" className="logo-image" />
        <h1>Criar Conta</h1>
        <h3>Cadastre-se no ControlSystem</h3>

        <div className="input-field-group">
          <div className="input-field">
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <FaUser className="icon" />
          </div>
          <div className="input-field">
            <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
            <FaUser className="icon" />
          </div>
        </div>

        <div className="input-field">
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <FaSmile className="icon" />
        </div>

        <div className="input-field">
          <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
          <FaUser className="icon" />
        </div>

        <div className="input-field select-field">
          <label htmlFor="job-select">Cargo/Função</label>
          <select id="job-select" name="job" value={cargo} onChange={(e) => setCargo(e.target.value)}>
            <option value="" disabled>Selecione um cargo</option>
            <option value="developer">Desenvolvedor</option>
            <option value="designer">Designer</option>
            <option value="manager">Gerente</option>
          </select>
        </div>

        <div className="input-field">
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <FaLock className="icon" />
        </div>

        <div className="facial-recognition-container">
          <p>Configure o reconhecimento facial para login rápido e seguro.</p>
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
            className={`face-circle ${facialStatus === 'processing' ? 'scanning-effect' : ''}`}
          ></video>
          {facialStatus === 'success' && (
            <div className="facial-success-message">
              <FaCheckCircle className="success-icon" />
            </div>
          )}
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" checked={aceitouTermos} onChange={(e) => setAceitouTermos(e.target.checked)} />
            Aceito os termos e políticas de privacidade
          </label>
        </div>
        <nav>
          <a onClick={(e) => handleCadastro()} className="btn-link">Cadastrar</a>
      </nav>
        <div className="register">
          <span>Já tem uma conta?</span>
          <a href="/">Entrar</a>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
