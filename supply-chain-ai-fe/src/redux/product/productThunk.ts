import { ROUTES_PRODUCTS } from 'constants/routesAPIKeys'
import { axiosClient } from '../../axios/axiosClient'
import { removeAuthenticated } from 'utils/utils'
import { setIsAuthenticated } from '../../redux/auth/authSlice'
export const getProductsThunk = async (thunkAPI: any) => {
  try {
    const response = await axiosClient.get(ROUTES_PRODUCTS)
    if (response.status === 200) return response.data
  } catch (error: any) {
    console.log(error)

    setIsAuthenticated(false)
    removeAuthenticated()
    return thunkAPI.rejectWithValue(error)
  }
}
