import { CreateWorkspaceForm, ReportForm } from 'common/@type'
import { axiosClient } from '../axios/axiosClient'
import { ROUTES_REPORT, ROUTES_WORKSPACE } from 'constants/routesAPIKeys'

export const getWorkspacesByProductId = async (id: any) => {
  try {
    console.log(id)
    const response = await axiosClient.get(ROUTES_WORKSPACE + `/${id}`)
    if (response.status === 200) return response.data
  } catch (error: any) {
    console.log(error)
  }
}
export const deleteWorkspaces = async (id: any) => {
  try {
    const response = await axiosClient.delete(ROUTES_WORKSPACE + `/${id}`)
    if (response.status === 200) return response.data
  } catch (error: any) {
    console.log(error)
  }
}

export const forecast = async (data: ReportForm) => {
  try {
    const response = await axiosClient.post(ROUTES_REPORT, data)
    if (response.status === 200) return response.data
  } catch (error: any) {
    console.log(error)
  }
}

export const getForecastReport = async (id: any) => {
  try {
    const response = await axiosClient.get(ROUTES_REPORT + `/${id}`)
    if (response.status === 200) return response.data
  } catch (error: any) {
    console.log(error)
  }
}

export const postWorkspace = async (data: CreateWorkspaceForm) => {
  try {
    const response = await axiosClient.post(ROUTES_WORKSPACE, data)
    if (response.status === 200) return response.data
  } catch (error: any) {
    console.log(error)
  }
}
