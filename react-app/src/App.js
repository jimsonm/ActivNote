import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SplashNavBar from './components/SplashNavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/UserProfile';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage';
import Exercises from './components/UserProfile/Exercises';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
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
        <ProtectedRoute path='/user/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path={`/user/:userId/exercises`} exact={true}>
          <Exercises />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashNavBar />
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
