import { FC, createContext, useEffect, useState } from "react";
import localStorageUtils from "../utils/LocalStorage";
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
    // localStorageUtils.saveToLocal("access_token", accessToken);
  };

  const logout = async () => {
    setUserToken(undefined);
    localStorageUtils.removeItemFromLocal("access_token");
  };

  const isLoggedIn = async () => {
    try {
      let tokenStorage = localStorageUtils.getFromLocal("access_token");
      if (tokenStorage) {
        setUserToken(tokenStorage);
      }
    } catch (error) {
      setUserToken(undefined);
      localStorageUtils.removeItemFromLocal("access_token");
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
