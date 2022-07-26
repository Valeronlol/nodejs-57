const { got } = require('got-cjs')
const { storageUrl } = require('../constants')

exports.getProductsList = () => {
    return got.get(`${storageUrl}/product`, { searchParams: { limit: 10 } }).json()
}

exports.addProduct = (json) => {
    return got.post(`${storageUrl}/product`, { json }).json()
}

exports.getUserByEmail = (email) => {
    return got.post(`${storageUrl}/login`, { json: { email } })
        .json()
        .then(data => data ? data.user : null)
}

exports.createNewUser = (json) => {
    return got.post(`${storageUrl}/user`, { json }).json()
}

exports.updateProductImage = (productId, imagePath) => {
    return got.put(`${storageUrl}/product/${productId}/image`, { json: { imagePath } }).json()
}
