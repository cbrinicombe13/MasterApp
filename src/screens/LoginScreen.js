import React, { useState } from 'react'

import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import BgImage from '../assets/background-image.jpg'
import Header from '../components/Header'

export default function LoginScreen(props) {
    const [signUpMode, toggleSignUpMode] = useState(false);

    const Form = signUpMode
        ? <SignUpForm error={props.error} onSignUp={props.onSignUp} loading={props.loading} />
        : <LoginForm error={props.error} onLogin={props.onLogin} loading={props.loading} />;

    const toggleMode = () => {
        toggleSignUpMode(!signUpMode);
        props.clearError();
    }

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
