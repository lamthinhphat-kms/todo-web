import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function AboutScreen() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>
    </div>
  );
}

export default AboutScreen;
