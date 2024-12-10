import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetAllProducts,
    apiDeleteProduct,
    apiGetAllProductsUnpaginated,
} from 'services/ProductsService'

export const getProducts = createAsyncThunk(
    'salesProductList/data/getProducts',
    async (data) => {
        const response = await apiGetAllProducts(data)
        // console.log(response.data);
        return response.data
    }
)

export const getProductsUnpaginated = createAsyncThunk(
    'salesProductList/data/getProductsUnpaginated',
    async (data) => {
        const response = await apiGetAllProductsUnpaginated(data)
        // console.log(response.data);
        return response.data
    }
)

export const deleteProduct = async (data) => {
    const response = await apiDeleteProduct(data)
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
}

export const initialFilterData = {
    name: '',
    category: ['plastic', 'casier'],
    format: ["small", "big"],
    price: 0,
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
        [getProductsUnpaginated.fulfilled]: (state, action) => {
            state.productList = action.payload
            state.loading = false
        },
        [getProductsUnpaginated.pending]: (state) => {
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
