import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./styles.css";
import { useMutation } from "react-query";
import AuthService from "../../api/auth";

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
    </div>
  );
}

export default LoginScreen;
