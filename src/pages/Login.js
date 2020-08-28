import React, {useState, useCallback} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Modal from '../components/Modal'
import {useSelector, useDispatch} from 'react-redux'
import {onAuthStart} from '../state/ducks/auth'
import {Redirect, Link} from 'react-router-dom'

const Login  = props => {

    const [form, setForm] = useState({username : '', password : ''})
    const dispatch = useDispatch()
    const {isAuth, error} = useSelector(state => state.auth)
    
    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setForm(() => {
            return {...form, [name] : value}
        })
    }

    const handleFormSubmit = useCallback((e) => {
        e.preventDefault()
        dispatch(onAuthStart(form))
    },[form, dispatch])

    return (
        <div>
            {isAuth ? <Redirect to="/" /> : null}
            <Form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input name="username" type="text" onChange={handleInputChange} value={form.username} required />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input name="password" type="password" onChange={handleInputChange} value={form.password} required />
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
            <Link to="/signup">Signup</Link>
            <div>
                {error ? 'ERROR : '+error : ''}
            </div>
        </div>
    )
}

export default Login