import "./styles.css"
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from "axios";
import { apiConfig } from "../config";


const Playlists = () => {

  const [playlists, setPlaylists] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const observer = useRef();

  useEffect(() => {
    console.log("Fetching playlists");
    fetchPlaylists(page);
  }, [page]);

  const fetchPlaylists = (page) => {
    axios.get(`${apiConfig.API_URL}/playlists?page=${page}&limit=12`, {
      withCredentials: true,
    })
    .then(response => {
      setPlaylists(prevPlaylists => [...prevPlaylists, ...response.data.items]);
      setTotal(response.data.total);
    });
  };

  const handleSpotify = (reference) => {
    console.log("Open in Spotify");
    window.open(reference, "_blank");
  };

  const lastPlaylistElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && playlists.length < total) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [playlists, total]);

  return (
    <>
      <div className="card-container">
        {playlists.map((playlist, index) => {
          return (
            <div ref={index === playlists.length - 1 ? lastPlaylistElementRef : null} key={playlist.id} className="playlist-card">
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
          );
        })}
      </div>
    </>
  );
};

export default Playlists;