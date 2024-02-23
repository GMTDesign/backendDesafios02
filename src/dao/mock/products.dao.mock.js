import { faker } from '@faker-js/faker/locale/es'

function productsMock() {
    return {
        _id: faker.string.uuid(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.uuid(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(0.9),
        stock: faker.number.int(100),
        category: faker.commerce.department(),
        thumbnails: [faker.image.avatarGitHub()]
    }
}

export class ProductsDaoMock {
    constructor() {
        this.products = []
    }

    async readMany() {
        const products = []
        for (let i = 0; i < 99; i++) {
            products.push(productsMock())
        }
        return products
    }
}