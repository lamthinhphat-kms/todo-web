import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import HomeScreen from "../pages/Home/Home";
import LoginScreen from "../pages/Login/Login";
function RootRoute() {
  const { userToken } = useContext(AuthContext);

  return (
    <>
      <Routes>
        {userToken ? (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/" element={<HomeScreen />} />
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
