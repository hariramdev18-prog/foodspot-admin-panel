import { LayoutDashboard, Settings, Table } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface Menu {
  id: number;
  name: string;
  icon: React.ElementType;
  link: string;
}

const Navbar = () => {
  const menuLinks: Menu[] = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      link: "/",
    },
    {
      id: 2,
      name: "Table",
      icon: Table,
      link: "/table",
    },
    {
      id: 3,
      name: "Settings",
      icon: Settings,
      link: "/settings",
    },
  ];

  return (
    <nav>
      {menuLinks.map((menu) => {
        return (
          <Link
            key={menu.id}
            to={menu.link}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded transition"
          >
            <menu.icon size={20} />
            <span>{menu.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
