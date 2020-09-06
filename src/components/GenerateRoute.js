import React, {Suspense} from 'react'
// import {useSelector} from 'react-redux'
import { RouteWithSubRoutes } from '../routes/routes'
import {Switch} from 'react-router-dom'
import NProgress from './NProgress'

export const GenerateRouteWithSwitch = props => {
    return (
        <Switch>
            <Suspense fallback={<NProgress />}>
            {props.routes.map((route, i) => {
                return (
                    <RouteWithSubRoutes key={1} {...route} />
                )
            })}
            </Suspense>
        </Switch>
    )
}