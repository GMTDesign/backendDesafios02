import winston from "winston"

const NODE_ENV = process.env.NODE_ENV || 'development'
const consoleLevel = NODE_ENV === 'production' ? 'info' : 'debug'

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: consoleLevel}),
        new winston.transports.File({ level: 'error', filename: './logs/errors.log'})
    ]
})