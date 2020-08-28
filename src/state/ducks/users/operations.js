import axios from '../../../axioses/axios-default'
import {clearState, loadFailed, loadStart, loadSuccess} from './actions'
import {uiOperations} from '../ui'

export const onLoadUsers = () => dispatch => {
    dispatch(uiOperations.showLoader())
    axios.get('/users', {headers : {Authorization : `Bearer ${localStorage.getItem('token')}`}}).then(res => {
        dispatch(loadSuccess(res.data.data))
        dispatch(uiOperations.hideLoader())
    }).catch(err => {
        dispatch(loadFailed(err))
        dispatch(uiOperations.hideLoader())
    })
}

export {
    clearState, loadStart
}