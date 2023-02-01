import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import { authenticate } from './store/session';
import SideBar from './components/SideBar';
import ContentTopBar from './components/ContentTopBar';
import UploadSongForm from './components/Songs/UploadSongForm';
import Library from './components/User/Library';
import UserSongs from './components/User/UserSongs';
import SingleSong from './components/Songs/SingleSong';
import * as songReducer from './store/song'
import * as playListReducer from './store/playlist'
import * as albumReducer from './store/album'
import Playlist from './components/Playlists/Playlist';
import AudioPlayer from './components/Songs/AudioPlayer';
import { SongContext } from './components/Providers/SongContext';
import LikedSongs from './components/User/LikedSongs';
import Home from './components/Home';
import CreateAlbumForm from './components/Albums/CreateAlbumForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const {currentSong} = useContext(SongContext)
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(songReducer.load())
      await dispatch(playListReducer.load())
      await dispatch(albumReducer.load())
      
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/signup'}>
          <SignUpForm/>
        </Route>
        <Route path={'/login'}>
          <LoginForm />
        </Route>
        <Route path={'/new-song'}>
          <UploadSongForm />
        </Route>
        <Route path={'/new-album'}>
          <CreateAlbumForm />
        </Route>
        <Route path={'/'}>
        <SideBar path={path} setPath={setPath}/>
        <div className='content'>
          <ContentTopBar path={path}/>
          <div className='main-content'>
            <Switch>
              <Route exact path={'/'}>
                <Home setPath={setPath}/>
              </Route>
              <Route path={'/library'}>
                <Library setPath={setPath}/>
              </Route>
              <Route path={'/liked-songs'}>
                <LikedSongs setPath={setPath}/>
              </Route>
              <Route path={'/user/songs'}>
                <UserSongs setPath={setPath}/>
              </Route>
              <Route path={'/songs/:songId'}>
                <SingleSong setPath={setPath}/>
              </Route>
              <Route path={'/playlists/:playlistId'}>
                <Playlist setPath={setPath}/>
              </Route>
            </Switch>
          </div>
        </div>
        </Route>
      </Switch>
      {currentSong && <AudioPlayer />}
    </BrowserRouter>

  );
}

export default App;
