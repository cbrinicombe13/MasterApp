import React from 'react'
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Book from '../components/Book';
import SideBar from '../components/SideBar';

export default function HomeScreen() {
    const user = useSelector(state => state.user.user);
    return (
        <div className='card-img-overlay'>
            {/* <Header title={'Hi, ' + user.username}> */}
            <Header title={'Hi, cbrinicombe13'}></Header>
            <div className='row' style={styles.actionArea}>
                <div className='col-3' style={styles.sideBarArea}>
                    <SideBar books={user.books}/>
                </div>
                <div className='col-9' style={styles.bookArea}>
                    <Book />
                </div>
            </div>
        </div>
    )
}

const styles = {
    actionArea: {
        marginTop: '75px',
        textAlign: 'center',
        borderBottom: '1px solid gray'
    },
    sideBarArea: {
        borderLeft: '1px solid gray'
    },
    bookArea: {

    }
}
