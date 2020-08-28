import React, {useState, useCallback} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Modal from '../components/Modal'
import {useSelector, useDispatch} from 'react-redux'
import {uiOperations} from '../state/ducks/ui'
import {Redirect} from 'react-router-dom'
import axios from '../axioses/axios-default'
import {Link} from 'react-router-dom'

const SignUp  = props => {

    const [form, setForm] = useState({username : '', password : '', confirm_password : '', display_name : ''})
    const [error, setError] = useState(null)
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state => state.auth)
    
    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setForm(() => {
            return {...form, [name] : value}
        })
    }

    const handleFormSubmit = useCallback((e) => {
        setError(null)
        e.preventDefault()
        if(form.confirm_password !== form.password) return setError('Password did not match')
        dispatch(uiOperations.showLoader())
        let formData = {...form}
        formData.type='client'
        delete formData.confirm_password
        axios.post('/users', formData).then(res => {
            setModal(true)
            dispatch(uiOperations.hideLoader())
        }).catch(err => {
            // console.log(err.response)
            if(err.response.data.name==='SequelizeUniqueConstraintError'){
                setError('Username exist')
            }
            dispatch(uiOperations.hideLoader())
        })
    },[dispatch, form])

    const closeModal = useCallback(() => setModal(false),[])
    const toLogin = useCallback(() => props.history.push('/login'),[props.history])

    return (
        <div>
            {isAuth ? <Redirect to="/" /> : null}
            <Form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input name="username" type="text" onChange={handleInputChange} value={form.username} required />
                </FormGroup>
                <FormGroup>
                    <Label>Display Name</Label>
                    <Input name="display_name" type="text" onChange={handleInputChange} value={form.display_name} required />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input name="password" type="password" onChange={handleInputChange} value={form.password} required />
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input name="confirm_password" type="password" onChange={handleInputChange} value={form.confirm_password} required />
                </FormGroup>
                <Button type="submit">SignUp</Button>
            </Form>
            <Link to="/login">Login</Link>
            <div>
                {error ? 'ERROR : '+error : ''}
            </div>

            <Modal show={modal} toggle={closeModal} confirm={toLogin} confirmText="Login" cancelText="close" title="Success" >
                Signup Success
            </Modal>
        </div>
    )
}

export default SignUp