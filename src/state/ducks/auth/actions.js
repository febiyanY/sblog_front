import * as types from './types'

export const startAuth = () => ({
    type : types.START_AUTH
})
export const authSucceed = (payload) => ({
    type : types.AUTH_SUCCEED,
    payload
})
export const authFailed = (error) => ({
    type : types.AUTH_FAILED,
    error
})
export const logout = () => ({
    type : types.LOGOUT
})
export const loadUserData = (payload) => ({
    type : types.LOAD_USER_DATA,
    payload
})