import React, { useState, useEffect } from 'react'
import { Card, Button, Grid, Divider } from '@material-ui/core'
import axios from '../../axioses/axios-default'
import { useDispatch, useSelector } from 'react-redux'
import { uiOperations } from '../../state/ducks/ui'
import { Link } from 'react-router-dom'
import moment from 'moment'

const MyPost = props => {

    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(uiOperations.showLoader())
        axios.get(`/posts/user/${user.userId}`, { headers: { Authorization: `Bearer ${user.token}` } }).then(res => {
            setPosts(res.data)
            dispatch(uiOperations.hideLoader())
        }).catch(err => {
            console.log(err.response)
            dispatch(uiOperations.hideLoader())
        })
    }, [dispatch, user.token, user.userId])

    return (
        <div style={{marginTop : '5%'}}>
            <Button variant="outlined" color="primary" size="small" onClick={() => props.history.push('/post/new')}>Add Post</Button>
            <Card variant="outlined" style={{ padding: '2%' }}>
                {posts.map((post, i) => {
                    return (
                        <Link to={`/posts/${post.key}`} key={i} style={{ textDecoration: 'none', color: "black" }}>
                            <Grid container>
                                <Grid item xs={9}>
                                    <p><b>{post.title}</b></p>
                                </Grid>
                                <Grid item xs={3}>
                                    <small>{moment(post.time).format("MMM-Do-YYYY")}</small>
                                </Grid>
                            </Grid>
                            <Divider />
                        </Link>
                        
                    )
                })}
            </Card>
        </div>
    )
}

export default MyPost