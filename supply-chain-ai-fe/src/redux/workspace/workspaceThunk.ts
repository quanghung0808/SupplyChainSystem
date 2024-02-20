import { ROUTES_WORKSPACE } from 'constants/routesAPIKeys'
import { axiosClient } from '../../axios/axiosClient'

export const getWorkspacesThunk = async (params: any, thunkAPI: any) => {
  try {
    console.log(params)
    const response = await axiosClient.get(ROUTES_WORKSPACE + `/${params.product_id}`)
    if (response.status === 200) return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
}
