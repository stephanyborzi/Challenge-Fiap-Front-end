import { FaUser, FaLock, FaSmile } from "react-icons/fa";
import "./Login.css";
import { useState } from "react";
import LoginService from "./LoginService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    console.log("Attempting login with:", { username, password });
    try {
      const result = await LoginService.login(username, password);

      if (result.authenticated) {
        console.log("Login successful:", result);
        window.location.href = "/dashboard";
        return;
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="login-form">
        <img
          src="src\images\dasa_logo.png"
          alt="Logo"
          className="logo"
        />
        <h1>StockManager</h1>
        <h3>Entre em sua conta</h3>

        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembrar-me
          </label>
          <a href="#">Esqueci minha senha</a>
        </div>
        <div className="button-group">
          <nav>
          <a onClick={(e) => handleLogin(e)} className="btn-link">Logar</a>
        </nav>
          <div className="separator">ou</div>

          <button type="button" className="face-login">
            <FaSmile className="icon" /> Entrar com Reconhecimento Facial
          </button>
        </div>
        <div className="register">
          <span>Não possui conta?</span>
          <a href="/cadastro">Registre-se</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
