import React from 'react'
import { Button } from 'reactstrap'

const UserRow = ({ user, onEdit, onDelete, index }) => {

    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{user.username}</td>
            <td>{user.display_name}</td>
            <td>
                <Button color="secondary" size="sm" onClick={() => onEdit(user)}>Edit</Button>
                <Button color="danger" size="sm" onClick={() => onDelete(user.id)}>Delete</Button>
            </td>
        </tr>
    )
}

export default UserRow




