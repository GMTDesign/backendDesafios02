import { usersDaoMongoose } from "../dao/mongoose/users.dao.mongoose.js"

class SessionsService {
    async readUser(email, password) {
        return await usersDaoMongoose.readOne(email, password)
    }
}
export const sessionsService = new SessionsService()