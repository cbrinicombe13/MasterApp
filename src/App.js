import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import LoginScreen from './screens/LoginScreen';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(false);

  const login = async (details) => {
    setLoading(true);
    const resp = await axios.post('http://192.168.64.2/master-api/user/login.php', {
      username: details[0],
      pwd: details[1]
    }).then(resp => {
      setError(false);
      return resp.data;
    });
    if (resp.error) {
      setError(resp.error);
      return;
    } else if (resp.valid) {
      setLoggedIn(true);
      setUser({ username: resp.user.username, email: resp.user.email });
    }
  }

  const signUp = async (input) => {
    setLoading(true);
    const resp = await axios.post('http://192.168.64.2/master-api/user/signUp.php', {
      username: input.username,
      pwd: input.pwd,
      email: input.email
    }).then(resp => resp.data);
    setLoading(false);
    if (resp.error) {
      setError(resp.error);
      return;
    } else if (resp.created) {
      setLoggedIn(true);
      setUser({ username: input.username, email: input.email });
    }
  }

  if (!loggedIn) {
    return (
      <div className="App">
        <LoginScreen
          onLogin={login}
          onSignUp={signUp}
          error={error}
          clearError={() => setError('')}
          loading={loading} />
      </div>
    );
  }

  return (
    <div className="App">
      <p>{user.email}</p>
    </div>
  );
}

export default App;
