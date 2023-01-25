import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import { authenticate } from './store/session';
import SideBar from './components/SideBar';
import ContentTopBar from './components/ContentTopBar';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
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
        <Route path={'/'}>
        <SideBar />
        <div className='content'>
          <ContentTopBar />
          <div className='main-content'>
          </div>
        </div>
        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
