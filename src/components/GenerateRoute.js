import React, {Suspense} from 'react'
import {useSelector} from 'react-redux'
import { RouteWithSubRoutes } from '../routes/routes'
import {Switch} from 'react-router-dom'
import NProgress from './NProgress'

export const GenerateRoute = props => {
    const {isAuth} = useSelector(state => state.auth)

    let routeList
    if (isAuth) {
        routeList = props.routes.map((route, i) => {
            return <RouteWithSubRoutes key={i} {...route} />
        })
    } else {
        routeList = props.routes.filter(route => route.auth !== true).map((route, i) => {
            return <RouteWithSubRoutes key={i} {...route} />
        })
    }

    return routeList
}

export const GenerateRouteWithSwitch = props => {
    const {isAuth} = useSelector(state => state.auth)
    
    let routeList = []
    if(isAuth){
        routeList = props.routes
    }else{
        routeList = props.routes.filter(route => route.auth !== true)
    }

    return (
        <Switch>
            <Suspense fallback={<NProgress />}>
            {routeList.map((route, i) => {
                return (
                    <RouteWithSubRoutes key={1} {...route} />
                )
            })}
            </Suspense>
        </Switch>
    )
}