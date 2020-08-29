import {loadSuccess, clearComments, loadFailed} from './actions'
import axios from '../../../axioses/axios-default'
import {uiOperations} from '../ui'

export const onLoadComments = postId => dispatch => {
    dispatch(uiOperations.showLoader())
    axios.get('/comments?postId=' + postId).then(res => {
        dispatch(loadSuccess(res.data.slice(0, 5)))
        dispatch(uiOperations.hideLoader())
    }).catch(err => {
        dispatch(loadFailed(err.message))
        dispatch(uiOperations.hideLoader())
    })
}

export {
    clearComments
}

