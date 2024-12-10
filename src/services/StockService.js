import ApiService from './ApiService'

export async function apiGetAllProducts(data) {
    return ApiService.fetchData({
        url: '/api/all/stocks/',
        method: 'post',
        data,
    })
}

// export async function apiGetAllProductsUnpaginated(data) {
//     return ApiService.fetchData({
//         url: '/api/all/productsUnpaginated',
//         method: 'get',
//         data,
//     })
// }

// export async function apiDeleteProduct(data) {
//     const { id } = data
//     return ApiService.fetchData({
//         url: `/api/current/product/${id}`,
//         method: 'delete',
//         data,
//     })
// }

// export async function apiGetProduct(params) {
//     const { id } = params
//     return ApiService.fetchData({
//         url: `/api/current/product/${id}`,
//         method: 'get',
//         params,
//     })
// }

// export async function apiUpdateProduct(_data) {
//     const { id, data } = _data
//     return ApiService.fetchData({
//         url: `/api/current/product/${id}`,
//         method: 'put',
//         data,
//     })
// }

// export async function apiCreateProduct(data) {
//     return ApiService.fetchData({
//         url: '/api/new/products',
//         method: 'post',
//         data,
//     })
// }
