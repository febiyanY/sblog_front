import {clearPosts, loadFailed, loadSuccess} from './actions'
import axios from '../../../axioses/axios-default'
import {uiOperations} from '../ui'

export const onLoadPosts = () => dispatch => {
    dispatch(uiOperations.showLoader())
    axios.get('/posts').then(res => {
        dispatch(loadSuccess(res.data.slice(0, 20)))
        dispatch(uiOperations.hideLoader())
    }).catch(err => {
        dispatch(loadFailed(err.message))
        dispatch(uiOperations.hideLoader())
    })
}

export {
    clearPosts
}
