import React, { useState, useEffect, useCallback } from 'react'
import axios from '../axioses/axios-default'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Col, Button
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { GenerateRouteWithSwitch } from '../components/GenerateRoute'
import { useDispatch } from 'react-redux'
import { uiOperations } from '../state/ducks/ui'
import Modal from '../components/Modal'

const PostDetail = props => {
    const [post, setPost] = useState({ id: '' })
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(uiOperations.showLoader())
        axios.get('/posts/' + props.match.params.id).then(res => {
            setPost(res.data)
            dispatch(uiOperations.hideLoader())
        })
    }, [props.match.params.id, dispatch])

    const closeModal = useCallback(() => setModal(false), [])
    const openModal = useCallback(() => setModal(true), [])
    const handleConfirmDeletePost = useCallback(() => {
        dispatch(uiOperations.showLoader())
        axios.delete('/posts/' + post.id, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(res => {
            props.history.replace(`/profile/${localStorage.getItem('username')}/posts`)
        }).catch(err => {
            console.log(err)
            dispatch(uiOperations.hideLoader())
        })
    }, [dispatch, props.history, post.id])
    const editPost = () => {
        props.history.push({
            pathname : props.match.url+'/edit',
            state : {postId : post.id, key : post.key}
        })
    }

    return (
        <div>
            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            {post.id !== '' && <div>
                                <Row>
                                    <Col sm="10" xs="6">
                                        <CardSubtitle>By : @{post.user.username}</CardSubtitle>
                                    </Col>
                                    <Col sm="2" xs="6">
                                        {(localStorage.getItem('username') === post.user.username) || localStorage.getItem('type') === 'admin' ?
                                            <div>
                                                <Button outline color="primary" onClick={editPost}>Edit</Button>
                                                <Button outline color="danger" onClick={openModal}>Delete</Button>
                                            </div>
                                            : null}

                                    </Col>
                                </Row>
                                <CardTitle><h3>{post.title}</h3></CardTitle>
                                <CardText>{post.body}</CardText>
                            </div>}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                    <Link to={`${props.match.url}/comments?postId=${post ? post.id : ''}`}><Button outline size="sm" color="secondary">Show Comments</Button> </Link>
                    <GenerateRouteWithSwitch routes={props.routes} />
                </Col>
            </Row>

            <Modal show={modal} title="Confirmation" toggle={closeModal} confirm={handleConfirmDeletePost} confirmText="Ok" cancelText="Cancel" >
                <p>Are you sure you want to delete {post.title} ?</p>
            </Modal>

        </div>
    )

}

export default PostDetail