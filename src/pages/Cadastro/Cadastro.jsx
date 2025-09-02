import { FaUser, FaLock, FaSmile, FaCamera } from "react-icons/fa";
import "./Cadastro.css";
import { useState } from "react";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState(""); 
  const [aceitouTermos, setAceitouTermos] = useState(false); 
  const handleCadastro = (event) => {
    event.preventDefault();
    if (!aceitouTermos) {
      alert("Você deve aceitar os termos e políticas de privacidade.");
      return;
    }
    alert(`Dados enviados:\nNome: ${nome}\nSobrenome: ${sobrenome}\nEmail: ${email}\nUsuario: ${usuario}\nCargo: ${cargo}\nAceitou Termos: ${aceitouTermos}`);
  };

  return (
    <div className="container">
      <form onSubmit={handleCadastro} className="login-form">
        <img
          src="src\pages\images\dasa_logo.png"
          alt="Logo"
          className="logo"
        />
        <h1>Criar Conta</h1>
        <h3>Cadastre-se no StockManager</h3>

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
          <div className="header">
            <h2>Configurar Reconhecimento Facial</h2>
            <span className="optional">Obrigatório</span>
          </div>
          <p>Configure o reconhecimento facial para login rápido e seguro.</p>
          <button type="button" className="capture-button">
            <FaCamera />
            Capturar Foto do Rosto
          </button>
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" checked={aceitouTermos} onChange={(e) => setAceitouTermos(e.target.checked)} />
            Aceito os termos e políticas de privacidade
          </label>
        </div>
        
        <button type="submit">Cadastrar</button>

        <div className="register">
          <span>Já tem uma conta?</span>
          <a href="/login">Entrar</a>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;