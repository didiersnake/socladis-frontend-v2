import ApiService from './ApiService'

export async function apiGetAvaris(data) {
    return ApiService.fetchData({
        url: '/api/all/avaris/',
        method: 'post',
        data,
    })
}

export async function apiGetCrmCustomersStatistic(params) {
    return ApiService.fetchData({
        url: '/api/customers-statistic',
        method: 'get',
        params,
    })
}

export async function apiDeletePurchase(data) {
    const { id } = data
    return ApiService.fetchData({
        url: `/api/current/avari/${id}`,
        method: 'delete',
        data,
    })
}

export async function apiGetProduct(params) {
    const { id } = params
    return ApiService.fetchData({
        url: `/api/current/avari/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetAvarisByRange(data) {
    return ApiService.fetchData({
        url: `/api/all/avaris-by-range/`,
        method: 'post',
        data,
    })
}

export async function apiUpdateProduct(_data) {
    const { id, data } = _data
    return ApiService.fetchData({
        url: `/api/current/avari/${id}`,
        method: 'put',
        data,
    })
}
export async function apiCreateNewAvaris(data) {
    return ApiService.fetchData({
        url: '/api/new/avaris',
        method: 'post',
        data,
    })
}
