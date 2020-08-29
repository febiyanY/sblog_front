import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../axioses/axios-default'
import { uiOperations } from '../../state/ducks/ui'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '96%',
        },
    },
}));

const EditAccount = props => {
    const classes = useStyles()

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
            if (err.response.data.name === 'SequelizeUniqueConstraintError') {
                setFormError('Username exist')
            }
        })
    }

    const toggleEditPass = () => {
        setEditPass(() => !editPass)
    }

    return (
        <form onSubmit={onFormSubmit} autoComplete="off" className={classes.root} style={{marginTop : '2%'}}>
            {formError ? 'ERROR : ' + formError : ''}
            <TextField variant="outlined" label="Username" type="text" name="username" value={form.username} onChange={handleInputChange} required />
            <TextField variant="outlined" label="Display Name" type="text" name="display_name" value={form.display_name} onChange={handleInputChange} required />
            <Button color="primary" size="small" onClick={toggleEditPass}>Edit Password</Button>
            {editPass ? <div className={classes.root}>
                <TextField variant="outlined" label="Password" type="password" name="password" value={form.password} onChange={handleInputChange} required />
                <TextField variant="outlined" label="Confrim Password" type="password" name="confirm_password" value={form.confirm_password} onChange={handleInputChange} required />
            </div> : null}
            <Grid container>
                <Grid item xs={6}>
                    <Button fullWidth type="submit" variant="contained" color="primary" disableElevation >Save</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth type="button" onClick={() => props.history.replace(`/profile/${user.username}`)}>Cancel</Button>
                </Grid>
            </Grid>
        </form>
    )
}


export default EditAccount