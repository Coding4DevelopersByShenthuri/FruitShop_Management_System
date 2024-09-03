// src/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <>
        <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center p-4">
        &copy; 2024 Your Company. All rights reserved.
      </footer>
    </>
  );
};

export default Layout;