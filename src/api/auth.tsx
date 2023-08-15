import axios from "axios";

async function login({ email, password }: { email: string; password: string }) {
  try {
    const response = await axios.post("/auth/signin", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const AuthService = {
  login,
};

export default AuthService;
