import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetProduct,
    apiUpdateProduct,
    apiDeleteEmpty,
} from 'services/EmptyStore'

export const getProduct = createAsyncThunk(
    'salesProductEdit/data/getProducts',
    async (data) => {
        const response = await apiGetProduct(data)
        return response.data
    }
)

export const updateProduct = async (data) => {
    const response = await apiUpdateProduct(data)
    return response.data
}

export const deleteProduct = async (data) => {
    const response = await apiDeleteEmpty(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'salesProductEdit/data',
    initialState: {
        loading: false,
        productData: [],
    },
    reducers: {},
    extraReducers: {
        [getProduct.fulfilled]: (state, action) => {
            state.productData = action.payload
            state.loading = false
        },
        [getProduct.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
