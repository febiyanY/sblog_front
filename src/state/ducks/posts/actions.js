import * as types from './types'

export const startLoad = () => ({
    type : types.START_LOAD
})
export const loadFailed = (error) => ({
    type : types.LOAD_FAILED,
    error
})
export const loadSuccess = (payload) => ({
    type : types.LOAD_SUCCESS,
    payload
})
export const clearPosts = () => ({
    type : types.CLEAR_STATE
})
export const upvote = (postId) => ({
    type : types.UPVOTE,
    postId
})
export const undoUpvote = (postId) => ({
    type : types.UNDO_UPVOTE,
    postId
})
export const downvote = (postId) => ({
    type : types.DOWNVOTE,
    postId
})
export const undoDownvote = (postId) => ({
    type : types.UNDO_DOWNVOTE,
    postId
})