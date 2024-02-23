import { usersDaoMongoose } from "../dao/mongoose/users.dao.mongoose.js"

class UsersService {
    async getUsers() {
        const users = await usersDaoMongoose.readMany()
        return users
    }

    async getUser(email) {
        const user = usersDaoMongoose.readOne(email)
        return user
    }

    async postUser(data) {
        const user = await usersDaoMongoose.create(data)
        return user
    }
}

export const usersService = new UsersService()