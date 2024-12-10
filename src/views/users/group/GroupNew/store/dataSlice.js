import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetAllEmployeeUsers,
} from 'services/UserService'


//unpaginated users
export const getAllEmployeeUsers = createAsyncThunk(
    'salesProductList/data/getAllEmployeeUsers',
    async () => {
        const response = await apiGetAllEmployeeUsers()
        console.log(response.data);
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'salesProductList/data',
    initialState: {
        loading: true,
        employees: [],
    },
    reducers: {},
    extraReducers: {
        [getAllEmployeeUsers.fulfilled]: (state, action) => {
            state.employees = action.payload
            state.loading = false
        },
        [getAllEmployeeUsers.pending]: (state, action) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
