import mongoose from "mongoose"
import { cartManager } from "../../models/mongooseModels/Cart.js"
import { MONGO_URL } from "../../config/config.js"

await mongoose.connect(MONGO_URL)
//console.log('se conectó a MongoDB')

class CartsDaoMongoose {
    async readOne(cid) {
        const searched = await cartManager.find({ _id: cid }, { 'products._id': 0 }).lean()
        return searched
    }

    async createCart(cartId) {
        const newCart = await cartManager.create({_id: cartId, products: [] })
        return newCart.toObject()
    }

    async createProduct(cid, pid) {
        const addedProduct = await cartManager.findById(cid)
        addedProduct.addProduct(pid)
        return addedProduct
    }

    async updateCart(cid) {
        const updatedCart = await cartManager.findByIdAndUpdate(cid)
        return updatedCart.toObject()
    }

    async updateProduct(cid, pid, newQuantity) {
        const updatedProduct = await cartManager.findByIdAndUpdate(cid, { $set: { products: { product: pid, quantity: newQuantity } } }, { new: true })
        return updatedProduct.toObject()
    }

    async deleteCart(cid) {
        const deletedCart = await cartManager.findByIdAndUpdate(cid, { $set: {products: []} }, { new: true })
        return deletedCart.toObject()
    }

    async deleteProduct(cid, pid) {
        const deletedProduct = await cartManager.findById(cid)
        deletedProduct.deleteProduct(pid)
        return deletedProduct.toObject()
    }
}

export const cartsDaoMongoose = new CartsDaoMongoose()