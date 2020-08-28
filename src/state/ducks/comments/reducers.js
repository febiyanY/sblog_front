import * as types from './types'

const initialState = {
    comments: [],
    error: null
}

const reducer = (state =initialState, action) => {
    switch (action.type) {
        case types.CLEAR_STATE:
            return {
                comments: [],
                error: null
            }
        case types.LOAD_SUCCESS:
            return {
               comments : action.payload, error : null
            }
        case types.LOAD_FAILED:
            return {
                ...state, error : action.error
            }
        case types.LOAD_START:
            return {
                ...state, error : null
            }
        default:
            return state
    }
}

export default reducer