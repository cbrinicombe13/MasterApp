import React, { useState } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store/store';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import BgImage from './assets/background-image.jpg'
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
require('./assets/utilities/icons');

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const Screen = loggedIn ? <HomeScreen setLoggedIn={setLoggedIn} />
    : <LoginScreen setLoggedIn={setLoggedIn} />;
  return (
    <Provider store={store}>
      <div className="App">
        <div className='card'>
          <img
            className='card-img'
            src={BgImage}
            alt='Background'>
          </img>
          {Screen}
        </div>
      </div>
    </Provider>
  );
}

export default App;
