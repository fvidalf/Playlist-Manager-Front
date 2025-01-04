import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiConfig } from '../../config';
import { use } from 'react';

const PlaylistDetails = () => {
  const { id } = useParams();
  const [ tracks, setTracks ] = useState([]);

  useEffect(() => {
    // Make request to backend to get playlist details
    axios.get(`${apiConfig.API_URL}/playlists/${id}`, {
      withCredentials: true,
    }).then(response => {
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Playlist details</h1>
      <p>Playlist id: {id}</p>
    </div>
  );
};

export default PlaylistDetails;