import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEnvelopeOpenText,
  faMobileAlt,
  faBriefcase,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import './App.css';
import store from './store/store';

import BgImage from './assets/background-image.jpg'
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

library.add(fab, faEnvelopeOpenText, faMobileAlt, faBriefcase, faTrashAlt);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const Screen = loggedIn ? <HomeScreen /> : <LoginScreen setLoggedIn={setLoggedIn} />;
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
