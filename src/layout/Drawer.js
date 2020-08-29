import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import {Avatar} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import MyNavLink from '../components/NavLinks'

const useStyles = makeStyles(theme => ({
    avatar : {
        width : theme.spacing(7),
        height : theme.spacing(7),
        margin : '1% auto'
    }
}))

const CustomDrawer = props => {
    const classes = useStyles()
    // const lists = (
    //     <div>
    //         <List>
    //             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //                 <ListItem button key={text}>
    //                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //                     <ListItemText primary={text} />
    //                 </ListItem>
    //             ))}
    //         </List>
    //         <Divider />
    //         <List>
    //             {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //                 <ListItem button key={text}>
    //                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //                     <ListItemText primary={text} />
    //                 </ListItem>
    //             ))}
    //         </List>
    //     </div>

    // )

    return (
        <Drawer anchor="left" open={props.openDrawer} onClose={props.closeDrawer}>

            {props.user ? <div style={{padding : '2%', marginTop : '5%'}}>
                <Avatar className={classes.avatar} src={`${process.env.REACT_APP_API_URL}/images/avatars/${props.user.ava}`}/>
            </div> : null}
            
            <MyNavLink closeDrawer={props.closeDrawer}/>
        </Drawer>
    )

}

export default CustomDrawer