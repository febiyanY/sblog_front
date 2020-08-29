import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Post from './post/Post'
import { Link } from 'react-router-dom'
import { postsOperations } from '../state/ducks/posts'

const Posts = props => {

    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.posts)

    useEffect(() => {
        dispatch(postsOperations.onLoadPosts())
        console.log('loding postsss')
        return () => dispatch(postsOperations.clearPosts())
    }, [dispatch])

    return (
        <div>
            {
                posts ? posts.map(post => {
                    return (
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/posts/${post.key}`} key={post.id} >
                            <Post post={post} />
                        </Link>
                    )
                }) : <p>Loading...</p>
            }
        </div>
    )


}


export default Posts
