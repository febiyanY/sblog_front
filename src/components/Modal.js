import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modalx = props => {

    return (
        <div>
            {/* <Modal isOpen={props.show} toggle={props.toggle} className={props.className}>
                <ModalHeader toggle={props.toggle}>{props.title}</ModalHeader>
                <ModalBody>
                    {props.children}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.confirm}>{props.confirmText}</Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>{props.cancelText}</Button>
                </ModalFooter>
            </Modal> */}

            <Dialog
                open={props.show}
                onClose={props.toggle}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.confirm} color="primary"> {props.confirmText} </Button>
                    <Button onClick={props.toggle} color="primary"> {props.cancelText} </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default Modalx