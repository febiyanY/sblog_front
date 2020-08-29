import React, { useEffect, useState, useCallback } from 'react'
// import {makeStyles} from '@material-ui/core/styles'
import {Button, Card, Grid, TextField, Divider} from '@material-ui/core'
import {Reply, Edit, Delete, AddComment} from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { commentsOperations } from '../../state/ducks/comments'
import queryParser from '../../utils/queryparser'
import Modal from '../../components/Modal'
import axios from '../../axioses/axios-default'
import QuotedComment from './comment/QuotedComment'
import moment from 'moment'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1),
//             width: '96%',
//         },
//     },
// }));


const Comments = props => {
    // const classes = useStyles()

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
            
            {isAuth ? <div style={{textAlign : 'right'}}> <Button onClick={addComment} size="small" variant="outlined" color="primary"><AddComment/></Button></div> : null}
            
            {/* <ListGroup> */}
                {comments.map(comment => {
                    return (
                        // <ListGroupItem key={comment.id} className="justify-content-between" >
                            <Card key={comment.id} style={{marginTop : '3%', padding : '2%'}} variant="outlined">
                                <div>
                                    <Grid container>
                                        <Grid item xs={6}>
                                        <p><b>@{comment.user.username}</b></p>
                                        </Grid>
                                        <Grid item xs={6} style={{textAlign : 'right'}}>
                                        <small style={{color : 'blue'}}>
                                            {moment(comment.time).format("MM/Do/YYYY, h:mm A")}
                                        </small>
                                        </Grid>
                                    </Grid>
                                    
                                    {/* <CardSubtitle>{new Date(props.post.time).toString()}</CardSubtitle> */}
                                    {comment.reply ? <QuotedComment username={comment.reply.user.username} body={comment.reply.body} /> : null}
                                    {comment.body}
                                </div>
                                <Divider />
                                <Grid container direction="row" justify="flex-end" alignItems="center">
                                    <Grid item xs={12} style={{textAlign : 'right'}}>
                                        {isAuth ? <Button onClick={() => replyComment(comment.user.username, comment.id)} size="small"><Reply/></Button> : null}
                                        {(localStorage.getItem('username') === comment.user.username) || localStorage.getItem('type') === 'admin' ?
                                            <React.Fragment>
                                                <Button onClick={() => editComment(comment.body, comment.id)} size="small"><Edit/></Button>
                                                <Button onClick={() => deleteComment(comment.id)} size="small"><Delete/></Button>
                                            </React.Fragment>
                                            : null
                                        }

                                    </Grid>
                                </Grid>
                            </Card>
                        // </ListGroupItem>
                    )
                })}
            {/* </ListGroup> */}

            <Modal show={modal.show} toggle={closeModal} confirm={handleEditComment} confirmText={modal.confirmText} cancelText={modal.cancelText} title={modal.title}>
                {mode !== 'delete' ? <form onSubmit={onFormSubmit} autoComplete="off">
                <TextField multiline variant="outlined" type="text" name="body" value={text} onChange={handleInputChange}  />
                </form> : 'Delete this comment ?'}
            </Modal>

        </React.Fragment>
    )
}

export default Comments