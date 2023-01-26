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
import { ThemeContext } from './components/Providers/ThemeProvider';
import SingleSong from './components/Songs/SingleSong';
import * as songReducer from './store/song'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const {setTheme} = useContext(ThemeContext)
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(songReducer.load())
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
        <Route path={'/'}>
        <SideBar path={path} setPath={setPath}/>
        <div className='content'>
          <ContentTopBar path={path}/>
          <div className='main-content'>
            <Switch>
              <Route exact path={'/'}>
                {setTheme('')}
              </Route>
              <Route path={'/library'}>
                <Library />
              </Route>
              <Route path={'/user/songs'}>
                <UserSongs />
              </Route>
              <Route path={'/songs/:songId'}>
                <SingleSong setPath={setPath}/>
              </Route>
            </Switch>
          </div>
        </div>
        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
