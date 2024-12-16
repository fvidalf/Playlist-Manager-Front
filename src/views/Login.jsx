import "./styles.css"
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { apiConfig } from "../config";

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (code && !sessionStorage.getItem("processedCode")) {
      sessionStorage.setItem("processedCode", "true");
      const callbackParams = new URLSearchParams({ code });

      axios.get(`${apiConfig.API_URL}/callback`, {
        params: callbackParams,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then(response => {
        console.log("Access Token:", response.data.access_token);
        sessionStorage.setItem("accessToken", response.data.access_token);
        navigate('/playlists');
      })
      .catch(error => {
        console.error("Error:", error);
        sessionStorage.removeItem("processedCode");
      });
    }
  }, [location, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    sessionStorage.removeItem("processedCode");
    axios.get(`${apiConfig.API_URL}/login`)
      .then(response => {
        window.location.href = response.data.authUrl
      })
      .catch(error => console.error("Error:", error));
  }

  return (
    <>
      <h1> Bienvenido a Playlist Manager, inicie sesión para continuar </h1>
      <button className="spotify-login-button" onClick={handleLogin}>Log In con Spotify</button>
    </>
  )
}

export default Login;