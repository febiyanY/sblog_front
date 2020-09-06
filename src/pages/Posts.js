import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Post from './post/Post'
import { Link } from 'react-router-dom'
import { postsOperations } from '../state/ducks/posts'
import Votes from '../components/Votes'
import { InsertCommentOutlined } from '@material-ui/icons'
import { Grid } from '@material-ui/core'

const Posts = props => {

    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.posts)
    const { isAuth } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(postsOperations.onLoadPosts())
        console.log('loding postsss')
        return () => dispatch(postsOperations.clearPosts())
    }, [dispatch])

    const upvote = useCallback((postId) => {
        dispatch(postsOperations.onUpvote(postId))
    }, [dispatch])

    const downvote = useCallback((postId) => {
        dispatch(postsOperations.onDownvote(postId))
    }, [dispatch])

    const undoUpvote = useCallback((postId) => {
        dispatch(postsOperations.onUndoUpvote(postId))
    }, [dispatch])

    const undoDownvote = useCallback((postId) => {
        dispatch(postsOperations.onUndoDownvote(postId))
    }, [dispatch])


    return (
        <div>
            {
                posts ? posts.map(post => {
                    return (
                        <div key={post.id}>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/posts/${post.key}`}  >
                                <Post post={post} />
                            </Link>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Votes data={post} upvote={upvote} downvote={downvote} undoUpvote={undoUpvote} undoDownvote={undoDownvote} isAuth={isAuth} {...props}>
                                        {post.votes}
                                    </Votes>
                                </Grid>
                                <Grid item xs={6}>
                                    <InsertCommentOutlined fontSize="small" /> {post.commentsCount}
                                </Grid>
                            </Grid>


                        </div>

                    )
                }) : <p>Loading...</p>
            }
        </div>
    )


}


export default Posts
