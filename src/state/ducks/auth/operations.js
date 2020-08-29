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
        localStorage.setItem('userId', user.data.id)
        localStorage.setItem('username', user.data.username)
        localStorage.setItem('display_name', user.data.display_name)
        localStorage.setItem('ava', user.data.ava)
        localStorage.setItem('type', user.data.type)
        localStorage.setItem('token', user.token)
        localStorage.setItem('token_expire', user.data.token_expire)
        dispatch(authSucceed({...user.data, userId:user.data.id, token : user.token}))
        dispatch(uiOperations.hideLoader())
    }).catch(err => {
        // console.log(err.response)
        dispatch(authFailed(err.response.data.message))
        dispatch(uiOperations.hideLoader())
    })

}

export const onLoadUserData = () => dispatch => {
    dispatch(uiOperations.showLoader())
    return new Promise((resolve, reject) => {
        axios.get(`/users/${localStorage.getItem('userId')}`, {headers : {Authorization : `Bearer ${localStorage.getItem('token')}`}}).then(res => {
            const user = res.data
            localStorage.setItem('userId', user.id)
            localStorage.setItem('username', user.username)
            localStorage.setItem('display_name', user.display_name)
            localStorage.setItem('ava', user.ava)
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
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    localStorage.removeItem('display_name')
    localStorage.removeItem('ava')
    localStorage.removeItem('type')
    localStorage.removeItem('token')
    localStorage.removeItem('token_expire')
    dispatch(logout())
}

export const onCheckAuth = () => dispatch => {
    if (localStorage.getItem('token')) {
        const data = {
            userId: localStorage.getItem('userId'),
            username: localStorage.getItem('username'),
            display_name: localStorage.getItem('display_name'),
            ava: localStorage.getItem('ava'),
            type: localStorage.getItem('type'),
            token: localStorage.getItem('token'),
            token_expire: localStorage.getItem('token_expire')
        }
        dispatch(authSucceed(data))
    }else{
        dispatch(logout())
    }
}

export const onChangeAva = (ava) => dispatch => {
    dispatch(uiOperations.showLoader())
    let formData = new FormData()
    formData.append('image', ava)
    formData.append('userId', localStorage.getItem('userId'))
    return new Promise((resolve, reject) => {
        axios.post('/users/uploadava', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            dispatch(uiOperations.hideLoader())
            resolve(res.data)
        }).catch(err => {
            dispatch(authFailed(err.response.data.message))
            dispatch(uiOperations.hideLoader())
            reject(err.response.data)
        })
    })
    
}