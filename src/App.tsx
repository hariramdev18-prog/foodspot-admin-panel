import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import TablePage from "./pages/TablePage";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

import { LoginContext } from "./context/LoginContext";

const App = () => {
  const context = useContext(LoginContext);

  if (!context) return null;

  const { isLogin } = context;
  console.log("isLogin", isLogin);

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={isLogin ? <Navigate to="/" /> : <Login />}
      />

      {/* Protected */}
      <Route path="/" element={isLogin ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Dashboard />} />
        <Route path="table" element={<TablePage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
