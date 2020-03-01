import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, setActiveBook } from '../store/actions/user';

import CustomModal from '../components/CustomModal';
import NewContactForm from '../components/NewContactForm';

export default function SideBar(props) {
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
    const user = useSelector(state => state.user.user);
    const theme = useSelector(state => state.theme.theme);
    const dispatch = useDispatch();

    const onClick = (e, label) => {
        const bookList = e.target.parentNode.parentNode.children;
        for (let i = 0; i < bookList.length; i++) {
            let book = bookList[i].firstChild;
            if (book.classList.contains('active')) {
                book.classList.remove('active');
            }
        }
        e.target.classList.add('active');
        dispatch(setActiveBook(label));
    }

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
            setError('The new book must have a name.');
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
        <React.Fragment>
            <div className='row'>
                <div className='col-md-10' style={{ paddingLeft: '100px' }}>
                    <h3>Your Books</h3>
                </div>
                <div className='col-md-2' style={{ float: 'right' }}>
                    <button
                        className='btn'
                        onClick={() => setShow(true)}>
                        <FontAwesomeIcon icon='plus' size='lg' color={theme.primary} />
                    </button>
                </div>
            </div>
            <div className='card'>
                {props.labels.map(label => {
                    return (
                        <div className="card card-body book" key={props.labels.indexOf(label)}>
                            <button
                                style={{ outline: 'none' }}
                                className='btn stretched-link'
                                onClick={(e) => onClick(e, label)}>{label}
                            </button>
                        </div>
                    )
                })}
            </div>
            <CustomModal
                show={show}
                error={error}
                title={showContactForm ? 'New Contact' : 'New Book'}
                submit={showContactForm ? onNewBook : checkLabel}
                onClose={onClose}>
                {ModalBody}
            </CustomModal>
        </React.Fragment>
    )
}
