import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Modalx = props => {

    return (
        <div>
            <Modal isOpen={props.show} toggle={props.toggle} className={props.className}>
                <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
                <ModalBody>
                    {props.children}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.confirm}>{props.confirmText}</Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>{props.cancelText}</Button>
                </ModalFooter>
            </Modal>
        </div>
    )

}

export default Modalx