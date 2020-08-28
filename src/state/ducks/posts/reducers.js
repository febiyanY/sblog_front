import * as types from './types'

const intialState = {
    posts: [],
    error: null
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case types.START_LOAD:
            return {
                ...state, error : null
            }
        case types.LOAD_SUCCESS:
            return {
                ...state, posts: action.payload, error : null
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
        default:
            return state
    }
}

export default reducer