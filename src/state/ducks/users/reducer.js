import * as types from './types'

const initialState = {
    users: [],
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_SUCCESS:
            return {
                error: null, users: action.payload
            }
        case types.LOAD_FAILED:
            return {
                ...state, error: action.error
            }
        case types.CLEAR_STATE:
            return { users: [], error: null }
        default:
            return state
    }
}

export default reducer