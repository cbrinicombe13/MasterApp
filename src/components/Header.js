import React from 'react'

import Book from '../assets/book.jpg'

export default function Header(props) {
    return (
        <header className='row' style={styles.header}>
            <div className='col-md'>
                <div className='row'>
                    <img src={Book} alt='Book' style={styles.logo} />
                    <div style={styles.titleContainer}>
                        <h1>{props.title}</h1>
                    </div>
                </div>
            </div>
            {props.children}
        </header>
    )
}

const styles = {
    header: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: '100%',
        padding: '10px',
        height: '75px'
    },
    titleContainer: {
        textAlign: 'center'
    },
    logo: {
        width: '60px',
        marginRight: '10px',
        marginLeft: '10px'
    }
}