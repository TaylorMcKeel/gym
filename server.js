const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const user = require('./routes/user')
const workout = require('./routes/workout')
const exercise = require('./routes/exercise')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
//gives access to config variables
dotenv.config()

//connects to db must happen before you invoke express
connectDB()

//main root; gives acccess to express methods
const app = express()

//converts json data into readable object
app.use(bodyParser.json())
//allows me to access and read the jwt cookie
app.use(cookieParser())
app.use(cors({
  origin:'*'
}))

app.use('/api/user', user)
app.use('/api/workout', workout)
app.use('/api/exercise',exercise)

// Serves the static assets from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//grabs port from config or makes it 5001
const PORT = process.env.PORT || 5001

//makes server go live
const startServer = (port)=>{
  const server = app.listen(port, ()=>{
    console.log(`Server is listening on PORT: ${port}`)
  })
  return server

}

if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  startServer(PORT);
}
//catches any unhandled objections that arent caught by middleware
//how to give acccess to server below
process.on('unhandledRejection', (err, promise)=>{
  console.log(`Error: ${err.message}`)
  server.close(()=> process.exit(1))
})

module.exports = {app, startServer};