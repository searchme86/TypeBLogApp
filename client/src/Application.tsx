import React, { useState, useEffect, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './Config/routes';
// import IRoute from './interface/route';
import { firebaseConfig } from './Config/Firebase.config';
import { initializeApp } from 'firebase/app';
import {
  initialUserState,
  UserContextProvider,
  userReducer,
} from './contexts/user';
import { Validate } from './modules/Auth';
import logging from './Config/logging';
import LoadingComponents from './components/LoadingComponents';

import AuthRoute from './components/AuthRoute';

export interface IApplicationProps {}

initializeApp(firebaseConfig);

function Application() {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [authStage, setAuthStage] = useState<string>(
    'Checking localstorage ...'
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      CheckLocalStorageForCredentials();
    }, 1000);

    // eslint-disable-next-line
  }, []);

  /**
   *
   * check to see if we have a token
   * if we do, verify it with the backend
   * if not, we are logged out initially
   *
   */
  const CheckLocalStorageForCredentials = () => {
    setAuthStage('Checking credentials ...');

    const fire_token = localStorage.getItem('fire_token');

    if (fire_token === null) {
      userDispatch({ type: 'logout', payload: initialUserState });
      setAuthStage('No credentials found');
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      return Validate(fire_token, (error, user) => {
        if (error) {
          logging.error(error);
          userDispatch({ type: 'logout', payload: initialUserState });
          setLoading(false);
        } else if (user) {
          userDispatch({ type: 'login', payload: { user, fire_token } });
          setLoading(false);
        }
      });
    }
  };

  const userContextValues = {
    userState,
    userDispatch,
  };

  if (loading) {
    return <LoadingComponents>{authStage}</LoadingComponents>;
  }

  return (
    <UserContextProvider value={userContextValues}>
      <Routes>
        {routes.map((route, index) => {
          if (route.auth) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AuthRoute>
                    <route.component />
                  </AuthRoute>
                }
              />
            );
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <route.component />
                // <AuthRoute>
                // </AuthRoute>
              }
            />
          );
        })}
      </Routes>
    </UserContextProvider>
  );
}

export default Application;
