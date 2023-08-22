import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import HomeScreen from "./pages/Home/Home";
import LoginScreen from "./pages/Login/Login";
import { ClipLoader } from "react-spinners";
import RootRoute from "./routes/RootRoute";
import { store } from "./zustand/store";

function App() {
  const loading = store((store) => store.isLoading);
  return (
    <>
      {loading && (
        <div className="loading_container">
          <ClipLoader loading={loading} />
        </div>
      )}

      <RootRoute />
    </>
  );
}

export default App;
