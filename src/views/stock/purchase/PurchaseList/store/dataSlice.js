import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { apiDeletePurchase, apiGetPurchaseOrders, apiGetPurchaseOrdersByRange } from 'services/PurchaseServie'

export const getOrders = createAsyncThunk(
    'salesProductList/data/getOrders',
    async (data) => {
        const response = await apiGetPurchaseOrders(data)
        return response.data
    }
)

export const getPurchaseByRange = createAsyncThunk(
    'salesProductList/data/getOrdersByRange',
    async (data) => {
        const response = await apiGetPurchaseOrdersByRange(data)
        return response.data
    }
)

export const deleteOrders = async (data) => {
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
        purchaseByRange: [],
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
        [getOrders.fulfilled]: (state, action) => {
            state.orderList = action.payload.data
            state.tableData.total = action.payload.totalItems
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },
        [getPurchaseByRange.fulfilled]: (state, action) => {
            state.purchaseByRange = action.payload
            state.loading = false
        },
        [getPurchaseByRange.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData } = dataSlice.actions

export default dataSlice.reducer
