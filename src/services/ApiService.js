import BaseService from './BaseService'

const ApiService = {
    fetchData(param) {
        console.log(param);    
        return new Promise((resolve, reject) => {
            BaseService(param)
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },
}

export default ApiService
