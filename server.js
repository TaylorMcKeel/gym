const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const user = require('./routes/user')
const workout = require('./routes/workout')
const exercise = require('./routes/exercise')

//gives access to config variables
dotenv.config({path:'./config/config.env'})

//connects to db must happen before you invoke express
connectDB()

//main root; gives acccess to express methods
const app = express()


//converts json data into readable object
app.use(bodyParser.json())


app.use('/user', user)
app.use('/workout', workout)
app.use('/exercise',exercise)

//grabs port from config or makes it 5001
const PORT = process.env.PORT || 5001

//makes server go live
const server = app.listen(PORT, ()=>{
  console.log(`Serve is listening on PORT: ${PORT}`)
})

//catches any unhandled objections that arent caught by middleware
process.on('unhandledRejection', (err, promise)=>{
  console.log(`Error: ${err.message}`)
  server.close(()=> process.exit(1))
})