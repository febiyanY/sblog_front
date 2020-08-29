import React, { useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { onAuthStart } from '../state/ducks/auth'
import { Redirect} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '96%',
        },
    },
}));

const Login = props => {
    const classes = useStyles();

    const [form, setForm] = useState({ username: '', password: '' })
    const dispatch = useDispatch()
    const { isAuth, error } = useSelector(state => state.auth)

    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setForm(() => {
            return { ...form, [name]: value }
        })
    }

    const handleFormSubmit = useCallback((e) => {
        e.preventDefault()
        dispatch(onAuthStart(form))
    }, [form, dispatch])

    return (
        <div>
            {isAuth ? <Redirect to="/" /> : null}
            <form onSubmit={handleFormSubmit} autoComplete="off" className={classes.root}>
                <TextField label="Username" variant="outlined" name="username" type="text" onChange={handleInputChange} value={form.username} required />
                <TextField label="Password" variant="outlined" name="password" type="password" onChange={handleInputChange} value={form.password} required />
                <Button type="submit" variant="contained" color="primary" disableElevation>
                    Login
                </Button>
                <Button type="button" onClick={() => props.history.push('/signup')}>Signup</Button>
            </form>
            

            <div>
                {error ? 'ERROR : ' + error : ''}
            </div>
        </div>
    )
}

export default Login