import React, { useState, useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Grid } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import axios from '../axioses/axios-default'
import { useDispatch } from 'react-redux'
import { uiOperations } from '../state/ducks/ui'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '96%',
        },
    },
}));

const EditPost = props => {
    const classes = useStyles()

    const [form, setForm] = useState({ title: '', body: '' })
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`/posts/${props.location.state.key}`).then(res => {
            setForm({ title: res.data.title, body: res.data.body })
        })
        return () => setForm({ title: '', body: '' })
    }, [props.location.state.key])

    const handleInputChange = useCallback((e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setForm(() => ({ ...form, [name]: value }))
    }, [form])

    const handleFormSubmit = useCallback((e) => {
        e.preventDefault()
        dispatch(uiOperations.showLoader())
        axios.patch('/posts', {
            postId: props.location.state.postId,
            update: form
        }).then(res => {
            props.history.push(`/posts/${props.location.state.key}`)
        }).catch(err => {
            console.log(err)
            dispatch(uiOperations.hideLoader())
        })
    }, [dispatch, props.history, props.location.state.postId, props.location.state.key, form])

    const cancelEdit = () => props.history.push(`/posts/${props.location.state.key}`)

    return (
        <div style={{marginTop : '1%'}}>
            {!props.location.state ? <Redirect to="/" /> : null}
            <p style={{textAlign : 'center'}}><b>Edit Post</b></p>
            <form onSubmit={handleFormSubmit} autoComplete="off" className={classes.root}>
                <TextField label="Title" variant="outlined" type="text" name="title" value={form.title} onChange={handleInputChange} />
                <TextField multiline label="Body" variant="outlined" type="textarea" name="body" value={form.body} onChange={handleInputChange} />
                <Grid container>
                    <Grid item xs={6}>
                        <Button fullWidth type="submit" variant="contained" color="primary" disableElevation>Save</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth type="button" onClick={cancelEdit}>Cancel</Button>
                    </Grid>
                </Grid>


            </form>
        </div>
    )
}

export default EditPost