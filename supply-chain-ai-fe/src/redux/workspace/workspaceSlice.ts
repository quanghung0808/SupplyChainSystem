import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Workspace } from 'common/models'
import { getWorkspacesThunk } from './workspaceThunk'

interface WorkspaceState {
  isLoading: boolean
  isSuccess: boolean
  workspaces: Workspace[]
}

const initialState: WorkspaceState = {
  isLoading: false,
  isSuccess: false,
  workspaces: []
}
export const getWorkspaces = createAsyncThunk('workspaces/get-workspaces', getWorkspacesThunk)

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspaces: (state, action) => {
      state.workspaces = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getWorkspaces.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWorkspaces.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.workspaces = action.payload
      })
      .addCase(getWorkspaces.rejected, (state) => {
        state.isLoading = false
        state.isSuccess = false
      })
  }
})

export const { setWorkspaces } = workspaceSlice.actions
const workspaceReducer = workspaceSlice.reducer

export default workspaceReducer
