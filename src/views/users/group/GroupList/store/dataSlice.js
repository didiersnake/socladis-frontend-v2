import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteGroup,
    apiGetAllGroups,
} from 'services/UserService'


//unpaginated users
export const getAllGroups = createAsyncThunk(
    'salesProductList/data/getAllEmployeeUsers',
    async () => {
        const response = await apiGetAllGroups()
        // console.log(response.data);
        return response.data
    }
)

export const deleteGroup = async (data) => {
    const response = await apiDeleteGroup(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'salesProductList/data',
    initialState: {
        loading: false,
        groups: [],
    },
    reducers: {},
    extraReducers: {
        [getAllGroups.fulfilled]: (state, action) => {
            state.groups = action.payload
            state.loading = false
        },
        [getAllGroups.pending]: (state, action) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
