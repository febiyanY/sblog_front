import React from 'react'
import {
    ListGroupItem, Card, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';

const Post = (props) => {

    return (
        // <ListGroupItem className="justify-content-between" onClick={props.clicked} >
            <Card onClick={props.clicked}>
                <CardBody>
                    <CardTitle><b>{props.post.title}</b></CardTitle>
                    <CardSubtitle>{new Date(props.post.time).toString()}</CardSubtitle>
                    <CardText>{props.post.body}</CardText>
                </CardBody>
            </Card>
        // </ListGroupItem>
    )
}

export default Post