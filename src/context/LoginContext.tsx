import { createContext, useEffect, useState } from "react";

interface LoginContextType {
  isLogin: boolean;
  loading: boolean;
  setIsLogin: (value: boolean) => void;
}

export const LoginContext = createContext<LoginContextType | null>(null);

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLoginState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedValue = Number(localStorage.getItem("is_login"));

    if (storedValue === 2074) {
      setIsLoginState(true);
    }

    setLoading(false);
  }, []);

  const setIsLogin = (value: boolean) => {
    if (value) {
      localStorage.setItem("is_login", "2074");
    } else {
      localStorage.removeItem("is_login");
    }

    setIsLoginState(value);
  };

  return (
    <LoginContext.Provider value={{ isLogin, loading, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
