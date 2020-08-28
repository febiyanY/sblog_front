import React from 'react'
import { Jumbotron, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

const NotFound = (props) => {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Not Found</h1>
                <p className="lead">Nyasar bos</p>
                <hr className="my-2" />
                <p>Pulang Yuk</p>
                <p className="lead">
                    <Link to="/">
                        <Button color="primary">Home</Button>
                    </Link>

                </p>
            </Jumbotron>
        </div>
    )
}

export default NotFound