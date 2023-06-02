const express = require('express')
const userDataRouter = express.Router()

userDataRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  next()
})
.get((req, res) => {
  res.end('Will send all the user data to you')
})

.post((req, res) => {
  res.end(`Account created. Welcome, ${req.body.username}!`)
})

.put((req, res) => {
  res.statusCode = 403 
  res.end('Account changes saved')
})

.delete((req, res) => {
  res.end('Deleting account')
})

module.exports = userDataRouter