import React from 'react'
import { Container } from 'reactstrap'
import NProgress from '../components/NProgress'
import NavLinks from '../components/NavLinks'
import {useSelector} from 'react-redux'

const Layout = props => {
    const {isAuth, user} = useSelector(state => state.auth)
    return (
        <React.Fragment>
            <NProgress />
            <Container>
                <header className="navlinks">
                    <NavLinks isAuth={isAuth} user={user}/>
                </header>
                {props.children}
            </Container>
        </React.Fragment>
    )
}

export default Layout