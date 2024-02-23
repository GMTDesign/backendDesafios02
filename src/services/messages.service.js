import { messagesDaoMongoose } from "../dao/mongoose/messages.dao.mongoose.js"

class MessagesService {
    async getMessages() {
        return await messagesDaoMongoose.readMany()
    }

    async postMessage({user, message}) {
        return await messagesDaoMongoose.create({user, message})
    }
}

export const messagesService = new MessagesService()