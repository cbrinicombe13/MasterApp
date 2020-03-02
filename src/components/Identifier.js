import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { faBookmark as faRegBookMark } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as faSolidBookMark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Unknown from '../assets/unknown.png';

export default function Identifier(props) {
    const [marked, setMarked] = useState(false);
    const theme = useSelector(state => state.theme.theme);

    return (
        <div style={styles.imageBackground}>
            <button className='btn' style={{ float: "right" }} onClick={() => setMarked(!marked)}>
                <FontAwesomeIcon
                    icon={marked ? faSolidBookMark : faRegBookMark}
                    size='lg'
                    color={theme.primary} />
            </button>
        </div>
    )
}

const styles = {
    imageBackground: {
        height: '150px',
        width: '100%',
        backgroundImage: `url(${Unknown})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
};
