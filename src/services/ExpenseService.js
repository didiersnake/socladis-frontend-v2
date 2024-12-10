import ApiService from './ApiService'

export async function apiGetEmptyStore(data) {
    return ApiService.fetchData({
        url: '/api/all/fund/expenses',
        method: 'post',
        data,
    })
}

export async function apiDeleteEmpty(data) {
    const { id } = data
    return ApiService.fetchData({
        url: `/api/current/fund/expense/${id}`,
        method: 'delete',
        data,
    })
}

export async function apiGetProduct(params) {
    const { id } = params
    return ApiService.fetchData({
        url: `/api/current/fund/expense/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetEmptyByRange(data) {
    return ApiService.fetchData({
        url: `/api/all/fund/expenses-by-range`,
        method: 'post',
        data,
    })
}

export async function apiUpdateProduct(_data) {
    const { id, data } = _data
    return ApiService.fetchData({
        url: `/api/current/fund/expense/${id}`,
        method: 'put',
        data,
    })
}
export async function apiCreateNewEmpty(data) {
    return ApiService.fetchData({
        url: '/api/new/fund/expense',
        method: 'post',
        data,
    })
}
