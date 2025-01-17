import ApiService from './ApiService'

export async function apiGetEmptyStore(data) {
    return ApiService.fetchData({
        url: '/api/all/empty/stores',
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

export async function apiDeleteEmpty(data) {
    const { id } = data
    return ApiService.fetchData({
        url: `/api/current/empty/store/${id}`,
        method: 'delete',
        data,
    })
}

export async function apiGetProduct(params) {
    const { id } = params
    return ApiService.fetchData({
        url: `/api/current/empty/store/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetEmptyByRange(data) {
    return ApiService.fetchData({
        url: `/api/all/store-empty-by-range/`,
        method: 'post',
        data,
    })
}

export async function apiUpdateProduct(_data) {
    const { id, data } = _data
    return ApiService.fetchData({
        url: `/api/current/empty/store/${id}`,
        method: 'put',
        data,
    })
}
export async function apiCreateNewEmpty(data) {
    return ApiService.fetchData({
        url: '/api/new/empty/stores',
        method: 'post',
        data,
    })
}
