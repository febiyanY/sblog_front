import * as types from './types'

export const loadSuccess = (payload) => ({
    type : types.LOAD_SUCCESS,
    payload
})

export const clearComments = () => ({
    type : types.CLEAR_STATE
})
export const loadStart = () => ({
    type : types.LOAD_START
})
export const loadFailed = (error) => ({
    type : types.LOAD_START,
    error
})