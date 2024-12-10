import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetAllProducts,
} from 'services/StockService'

export const getProducts = createAsyncThunk(
    'salesProductList/data/getProducts',
    async (data) => {
        const response = await apiGetAllProducts(data)
        // console.log(response.data);
        return response.data
    }
)

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 20,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    
}

const dataSlice = createSlice({
    name: 'salesProductList/data',
    initialState: {
        loading: false,
        productList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateProductList: (state, action) => {
            state.productList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            state.productList = action.payload.data
            state.tableData.total = action.payload.totalItems
            state.loading = false
        },
        [getProducts.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
    setSortedColumn,
} = dataSlice.actions

export default dataSlice.reducer
