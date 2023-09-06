import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { socket } from "../../socket/socket";
import { Result } from "antd";
import { Socket } from "socket.io-client";
import jwtDecode from "jwt-decode";

function AboutScreen() {
  const { userToken, logout } = useContext(AuthContext);
  const { sub } = jwtDecode<{
    sub: number;
  }>(userToken ?? "");
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("listen", {
        sub,
        socketId: socket.id,
      });
    });

    socket.on("task", (e) => {
      console.log(e);
    });

    socket.connect();

    return () => {
      socket.off("connect");
      socket.off("listen");
      socket.off("disconnect");
      socket.off("task");
      socket.disconnect();
    };
  }, []);

  const handleAddTask = () => {
    if (userToken && socket) {
      socket.emit("task", {
        userId: sub,
      });
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          handleAddTask();
        }}
      >
        testing
      </button>
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
