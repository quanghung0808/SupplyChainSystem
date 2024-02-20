import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Product } from 'common/models'
import { getProductsThunk } from './productThunk'

interface ProductState {
  isLoading: boolean
  isSuccess: boolean
  products: Product[]
}

const initialState: ProductState = {
  isLoading: false,
  isSuccess: false,
  products: []
}
export const getProducts = createAsyncThunk('products/get-products', getProductsThunk)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false
        state.isSuccess = false
      })
  }
})

const productReducer = productSlice.reducer

export default productReducer
