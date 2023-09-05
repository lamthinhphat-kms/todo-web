import { FC, createContext, useEffect, useState } from "react";
import localStorageUtils from "../utils/LocalStorage";
import jwtDecode from "jwt-decode";
import { googleLogout } from "@react-oauth/google";
export interface Props {
  children: React.ReactNode;
}

interface AuthContextProps {
  userToken: string | undefined;
  isLoading: boolean;
  setAuthenticated: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  userToken: undefined,
  isLoading: false,
  setAuthenticated: () => {},
  logout: () => {},
});

export const AuthProvider: FC<Props> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setAuthenticated = async (
    accessToken: string,
    refreshToken: string
  ) => {
    setUserToken(accessToken);
    localStorageUtils.saveToLocal("access_token", accessToken);
    localStorageUtils.saveToLocal("refresh_token", refreshToken);
  };

  const logout = async () => {
    setUserToken(undefined);
    localStorageUtils.removeItemFromLocal("access_token");
    localStorageUtils.removeItemFromLocal("refresh_token");
  };

  const isLoggedIn = async () => {
    try {
      let tokenStorage = localStorageUtils.getFromLocal("access_token");
      if (tokenStorage) {
        const { exp } = jwtDecode<{
          exp: number;
        }>(tokenStorage);
        const expirationTime = exp * 1000;
        if (Date.now() <= expirationTime) {
          setUserToken(tokenStorage);
        } else {
          setUserToken(undefined);
          localStorageUtils.removeItemFromLocal("access_token");
          localStorageUtils.removeItemFromLocal("refresh_token");
          googleLogout();
        }
        setUserToken(tokenStorage);
      }
    } catch (error) {
      setUserToken(undefined);
      localStorageUtils.removeItemFromLocal("access_token");
      localStorageUtils.removeItemFromLocal("refresh_token");
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{ userToken, isLoading, setAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
