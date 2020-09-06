import * as types from './types'

const initialState = {
    user: null,
    isAuth: false,
    error: null,
    authLoading : true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_SUCCEED:
            return {
                user: action.payload,
                isAuth: true,
                error: null,
                authLoading : false
            }
        case types.AUTH_FAILED:
            return {
                ...state, error: action.error, authLoading :false
            }
        case types.LOGOUT:
            return {
                user: null,
                isAuth: false,
                error: null
            }
        case types.LOAD_USER_DATA:
            return {
                ...state,
                user: { ...state.user, ...action.payload }
            }
        default:
            return state

    }
}

export default reducer