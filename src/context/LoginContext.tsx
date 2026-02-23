import { createContext, useEffect, useState } from "react";

interface LoginContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<LoginContextType | null>(null);

interface LoginProviderProps {
  children: React.ReactNode;
}

const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const logIn = localStorage.getItem("is_login");
    setIsLogin(logIn === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("is_login", String(isLogin));
  }, [isLogin]);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
