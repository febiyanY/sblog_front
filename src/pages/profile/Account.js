import React, {useEffect} from 'react'
import { Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {onLoadUserData} from '../../state/ducks/auth'

const UserProfile = props => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(onLoadUserData())
    },[dispatch])


    return (
        <Row style={{ marginTop: '2%' }}>
            <Link to={`${props.match.url}/edit`}>
                <Button color="secondary">Edit</Button>
            </Link>
            <Col sm="12">
                <div style={{ textAlign: 'center' }}>
                    <img style={{ width: '40%', borderRadius: '50%' }} src={`http://localhost:3001/images/avatars/${user.ava}`} alt="fwef" />
                </div>
            </Col>
            <Col sm="12">
                <div style={{ textAlign: 'center' }}>
                    <h4>@{user.username}</h4>
                    <h3>{user.display_name}</h3>
                </div>
            </Col>
        </Row>
    )
}

export default UserProfile