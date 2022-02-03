const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config() // For setting up env variables in .env-file
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const port = process.env.PORT || 3000

// RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

// MIDDLEWARE
app.use(cors()) // Allows cross origins
app.use(limiter)
app.use(
  helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"] } })
)
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// CONSOLE-CLEANUP
console.clear()

// CONNECT TO DB
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('Connection to database failed!')
})
db.once('open', async () => {
  console.log('Connection to database established!')
})

// ROUTES
app.use('/albums', require('./routes/albums'))

// CATCH 404 - NOT FOUND
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Page not found'
  })
})

// ERROR HANDLING
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal Server Error')
})

if (process.env.NODE_ENV === 'test') {
  app.listen(port, () => { })
} else {
  app.listen(port, () => {
    console.log(`Server running on ${port}`)
  })
}

module.exports.app = app
