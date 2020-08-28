import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../axioses/axios-default'
import Post from './post/Post'
import { Button, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
// import NProgress from '../components/NProgress'
import { postsOperations } from '../state/ducks/posts'

const Posts = props => {
    // const [posts, setPosts] = useState(null)
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.posts)
    const { isAuth } = useSelector(state => state.auth)

    useEffect(() => {
        // axios.get('/posts').then(res => {
        //     setPosts(res.data.slice(0, 10))
        // })
        dispatch(postsOperations.onLoadPosts())
        console.log('loding postsss')
        return () => dispatch(postsOperations.clearPosts())
    }, [dispatch])

    const createPost = () => props.history.push('/post/new')

    // const handleTaskDetail = (id) => {
    //     props.history.push('/tasks/' + id)
    // }

    return (
        <div>
            {/* <NProgress isLoading={isLoading}/> */}
            <Row>
                <Col sm="10">
                    <h5>Posts</h5>
                </Col>
                <Col sm="2">
                    {/* {isAuth ? <Button color="secondary" size="sm" onClick={createPost}>Add Post</Button> : null} */}
                </Col>
            </Row>

            {/* <ListGroup> */}
            {
                posts ? posts.map(post => {
                    return (
                        // return <Task task={task} clicked={() => handleTaskDetail(task.id)} key={task.id} />
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/posts/${post.key}`} key={post.id} >
                            <Post post={post} />
                        </Link>
                    )
                }) : <p>Loading...</p>
            }
            {/* </ListGroup> */}
        </div>
    )


}


export default Posts
