import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./styles.css";
import { useMutation } from "react-query";
import AuthService from "../../api/auth";
import { useGoogleLogin } from "@react-oauth/google";

function LoginScreen() {
  const { setAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      setAuthenticated(data.access_token, data.refresh_token);
    },
  });

  const loginWithGoogleMutation = useMutation({
    mutationFn: AuthService.loginWithGoogle,
    onSuccess: (data) => {
      setAuthenticated(data.access_token, data.refresh_token);
    },
  });

  const loginGoogle = useGoogleLogin({
    onSuccess: async (token) => {
      loginWithGoogleMutation.mutate(token.code);
    },
    flow: "auth-code",
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <form
        id="form-input"
        className="form_input"
        onSubmit={(e) => {
          e.preventDefault();
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
      <button
        className="login_btn"
        onClick={(e) => {
          e.preventDefault();
          loginGoogle();
        }}
      >
        Login with google
      </button>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("error login google");
        }}
      /> */}
    </div>
  );
}

export default LoginScreen;
