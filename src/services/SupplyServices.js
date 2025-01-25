import ApiService from './ApiService'

export async function apiGetEmptyStore(data) {
    return ApiService.fetchData({
        url: '/api/all/supply/box/',
        method: 'post',
        data,
    })
}

export async function apiGetCrmCustomersStatistic(params) {
    return ApiService.fetchData({
        url: '/api/supplyBox/customers-statistic',
        method: 'get',
        params,
    })
}

export async function apiDeleteEmpty(data) {
    const { id } = data
    return ApiService.fetchData({
        url: `/api/current/supply/box/${id}`,
        method: 'delete',
        data,
    })
}

export async function apiGetProduct(params) {
    const { id } = params
    return ApiService.fetchData({
        url: `/api/current/supply/box/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetEmptyByRange(data) {
    return ApiService.fetchData({
        url: `/api/all/supply/box-by-range/`,
        method: 'post',
        data,
    })
}

export async function apiUpdateProduct(_data) {
    const { id, data } = _data
    return ApiService.fetchData({
        url: `/api/current/supply/box/${id}`,
        method: 'put',
        data,
    })
}
export async function apiCreateNewEmpty(data) {
    return ApiService.fetchData({
        url: '/api/new/supply/box',
        method: 'post',
        data,
    })
}
