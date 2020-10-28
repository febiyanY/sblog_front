import React, { useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import NProgress from '../components/NProgress'
import { useSelector, useDispatch } from 'react-redux'
import MyDrawer from './Drawer'
import { uiOperations } from '../state/ducks/ui'

const Layout = props => {
    const dispatch = useDispatch()
    const { drawer } = useSelector(state => state.ui)
    const { user } = useSelector(state => state.auth)

    const closeDrawer = useCallback(() => {
        dispatch(uiOperations.setDrawer(false))
    }, [dispatch])

    const openDrawer = useCallback(() => {
        dispatch(uiOperations.setDrawer(true))
    }, [dispatch])

    return (
        <div style={{margin : 0, width : '100%'}}>
            <NProgress />
            <AppBar position="static" style={{ background: 'white' }}>
                <Toolbar >
                    <IconButton edge="start" color="primary" aria-label="menu" onClick={openDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{color : '#4b19e0'}}>
                        SBlog
                    </Typography>
                </Toolbar>
            </AppBar>

            {props.children}
            <MyDrawer openDrawer={drawer} closeDrawer={closeDrawer} user={user}/>
        </div>
    )
}

export default Layout