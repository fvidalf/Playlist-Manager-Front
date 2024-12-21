import React from 'react';
import Navbar from './views/navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div style={{ height: '100%' }}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;