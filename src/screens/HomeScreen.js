import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../store/actions/user';

import Header from '../components/Header';
import Book from '../components/Book';
import SideBar from '../components/SideBar';

export default function HomeScreen(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const logout = async () => {
        props.setLoggedIn(false);
        dispatch(signOut());
    }

    return (
        <div className='card-img-overlay'>
            <Header title={'Hi, ' + user.username}>
                <div className='col-md'>
                    <div>
                        <button
                            className='btn'
                            style={{ float: 'right' }}
                            onClick={logout}>
                            <FontAwesomeIcon icon='sign-out-alt' color='gray' size='lg' />
                        </button>
                    </div>
                </div>
            </Header>
            <div className='row' style={styles.actionArea}>
                <div className='col-3' style={styles.sideBarArea}>
                    <SideBar labels={user.labels} />
                </div>
                <div className='col-9' style={styles.bookArea}>
                    <Book />
                </div>
            </div>
        </div>
    )
}

const styles = {
    actionArea: {
        textAlign: 'center',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        marginRight: '15px'
    },
    sideBarArea: {
        borderRight: '1px solid black',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    bookArea: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }
}
