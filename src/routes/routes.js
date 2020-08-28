import React from 'react'
import { Route } from 'react-router-dom'
import Jumbo from '../components/Jumbotron'

export const RouteWithSubRoutes = route => {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    )
}

const routes = [
    { path: '/', component: Jumbo, exact: true },
    { path: '/login', component: React.lazy(() => import('../pages/Login')) },
    { path: '/signup', component: React.lazy(() => import('../pages/SignUp')) },
    { path: '/logout', component: React.lazy(() => import('../pages/Logout')), auth: true },
    { path: '/posts', component: React.lazy(() => import('../pages/Posts')), exact: true },
    { path: '/post/new', component: React.lazy(() => import('../pages/NewPost')), auth: true },
    { path: '/posts/:key/edit', component: React.lazy(() => import('../pages/EditPost')), auth: true },
    {
        path: '/posts/:id', component: React.lazy(() => import('../pages/PostDetail')), routes: [
            { path: '/posts/:id/comments', component: React.lazy(() => import('../pages/postDetail/Comments')) }
        ]
    },
    {
        path: '/profile', component: React.lazy(() => import('../pages/Profile')), auth: true, routes: [
            { path: '/profile/:id', component: React.lazy(() => import('../pages/profile/Account')), exact:true, auth: true },
            { path: '/profile/:id/edit', component: React.lazy(() => import('../pages/profile/EditAccount')), auth: true },
            { path: '/profile/:id/posts', component: React.lazy(() => import('../pages/profile/MyPosts')), auth: true }
        ]
    },
    { path: '/users', component: React.lazy(() => import('../pages/Users')), auth: true, admin: true }

]



export default routes