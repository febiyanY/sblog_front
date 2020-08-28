import React, { useState, useCallback } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../axioses/axios-default'
import { uiOperations } from '../../state/ducks/ui'


const EditAccount = props => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)


    const [form, setForm] = useState({ username: user.username, display_name: user.display_name, password: '', confirm_password: '' })
    const [formError, setFormError] = useState(null)
    const [editPass, setEditPass] = useState(false)

    const handleInputChange = useCallback((e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setForm(() => ({
            ...form, [name]: value
        }))
    }, [form])

    const onFormSubmit = (e) => {
        e.preventDefault()
        let formData = { ...form }
        if (editPass) {
            if (form.password !== form.confirm_password) return setFormError('Password did not match')
        } else {
            delete formData.password
        }
        delete formData.confirm_password
        let data = {
            userId: user.userId,
            update: formData
        }
        dispatch(uiOperations.showLoader())
        axios.patch('/users', data, { headers: { Authorization: `Bearer ${user.token}` } }).then(res => {
            dispatch(uiOperations.hideLoader())
            props.history.replace(`/profile/${user.username}`)
        }).catch(err => {
            dispatch(uiOperations.hideLoader())
            if(err.response.data.name==='SequelizeUniqueConstraintError'){
                setFormError('Username exist')
            }
        })
    }

    const toggleEditPass = () => {
        setEditPass(() => !editPass)
    }

    return (
        <Form onSubmit={onFormSubmit}>
            {formError ? 'ERROR : ' + formError : ''}
            <FormGroup>
                <Label>Username</Label>
                <Input type="text" name="username" value={form.username} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Display Name</Label>
                <Input type="text" name="display_name" value={form.display_name} onChange={handleInputChange} required />
            </FormGroup>
            <Button color="primary" size="sm" onClick={toggleEditPass}>Edit Password</Button>
            {editPass ? <div><FormGroup>
                <Label>Password</Label>
                <Input type="password" name="password" value={form.password} onChange={handleInputChange} required />
            </FormGroup>
                <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input type="password" name="confirm_password" value={form.confirm_password} onChange={handleInputChange} required />
                </FormGroup></div> : null}
            <FormGroup style={{marginTop : '1%'}}>
            <Button type="submit" >Save</Button>
            <Button type="button" onClick={() => props.history.replace(`/profile/${user.username}`)}>Cancel</Button>
            </FormGroup>
            
        </Form>
    )
}


export default EditAccount