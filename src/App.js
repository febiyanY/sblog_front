import React, { Suspense, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NotFound from './pages/NotFound'
import routes, {RouteWithSubRoutes} from './routes/routes'
import NProgress from './components/NProgress'
import Layout from './layout/Layout'
import { onCheckAuth } from './state/ducks/auth'
import { useDispatch } from 'react-redux'
// import { GenerateRoute } from './components/GenerateRoute'

const App = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onCheckAuth())
  }, [dispatch])

  return (
    <React.Fragment>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<NProgress />}>
            <Switch>
              {/* <GenerateRoute routes={routes} /> */}
              {routes.map((route, i) => {
                return <RouteWithSubRoutes key={i} {...route} />
              })}
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Layout>

      </BrowserRouter>

    </React.Fragment>
  )

}

export default App;
