const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({ // user and password handled by 'passportLocalMongoose'
  email: {
    type: String,
    default: ''
  },
  admin: {
    type: Boolean,
    default: false
  },
  facebookId: {
    type: String,
    default: ''
  }
})

userSchema.plugin(passportLocalMongoose)
const User = mongoose.model('User', userSchema)
module.exports = User