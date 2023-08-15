import { AxiosStatic } from "axios";

export function setupAxios(axios: AxiosStatic) {
  axios.defaults.headers.Accept = "application/json";
  axios.defaults.baseURL = "http://localhost:8080";
  // axios.interceptors.request.use(onRequest, (error: AxiosError) =>
  //   Promise.reject(error),
  // );
  // axios.interceptors.response.use(
  //   (response: AxiosResponse) => response,
  //   onResponseError,
  // );
}
