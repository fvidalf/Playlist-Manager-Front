import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="">
      <a className="" href="/">Playlist Manager</a>
      <Link to="/playlists">Playlists</Link>
      <Link to="/login">Login</Link>
    </nav> 
  )

}

export default Navbar;