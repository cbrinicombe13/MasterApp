import React, { useState } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store/store';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const Screen = loggedIn ? <HomeScreen /> : <LoginScreen setLoggedIn={setLoggedIn} />;

  return (
    <Provider store={store}>
      <div className="App">
        {Screen}
      </div>
    </Provider>
  );
}

export default App;
