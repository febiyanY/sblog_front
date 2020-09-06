import {clearPosts, loadFailed, loadSuccess, downvote, undoDownvote, undoUpvote, upvote} from './actions'
import axios from '../../../axioses/axios-default'
import {uiOperations} from '../ui'

export const onLoadPosts = () => dispatch => {
    dispatch(uiOperations.showLoader())
    axios.get('/posts').then(res => {
        dispatch(loadSuccess(res.data.slice(0, 20)))
        dispatch(uiOperations.hideLoader())
    }).catch(err => {
        dispatch(loadFailed(err.message))
        dispatch(uiOperations.hideLoader())
    })
}

export const onUpvote = (postId) => dispatch => {
    axios.post('/posts/upvote', {postId})
    dispatch(upvote(postId))
} 
export const onDownvote = (postId) => dispatch => {
    axios.post('/posts/downvote', {postId})
    dispatch(downvote(postId))
} 
export const onUndoUpvote = (postId) => dispatch => {
    axios.post('/posts/undoupvote', {postId})
    dispatch(undoUpvote(postId))
} 
export const onUndoDownvote = (postId) => dispatch => {
    axios.post('/posts/undodownvote', {postId})
    dispatch(undoDownvote(postId))
} 

export {
    clearPosts
}
