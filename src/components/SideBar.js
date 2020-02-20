import React from 'react'

export default function SideBar(props) {
    return (
        <div>
            <a data-toggle="collapse" href="#books" role='button' style={styles.bookBar}>Books</a>
            <div className="collapse" id="books">
                {props.books.map(book => {
                    return (
                        <div className="card card-body" key={book.id}>{book.label}</div>
                    )
                })}
            </div>
            <a data-toggle="collapse" href="#books2" role='button' style={styles.bookBar}>Books</a>
            <div className="collapse" id="books2">
                {props.books.map(book => {
                    return (
                        <div className="card card-body" key={book.id}>{book.label}</div>
                    )
                })}
            </div>
        </div>
    )
}

const styles = {
    bookBar: {
        display: 'block',
        color: 'black',
        backgroundColor: '#01B8BE',
        borderBottom: '1px dotted gray'
    }
}
