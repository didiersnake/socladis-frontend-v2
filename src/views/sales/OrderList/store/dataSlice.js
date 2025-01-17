import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import {
    apiGetSalesOrders,
    apiDeleteSalesOrders,
    apiGetSalesByRange,
    apiGetCrmCustomersStatistic,
} from 'services/SaleService'

export const getOrders = createAsyncThunk(
    'salesProductList/data/getOrders',
    async (data) => {
        const response = await apiGetSalesOrders(data)
        return response.data
    }
)

export const getCustomerStatistic = createAsyncThunk(
    'salesProductList/data/getCustomerStatistic',
    async () => {
        const response = await apiGetCrmCustomersStatistic()
        console.log(response)
        return response.data
    }
)

export const getOrdersByDateRange = createAsyncThunk(
    'salesProductList/data/getOrdersByRange',
    async (data) => {
        const response = await apiGetSalesByRange(data)
        console.log(response.data)
        return response.data
    }
)

export const deleteOrders = async (data) => {
    const response = await apiDeleteSalesOrders(data)
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
    endDate: new Date(),
}

const dataSlice = createSlice({
    name: 'salesOrderList/data',
    initialState: {
        loading: false,
        orderList: [],
        statisticData: {},
        statisticLoading: false,
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
        [getOrders.fulfilled]: (state, action) => {
            state.orderList = action.payload.data
            state.tableData.total = action.payload.totalItems
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },
        [getOrdersByDateRange.fulfilled]: (state, action) => {
            state.orderByRange = action.payload
            state.loading = false
        },
        [getOrdersByDateRange.pending]: (state) => {
            state.loading = true
        },
        [getCustomerStatistic.loading]: (state) => {
            state.statisticLoading = true
        },
        [getCustomerStatistic.fulfilled]: (state, action) => {
            state.statisticData = action.payload
            state.statisticLoading = false
        },
    },
})

export const { setOrderList, setTableData } = dataSlice.actions

export default dataSlice.reducer
