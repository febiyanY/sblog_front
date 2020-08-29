import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const NotFound = (props) => {
    return (
        <div>
            <h1 className="display-3">Not Found</h1>
            <p className="lead">Nyasar bos</p>
            <hr className="my-2" />
            <p>Pulang Yuk</p>
            <p className="lead">
                <Link to="/">
                    <Button color="primary">Home</Button>
                </Link>

            </p>
        </div>
    )
}

export default NotFound