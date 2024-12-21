import "./styles.css"
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import axios from "axios";
import { apiConfig } from "../config";

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, revalidateAuth } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (code) {
      const callbackParams = new URLSearchParams({ code });

      axios.get(`${apiConfig.API_URL}/callback`, {
        withCredentials: true,
        params: callbackParams,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then((response) => {
        console.log("Response:", response);
        revalidateAuth();
      })
      .catch(error => {
        console.error("Error:", error);
      });
    }
  }, [location, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    axios.get(`${apiConfig.API_URL}/login`)
      .then(response => {
        window.location.href = response.data.authUrl
      })
      .catch(error => console.error("Error:", error));
  }

  return (
    <>
      <div id="login-container">
        <div className="card" id="login-hero">
          <div id="login-hero-text">
            <h1>Welcome to your Playlist Manager</h1>
            <h2>A tool to split, blend and enhance your playlists</h2>
          </div>
          <button id="hero-button" className="highlight-button" onClick={handleLogin}>Login with Spotify</button>
        </div>
        <div id="login-content">
          <div className="card" id="features-card">
            <h2>¿Qué puedes hacer con Playlist Manager?</h2>
          </div>
          <div className="card" id="footer">
            <p>Hecho por <a href="">@fvidalf</a> & <a href="">@DiegoUDP</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;