import React, { useEffect, useState, useCallback } from 'react'
import {
    ListGroup, ListGroupItem, Button, Card, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Col, Form, InputGroup, Label, Input
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { commentsOperations } from '../../state/ducks/comments'
import queryParser from '../../utils/queryparser'
import Modal from '../../components/Modal'
import axios from '../../axioses/axios-default'
import QuotedComment from './comment/QuotedComment'
import moment from 'moment'

const Comments = props => {

    const { comments } = useSelector(state => state.comments)
    const { isAuth } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [modal, setModal] = useState({ show: false, title: 'Add Comment', confirmText: 'Add', cancelText: 'Cancel' })
    const [commentId, setCommentId] = useState('')
    const [mode, setMode] = useState('')

    let queryObj = queryParser(props.location.search)

    useEffect(() => {
        dispatch(commentsOperations.onLoadComments(queryObj.postId))
        return () => dispatch(commentsOperations.clearComments())
    }, [props.match.params.id, dispatch, queryObj.postId])

    const editComment = (text, id) => {
        setMode('edit')
        setText(text)
        setCommentId(id)
        setModal(() => ({ ...modal, show: true, title: 'Edit Comment', confirmText: 'Save', cancelText: 'Cancel' }))
    }

    const addComment = () => {
        setMode('add')
        setText('')
        setModal(() => ({ ...modal, show: true, title: 'Add Comment', confirmText: 'Add', cancelText: 'Cancel' }))
    }
    const replyComment = (username, id) => {
        setMode('reply')
        setText('')
        setCommentId(id)
        setModal(() => ({ ...modal, show: true, title: `Reply to @${username}`, confirmText: 'Reply', cancelText: 'Cancel' }))
    }

    const deleteComment = (id) => {
        setMode('delete')
        setCommentId(id)
        setModal(() => ({ ...modal, show: true, title: 'Confirmation', confirmText: 'Delete', cancelText: 'Cancel' }))
    }

    const handleInputChange = (e) => setText(e.target.value)

    const closeModal = useCallback(() => setModal(() => ({ ...modal, show: false })), [modal])
    const handleEditComment = () => {
        let data
        let method
        let suffix = ''
        if (mode === 'edit') {
            method = 'PATCH'
            data = {
                commentId: commentId,
                update: { body: text }
            }
        } else if (mode === 'add') {
            method = 'POST'
            data = {
                body: text,
                postId: queryObj.postId
            }
        } else if (mode === 'reply') {
            method = 'POST'
            data = {
                body: text,
                postId: queryObj.postId,
                quoted: commentId
            }
        } else if (mode === 'delete') {
            method = 'DELETE'
            data = {}
            suffix = "/" + commentId
        }

        axios({
            method,
            url: '/comments' + suffix,
            data,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => {
            setModal(() => ({ ...modal, show: false }))
            dispatch(commentsOperations.onLoadComments(queryObj.postId))
        }).catch(err => {
            console.log(err)
            setModal(() => ({ ...modal, show: false }))
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <React.Fragment>
            {/* <br/> */}
            {isAuth ? <Button onClick={addComment} size="sm">Add Comment</Button> : null}
            {/* <ListGroup> */}
                {comments.map(comment => {
                    return (
                        // <ListGroupItem key={comment.id} className="justify-content-between" >
                            <Card key={comment.id} style={{marginTop : '1%'}}>
                                <CardBody>
                                    <Row>
                                        <Col xs="6">
                                        <CardTitle><b>@{comment.user.username}</b></CardTitle>
                                        </Col>
                                        <Col xs="6">
                                        <small style={{color : 'blue'}}>
                                            {moment(comment.time).format("MM/Do/YYYY, h:mm a")}
                                        </small>
                                        </Col>
                                    </Row>
                                    
                                    {/* <CardSubtitle>{new Date(props.post.time).toString()}</CardSubtitle> */}
                                    {comment.reply ? <QuotedComment username={comment.reply.user.username} body={comment.reply.body} /> : null}
                                    <CardText>{comment.body}</CardText>
                                </CardBody>
                                <Row>
                                    <Col xs={{ size: 12 }} >
                                        {isAuth ? <Button color="link" onClick={() => replyComment(comment.user.username, comment.id)}>reply</Button> : null}
                                        {(localStorage.getItem('username') === comment.user.username) || localStorage.getItem('type') === 'admin' ?
                                            <React.Fragment>
                                                <Button color="link" onClick={() => editComment(comment.body, comment.id)}>edit</Button>
                                                <Button color="link" onClick={() => deleteComment(comment.id)}>delete</Button>
                                            </React.Fragment>
                                            : null
                                        }

                                    </Col>
                                </Row>
                            </Card>
                        // </ListGroupItem>
                    )
                })}
            {/* </ListGroup> */}

            <Modal show={modal.show} toggle={closeModal} confirm={handleEditComment} confirmText={modal.confirmText} cancelText={modal.cancelText} title={modal.title}>
                {mode !== 'delete' ? <Form onSubmit={onFormSubmit}>
                    <InputGroup>
                        <Input type="text" name="body" value={text} onChange={handleInputChange}  />
                    </InputGroup>
                </Form> : 'Delete this comment ?'}

            </Modal>

        </React.Fragment>
    )
}

export default Comments