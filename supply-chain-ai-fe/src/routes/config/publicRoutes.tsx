import { Route } from 'common/@type'
import Authenticate from '../../pages/authenticate'
import { Page403, Page404, Page500 } from 'pages/error'
import RegisterPage from 'pages/register'

export const publicRoutes: Route[] = [
  {
    path: '/login',
    component: <Authenticate />,
    index: true
  },
  {
    path: '/register',
    component: <RegisterPage />,
    index: true
  }
]

export const errorRoutes: Route[] = [
  {
    path: '/403',
    component: <Page403 />,
    index: true
  },
  {
    path: '/404',
    component: <Page404 />,
    index: false
  },
  {
    path: '/405',
    component: <Page500 />,
    index: false
  }
]
