import { FC, createContext, useState } from "react";
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
  };

  const logout = async () => {
    setUserToken(undefined);
  };
  return (
    <AuthContext.Provider
      value={{ userToken, isLoading, setAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
