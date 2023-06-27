const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({
  name: {
    type: String
  },
	banned: {
    type: Boolean
  },
	cardImage: {
    type: String
  },
	cardArt: {
    type: String
  },
	cardId: {
    type: String
  },
	_id: {
    type: String
  }
})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card