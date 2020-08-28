import React from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

const Quoted = props => {

    return (
        <Card>
            <CardBody>
                <CardTitle><b>@{props.username}</b></CardTitle>
                <CardText>{props.body}</CardText>
            </CardBody>
        </Card>
    )
}

export default Quoted