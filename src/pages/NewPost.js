import React, { useState, useCallback } from 'react'
import axios from '../axioses/axios-default'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Modal from '../components/Modal'
import {useDispatch} from 'react-redux'
import {uiOperations} from '../state/ducks/ui'

const NewPost = props => {

    const [form, setForm] = useState({title : '', body : ''})
    const [modal, setModal] = useState(false)
    // const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()


    const handleInputChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value

        setForm(() => ({...form, [name] : value}))
    }

    const handleFormSubmit = useCallback((event) => {
        event.preventDefault()
        setModal(true)
    },[])

    const closeModal = useCallback(() => setModal(false),[])
    const doSomething = useCallback(() => {
        dispatch(uiOperations.showLoader())
        axios.post('/posts', form, {headers : {Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(res => {
            setModal(false)
            dispatch(uiOperations.hideLoader())
            props.history.push(`/profile/${localStorage.getItem('username')}/posts`)
        })    
    },[props.history, dispatch, form])

    return (
        <div>
            <Form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input name="title" type="text" onChange={handleInputChange} required />
                </FormGroup>
                <FormGroup>
                    <Label>Body</Label>
                    <Input name="body" type="textarea" onChange={handleInputChange} required />
                </FormGroup>

                <Button type="submit">Submit</Button>
            </Form>
            <Modal show={modal} toggle={closeModal} title="Judul Modal" confirm={doSomething} confirmText="Submit" cancelText="cancel">
                <p>Submit this post ?</p>
            </Modal>
        </div>
    )
}

export default NewPost