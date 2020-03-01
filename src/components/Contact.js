import React, { useState } from 'react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import Unknown from '../assets/unknown.png'
import Details from '../components/Details'

export default function Contact(props) {
    const [showdetails, setShowDetails] = useState(false);
    const contact = props.contact;

    const picture = <img
        className='card-img-top'
        style={styles.image}
        src={Unknown}
        alt='Contact' />

    const header = showdetails ? <Details contact={contact} /> : picture;

    return (
        <div>
            <div className='card shadow p-3 mb-5' style={styles.card}>
                <ContextMenuTrigger id='right-click-menu'>
                    {header}
                    <div className='card-body' style={{ position: 'relative' }}>
                        <button
                            className='btn stretched-link'
                            onClick={() => setShowDetails(!showdetails)}>
                            <h5>{contact.firstName + ' ' + contact.lastName}</h5>
                        </button>
                    </div>
                </ContextMenuTrigger>
            </div>

            <ContextMenu id='right-click-menu'>
                <MenuItem onClick={() => console.log('Action!')}>Action</MenuItem>
            </ContextMenu>
        </div>



    )
}

const styles = {
    card: {
        width: '90%',
        height: '60%',
        backgroundColor: 'white',
        margin: '10px',
    },
    image: {
        width: '100%',
        height: '70%'
    }
};
