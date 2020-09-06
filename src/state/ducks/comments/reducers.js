import * as types from './types'

const initialState = {
    comments: [],
    error: null
}

const reducer = (state = initialState, action) => {
    let comments
    let index
    let selectedComment
    switch (action.type) {
        case types.CLEAR_STATE:
            return {
                comments: [],
                error: null
            }
        case types.LOAD_SUCCESS:
            return {
                comments: action.payload, error: null
            }
        case types.LOAD_FAILED:
            return {
                ...state, error: action.error
            }
        case types.LOAD_START:
            return {
                ...state, error: null
            }
        case types.UPVOTE:
            comments = [...state.comments]
            index = comments.findIndex(comment => comment.id === action.commentId)
            selectedComment = comments[index]
            selectedComment.CommentUpvotes = [{id : 'upvote!!!'}]
            if(selectedComment.CommentDownvotes.length!==0){
                selectedComment.CommentDownvotes = []
                selectedComment.votes +=2
            }else{
                selectedComment.votes +=1
            }
            comments[index] = selectedComment
            return {
                ...state,
                comments : comments
            }
        case types.UNDO_UPVOTE:
            comments = [...state.comments]
            index = comments.findIndex(comment => comment.id === action.commentId)
            selectedComment = comments[index]
            selectedComment.CommentUpvotes = []
            selectedComment.votes -=1
            comments[index] = selectedComment
            return {
                ...state,
                comments : comments
            }
        case types.DOWNVOTE:
            comments = [...state.comments]
            index = comments.findIndex(comment => comment.id === action.commentId)
            selectedComment = comments[index]
            selectedComment.CommentDownvotes = [{id : 'downvote!!!'}]
            if(selectedComment.CommentUpvotes.length!==0){
                selectedComment.CommentUpvotes = []
                selectedComment.votes -=2
            }else{
                selectedComment.votes -=1
            }
            comments[index] = selectedComment
            return {
                ...state,
                comments : comments
            }
        case types.UNDO_DOWNVOTE:
            comments = [...state.comments]
            index = comments.findIndex(comment => comment.id === action.commentId)
            selectedComment = comments[index]
            selectedComment.CommentDownvotes = []
            selectedComment.votes +=1
            comments[index] = selectedComment
            return {
                ...state,
                comments : comments
            }
        default:
            return state
    }
}

export default reducer