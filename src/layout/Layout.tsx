import React, { useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { Menu, LogOut } from "lucide-react";
import { LoginContext } from "../context/LoginContext";
import Icon from "../hooks/tools/Icon";

const Layout = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const context = useContext(LoginContext);
  if (!context) return null;

  const { setIsLogin } = context;

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("is_login");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8F8F8]">
      {/* Header */}
      <header className="h-16 bg-[#FF8A00] text-white shadow-md flex items-center justify-between px-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-2xl font-bold"
        >
          <Menu />
        </button>

        <Header />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white text-[#FF8A00] px-3 py-1 rounded-md font-medium hover:bg-gray-100 transition"
        >
          <Icon name="LogOut" size={18} />
          Logout
        </button>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:block">
          <SideBar />
        </aside>

        {/* Mobile Sidebar Drawer */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition ${
            open ? "block" : "hidden"
          }`}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          ></div>

          {/* Drawer */}
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
            <SideBar />
          </aside>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
