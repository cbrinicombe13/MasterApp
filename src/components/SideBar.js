import React from 'react'
import { useDispatch } from 'react-redux'

import { setActiveBook } from '../store/actions/user';

export default function SideBar(props) {
    const dispatch = useDispatch();
    const onClick = (e, label) => {
        const bookList = e.target.parentNode.parentNode.children;
        for (let i = 0; i < bookList.length; i++) {
            let book = bookList[i].firstChild;
            if (book.classList.contains('active')) {
                book.classList.remove('active');
            }
        }
        e.target.classList.add('active');
        dispatch(setActiveBook(label));
    }

    return (
        <div>
            <div>
                <h5>Your Books</h5>
            </div>
            <div className='card'>
                {props.labels.map(label => {
                    return (
                        <div className="card card-body book" key={props.labels.indexOf(label)}>
                            <button
                                style={{ outline: 'none' }}
                                className='btn stretched-link'
                                onClick={(e) => onClick(e, label)}>{label}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
