import React, { useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'

import { addContact } from '../store/actions/user'
import CustomModal from '../components/CustomModal'
import NewContactForm from '../components/NewContactForm'

export default function ControlBar(props) {
    const [search, setSearch] = useState('');
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

    const onChange = (e) => {
        setSearch(e.target.value);
    }

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
                            type='text' value={search}
                            placeholder='Search..'
                            onChange={(e) => onChange(e)} />
                    </div>
                </div>
            </div>
            <div className='col'>
                <div style={styles.btnContainer}>
                    <button
                        style={{ backgroundColor: theme.primary }}
                        className='btn'
                        onClick={() => setShow(true)}>New Contact
                    </button>
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
        float: 'right',
        paddingRight: '10px'
    }
};
