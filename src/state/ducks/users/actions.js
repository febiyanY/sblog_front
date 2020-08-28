import * as types from './types'

export const loadStart = () => ({
    type : types.LOAD_START
})
export const loadSuccess = (payload) => ({
    type : types.LOAD_SUCCESS,
    payload
})
export const loadFailed = (error) => ({
    type : types.LOAD_FAILED,
    error
})
export const clearState = () => ({
    type : types.CLEAR_STATE
})

