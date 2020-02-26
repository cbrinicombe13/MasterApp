import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Book from '../components/Book';
import SideBar from '../components/SideBar';
import CustomModal from '../components/CustomModal';

export default function HomeScreen() {
    const [show, setShow] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const [error, setError] = useState(''); // For new books later.

    const user = useSelector(state => state.user.user);
    const theme = useSelector(state => state.theme.theme);

    const onNewBook = () => {
        console.log('Adding new book..');
        setShow(false);
    }

    const onClose = () => {
        setShow(false);
        setNewLabel('');
    }

    return (
        <div className='card-img-overlay'>
            <Header title={'Hi, ' + user.username}>
                <div className='col-md'>
                    <button
                        className='btn'
                        style={{ backgroundColor: theme.primary, float: 'right' }}
                        onClick={() => setShow(true)}>New Book
                    </button>
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
            <CustomModal
                show={show}
                error={error}
                title='New Book'
                submit={onNewBook}
                onClose={onClose}>
                <form>
                    <input
                        type="text"
                        className="form-control"
                        id="newLabel"
                        placeholder="New Book Name"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)} />
                </form>
            </CustomModal>
        </div>
    )
}

const styles = {
    actionArea: {
        marginTop: '75px',
        textAlign: 'center',
        borderTop: '1px solid black',
        borderBottom: '1px solid black'
    },
    sideBarArea: {
        borderRight: '1px solid black',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    bookArea: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '10px'
    }
}
