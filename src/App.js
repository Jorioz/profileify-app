import React, { useEffect, useState } from 'react'
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Profile from './Profile';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  //Run code based on a given condition
  useEffect(()=> {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token){

      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });

      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {

        dispatch({
          type: 'SET_USER',
          user: user,
        });

      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch ({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });
      spotify.getFollowedArtists().then((followedArtists) => {
        dispatch ({
          type: "SET_FOLLOWED_ARTISTS",
          followedArtists: followedArtists,
        });
      });
    };
  }, []);

  return (
    <div className="app">
      {
        token ? (
          <Profile />
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
