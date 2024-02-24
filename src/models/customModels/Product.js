import { neededValue } from "../../dao/fsDao/services/ProductManager.js"
import { InvalidArgumentsError } from "../../errors/errors.js"

export class Product {
    #title
    #description
    #code
    #price
    #stock
    #category
    
    constructor({ id, title, description, code, price, status = true, stock, category, thumbnails }) {
        this.id = id
        this.title = neededValue(title, 'título')
        this.description = neededValue(description, 'descripción')
        this.code = neededValue(code, 'código')
        this.price = neededValue(price, 'precio')
        this.status = status
        this.stock = stock ?? 0
        this.category = category
        this.thumbnails = thumbnails ?? []
    }

    get title() {
        return this.#title
    }

    set title(newTitle) {
        //if (!isNaN(newTitle)) throw new Error('el título debe ser un texto')
        if (!isNaN(newTitle)) throw new InvalidArgumentsError('el título debe ser un texto')
        this.#title = newTitle
    }

    get description() {
        return this.#description
    }

    set description(newDescription) {
        if (!isNaN(newDescription)) throw new InvalidArgumentsError('la descripción debe ser un texto')
        this.#description = newDescription
    }

    get code() {
        return this.#code
    }

    set code(newCode) {
        if (!isNaN(newCode)) throw new InvalidArgumentsError('el código de producto debe ser un texto')
        this.#code = newCode
    }

    get price() {
        return this.#price
    }

    set price(newPrice) {
        if (newPrice <= 0 || isNaN(newPrice)) throw new InvalidArgumentsError('el precio debe ser un número mayor a 0')
        this.#price = newPrice
    }

    get stock() {
        return this.#stock
    }

    set stock(newStock) {
        if (newStock < 0 || isNaN(newStock)) throw InvalidArgumentsError('el stock debe ser un número y no puede ser negativo')
        this.#stock = newStock
    }

    get category() {
        return this.#category
    }

    set category(newCategory) {
        if (!isNaN(newCategory)) throw new InvalidArgumentsError('la categoría debe ser un texto')
        this.#category = newCategory
    }

    toObject() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            code: this.code,
            price: this.price,
            status: this.status,
            stock: this.stock,
            category: this.category,
            thumbnails: this.thumbnails
        }
    }
}


