import React from 'react'
import { NavLink } from 'react-router-dom'
import {uiOperations} from '../../state/ducks/ui'
import {useDispatch} from 'react-redux'

const Link = props => {
    const dispatch = useDispatch()

    const closeDrawer = () => {
        dispatch(uiOperations.setDrawer(false))
    }

    return (
        <NavLink {...props} style={{textDecoration : 'none', color : 'black'}} onClick={closeDrawer}>
            {props.children}
        </NavLink>
    )
}

export default Link