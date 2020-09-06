import {loadSuccess, clearComments, loadFailed, downvote, undoDownvote, undoUpvote, upvote} from './actions'
import axios from '../../../axioses/axios-default'
import {uiOperations} from '../ui'

export const onLoadComments = postId => dispatch => {
    dispatch(uiOperations.showLoader())
    axios.get('/comments?postId=' + postId).then(res => {
        dispatch(loadSuccess(res.data.slice(0, 5)))
        dispatch(uiOperations.hideLoader())
    }).catch(err => {
        dispatch(loadFailed(err.message))
        dispatch(uiOperations.hideLoader())
    })
}

export const onUpvote = commentId => dispatch => {
    axios.post('/comments/upvote', {commentId})
    dispatch(upvote(commentId))
}
export const onUndoUpvote = commentId => dispatch => {
    axios.post('/comments/undoupvote', {commentId})
    dispatch(undoUpvote(commentId))
}
export const onDownvote = commentId => dispatch => {
    axios.post('/comments/downvote', {commentId})
    dispatch(downvote(commentId))
}
export const onUndoDownvote = commentId => dispatch => {
    axios.post('/comments/undodownvote', {commentId})
    dispatch(undoDownvote(commentId))
}

export {
    clearComments
}

