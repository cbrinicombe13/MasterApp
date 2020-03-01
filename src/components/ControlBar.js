import React, { useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shake } from '../assets/utilities/dynamics'

import { addContact, deleteBook } from '../store/actions/user'
import CustomModal from '../components/CustomModal'
import NewContactForm from '../components/NewContactForm'

export default function ControlBar(props) {
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const [newContact, setNewContact] = useState({
        firstName: '',
        lastName: '',
        occupation: '',
        phone: '',
        email: '',
    });
    const dispatch = useDispatch();

    const clearModal = () => {
        setNewContact({
            firstName: '',
            lastName: '',
            occupation: '',
            phone: '',
            email: '',
        });
        setError('');
        return;
    }

    const theme = useSelector(state => state.theme.theme);
    const user = useSelector(state => state.user.user);

    const onClose = () => {
        setShow(false);
        clearModal();
    }

    const submitNewContact = async () => {
        const resp = await axios.post('http://192.168.64.2/master-api/contact/createContact.php', {
            username: user.username,
            belongsTo: user.activeBook,
            ...newContact
        }).then(resp => resp.data);
        if (resp.error) {
            setError(resp.error);
            return;
        } else if (resp.created) {
            setShow(false);
            const contact = { id: uuidv4(), ...newContact };
            dispatch(addContact(contact));
            clearModal();
        } else {
            setError('Could not create contact');
            return;
        }
    }

    const deleteActiveBook = async () => {
        const resp = await axios.delete('http://192.168.64.2/master-api/contact/deleteBook.php', {
            data: {
                username: user.username,
                belongsTo: user.activeBook
            }
        }).then(resp => resp.data);
        if(resp.deleted) {
            dispatch(deleteBook());
            return;
        } else {
            shake('delete-icon');
        }
    }

    return (
        <div className='row' style={styles.controlBar}>
            <div className='col'>
                <div className='row' style={{ paddingLeft: '10px' }}>
                    <div style={styles.titleContainer}>
                        <h3>{props.label}</h3>
                    </div>
                    <div style={{ paddingLeft: '10px' }}>
                        <input
                            className='form-control'
                            type='text' value={props.search}
                            placeholder='Search..'
                            onChange={(e) => props.setSearch(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className='col'>
                <div className='row' style={{ float: 'right' }}>
                    <div style={styles.btnContainer}>
                        <button
                            className='btn'
                            onClick={deleteActiveBook}>
                            <FontAwesomeIcon
                                icon='trash-alt'
                                size='lg'
                                color='red'
                                id='delete-icon' />
                        </button>
                    </div>
                    <div style={styles.btnContainer}>
                        <button
                            style={{ ...styles.btn, marginRight: '10px'}}
                            className='btn'
                            onClick={() => setShow(true)}>
                                <FontAwesomeIcon icon='user-plus' size='lg' color={theme.primary} />
                        </button>
                    </div>
                </div>
            </div>
            <CustomModal
                show={show}
                onClose={onClose}
                title='New Contact'
                error={error}
                submit={submitNewContact}>
                <NewContactForm newContact={newContact} setNewContact={setNewContact} />
            </CustomModal>
        </div>
    )
}

const styles = {
    controlBar: {
        padding: '3px'
    },
    titleContainer: {
        float: 'left'
    },
    btnContainer: {
        marginRight: '15px'
    }
};
