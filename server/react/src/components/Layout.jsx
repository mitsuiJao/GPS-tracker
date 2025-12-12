import React from 'react';
import { Outlet } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>GPS Tracker</h1>
  </header>
);

const Footer = () => (
  <footer>
    <p>&copy; 2025 GPS Tracker</p>
  </footer>
);

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
