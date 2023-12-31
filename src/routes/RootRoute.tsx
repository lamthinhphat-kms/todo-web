import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import HomeScreen from "../pages/Home/Home";
import LoginScreen from "../pages/Login/Login";
import ApiScreen from "../pages/Api/ApiScreen";
import NavBar from "../components/NavBar/NavBar";
import AboutScreen from "../pages/About/AboutScreen";
import { ClipLoader } from "react-spinners";
function RootRoute() {
  const { userToken, isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isLoggedIn().then(() => {
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <div className="loading_container">
        <ClipLoader loading={isLoading} />
      </div>
    );
  }
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
