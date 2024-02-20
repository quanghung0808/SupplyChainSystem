import { UserAuth } from 'common/models'
import { StorageKeys } from 'constants/storageKeys'

// localstorage
export const setLocalStorage = (name: string, value: any) => {
  localStorage.setItem(name, value)
}
export const getLocalStorage = (name: string) => localStorage.getItem(name)
export const removeLocalStorage = (key: any) => localStorage.removeItem(key)

export const setUserAuth = (userAuth: UserAuth) => setLocalStorage(StorageKeys.USER_AUTH, JSON.stringify(userAuth))
export const getUserAuth = () => {
  const userAuth = getLocalStorage(StorageKeys.USER_AUTH)
  if (userAuth === null || userAuth === undefined || userAuth.toString() === 'undefined') {
    return
  } else {
    const userRaw = JSON.parse(userAuth)
    return userRaw
  }
}
export const removeUserAuth = () => removeLocalStorage(StorageKeys.USER_AUTH)
export const setAuthenticated = () => setLocalStorage(StorageKeys.AUTHENTICATE, true)
export const getAuthenticated = () => {
  const isAuthenticated = getLocalStorage(StorageKeys.AUTHENTICATE)
  if (isAuthenticated === null || isAuthenticated === undefined) {
    return false
  }
  return Boolean(isAuthenticated)
}
export const removeAuthenticated = () => removeLocalStorage(StorageKeys.AUTHENTICATE)

export const getPathname = (name: string) => {
  const pathname = getLocalStorage(name)
  if (pathname === null || pathname === undefined) {
    return ''
  }
  return pathname
}
