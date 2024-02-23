import { productsDaoMongoose } from "../dao/mongoose/products.dao.mongoose.js"


class ProductsService {
    async getProducts(parameters, paginateOptions) {
        return await productsDaoMongoose.readMany(parameters, paginateOptions)
    }

    async getProduct(pid) {
        return await productsDaoMongoose.readOne(pid)
    }

    async postProduct({title, description, code, price, status, stock, category, thumbnails}) {
        return await productsDaoMongoose.create({title, description, code, price, status, stock, category, thumbnails})
    }

    async putProduct(pid, data,images) {
        return await productsDaoMongoose.updateOne(pid, data, images)
    }

    async deleteProduct(pid) {
        return await productsDaoMongoose.deleteOne(pid)
    }
}

export const productsService = new ProductsService()