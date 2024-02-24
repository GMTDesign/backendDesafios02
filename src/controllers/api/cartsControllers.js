import { InvalidArgumentsError, NotFoundError } from "../../errors/errors.js"
import { cartsService } from "../../services/carts.service.js"

export async function getByIdController(req, res, next) {
    try {
        const cid = req.params.cid
        const searched = await cartsService.getCart(cid)
        if (!searched) {
            throw new NotFoundError('carrito inexistente')
        }
        res.json(searched)
    } catch (error) {
        next(error)
    }

}

export async function postController(req, res) {
    try {
        const newCart = await cartsService.postCart()
        res.json(newCart)
    } catch (error) {
        next(new InvalidArgumentsError('datos inválidos'))
    }
}

export async function postProductController(req, res, next) {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const addedProduct = await cartsService.postProduct(cid, pid)
        if (!addedProduct) throw new InvalidArgumentsError('datos inválidos')
        res.json(addedProduct)
    } catch (error) {
        next(error)
    }
}

export async function putController(req, res, error) {
    const cid = req.params.cid
    try {
        const updatedCart = await cartsService.putCart(cid)
        if (!updatedCart) throw new InvalidArgumentsError('datos inválidos')
        res.json(updatedCart)
    } catch (error) {
        next(error)
    }
}

export async function putProductController(req, res, next) {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const { newQuantity } = req.body
        const updatedProduct = await cartsService.putProduct(cid, pid, newQuantity)
        if (!updatedProduct) throw new InvalidArgumentsError('datos inválidos')
        res.json(updatedProduct)
    } catch (error) {
        next(error)
    }
}

export async function deleteController(req, res) {
    try {
        const cid = req.params.cid
        const deletedCart = await cartsService.deleteCart(cid)
        if (!deletedCart) {
            throw new NotFoundError('carrito no encontrado')
        }
        res.json(deletedCart)
    } catch (error) {
        next(error)
    }

}

export async function deleteProductController(req, res) {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const deletedProduct = await cartsService.deleteProduct(cid, pid)
        if (!deletedProduct) {
            throw new NotFoundError('producto no encontrado')
        }
        res.json(deletedProduct)
    } catch (error) {
        next(error)
    }
   
}