import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment'
import Grid from '@material-ui/core/Grid';

const Post = (props) => {

    return (
        // <Paper>
        <Card variant="outlined">
            <CardContent>
                <Grid container>
                    <Grid item xs={9}>
                        <p><b>{props.post.title}</b></p>
                    </Grid>
                    <Grid item xs={3}>
                        <small>{moment(props.post.time).format("MMM-Do-YYYY")}</small>
                    </Grid>
                    <p>{props.post.body.slice(0, 20)}...</p>
                </Grid>
            </CardContent>
        </Card>

        // </Paper>
    )
}

export default Post