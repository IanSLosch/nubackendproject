const mongoose = require('mongoose')
const Schema = mongoose.Schema



const ballotSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  cardIdsToBan: [Schema.Types.ObjectId], // tracks card id
  cardIdsToUnban: [Schema.Types.ObjectId]
}, {
  timestamps: true
})

const tallySchema = new Schema({
  cardId: {
    type: Schema.Types.ObjectId,
    ref: 'Card',
  },
  total: BigInt
})

module.exports = mongoose.model('ballot', ballotSchema)
module.exports = mongoose.model('tally', tallySchema)