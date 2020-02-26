import React from 'react'
import Unknown from '../assets/unknown.png'

export default function Contact(props) {
    const contact = props.contact;
    return (
        <div className='card shadow p-3 mb-5' style={styles.card}>
            <img
                className='card-img-top'
                style={styles.image}
                src={Unknown}
                alt='Contact' />
            <div className='card-body'>
                <h5>{contact.firstName + ' ' + contact.lastName}</h5>
                <p className='card-text'>{contact.email}</p>
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
