import React from 'react'
import { useSelector } from 'react-redux'

import Grid from '../components/Grid'
import ControlBar from '../components/ControlBar'

export default function Book(props) {
    const user = useSelector(state => state.user.user);
    return (
        <div>
            <div>
                <ControlBar label={user.activeBook} />
            </div>
            <Grid activeContacts={user.activeContacts}/>
        </div>
    )
}
