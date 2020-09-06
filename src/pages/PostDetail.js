import React, { useState, useEffect, useCallback } from 'react'
import axios from '../axioses/axios-default'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid, Button, Divider, Avatar, Menu, MenuItem } from '@material-ui/core'
import { MoreVert, Edit, Delete } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { GenerateRouteWithSwitch } from '../components/GenerateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { uiOperations } from '../state/ducks/ui'
import Modal from '../components/Modal'
import Votes from '../components/Votes'

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
    const {user, isAuth} = useSelector(state => state.auth)

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
        axios.delete('/posts/' + post.id).then(res => {
            props.history.replace(`/profile/${user.username}/posts`)
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

    const upvote = useCallback((postId) => {
        if(user){
            axios.post('/posts/upvote', {postId})
            if(post.PostDownvotes.length!==0){
                setPost(() => {
                    return {
                        ...post,
                        votes : post.votes+2,
                        PostUpvotes : ['isi'],
                        PostDownvotes : []
                    }
                })
            }else{
                setPost(() => {
                    return {
                        ...post,
                        votes : post.votes+1,
                        PostUpvotes : ['isi'],
                        PostDownvotes : []
                    }
                })
            }
        }
    },[post,user])
    const undoUpvote = useCallback((postId) => {
        if(user){
            axios.post('/posts/undoupvote', {postId})
            setPost(() => {
                return {
                    ...post,
                    votes : post.votes-1,
                    PostUpvotes : []
                }
            })
        }
    },[post,user])
    const downvote = useCallback((postId) => {
        if(user){
            axios.post('/posts/downvote', {postId})
            if(post.PostUpvotes.length!==0){
                setPost(() => {
                    return {
                        ...post,
                        votes : post.votes-2,
                        PostUpvotes : [],
                        PostDownvotes : ['isi']
                    }
                })
            }else{
                setPost(() => {
                    return {
                        ...post,
                        votes : post.votes-1,
                        PostUpvotes : [],
                        PostDownvotes : ['isi']
                    }
                })
            }
        }
    },[post,user])
    const undoDownvote = useCallback((postId) => {
        if(user){
            axios.post('/posts/undodownvote', {postId})
            setPost(() => {
                return {
                    ...post,
                    votes : post.votes+1,
                    PostDownvotes : []
                }
            })
        }
    },[post,user])

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
                                        {(user && user.username === post.User.username) || (user && user.type === 'admin') ?
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
                                <Divider />
                                <Votes data={post} upvote={upvote} undoUpvote={undoUpvote} downvote={downvote} undoDownvote={undoDownvote} isAuth={isAuth} {...props}>{post.votes}</Votes>
                            </div>
                            
                            }
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