import * as types from './types'

const initialState = {
    isLoading: false,
    drawer: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_LOADER:
            return { ...state, isLoading: true }
        case types.HIDE_LOADER:
            return { ...state, isLoading: false }
        case types.SET_DRAWER:
            return { ...state, drawer: action.show }
        default:
            return state
    }
}

export default reducer