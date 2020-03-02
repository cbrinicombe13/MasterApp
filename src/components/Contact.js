import React, { useState } from 'react'

import Identifier from '../components/Identifier'
import Details from '../components/Details'

export default function Contact(props) {
    const [showdetails, setShowDetails] = useState(false);
    const contact = props.contact;

    const header = showdetails ? <Details contact={contact} /> : <Identifier />;

    return (
        <div>
            <div className='card shadow p-3 mb-5' style={styles.card}>
                {header}
                <div className='card-body' style={{ position: 'relative' }}>
                    <button
                        className='btn stretched-link'
                        onClick={() => setShowDetails(!showdetails)}>
                        <h5>{contact.firstName + ' ' + contact.lastName}</h5>
                    </button>
                </div>
            </div>
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
