import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import { authenticate } from './store/session';
import SideBar from './components/SideBar';
import ContentTopBar from './components/ContentTopBar';
import UploadSongForm from './components/Songs/UploadSongForm';
import * as songReducer from './store/song'
import Library from './components/User/Library';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
      await dispatch(songReducer.load())
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
        <SideBar />
        <div className='content'>
          <ContentTopBar />
          <div className='main-content'>
            <Switch>
              <Route path={'/library'}>
                <Library />
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
