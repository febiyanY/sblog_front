import React, { useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../components/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { uiOperations } from '../state/ducks/ui'
import { Redirect } from 'react-router-dom'
import axios from '../axioses/axios-default'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '96%',
        },
    },
}));

const SignUp = props => {
    const classes = useStyles();

    const [form, setForm] = useState({ username: '', password: '', confirm_password: '', display_name: '' })
    const [error, setError] = useState(null)
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const { isAuth } = useSelector(state => state.auth)

    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setForm(() => {
            return { ...form, [name]: value }
        })
    }

    const handleFormSubmit = useCallback((e) => {
        setError(null)
        e.preventDefault()
        if (form.confirm_password !== form.password) return setError('Password did not match')
        dispatch(uiOperations.showLoader())
        let formData = { ...form }
        formData.type = 'client'
        delete formData.confirm_password
        axios.post('/users', formData).then(res => {
            setModal(true)
            dispatch(uiOperations.hideLoader())
        }).catch(err => {
            // console.log(err.response)
            if (err.response.data.name === 'SequelizeUniqueConstraintError') {
                setError('Username exist')
            }
            dispatch(uiOperations.hideLoader())
        })
    }, [dispatch, form])

    const closeModal = useCallback(() => setModal(false), [])
    const toLogin = useCallback(() => props.history.push('/login'), [props.history])

    return (
        <div>
            {isAuth ? <Redirect to="/" /> : null}
            <form onSubmit={handleFormSubmit} autoComplete="off" className={classes.root}>
                <TextField label="Username" variant="outlined" name="username" type="text" onChange={handleInputChange} value={form.username} required />
                <TextField label="Display Name" variant="outlined" name="display_name" type="text" onChange={handleInputChange} value={form.display_name} required />
                <TextField label="Password" variant="outlined" name="password" type="password" onChange={handleInputChange} value={form.password} required />
                <TextField label="Confirm Password" variant="outlined" name="confirm_password" type="password" onChange={handleInputChange} value={form.confirm_password} required />
                <Button type="submit" variant="contained" color="primary" disableElevation>
                    Signup
                </Button>
                <Button type="button" onClick={() => props.history.push('/login')}>Login</Button>
            </form>
            <div>
                {error ? 'ERROR : ' + error : ''}
            </div>

            <Modal show={modal} toggle={closeModal} confirm={toLogin} confirmText="Login" cancelText="close" title="Success" >
                Signup Success
            </Modal>
        </div>
    )
}

export default SignUp