
import {useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import React, { useEffect } from 'react'
import {onLogout} from '../state/ducks/auth'

const Logout = props => {
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(onLogout())
    },[dispatch])

    let redirect = null

    if(isAuth){
        redirect = <Redirect to="/"/>
    }

    return redirect

}

export default Logout