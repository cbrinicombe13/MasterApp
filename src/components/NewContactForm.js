import React from 'react'

export default function NewContactForm(props) {

    const onChange = (e) => {
        props.setNewContact({ ...props.newContact, [e.target.id]: e.target.value });
    }

    return (
        <form>
            <div className='row'>
                <div className='col-md'>
                    <input
                        type='text'
                        id='firstName'
                        className='form-control'
                        value={props.newContact.firstName}
                        placeholder='First Name'
                        onChange={(e) => onChange(e)} />
                </div>
                <div className='col-md'>
                    <input
                        type='text'
                        id='lastName'
                        className='form-control'
                        value={props.newContact.lastName}
                        placeholder='Last Name'
                        onChange={(e) => onChange(e)} />
                </div>
            </div>
            <input
                type='text'
                id='occupation'
                className='form-control'
                value={props.newContact.occupation}
                placeholder='Occupation'
                onChange={(e) => onChange(e)} />
            <div className='row'>
                <div className='col-md'>
                    <input
                        type='text'
                        id='phone'
                        className='form-control'
                        value={props.newContact.phone}
                        placeholder='Contact Number'
                        onChange={(e) => onChange(e)} />
                </div>
                <div className='col-md'>
                    <input
                        type='text'
                        id='email'
                        className='form-control'
                        value={props.newContact.email}
                        placeholder='E-Mail Address'
                        onChange={(e) => onChange(e)} />
                </div>
            </div>
        </form>
    )
}
