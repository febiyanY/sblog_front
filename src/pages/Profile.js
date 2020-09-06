import React,{useEffect, useState} from 'react'
import { Grid, Button } from '@material-ui/core'
import { Switch} from 'react-router-dom'
import { RouteWithSubRoutes } from '../routes/routes'
import {useSelector} from 'react-redux'

const Profile = props => {
    const [button, setButton] = useState({account : 'contained', post : undefined})
    const {user} = useSelector(state => state.auth)

    const goTo = (link, id) => {
        let btn = {...button}
        for(let key in btn){
            if(key===id){
                btn[key]='contained'
            }else{
                btn[key]=undefined
            }
        }
        setButton(btn)
        props.history.push(link)
    }

    useEffect(() => {
        let pathname = window.location.pathname
        let to
        if(pathname===`${props.match.url}/${user.username}`){
            to = 'account'
        }else if(pathname===`${props.match.url}/${user.username}/posts`){
            to = 'post'
        }
        let btn = {...button}
        for(let key in btn){
            if(key===to){
                btn[key]='contained'
            }else{
                btn[key]=undefined
            }
        }
        setButton(btn)
    },[])

    return (
        <div>
            <Grid container style={{ marginTop: '2%' }}>
                <Grid item xs={12}>
                    {/* <NavLink  to={`${props.match.url}/${localStorage.getItem('username')}`} exact> Account </NavLink>
                    <NavLink  to={`${props.match.url}/${localStorage.getItem('username')}/posts`} exact> My Post </NavLink> */}
                    <Button color="primary" variant={button.account} onClick={() => goTo(`${props.match.url}/${user.username}`, 'account')} disableElevation> Account </Button>
                    <Button color="primary" variant={button.post} onClick={() => goTo(`${props.match.url}/${user.username}/posts`, 'post')} disableElevation> My Post </Button>
                </Grid>
            </Grid>
            <Switch>
                {props.routes.map((route, i) => {
                    return <RouteWithSubRoutes key={i} {...route} />
                })}
            </Switch>

        </div>
    )

}


export default Profile