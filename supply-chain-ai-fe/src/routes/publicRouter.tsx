import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../redux/configStore'
import { getLocalStorage } from 'utils/utils'
import { StorageKeys } from 'constants/storageKeys'

export default function PublicRouter() {
  const accessToken = getLocalStorage(StorageKeys.ACCESS_TOKEN)

  const { isAuthenticated, userAuth } = useAppSelector((state) => state.auth)

  const navigateRouter = userAuth ? '/home' : '/login'

  return isAuthenticated && accessToken ? <Navigate to={navigateRouter} /> : <Outlet />
}
