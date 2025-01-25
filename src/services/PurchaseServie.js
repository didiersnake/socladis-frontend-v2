import ApiService from './ApiService'

export async function apiGetPurchaseOrders(data) {
    return ApiService.fetchData({
        url: '/api/all/achats/',
        method: 'post',
        data,
    })
}

export async function apiGetCrmCustomersStatistic(params) {
    return ApiService.fetchData({
        url: '/api/achat/customers-statistic',
        method: 'get',
        params,
    })
}


export async function apiGetPurchaseOrdersByRange(data) {
    return ApiService.fetchData({
        url: '/api/all/achats-by-range/',
        method: 'post',
        data,
    })
}

export async function apiDeletePurchase(data) {
    const { id } = data
    return ApiService.fetchData({
        url: `/api/current/achat/${id}`,
        method: 'delete',
        data,
    })
}

export async function apiGetProduct(params) {
    const { id } = params
    return ApiService.fetchData({
        url: `/api/current/achat/${id}`,
        method: 'get',
        params,
    })
}


export async function apiUpdateProduct(_data) {
    const { id, data } = _data
    return ApiService.fetchData({
        url: `/api/current/achat/${id}`,
        method: 'put',
        data,
    })
}
export async function apiCreateNewPurchase(data) {
    return ApiService.fetchData({
        url: '/api/new/achats',
        method: 'post',
        data,
    })
}

