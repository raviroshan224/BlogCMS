import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-6 bg-gray-50 min-h-screen">{children}</div>;
};

export default Layout;