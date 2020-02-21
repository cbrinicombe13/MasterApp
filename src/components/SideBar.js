import React from 'react'

export default function SideBar(props) {

    const onClick = (e) => {
        const bookList = e.target.parentNode.parentNode.children;
        for(let i = 0; i < bookList.length; i++) {
            let book = bookList[i].firstChild;
            if(book.classList.contains('active')) {
                book.classList.remove('active');
            }
        }
        e.target.classList.add('active');
    }

    return (
        <div>
            <div>
                <h5 className='card-title'>Your Books</h5>
            </div>
            <div className='card'>
                {props.labels.map(book => {
                    return (
                        <div className="card card-body book" key={book.id}>
                            <button
                                id={book.id}
                                style={{ outline: 'none' }}
                                className='btn stretched-link'
                                onClick={(e) => onClick(e)}>{book.label}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}
