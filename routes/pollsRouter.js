const express = require('express')
const Poll = require('../models/poll')
const authenticate = require('../authenticate')
const cors = require('./cors')

const pollsRouter = express.Router()

// http://theroundtable.com/polls/
pollsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res) => {
  res.end('returns all voting data')
})

// http://theroundtable.com/polls/<user>/
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