import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosStatic,
} from "axios";
import localStorageUtils from "./LocalStorage";
import jwtDecode from "jwt-decode";
import AuthService from "../api/auth";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}
export function setupAxios(axios: AxiosStatic) {
  axios.defaults.headers.Accept = "application/json";
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.interceptors.request.use(onRequest, (error: AxiosError) =>
    Promise.reject(error)
  );
  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    onResponseError
  );
}

const onRequest = (config: AdaptAxiosRequestConfig) => {
  const accessToken = localStorageUtils.getFromLocal("access_token");
  if (accessToken) {
    const { exp } = jwtDecode<{
      exp: number;
    }>(accessToken);

    const expirationTime = exp * 1000;
    if (Date.now() < expirationTime) {
      config.headers.Authorization = "Bearer " + accessToken;
    }
  }

  return config;
};

const onResponseError = async (
  error: AxiosError<{
    message: string;
  }>
) => {
  if (
    error.response?.status === 401 &&
    error.response.data.message === "Unauthorized"
  ) {
    const config = error.config;
    const refreshToken = localStorageUtils.getFromLocal("refresh_token");
    if (refreshToken) {
      const data = await AuthService.refreshTokenApi(refreshToken ?? "");
      if (data?.access_token) {
        config!.headers.Authorization = `Bearer ${data.access_token}`;
        localStorageUtils.saveToLocal("access_token", data.access_token);
      }
      return axios.request(config as AdaptAxiosRequestConfig);
    }
  }
  return Promise.reject(error);
};
