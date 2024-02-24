export class Cart {
    constructor({ id, products }) {
        this.id = id
        this.products = products ?? []
    }

    toObject() {
        return {
            id: this.id,
            products: this.products
        }
    }
}
