import React from 'react'
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function CustomModal(props) {
    const theme = useSelector(state => state.theme.theme);
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <div style={{ marginRight: '10px' }}>
                    {props.error}
                </div>
                <Button style={{ backgroundColor: theme.primary }} onClick={props.onNewBook}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
