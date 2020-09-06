import * as types from './types'

const intialState = {
    posts: [],
    error: null
}

const reducer = (state = intialState, action) => {
    let posts
    let index
    let selectedPost
    switch (action.type) {
        case types.START_LOAD:
            return {
                ...state, error: null
            }
        case types.LOAD_SUCCESS:
            return {
                ...state, posts: action.payload, error: null
            }
        case types.LOAD_FAILED:
            return {
                ...state, error: action.error
            }
        case types.CLEAR_STATE:
            return {
                posts: [],
                error: null
            }
        case types.UPVOTE:
            posts = [...state.posts]
            index = posts.findIndex(post => post.id === action.postId)
            selectedPost = posts[index]
            selectedPost.PostUpvotes = [{ id: 'upvote!!' }] // yang penting diisi
            if (selectedPost.PostDownvotes.length !== 0) {
                selectedPost.PostDownvotes = [] // kosongi
                selectedPost.votes += 2
            } else {
                selectedPost.votes += 1
            }
            posts[index] = selectedPost
            return {
                ...state,
                posts: posts
            }
        case types.DOWNVOTE:
            posts = [...state.posts]
            index = posts.findIndex(post => post.id === action.postId)
            selectedPost = posts[index]
            selectedPost.PostDownvotes = [{ id: 'downvote!!' }] // yang penting diisi
            if (selectedPost.PostUpvotes.length !== 0) {
                selectedPost.PostUpvotes = [] // kosongi
                selectedPost.votes -= 2
            } else {
                selectedPost.votes -= 1
            }
            posts[index] = selectedPost
            return {
                ...state,
                posts: posts
            }
        case types.UNDO_UPVOTE:
            posts = [...state.posts]
            index = posts.findIndex(post => post.id === action.postId)
            selectedPost = posts[index]
            selectedPost.PostUpvotes = [] // kosongi
            selectedPost.votes -= 1
            posts[index] = selectedPost
            return {
                ...state,
                posts: posts
            }
        case types.UNDO_DOWNVOTE:
            posts = [...state.posts]
            index = posts.findIndex(post => post.id === action.postId)
            selectedPost = posts[index]
            selectedPost.PostDownvotes = [] // kosongi
            selectedPost.votes += 1
            posts[index] = selectedPost
            return {
                ...state,
                posts: posts
            }
        default:
            return state
    }
}

export default reducer