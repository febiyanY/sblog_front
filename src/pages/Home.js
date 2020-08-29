import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
    padding : '2%'
  },
})

export default function Types() {
  const classes = useStyles()

  const { user } = useSelector(state => state.auth)

  let greeting = ''
  if (!user) {
    greeting = (
      <React.Fragment>
        <Typography variant="h1" component="h2" gutterBottom>
          h1. Hello
      </Typography>
        <Typography variant="h2" gutterBottom>
          h2. Whoever
      </Typography>
        <Typography variant="h3" gutterBottom>
          h3. You
      </Typography>
        <Typography variant="h4" gutterBottom>
          h4. Are
      </Typography>
        <Typography variant="h5" gutterBottom>
          h5. This
      </Typography>
        <Typography variant="h6" gutterBottom>
          h6. Will
      </Typography>
        <Typography variant="subtitle1" gutterBottom>
          subtitle1. change when you logged in
      </Typography>
      </React.Fragment>
    )
  } else {
    greeting = (
      <React.Fragment>
        <Typography variant="h1" component="h2" gutterBottom>
          h1. Hello
      </Typography>
        <Typography variant="h2" gutterBottom>
          h2. Your
      </Typography>
        <Typography variant="h3" gutterBottom>
          h3. Username
      </Typography>
        <Typography variant="h4" gutterBottom>
          h4. is
      </Typography>
        <Typography variant="h5" gutterBottom>
          h5. {user.username}
      </Typography>
        <Typography variant="h6" gutterBottom>
          h6. and
      </Typography>
        <Typography variant="subtitle1" gutterBottom>
          subtitle1. your display name is {user.display_name}
      </Typography>
      </React.Fragment>
    )
  }

  return (
    <div className={classes.root}>
      {greeting}
      <Typography variant="subtitle2" gutterBottom>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
      </Typography>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        button text
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        caption text
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        overline text
      </Typography>
    </div>
  )
}