import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import productReducer from './product/productSlice'
import workspaceReducer from './workspace/workspaceSlice'
import forecastReducer from './forecast/forecastSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    workspace: workspaceReducer,
    forecast: forecastReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
