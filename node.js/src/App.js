import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ErrorPage from './ErrorPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import config from './config';

export const UserContext = createContext();
const apiUrl = config.apiUrl;

function App() {
  const [user, setUser] = useState(() => {
    const getUser = JSON.parse(sessionStorage.getItem('userinfo')) || null;
    const getGoogleUser = JSON.parse(sessionStorage.getItem('guser')) || null
    return getUser ? getUser : getGoogleUser
  });
  const [xCorrId, setXCorrId] = useState(() => {
    return sessionStorage.getItem('xCorrId') || null  
  });
  const [ loginType, setLoginType ] = useState(() => {
    return sessionStorage.getItem('loginType') || 'custom';
  });

  useEffect(() => {
    if (user) {
      setXCorrId(user.xCorrId);
    }
    if (loginType === 'google') {
      fetchGoogleUser();
    }
  },[user, loginType])

  function fetchGoogleUser() {
    axios.get(`${apiUrl}/auth/login/success`, {
      withCredentials: 'include',
      headers: {
        'x-correlation-id': xCorrId,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Credentials": true
      }
    })
    .then(response => {
      sessionStorage.setItem('guser', JSON.stringify(response.data.user))
      setXCorrId(sessionStorage.getItem('xCorrId'));
      return setUser(response.data.user)
    })
  }

  return (
    <UserContext.Provider value={{ user, setUser, xCorrId, setXCorrId, setLoginType }}>
      <div className='App'>
        <Header />
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route path="/:username/settings" Component={Settings} />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={Signup} />
          <Route path='*' Component={ErrorPage} />
        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
