import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import FadeLoader from 'react-spinners/FadeLoader';

export default function LoginForm(props) {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const theme = useSelector(state => state.theme.theme);

    return (
        <div className='jumbotron shadow p-3 mb-5 bg-white rounded' style={styles.jumbotron}>
            <div>
                <p style={styles.title}>Login</p>
                <hr style={styles.length} />
            </div>
            <div style={styles.formContainer}>
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            value={user}
                            onChange={(e) => setUser(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="pwd"
                            placeholder="Password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)} />
                    </div>
                </form>
            </div>
            <button
                type='button'
                className='btn'
                style={{ backgroundColor: theme.primary }}
                onClick={props.onLogin.bind(this, [user, pwd])}>Login</button>
            <p>{props.error}</p>
            <div style={styles.loader}>
                <FadeLoader height={20} color={theme.primary} loading={props.loading} />
            </div>
        </div>
    )
}

const styles = {
    jumbotron: {
        paddingTop: '20px',
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: '15%',
        textAlign: 'center',
        height: '325px'
    },
    length: {
        width: '20%'
    },
    title: {
        fontSize: 30
    },
    formContainer: {
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: '30px'
    },
    loader: {
        marginLeft: '47%',
        width: '10px'
    }
}
