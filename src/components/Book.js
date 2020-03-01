import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Grid from '../components/Grid'
import ControlBar from '../components/ControlBar'

export default function Book(props) {
    const [search, setSearch] = useState('');
    const user = useSelector(state => state.user.user);
    const searchResults = user.activeContacts.filter(contact => {
        return (
            contact.firstName.startsWith(search) ||
            contact.lastName.startsWith(search) ||
            contact.email.includes(search) ||
            contact.phone.startsWith(search) ||
            contact.occupation.includes(search)
            );
    });
    return (
        <React.Fragment>
            <React.Fragment>
                <ControlBar search={search} setSearch={setSearch} label={user.activeBook} />
            </React.Fragment>
            <Grid activeContacts={search === '' ? user.activeContacts : searchResults}/>
        </React.Fragment>
    )
}
