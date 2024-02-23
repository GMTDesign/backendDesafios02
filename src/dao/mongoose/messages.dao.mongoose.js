import mongoose from "mongoose"
import { messageManager } from "../../models/mongooseModels/Message.js"
import { MONGO_URL } from "../../config/config.js"

await mongoose.connect(MONGO_URL)

class MessagesDaoMongoose {
    async readMany () {
        const messages = await messageManager.find().lean()
        return messages
    }
    
    async create({user, message}) {
        const newMessage = await messageManager.create({user, message})
        return newMessage
    }
}

export const messagesDaoMongoose = new MessagesDaoMongoose()