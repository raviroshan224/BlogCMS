import { Link, useLocation } from "react-router-dom";
import React from "react";
import clsx from "clsx";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Posts", path: "/posts" },
    { name: "Categories", path: "/categories" },
    { name: "Authors", path: "/authors" },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-md fixed left-0 top-0 p-6">
      <h2 className="text-xl font-bold mb-6">SpellCMS</h2>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              "py-2 px-3 rounded hover:bg-blue-100",
              location.pathname === item.path && "bg-blue-500 text-white"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
