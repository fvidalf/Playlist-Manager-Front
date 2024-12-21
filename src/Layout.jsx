import React from 'react';
import Navbar from './views/Navbar';

const Layout = ({ children }) => {
  return (
    <div style={{ height: '100%' }}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;