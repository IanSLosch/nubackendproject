const express = require('express')
const User = require('../models/user')
const passport = require('passport')
const authenticate = require('../authenticate')
const cors = require('cors')

const usersRouter = express.Router()

// localhost:3000/users/
usersRouter.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function (req, res, next) {
  User.find()
    .then((users) => {
      res.statusCode = 200
      res.setHeader('Content-Type, application/json')
      res.json(users)
    }).catch(err => next(err))
})

usersRouter.post('/signup', cors.corsWithOptions, (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => { // user object in this callback is optional 
      if (err) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.json({ err: err })
      } else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname
        }
        user.save(err => {
          if (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.json({ err: err })
            return
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({ success: true, status: 'Registration Successful!' })
          })
        })
      }
    }
  )
})

// localhost:3000/users/login
usersRouter.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id })
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json({ success: true, token: token, status: 'You are successfully logged in!' })
})

// localhost:3000/users/logout
usersRouter.get('/logout', cors.corsWithOptions, (req, res, next) => { // logouts user
  if (req.session) { // is there a session?
    req.session.destroy() // deletes the session
    res.clearCookie('session-id') // session-id was configured in the app.js file when the session was setup
    res.redirect('/') // redirects user to the root path
  } else {
    const err = new Error('You are not logged in!')
    err.status = 401
    return next(err)
  }
})

// localhost:3000/users/facebook/token
// router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
//     if (req.user) {
//         const token = authenticate.getToken({_id: req.user._id})
//         res.statusCode = 200
//         res.setHeader('Content-Type', 'application/json')
//         res.json({success: true, token: token, status: 'You are successfully logged in!'})
//     }
// })


module.exports = usersRouter