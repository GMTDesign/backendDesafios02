import { NotFoundError } from "../../errors/errors.js"
import { Product } from "../../models/customModels/Product.js"
import { productsService } from "../../services/products.service.js"

export async function getController(req, res) {
    const parameters = {}
    if (req.query.category) { parameters.category = req.query.category }
    if (req.query.status) { parameters.status = req.query.status }

    const paginateOptions = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        lean: true
    }
    if (req.query.sort) { paginateOptions.sort = ({ price: req.query.sort }) }

    const products = await productsService.getProducts(parameters, paginateOptions)
    let result
    if (products) {
        result = {
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage
        }
    } else {
        result = {
            status: 'error',
            payload: []
        }
    }
    res.json(result)
}

export async function getByIdController(req, res, next) {
    try {
        const id = req.params.pid
        const searched = await productsService.getProduct(id)
        if (!searched) {
            throw new NotFoundError('producto inexistente')
        }
        res.json(searched)
    } catch (error) {
        next(error)
    }


}

export async function postController(req, res, next) {
    try {
        if (req.file) {
            req.body.thumbnails = req.file.filename
        }
        const { title, description, code, price, status, stock, category, thumbnails } = req.body
        const validateProduct = new Product({ title, description, code, price, status, stock, category, thumbnails })
        const newProduct = await productsService.postProduct({ title, description, code, price, status, stock, category, thumbnails })
        res.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }
}

export async function putController(req, res, next) {
    try {
        const id = req.params.pid
        let images
        if (req.file) {
            images = req.file.filename
        }
        const data = req.body
        let updatedProduct
        updatedProduct = await productsService.putProduct(id, data, images)
        if (!updatedProduct) {
            throw new NotFoundError('producto no encontrado')
        }
        res.json(updatedProduct)
    } catch (error) {
        next(error)
    }

}

export async function deleteController(req, res, next) {
    try {
        const id = req.params.pid
        const deletedProduct = await productsService.deleteProduct(id)
        if (!deletedProduct) {
            throw new NotFoundError('producto inexistente')
        }
        res.json(deletedProduct)
    } catch (error) {
        next(error)
    }

}