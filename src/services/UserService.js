import ApiService from './ApiService'

export async function apiGetAllUsers(data) {
    return ApiService.fetchData({
        url: '/api/all/user/',
        method: 'post',
        data,
    })
}

export async function apiGetAllClients(data) {
    return ApiService.fetchData({
        url: '/api/all/user/clients',
        method: 'get',
        data,
    })
}


export async function apiGetAllEmployeeUsers(params) {
    return ApiService.fetchData({
        url: '/api/all/user/employee',
        method: 'get',
        params,
    })
}

export async function apiDeleteUser(data) {
    const { id } = data
    return ApiService.fetchData({
        url: `/api/current/user/${id}`,
        method: 'delete',
        data,
    })
}

export async function apiDeleteGroup(data) {
    const { id } = data
    return ApiService.fetchData({
        url: `/api/current/group/${id}`,
        method: 'delete',
        data,
    })
}



export async function apiGetUser(params) {
    const { id } = params
    return ApiService.fetchData({
        url: `/api/current/user/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetAllGroups(params) {
    return ApiService.fetchData({
        url: `/api/all/groups/`,
        method: 'get',
        params,
    })
}

export async function apiUpdateUser(_data) {
    const { id, data } = _data
    return ApiService.fetchData({
        url: `/api/current/user/${id}`,
        method: 'put',
        data,
    })
}

export async function apiCreateUser(data) {
    return ApiService.fetchData({
        url: '/api/users',
        method: 'post',
        data,
    })
}

export async function apiCreateGroup(data) {
    return ApiService.fetchData({
        url: '/api/new/groups',
        method: 'post',
        data,
    })
}
