import { createSlice } from '@reduxjs/toolkit'

import { Forecast } from 'common/models'

interface ForecastState {
  forecast: Forecast[]
  isLoading: boolean
}

const initialState: ForecastState = {
  forecast: [],
  isLoading: false
}

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setForecast: (state, action) => {
      state.forecast = action.payload
      state.isLoading = false
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})
export const { setForecast, setIsLoading } = forecastSlice.actions

const forecastReducer = forecastSlice.reducer

export default forecastReducer
