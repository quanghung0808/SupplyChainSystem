import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../redux/configStore'
import { getLocalStorage } from 'utils/utils'
import { StorageKeys } from 'constants/storageKeys'

function UserRouter() {
  const location = useLocation()

  const accessToken = getLocalStorage(StorageKeys.ACCESS_TOKEN)

  const { isAuthenticated, userAuth } = useAppSelector((state) => state.auth)
  console.log(isAuthenticated)
  return isAuthenticated && accessToken && userAuth.is_superuser === false ? (
    <Outlet />
  ) : (
    <Navigate to={'/403'} state={{ from: location }} />
  )
}

export default UserRouter
