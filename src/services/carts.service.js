import { cartsDaoMongoose } from "../dao/mongoose/carts.dao.mongoose.js"

class CartsService {
    async getCart(cid) {
        return await cartsDaoMongoose.readOne(cid)
    }

    async postCart(cartId) {
        const newCart = await cartsDaoMongoose.createCart(cartId)
        return newCart
    }

    async postProduct(cid, pid) {
        return await cartsDaoMongoose.createProduct(cid, pid)
    }

    async putCart(cid) {
        return await cartsDaoMongoose.updateCart(cid)
    }

    async putProduct(cid, pid, newQuantity) {
        return await cartsDaoMongoose.updateProduct(cid, pid, newQuantity)
    }

    async deleteCart(cid) {
        return await cartsDaoMongoose.deleteCart(cid)
    }

    async deleteProduct(cid, pid) {
        return await cartsDaoMongoose.deleteProduct(cid, pid)
    }
}

export const cartsService = new CartsService()