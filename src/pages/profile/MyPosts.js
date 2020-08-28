import React, { useState, useEffect } from 'react'
import {ListGroup, ListGroupItem, Button } from 'reactstrap'
import axios from '../../axioses/axios-default'
import { useDispatch, useSelector } from 'react-redux'
import { uiOperations } from '../../state/ducks/ui'
import { Link } from 'react-router-dom'

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
        <div>
            <Button color="secondary" size="sm" onClick={() => props.history.push('/post/new')}>Add Post</Button>
            <ListGroup>
                {posts.map((post, i) => {
                    return (
                        <Link to={`/posts/${post.key}`} key={i} style={{textDecoration:'none', color : "black"}}>
                            <ListGroupItem>
                                <div><b>{post.title}</b></div>
                                <div><small>{new Date(post.time).toString()}</small></div>
                            </ListGroupItem>
                        </Link>

                    )
                })}
            </ListGroup>
        </div>
    )
}

export default MyPost