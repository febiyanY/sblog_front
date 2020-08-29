import React from 'react'
import { Card } from '@material-ui/core'

const Quoted = props => {

    return (
        <Card variant="outlined" style={{padding : '1%', backgroundColor : "#e0e5ff"}}>
            <p><b>@{props.username}</b></p>
            {props.body}
        </Card>
    )
}

export default Quoted