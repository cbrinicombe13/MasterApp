import React, { useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader';

export default function SignUpForm(props) {
    const [input, setInput] = useState({
        username: '',
        pwd: '',
        email: ''
    });

    const onChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    }

    return (
        <div
            className='jumbotron shadow p-3 mb-5 bg-white rounded'
            style={styles.jumbotron}
            id='jumbotron'>
            <div>
                <p style={styles.title}>Sign Up</p>
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
                            value={input.username}
                            onChange={(e) => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="pwd"
                            placeholder="Password"
                            value={input.pwd}
                            onChange={(e) => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="E-Mail"
                            value={input.email}
                            onChange={(e) => onChange(e)} />
                    </div>
                </form>
            </div>
            <button
                type='button'
                className='btn'
                style={styles.button}
                onClick={props.onSignUp.bind(this, input)}>Sign Up</button>
            <p>{props.error}</p>
            <div style={styles.loader}>
                <FadeLoader height={20} color='#01B8BE' loading={props.loading}/>
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
        height: '425px'
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
    button: {
        backgroundColor: '#01B8BE'
    },
    loader: {
        marginLeft: '47%',
        width: '10px'
    }
}
