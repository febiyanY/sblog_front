import { authFailed, authSucceed, logout, loadUserData } from './actions'
import { uiOperations } from '../ui'
import axios from '../../../axioses/axios-default'

export {
    authFailed
}

export const onAuthStart = (data) => dispatch => {
    dispatch(uiOperations.showLoader())
    axios.post('/login', data).then(res => {
        // console.log(res)
        const user = res.data
        dispatch(authSucceed({...user, userId:user.id}))
        dispatch(uiOperations.hideLoader())
    }).catch(err => {
        // console.log(err.response)
        dispatch(authFailed(err.response.data.message))
        dispatch(uiOperations.hideLoader())
    })

}

export const onLoadUserData = () => (dispatch, getState) => {
    dispatch(uiOperations.showLoader())
    const {auth} = getState()
    return new Promise((resolve, reject) => {
        axios.get(`/users/${auth.user.userId}`).then(res => {
            const user = res.data
            dispatch(loadUserData({userId : user.id, username : user.username, display_name : user.display_name, ava : user.ava }))
            dispatch(uiOperations.hideLoader())
            resolve({message : 'suksesss'})
        }).catch(err => {
            // console.log(err.response.data)
            dispatch(authFailed(err.response.data.message))
            dispatch(uiOperations.hideLoader())
            reject()
        })
    })
    
}

export const onLogout = () => dispatch => {
    axios.get('/logout').then(res => {
        dispatch(logout())
    })
}

export const onCheckAuth = () => (dispatch,getState) => {
    // const store = getState()
    // console.log(store)
    dispatch(uiOperations.showLoader())
    axios.get('/users/checksession').then(res => {
        dispatch(authSucceed({...res.data, userId : res.data.id}))
        dispatch(uiOperations.hideLoader())
    }).catch(err => {
        // console.log(err.response.data)
        dispatch(logout())
        dispatch(uiOperations.hideLoader())
    })
}

export const onChangeAva = (ava) => (dispatch, getState) => {
    const {auth} = getState()
    dispatch(uiOperations.showLoader())
    let formData = new FormData()
    formData.append('image', ava)
    formData.append('userId', auth.user.userId)
    return new Promise((resolve, reject) => {
        axios.post('/users/uploadava', formData
        ).then(res => {
            dispatch(uiOperations.hideLoader())
            resolve(res.data)
        }).catch(err => {
            dispatch(authFailed(err.response.data.message))
            dispatch(uiOperations.hideLoader())
            reject(err.response.data)
        })
    })
    
}