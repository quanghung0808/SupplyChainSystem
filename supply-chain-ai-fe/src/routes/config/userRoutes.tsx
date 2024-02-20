import { Route } from 'common/@type'
import Home from '../../pages/home'
import WorkspacePage from '../../pages/workspace'

export const userRoutes: Route[] = [
  {
    path: '/home',
    component: <Home />,
    index: true
  },
  {
    path: '/workspace',
    component: <WorkspacePage />,
    index: true
  }
]
