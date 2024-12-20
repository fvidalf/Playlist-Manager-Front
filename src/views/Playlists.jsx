import "./styles.css"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { apiConfig } from "../config";

const Playlists = () => {

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios.get(`${apiConfig.API_URL}/playlists`, {
      withCredentials: true,
    })
    .then(response => {
      setPlaylists(response.data);
      console.log(response.data);
      console.log("Playlists:", playlists);
    })
  }, []);

  const handleSpotify = (reference) => {
    console.log("Open in Spotify");
    // Open reference
    window.open(reference, "_blank");
  }

  return (
    <>
      <div className="card-container">
        {playlists.map((playlist, index) => (
          <div key={playlist.id} className="playlist-card">
            <img className="bold-photo" src={playlist.images[0].url} alt={playlist.name}/>
            <div className="card-text">
              <h3>{playlist.name}</h3>
              <p>{playlist.description}</p>

            </div>
            <div className="card-buttons">
              <button className="highlight-button" onClick={() => console.log("See playlist")}>See playlist</button>
              <button className="highlight-button" onClick={() => handleSpotify(playlist.external_urls.spotify)}>Open in Spotify</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Playlists;