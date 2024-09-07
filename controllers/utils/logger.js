const winston = require('winston');
const { combine, timestamp, json, colorize, simple, printf } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    json(),
    colorize(),
    simple(),
    printf(({timestamp, level, message})=>{
      return `${timestamp} ${level}: ${message}`
    })

  ),
  transports: [
    new winston.transports.Console({
      level: 'info',
      handleExceptions: true,
      format: combine(
        json(),
        colorize(),
        simple(),
      )
    }),
  ],
})

module.exports = logger;