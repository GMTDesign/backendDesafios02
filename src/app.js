import express from 'express'
import { apiRouter } from './routers/api/api.router.js'
import handlebars from 'express-handlebars'
import { webRouter } from './routers/web/web.router.js'
import { Server } from 'socket.io'
import { PORT } from './config/config.js'
import { cookies } from './middlewares/cookies.js'
import { authentication } from './middlewares/authentications.js'
import { messageManager } from './models/mongooseModels/Message.js'
import { cartManager } from './models/mongooseModels/Cart.js'
import { productsMockRouter } from './routers/api/productsMock.router.js'

export const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', './views')

const server = app.listen(PORT, () => { console.log(`se conectó al puerto ${PORT}`) })

const serverSocket = new Server(server)
app.use((req, res, next) => {
    res['refreshWeb'] = async () => {
        serverSocket.emit('messages', await messageManager.find())
    }
    next()
})


app.use(authentication)
app.use(cookies)

app.use('/static', express.static('./static'))
app.use(express.static('./views'))

app.use('/', webRouter)
app.use('/api', apiRouter)

serverSocket.on('connection', async (socket) => {
    
    socket.on('newProduct', async (id, cartId) => {
        const searchedCart = await cartManager.findOne({ _id: cartId})
        searchedCart.addProduct(id)
      
    })
    // chat sockets
    serverSocket.emit('messages', await messageManager.find())
    socket.broadcast.emit('newUser', 'Nuevo usuario')

    socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', 'Desconexión')
    })

    socket.on('newMessage', async (newMessage) => {
        try {
            await messageManager.create(newMessage)
            serverSocket.emit('messages', await messageManager.find())
        } catch (error) {
            serverSocket.emit('error', error.message)   
        }
        
    })
})


