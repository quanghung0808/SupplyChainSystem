import { ROUTES_AUTH, ROUTES_REGISTER } from 'constants/routesAPIKeys'
import { LoginForm } from 'common/@type'
import { removeAuthenticated, setAuthenticated, setLocalStorage, setUserAuth } from 'utils/utils'
import { StorageKeys } from 'constants/storageKeys'
import { axiosClient, setHeaderAuth } from '../../axios/axiosClient'

export const loginThunk = async (params: LoginForm, thunkAPI: any) => {
  try {
    console.log(params)
    const response = await axiosClient.post(ROUTES_AUTH, params)
    const data = response.data
    if (data.user) {
      setLocalStorage(StorageKeys.ACCESS_TOKEN, data.access_token)
      setUserAuth(data.user)
      setAuthenticated()
      setHeaderAuth(data.access_token)
      return data.user
    } else {
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const registerThunk = async (params: LoginForm, thunkAPI: any) => {
  try {
    console.log(params)
    const res = await axiosClient.post(ROUTES_REGISTER, params)
    const response = await axiosClient.post(ROUTES_AUTH, params)
    const data = response.data
    if (data.user) {
      setLocalStorage(StorageKeys.ACCESS_TOKEN, data.access_token)
      setUserAuth(data.user)
      setAuthenticated()
      setHeaderAuth(data.access_token)
      return data.user
    } else {
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
}
export const logoutThunk = async (thunkAPI: any) => {
  try {
    removeAuthenticated()
    localStorage.clear()
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
}
