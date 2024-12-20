import React from 'react';
import Navbar from './views/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: '3rem' }}>{children}</main>
    </div>
  );
};

export default Layout;