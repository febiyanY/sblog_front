import React, { useState, useCallback } from 'react'
import axios from '../axioses/axios-default'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '../components/Modal'
import { useDispatch } from 'react-redux'
import { uiOperations } from '../state/ducks/ui'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '96%',
        },
    }
}))

const NewPost = props => {
    const classes = useStyles()

    const [form, setForm] = useState({ title: '', body: '' })
    const [modal, setModal] = useState(false)
    // const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()


    const handleInputChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value

        setForm(() => ({ ...form, [name]: value }))
    }

    const handleFormSubmit = useCallback((event) => {
        event.preventDefault()
        setModal(true)
    }, [])

    const closeModal = useCallback(() => setModal(false), [])
    const doSomething = useCallback(() => {
        dispatch(uiOperations.showLoader())
        axios.post('/posts', form, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(res => {
            setModal(false)
            dispatch(uiOperations.hideLoader())
            props.history.push(`/profile/${localStorage.getItem('username')}/posts`)
        })
    }, [props.history, dispatch, form])

    return (
        <div>
            <form autoComplete="off" onSubmit={handleFormSubmit} className={classes.root}>
                <TextField variant="outlined" label="Title" name="title" type="text" onChange={handleInputChange} required />
                <TextField multiline rows={4} variant="outlined" label="body" name="body" type="textarea" onChange={handleInputChange} required />
                <Button type="submit" color="primary" variant="contained" disableElevation>Submit</Button>
            </form>
            <Modal show={modal} toggle={closeModal} title="Judul Modal" confirm={doSomething} confirmText="Submit" cancelText="cancel">
                <p>Submit this post ?</p>
            </Modal>
        </div>
    )
}

export default NewPost