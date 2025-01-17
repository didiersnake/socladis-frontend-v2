import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import {
    apiDeleteEmpty,
    apiGetCrmCustomersStatistic,
    apiGetEmptyByRange,
    apiGetEmptyStore,
} from 'services/EmptyStore'

export const getEmptyStore = createAsyncThunk(
    'salesProductList/data/getOrders',
    async (data) => {
        const response = await apiGetEmptyStore(data)
        console.log(response.data)
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

export const getAvarisByRange = createAsyncThunk(
    'salesProductList/data/getOrdersByRange',
    async (data) => {
        const response = await apiGetEmptyByRange(data)
        return response.data
    }
)

export const deleteAvaris = async (data) => {
    const response = await apiDeleteEmpty(data)
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
        orderByRange: [],
        statisticData: {},
        statisticLoading: false,
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
        [getEmptyStore.fulfilled]: (state, action) => {
            state.orderList = action.payload.data
            state.tableData.total = action.payload.totalItems
            state.loading = false
        },
        [getEmptyStore.pending]: (state) => {
            state.loading = true
        },
        [getAvarisByRange.fulfilled]: (state, action) => {
            state.orderByRange = action.payload
            state.loading = false
        },
        [getAvarisByRange.pending]: (state) => {
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
