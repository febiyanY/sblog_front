import React, {useState, useCallback, useEffect} from 'react'
import {Form, FormGroup, Label, Input, Button, Row, Col} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import Modal from '../components/Modal'
import axios from '../axioses/axios-default'
import {useDispatch} from 'react-redux'
import {uiOperations} from '../state/ducks/ui'

const EditPost = props => {
    const [modal, setModal] = useState(false)
    const [form, setForm] = useState({title : '', body : ''})
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`/posts/${props.location.state.key}`).then(res => {
            setForm({title : res.data.title, body : res.data.body})
        })
        return () => setForm({title : '', body : ''})
    },[props.location.state.key])

    const handleInputChange = useCallback((e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setForm(() => ({...form, [name] : value}))
    },[form])

    const handleFormSubmit = useCallback((e) => {
        e.preventDefault()
        dispatch(uiOperations.showLoader())
        axios.patch('/posts', {
            postId : props.location.state.postId,
            update : form
        }, {headers : {Authorization : `Bearer ${localStorage.getItem('token')}`}}).then(res => {
            props.history.push(`/posts/${props.location.state.key}`)
        }).catch(err => {
            console.log(err)
            dispatch(uiOperations.hideLoader())
        })
    },[dispatch, props.history, props.location.state.postId, props.location.state.key, form])

    const cancelEdit = () => props.history.push(`/posts/${props.location.state.key}`)

    return (
        <Row>
            {!props.location.state ? <Redirect to="/" /> : null}
            <Col sm="12">
                <h3>Edit Form</h3>
                <Form onSubmit={handleFormSubmit}>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input type="text" name="title" value={form.title} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Body</Label>
                        <Input type="textarea" name="body" value={form.body} onChange={handleInputChange}/>
                    </FormGroup>
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={cancelEdit}>Cancel</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default EditPost