import React from 'react'
import { Nav, NavLink } from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'

const NavLinks = props => {
    let links

    if (props.isAuth) {
        links = (
            <Nav>
                <NavLink tag={RRNavLink} to="/" exact> Home </NavLink>
                <NavLink tag={RRNavLink} to="/posts" exact> Posts </NavLink>
                <NavLink tag={RRNavLink} to={`/profile/${localStorage.getItem('username')}`} > Profile </NavLink>
                {localStorage.getItem('type')==='admin' ? <NavLink tag={RRNavLink} to="/users" > Users </NavLink> : null}
                <NavLink tag={RRNavLink} to="/logout" > Logout </NavLink>
            </Nav>
        )
    }else {
        links = (
            <Nav>
                <NavLink tag={RRNavLink} to="/" exact> Home </NavLink>
                <NavLink tag={RRNavLink} to="/posts" exact> Posts </NavLink>
                <NavLink tag={RRNavLink} to="/login" > Login </NavLink>
            </Nav>
        )
    }

    return links
}

export default NavLinks