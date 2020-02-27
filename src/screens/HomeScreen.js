import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addBook } from '../store/actions/user';

import Header from '../components/Header';
import Book from '../components/Book';
import SideBar from '../components/SideBar';
import CustomModal from '../components/CustomModal';
import NewContactForm from '../components/NewContactForm';

export default function HomeScreen() {
    const [show, setShow] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const [error, setError] = useState('');
    const [newContact, setNewContact] = useState({
        firstName: '',
        lastName: '',
        occupation: '',
        phone: '',
        email: ''
    });
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);
    const theme = useSelector(state => state.theme.theme);

    const onClose = () => {
        setShow(false);
        setShowContactForm(false);
        setNewLabel('');
        setError('');
        setNewContact({
            firstName: '',
            lastName: '',
            occupation: '',
            phone: '',
            email: ''
        });
    }

    const onNewBook = async () => {
        const resp = await axios.post('http://192.168.64.2/master-api/contact/createBook.php', {
            username: user.username,
            belongsTo: newLabel,
            ...newContact
        }).then(resp => resp.data);
        if (resp.error) {
            setError(resp.error);
            return;
        } else if (resp.created) {
            dispatch(addBook({
                newLabel: newLabel,
                newContact: {
                    id: uuidv4,
                    ...newContact
                }
            }));
            onClose();
        } else {
            setError('Book could not be created.');
            return;
        }
        setShow(false);
    }

    const checkLabel = () => {
        if (newLabel === '') {
            setError('The new book must have a name');
            return;
        } else {
            setShowContactForm(true);
            setError('');
        }
    }

    const ModalBody = showContactForm
        ? <NewContactForm newContact={newContact} setNewContact={setNewContact} />
        : <form>
            <input
                type="text"
                className="form-control"
                id="newLabel"
                placeholder="New Book Name"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)} />
        </form>

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
                title={showContactForm ? 'New Contact' : 'New Book'}
                submit={showContactForm ? onNewBook : checkLabel}
                onClose={onClose}>
                {ModalBody}
            </CustomModal>
        </div>
    )
}

const styles = {
    actionArea: {
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
