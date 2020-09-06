import React from 'react'
// import { NavLink } from 'react-router-dom'
import NavLink from './navLink/Link'

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {AllInbox, AccountCircle, Home, ExitToApp, RecentActors} from '@material-ui/icons'

import { useSelector } from 'react-redux'

const NavLinks = props => {
    const { isAuth, user } = useSelector(state => state.auth)

    let links

    if (isAuth) {
        links = (
            <div style={{ width: '250px' }}>
                <List>
                    <NavLink to="/" exact>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </NavLink>
                    <NavLink to="/posts" exact> <ListItem button>
                        <ListItemIcon><AllInbox /></ListItemIcon>
                        <ListItemText primary="Posts" />
                    </ListItem>
                    </NavLink>
                    {user.type === 'admin' ? <NavLink to="/users" >
                        <ListItem button>
                            <ListItemIcon><RecentActors /></ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                    </NavLink> : null}
                </List>
                <Divider />
                <List>
                    <NavLink to={`/profile/${user.username}`} >
                        <ListItem button>
                            <ListItemIcon><AccountCircle /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </NavLink>
                    <NavLink to="/logout" >
                        <ListItem button>
                            <ListItemIcon><ExitToApp /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </NavLink>
                </List>
            </div>

        )
    } else {
        links = (
            <div style={{ width: '250px' }}>
                <List>
                    <NavLink to="/" exact>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </NavLink>
                    <NavLink to="/posts" exact> <ListItem button>
                        <ListItemIcon><AllInbox /></ListItemIcon>
                        <ListItemText primary="Posts" />
                    </ListItem>
                    </NavLink>
                </List>
                <Divider />
                <List>
                    <NavLink to="/login" >
                        <ListItem button>
                            <ListItemIcon><ExitToApp /></ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItem>
                    </NavLink>
                </List>
            </div>
        )
    }

    return links
}

export default NavLinks