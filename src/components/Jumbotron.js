import React from 'react'
import { Jumbotron } from 'reactstrap'
import { useSelector } from 'react-redux'

const Jumbotronn = (props) => {
    const { user } = useSelector(state => state.auth)
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Welcome {user ? user.display_name : 'Hello, world!'}</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
            </Jumbotron>
        </div>
    )
}

export default Jumbotronn