import React from 'react'
import { ThumbUp, ThumbDown, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import { Button } from '@material-ui/core'

const Votes = props => {

    let data = props.data
    let upFunc
    let downFunc
    let upIcon
    let downIcon
    let upvoteArray = data.PostUpvotes || data.CommentUpvotes || []
    let downvoteArray = data.PostDownvotes || data.CommentDownvotes || []

    if (upvoteArray.length !== 0) {
        upFunc = props.undoUpvote
        downFunc = props.downvote
        upIcon = <ThumbUp fontSize="small" />
        downIcon = <ThumbDownAltOutlined fontSize="small" />
    } else if (downvoteArray.length !== 0) {
        upFunc = props.upvote
        downFunc = props.undoDownvote
        upIcon = <ThumbUpAltOutlined fontSize="small" />
        downIcon = <ThumbDown fontSize="small" />
    } else {
        upFunc = props.upvote
        downFunc = props.downvote
        upIcon = <ThumbUpAltOutlined fontSize="small" />
        downIcon = <ThumbDownAltOutlined fontSize="small" />
    }

    if(!props.isAuth){
        upFunc = (id) => {
            props.history.push('/login')
        }
        downFunc = (id) => {
            props.history.push('/login')
        }
    }

    return (
        <div style={{ textAlign: 'left' }}>
            <Button size="small" onClick={() => upFunc(data.id)}>
                {upIcon}
            </Button>
            {props.children}
            <Button size="small" onClick={() => downFunc(data.id)}>
                {downIcon}
            </Button>
        </div>
    )
}

export default Votes