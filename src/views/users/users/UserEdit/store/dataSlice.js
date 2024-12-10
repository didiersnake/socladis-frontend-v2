import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiDeleteUser, apiGetUser, apiUpdateUser } from 'services/UserService'

export const getProduct = createAsyncThunk(
    'salesProductEdit/data/getProducts',
    async (data) => {
        const response = await apiGetUser(data)
        return response.data
    }
)

export const updateProduct = async (data) => {
    const response = await apiUpdateUser(data)
    return response.data
}

export const deleteProduct = async (data) => {
    const response = await apiDeleteUser(data)
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
