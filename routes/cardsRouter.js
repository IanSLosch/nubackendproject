const express = require('express')
const Card = require('../models/card')
const authenticate = require('../authenticate')
const cors = require('./cors')

const cardsRouter = express.Router()

// http://localhost:3000/cards/<card-name>
cardsRouter.route('/:cardName')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res) => {
  // Card.findById(req.params.cardId)
  // .then(card => {
  //   res.statusCode = 200
  //   res.setHeader('Content-Type', 'application/json')
  //   res.json(card)
  // })
  res.end(`You have recieved: ${req.params.cardName}`)
})

module.exports = cardsRouter