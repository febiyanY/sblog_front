import * as types from './types'

const initialState = {
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_LOADER:
            return { isLoading: true }
        case types.HIDE_LOADER:
            return { isLoading: false }
        default:
            return state
    }
}

export default reducer