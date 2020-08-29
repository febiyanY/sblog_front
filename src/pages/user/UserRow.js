import React from 'react'
import { Button, TableRow, TableCell } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

const UserRow = ({ user, onEdit, onDelete, index }) => {

    return (
        <TableRow>
            <TableCell>{++index}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.display_name}</TableCell>
            <TableCell>
                <Button size="small" onClick={() => onEdit(user)}><Edit/></Button>
                <Button color="secondary" size="small" onClick={() => onDelete(user.id)}><Delete/></Button>
            </TableCell>
        </TableRow>
    )
}

export default UserRow




