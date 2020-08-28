import React from 'react'
import { Row, Col } from 'reactstrap'
import { Switch, NavLink as RRNavLink} from 'react-router-dom'
import { RouteWithSubRoutes } from '../routes/routes'
import { Nav, NavLink } from 'reactstrap'

const Profile = props => {

    return (
        <div>
            <Row style={{ marginTop: '2%' }}>
                <Col sm="12">
                    <Nav className="navlinks">
                        <NavLink tag={RRNavLink} to={`${props.match.url}/${localStorage.getItem('username')}`} exact> Account </NavLink>
                        <NavLink tag={RRNavLink} to={`${props.match.url}/${localStorage.getItem('username')}/posts`} exact> My Post </NavLink>
                    </Nav>
                </Col>
            </Row>
            <Switch>
                {props.routes.map((route, i) => {
                    return <RouteWithSubRoutes key={i} {...route} />
                })}
            </Switch>

        </div>
    )

}


export default Profile