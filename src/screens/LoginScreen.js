import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios';

import { setUser } from '../store/actions/user';

import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import BgImage from '../assets/background-image.jpg'
import Header from '../components/Header'

export default function LoginScreen(props) {
    const [signUpMode, toggleSignUpMode] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const login = async (details) => {
        setLoading(true);
        const resp = await axios.post('http://192.168.64.2/master-api/user/login.php', {
            username: details[0],
            pwd: details[1]
        }).then(resp => {
            setLoading(false);
            return resp.data;
        });
        if (resp.error) {
            setError(resp.error);
            return;
        } else if (resp.valid) {
            dispatch(setUser({
              username: resp.user.username,
              email: resp.user.email
            }));
            props.setLoggedIn(true);
        }
    }

    const signUp = async (input) => {
        setLoading(true);
        const resp = await axios.post('http://192.168.64.2/master-api/user/signUp.php', {
            username: input.username,
            pwd: input.pwd,
            email: input.email
        }).then(resp => {
            setLoading(false);
            return resp.data;
        });
        if (resp.error) {
            setError(resp.error);
            return;
        } else if (resp.created) {
            dispatch(setUser({
              username: input.username,
              email: input.email
            }));
            props.setLoggedIn(true);
        }
    }

    const toggleMode = () => {
        toggleSignUpMode(!signUpMode);
        setError('');
    }

    const Form = signUpMode
        ? <SignUpForm error={error} onSignUp={signUp} loading={loading} />
        : <LoginForm error={error} onLogin={login} loading={loading} />;

    return (
        <div className='card'>
            <img
                className='card-img'
                src={BgImage}
                alt='Background'>
            </img>
            <div className='card-img-overlay'>
                <Header title='Books.com'>
                    <div className='col-md'>
                        <button
                            className='btn'
                            style={{ ...styles.button, float: 'right' }}
                            onClick={toggleMode}
                        >{signUpMode ? 'Login' : 'Sign Up'}</button>
                    </div>
                </Header>
                {Form}
            </div>
        </div>
    )
}

const styles = {
    button: {
        backgroundColor: '#01B8BE'
    }
}
