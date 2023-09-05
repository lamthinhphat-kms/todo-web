import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./styles.css";
import { useMutation } from "react-query";
import AuthService from "../../api/auth";
import {
  GoogleLogin,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import { store } from "../../zustand/store";

function LoginScreen() {
  const { setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setIsLoading = store((store) => store.setIsLoading);

  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      setIsLoading(false);
      setAuthenticated(data.access_token, data.refresh_token);
    },
  });

  const loginWithGoogleMutation = useMutation({
    mutationFn: AuthService.loginWithGoogle,
    onSuccess: (data) => {
      setIsLoading(false);

      setAuthenticated(data.access_token, data.refresh_token);
    },
    onError: (error) => {
      setIsLoading(false);
    },
  });

  const sendGoogleCredentialMutation = useMutation({
    mutationFn: AuthService.loginWithCredential,
    onSuccess: (data) => {
      setIsLoading(false);
      setAuthenticated(data.access_token, data.refresh_token);
    },
    onError: (error) => {
      setIsLoading(false);
    },
  });

  const loginGoogle = useGoogleLogin({
    onSuccess: async (token) => {
      loginWithGoogleMutation.mutate(token.code);
    },
    flow: "auth-code",
    onError: (error) => {
      setIsLoading(false);
    },
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <form
        id="form-input"
        className="form_input"
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          loginMutation.mutate({
            email: email,
            password: password,
          });
        }}
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input_text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="input_text"
          placeholder="Password"
        />
      </form>
      <button className="login_btn" type="submit" form="form-input">
        Login
      </button>
      {/* <button
        className="login_btn"
        onClick={(e) => {
          e.preventDefault();
          setIsLoading(true);

          loginGoogle();
        }}
      >
        Login with google
      </button> */}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          setIsLoading(true);
          sendGoogleCredentialMutation.mutate(
            credentialResponse.credential ?? ""
          );
        }}
        onError={() => {
          setIsLoading(false);
          console.log("error login google");
        }}
      />
    </div>
  );
}

export default LoginScreen;
