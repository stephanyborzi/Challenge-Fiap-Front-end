import axios from "axios";

const BASE_URL = "http://localhost:8080/user";

const cadastro = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, {
        "name": data.nome,
        "surname": data.sobrenome,
        "email": data.email,
        "username": data.usuario,
        "password": data.senha,
        "role": data.cargo
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export default { cadastro };