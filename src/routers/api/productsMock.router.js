import { Router } from "express"
import { ProductsDaoMock } from "../../dao/mock/products.dao.mock.js"

export const productsMockRouter = Router()
const productsDaoMock = new ProductsDaoMock()

productsMockRouter.get('/mockingproducts', async (req, res) => {
    res.json(await productsDaoMock.readMany())
})