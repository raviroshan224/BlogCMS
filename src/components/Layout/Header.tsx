import React from "react";

const Header = () => {
  return (
    <header className="w-full h-16 bg-gray-100 flex items-center justify-between px-6 shadow-sm fixed left-64 top-0">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="text-sm text-gray-600">Welcome, Admin</div>
    </header>
  );
};

export default Header;
