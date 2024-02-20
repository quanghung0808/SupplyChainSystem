import { Navigate, Route, Routes } from 'react-router-dom'

import { useAppSelector } from '../redux/configStore'
import PublicRouter from './publicRouter'
import { errorRoutes, publicRoutes } from './config/publicRoutes'
import { MainLayout } from '../layout/MainLayout'
import UserRouter from './userRouter'
import { userRoutes } from './config/userRoutes'
import { SimpleLayout } from 'layout/SimpleLayout'

function AppRouter() {
  const { userAuth } = useAppSelector((state) => state.auth)

  return (
    <Routes>
      <Route element={<PublicRouter />}>
        <Route element={<Navigate to={'login'} />} index={true} />
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Route>

      <Route element={<SimpleLayout />}>
        {userAuth?.is_superuser === false ? <Route element={<Navigate to={'home'} />} /> : <></>}
        <Route path='*' element={<Navigate to={'404'} />} />
        {errorRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Route>


      <Route element={<UserRouter />}>
        <Route element={<MainLayout />}>
          <Route element={<Navigate to='home' />} index={true} />
          {userRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRouter
