import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import Book from '../components/Book';
import SideBar from '../components/SideBar';
import CustomModal from '../components/CustomModal';
import { addBook } from '../store/actions/books';

export default function HomeScreen() {
    const [show, setShow] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const [error, setError] = useState('');

    const user = useSelector(state => state.user.user);
    const [labels, setLabels] = useState(user.labels);

    const theme = useSelector(state => state.theme.theme);
    const dispatch = useDispatch();

    const onNewBook = async () => {
        const resp = await axios.post('http://192.168.64.2/master-api/book/createBook.php', {
            label: newLabel,
            allowAccess: user.username
        }).then(resp => resp.data);
        if (resp.error) {
            setError(resp.error);
            return;
        } else if (resp.created) {
            dispatch(addBook(newLabel));
            setLabels([...labels, { id: resp.id, label: resp.label }]);
        } else {
            setError('Could not create book.');
            return;
        }
        setShow(false);
        return;
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
                    <SideBar labels={labels} />
                </div>
                <div className='col-9' style={styles.bookArea}>
                    <Book />
                </div>
            </div>
            <CustomModal
                show={show}
                error={error}
                onNewBook={onNewBook}
                onClose={() => setShow(false)}>
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
    }
}
