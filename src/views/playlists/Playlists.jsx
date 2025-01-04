import "./playlists.css"
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from "axios";
import { apiConfig } from "../../config";


const Playlists = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [infoBoxVisible, setInfoBoxVisible] = useState(true);
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
    console.log(playlists);
  };

  const handleSeePlaylist = (index) => {
    const id = playlists[index].id;
    console.log("See playlist", id);
    navigate(`/playlists/${id}`);
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
    <div id="playlists-container">
      <div className={`info-box card ${infoBoxVisible ? "" : "info-box-invisible"}`} >
        <div className="header-button-container">
          <span className="material-symbols-outlined close-button" onClick={() => setInfoBoxVisible(false)}>close</span>
        </div>
        <div className="info-content">
          <p>These are your playlists. Scroll down to see more.</p>
          <p>Click on <strong>See playlist</strong> to start managing your playlist.</p>
        </div>
      </div>
      <div className="playlist-card-container">
        {playlists.map((playlist, index) => {
          return (
            <div ref={index === playlists.length - 1 ? lastPlaylistElementRef : null} key={playlist.id} className="card playlist-card">
              <img className="bold-photo" src={playlist.images[0].url} alt={playlist.name}/>
              <div className="card-text">
                <h3>{playlist.name}</h3>
                <p>by {playlist.owner.display_name} - {playlist.tracks.total} tracks</p>
              </div>
              <div className="card-buttons">
                <button className="highlight-button" onClick={() => handleSeePlaylist(index)}>See playlist</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlists;