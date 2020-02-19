import React from 'react'
import { useSelector } from 'react-redux';

import Header from '../components/Header';

export default function HomeScreen() {
    const user = useSelector(state => state.user);
    console.log(user);
    return (
        <div>
            <Header>
                
            </Header>
        </div>
    )
}
