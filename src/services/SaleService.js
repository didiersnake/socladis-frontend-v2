import ApiService from './ApiService'

export async function apiGetSalesOrders(data) {
    return ApiService.fetchData({
        url: '/api/all/sales/',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesOrders(data) {
    const {id} = data
    return ApiService.fetchData({
        url: `/api/current/sales/${id}`,
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails(params) {
    const {id} = params
    return ApiService.fetchData({
        url: `/api/current/sale/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetSalesByRange(data) {
    return ApiService.fetchData({
        url: `/api/all/sale-by-range/`,
        method: 'post',
        data,
    })
}

export async function apiExportRistourne(data) {
    return ApiService.fetchData({
        url: '/sales/export-ristourn',
        method: 'post',
        data,
        responseType: 'blob',
    })
}

export async function apiCreateNewSale(data) {
    return ApiService.fetchData({
        url: '/api/new/sales',
        method: 'post',
        data,
    })
}

export async function apiGetSalesDashboardData(data) {
    return ApiService.fetchData({
        url: '/sales/dashboard',
        method: 'post',
        data,
    })
}
