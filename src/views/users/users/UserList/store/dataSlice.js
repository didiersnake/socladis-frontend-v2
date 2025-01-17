import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteUser,
    apiGetAllClients,
    apiGetAllGroups,
    // apiGetAllEmployeeUsers,
    apiGetAllUsers,
    apiGetCrmCustomersStatistic,
} from 'services/UserService'

export const getCustomerStatistic = createAsyncThunk(
    'salesProductList/data/getCustomerStatistic',
    async () => {
        const response = await apiGetCrmCustomersStatistic()
        return response.data
    }
)

//paginated users
export const getProducts = createAsyncThunk(
    'salesProductList/data/getProducts',
    async (data) => {
        const response = await apiGetAllUsers(data)
        return response.data
    }
)

//unpaginated users
export const getAllClients = createAsyncThunk(
    'salesProductList/data/getAllClients',
    async () => {
        const response = await apiGetAllClients()
        return response.data
    }
)

export const getGroups = createAsyncThunk(
    'salesProductList/data/getAllGroups',
    async () => {
        const response = await apiGetAllGroups()
        return response.data
    }
)

export const deleteProduct = async (data) => {
    const response = await apiDeleteUser(data)
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
    category: '',
    phone: '',
    location: '',
    group: '',
    tax_system: '',
    roles: '',
    password: '',
    uniqueCode: '',
}

const dataSlice = createSlice({
    name: 'salesProductList/data',
    initialState: {
        loading: false,
        productList: [],
        statisticData: {},
        statisticLoading: false,
        // employees: [],
        clients: [],
        groups: [],
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
        [getAllClients.fulfilled]: (state, action) => {
            state.clients = action.payload
            state.loading = false
        },
        [getAllClients.pending]: (state) => {
            state.loading = true
        },
        [getGroups.fulfilled]: (state, action) => {
            state.groups = action.payload
            state.loading = false
        },
        [getGroups.pending]: (state) => {
            state.loading = true
        },
        [getCustomerStatistic.loading]: (state) => {
            state.statisticLoading = true
        },
        [getCustomerStatistic.fulfilled]: (state, action) => {
            state.statisticData = action.payload
            state.statisticLoading = false
        },

        // [getAllEmployeeUsers.fulfilled]: (state, action) => {
        //     state.employees = action.payload.data
        // },
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
    setSortedColumn,
} = dataSlice.actions

export default dataSlice.reducer
