const express = require('express')
const pollsRouter = express.Router()
const authenticate = require('../authenticate')
const cors = require('./cors')

// http://theroundtable.com/polling/
pollsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
  res.end()
//  
})

// http://theroundtable.com/polling/<user>/
pollsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res) => {
  res.end('returns users current ballot status')
})
.post(cors.cors, authenticate.verifyUser, (req, res) => {
  res.end('overwrites users saved ballot with current ballot')
})
.delete(cors.cors, authenticate.verifyUser, (req, res) => {
  res.end('emptys ballot (deletes ballot?)')
})


module.exports = pollsRouter