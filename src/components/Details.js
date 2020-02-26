import React from 'react'
import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText, faMobileAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons'

export default function Details(props) {
    const theme = useSelector(state => state.theme.theme);
    return (
        <div style={{ marginBottom: '5%' }}>
            <div style={styles.info}>
                <FontAwesomeIcon
                    icon={faEnvelopeOpenText}
                    size='lg'
                    color={theme.primary}
                    style={styles.icon} />
                <p className='card-text'>{props.contact.email}</p>
            </div>
            <div style={styles.info}>
                <FontAwesomeIcon
                    icon={faMobileAlt}
                    size='lg'
                    color={theme.primary}
                    style={styles.icon} />
                <p className='card-text'>{props.contact.phone}</p>
            </div>
            <div style={styles.info}>
                <FontAwesomeIcon
                    icon={faBriefcase}
                    size='lg'
                    color={theme.primary}
                    style={styles.icon} />
                <p className='card-text'>{props.contact.occupation}</p>
            </div>
        </div>
    )
}

const styles = {
    info: {
        margin: '5px'
    },
    icon: {
        margin: '2px'
    }
};
