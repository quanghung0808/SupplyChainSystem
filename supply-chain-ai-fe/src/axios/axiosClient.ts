import axios, { AxiosResponse } from 'axios'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.delete['Access-Control-Allow-Origin'] = '*'

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json'
  }
})

const axiosClientUrlencoded = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const axiosFormData = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

const setHeaderAuth = (accessToken: string | null) => {
  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}

axiosClientUrlencoded.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClientUrlencoded.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export { axiosClient, axiosFormData, axiosClientUrlencoded, setHeaderAuth }
