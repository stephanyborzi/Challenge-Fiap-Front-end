import axios from "axios";

const BASE_URL = "http://localhost:8080/user";

const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export default { login };