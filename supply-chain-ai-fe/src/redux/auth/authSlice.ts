import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { loginThunk, logoutThunk, registerThunk } from './authThunk'
import { getAuthenticated, getUserAuth } from 'utils/utils'
import { UserAuth } from 'common/models'
import { ResponseMessage } from 'constants/responseMessage'

interface AuthState {
  isLogout: boolean
  isLoading: boolean
  isSuccess: boolean
  isAuthenticated: boolean
  message: string
  userAuth: UserAuth | null
}

const getUserInStorage = getUserAuth() ? getUserAuth() : null
const getIsAuthenticated = getAuthenticated() ? getAuthenticated() : false

const initialState: AuthState = {
  isLogout: false,
  isLoading: false,
  isSuccess: false,
  isAuthenticated: getIsAuthenticated,
  message: ResponseMessage.AuthenticateFailed,
  userAuth: getUserInStorage
}

export const login = createAsyncThunk('auth/login', loginThunk)
export const register = createAsyncThunk('auth/login', registerThunk)
export const logout = createAsyncThunk('auth/logout', logoutThunk)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    setUserAuth: (state) => {
      state.userAuth = getUserAuth() ? getUserAuth() : null
    },
    setIsLogout: (state, action) => {
      state.isLogout = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isAuthenticated = true
        state.message = ResponseMessage.LoginSuccessfully
        state.userAuth = action.payload
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.message = ResponseMessage.AuthenticateFailed
        state.isAuthenticated = false
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false
        state.isSuccess = false
      })
  }
})

export const { setUserAuth, setIsAuthenticated, setIsLogout } = authSlice.actions
const authReducer = authSlice.reducer

export default authReducer
