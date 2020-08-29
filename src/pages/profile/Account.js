import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { onLoadUserData, onChangeAva, authFailed } from '../../state/ducks/auth'
import { Avatar, Button, Grid } from '@material-ui/core';

const UserProfile = props => {
    const dispatch = useDispatch()
    const { user, error } = useSelector(state => state.auth)
    const [preview, setPreview] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        dispatch(onLoadUserData())
    }, [dispatch])

    const onChoose = (e) => {
        if(e.target.files[0]){
            setPreview(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
        }
    }

    const onCancel = () => {
        setPreview(null)
        setImage(null)
        dispatch(authFailed(null))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        dispatch(onChangeAva(image)).then(data => dispatch(onLoadUserData())).then(data => {
            onCancel()
        })
    }
    return (
        <Grid container style={{ marginTop: '2%' }}>
            <Grid item xs={12}>
                <div style={{ textAlign: 'center' }}>
                    {preview ? 
                    <Avatar style={{ width: '200px', height: '200px', margin: '1% auto' }} alt="Remy Sharp" src={preview} />
                    :
                    <Avatar style={{ width: '200px', height: '200px', margin: '1% auto' }} alt="Remy Sharp" src={`${process.env.REACT_APP_API_URL}/images/avatars/${user.ava}`} />
                    }
                    {error ? 'ERROR : '+error : null}
                    <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
                        <input
                            accept="image/*"
                            style={{display : 'none'}}
                            id="contained-button-file"
                            type="file"
                            onChange={onChoose}
                        />
                        
                            {preview ? 
                            <div>
                            <Button variant="contained" size="small" color="primary" type="submit">
                                Save
                            </Button> 
                            <Button variant="outlined" size="small" color="secondary" component="span" type="button" onClick={onCancel}>
                                Cancel
                            </Button> 
                            </div>
                            :<label htmlFor="contained-button-file"> <Button variant="outlined" size="small" color="primary" component="span" type="button">
                                Change
                            </Button></label>}
                            
                        
                    </form>
                </div>
            </Grid>
            <Grid style={{ marginTop: '20%' }} item xs={12}>
                <div style={{ textAlign: 'center' }}>
                    <h4>@{user.username}</h4>
                    <h3>{user.display_name}</h3>
                    <Link to={`${props.match.url}/edit`}>
                        <Button color="primary" variant="outlined">Edit</Button>
                    </Link>
                </div>

            </Grid>
        </Grid>
    )
}

export default UserProfile