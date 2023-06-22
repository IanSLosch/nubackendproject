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

module.exports = mongoose.model('card', cardSchema)