import React from 'react'

import Contact from '../components/Contact'

export default function Grid(props) {
    return (
        <div className='row'>
                {props.activeContacts.map(contact => {
                    return (
                        <div
                            key={props.activeContacts.indexOf(contact)}
                            className='col-md-3 col-sm-4' style={{height: '10%'}}>
                            <Contact
                                contact={contact}
                            />
                        </div>
                    )
                })}
            </div>
    )
}
