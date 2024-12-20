import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';


const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="">
      <a className="navbar-item" href="/">Playlist Manager</a>
      {isAuthenticated && <Link className="navbar-item" to="/playlists">Your Playlists</Link>}
      {!isAuthenticated && <Link className="navbar-item" to="/login">Login</Link>}
    </nav> 
  )

}

export default Navbar;