import React, { useState, useEffect, useCallback } from 'react'
import axios from '../axioses/axios-default'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid, Button, Divider, Avatar, Menu, MenuItem } from '@material-ui/core'
import { MoreVert, Edit, Delete } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { GenerateRouteWithSwitch } from '../components/GenerateRoute'
import { useDispatch } from 'react-redux'
import { uiOperations } from '../state/ducks/ui'
import Modal from '../components/Modal'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '96%',
        },
    },
    card: {
        padding: '2%'
    },
    link: {
        textDecoration: 'none'
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    }
}));

const PostDetail = props => {
    const classes = useStyles()

    const [post, setPost] = useState({ id: '' })
    const [modal, setModal] = useState(false)
    const [anchorMenu, setAnchorMenu] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(uiOperations.showLoader())
        axios.get('/posts/' + props.match.params.id).then(res => {
            setPost(res.data)
            dispatch(uiOperations.hideLoader())
        })
    }, [props.match.params.id, dispatch])

    const closeModal = useCallback(() => setModal(false), [])
    const openModal = useCallback(() => setModal(true), [])

    const handleConfirmDeletePost = useCallback(() => {
        dispatch(uiOperations.showLoader())
        axios.delete('/posts/' + post.id, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(res => {
            props.history.replace(`/profile/${localStorage.getItem('username')}/posts`)
        }).catch(err => {
            console.log(err)
            dispatch(uiOperations.hideLoader())
        })
    }, [dispatch, props.history, post.id])

    const editPost = () => {
        props.history.push({
            pathname: props.match.url + '/edit',
            state: { postId: post.id, key: post.key }
        })
    }

    const openMenu = (e) => {
        setAnchorMenu(e.target)
    }
    const closeMenu = () => setAnchorMenu(null)

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Card className={classes.card} variant="outlined">
                        <div>
                            {post.id !== '' && <div>
                                <Grid container>
                                    <Grid item xs={7}>
                                        <Grid container>
                                            <Grid item xs={2}>
                                                <Avatar src={`${process.env.REACT_APP_API_URL}/images/avatars/${post.User.ava}`} className={classes.avatar} />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <small>@{post.User.username}</small>
                                            </Grid>
                                        </Grid>


                                    </Grid>
                                    <Grid item xs={5}>
                                        {(localStorage.getItem('username') === post.User.username) || localStorage.getItem('type') === 'admin' ?
                                            <div style={{textAlign : 'right'}}>
                                                <Button onClick={openMenu}><MoreVert/></Button>
                                                <Menu
                                                    anchorEl={anchorMenu}
                                                    keepMounted
                                                    open={Boolean(anchorMenu)}
                                                    onClose={closeMenu}
                                                >
                                                    <MenuItem onClick={editPost}><Edit/> Edit</MenuItem>
                                                    <MenuItem onClick={openModal}><Delete/> Delete</MenuItem>
                                                </Menu>
                                            </div>
                                            : null}

                                    </Grid>
                                </Grid>
                                <p><b>{post.title}</b></p>
                                <Divider />
                                <p>{post.body}</p>
                            </div>}
                        </div>
                    </Card>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Link className={classes.link} to={`${props.match.url}/comments?postId=${post ? post.id : ''}`}><Button size="small">Show Comments</Button> </Link>
                    <GenerateRouteWithSwitch routes={props.routes} />
                </Grid>
            </Grid>

            <Modal show={modal} title="Confirmation" toggle={closeModal} confirm={handleConfirmDeletePost} confirmText="Ok" cancelText="Cancel" >
                <p>Are you sure you want to delete {post.title} ?</p>
            </Modal>

        </div>
    )

}

export default PostDetail