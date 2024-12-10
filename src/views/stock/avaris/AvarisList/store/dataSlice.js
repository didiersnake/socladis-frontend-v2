import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { apiDeletePurchase, apiGetAvaris, apiGetAvarisByRange } from 'services/AvarisService'

export const getAvaris = createAsyncThunk(
    'salesProductList/data/getOrders',
    async (data) => {
        const response = await apiGetAvaris(data)
        return response.data
    }
)

export const getAvarisByRange = createAsyncThunk(
    'salesProductList/data/getOrdersByRange',
    async (data) => {
        const response = await apiGetAvarisByRange(data)
        return response.data
    }
)

export const deleteAvaris = async (data) => {
    const response = await apiDeletePurchase(data)
    return response.data
}

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
    startDate: dayjs().subtract(3, 'month').toDate(),
    endDate: new Date()
}

const dataSlice = createSlice({
    name: 'salesOrderList/data',
    initialState: {
        loading: false,
        orderList: [],
        orderByRange: [],
        tableData: initialTableData,
    },
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getAvaris.fulfilled]: (state, action) => {
            state.orderList = action.payload.data
            state.tableData.total = action.payload.totalItems
            state.loading = false
        },
        [getAvaris.pending]: (state) => {
            state.loading = true
        },
        [getAvarisByRange.fulfilled]: (state, action) => {
            state.orderByRange = action.payload
            state.loading = false
        },
        [getAvarisByRange.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData } = dataSlice.actions

export default dataSlice.reducer
