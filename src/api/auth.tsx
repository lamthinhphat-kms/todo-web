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

async function loginWithGoogle(token: string) {
  try {
    const response = await axios.post("/auth/google/login/web", {
      token,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function loginWithCredential(token: string) {
  try {
    const response = await axios.post("/auth/google/login/credential", {
      token,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function refreshTokenApi(refreshToken: string) {
  try {
    const response = await axios.post("/auth/refresh", {
      refresh_token: refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const AuthService = {
  login,
  loginWithGoogle,
  loginWithCredential,
  refreshTokenApi,
};

export default AuthService;
