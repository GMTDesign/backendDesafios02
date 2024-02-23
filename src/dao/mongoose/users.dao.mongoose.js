import mongoose from "mongoose"
import { userManager } from "../../models/mongooseModels/User.js"
import { MONGO_URL } from "../../config/config.js"

await mongoose.connect(MONGO_URL)
console.log('se conectó a MongoDB')

class UsersDaoMongoose {
   
    async create(data) {
        const user = await userManager.userRegistry(data)
        return user
    }

    async readOne (email, password) {
        const user = await userManager.userAuthentication(email, password)
        return user
    }

    async readMany() {
        const users = await userManager.find().lean()
        return users
    }
}

export const usersDaoMongoose = new UsersDaoMongoose()