import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import HomeScreen from "../pages/Home/Home";
import LoginScreen from "../pages/Login/Login";
import ApiScreen from "../pages/Api/ApiScreen";
import NavBar from "../components/NavBar/NavBar";
import AboutScreen from "../pages/About/AboutScreen";
function RootRoute() {
  const { userToken } = useContext(AuthContext);

  return (
    <>
      <Routes>
        {userToken ? (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/" element={<NavBar />}>
              <Route index element={<HomeScreen />} />
              <Route path="/api-list" element={<ApiScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="*" element={<h1>Error</h1>} />
            </Route>
            <Route path="*" element={<h1>Error</h1>} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginScreen />} />

            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
}
export default RootRoute;
