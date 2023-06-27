const express = require('express')
const User = require('../models/user')
const passport = require('passport')
const authenticate = require('../authenticate')
const cors = require('./cors')

const usersRouter = express.Router()

// localhost:3000/users/
usersRouter.get('/', cors.corsWithOptions, function (req, res, next) {
  User.find()
    .then((users) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(users)
    }).catch(err => next(err))
})

// localhost:3000/users/signup
// set min username to 5 characters
usersRouter.post('/signup', cors.corsWithOptions, (req, res) => {
  User.create({ username: req.body.username })
    .then((user) => {
      if (req.body.firstname) {
        user.firstname = req.body.firstname
      }
      if (req.body.lastname) {
        user.lastname = req.body.lastname
      }
      if (req.body.email) {
        user.email = req.body.email
      }
      user.save()
        .then(user => {
          console.log('New User: ' + user)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json(user)
        })
    })
    .then(() => {
      passport.authenticate('local')(req, res, () => {
        console.log('User Authenticated')
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({ success: true, status: 'Registration Successful!' })
      })
    })
    .catch((err) => {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.json({ err: err.message })
    })
})

usersRouter.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => { 
  // passing passport.authenticate('local') as a second argument enables authentication on this route
  // passport.authenticate('local') takes care of all of the error handling and authentication. 
  // only need to return success case
  console.log(req.user)
  const token = authenticate.getToken({ _id: req.user._id })
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json({ success: true, token: token, status: 'You are successfully logged in!' })
})


// localhost:3000/users/login
// usersRouter.post('/login', cors.corsWithOptions, (req, res, next) => {
//   passport.authenticate('local', (err, user) => {
//     if (err) {
//     console.log('error')
//       return next(err)
//     }
//     console.log(user)
//     if (!user) {
//       res.statusCode = 401
//       res.setHeader('Content-Type', 'application/json')
//       return res.json({
//         success: false,
//         status: 'Login Unsuccessful',
//         err: info
//       })
//     }

//     req.logIn(user, (err) => {
//       if (err) {
//         res.statusCode = 401
//         res.setHeader('Content-Type', 'application/json')
//         return res.json({
//           success: false,
//           status: 'Login Unsuccessful',
//           err: String(err)
//         })
//       }
//       const token = authenticate.getToken({ _id: user._id })
//       res.statusCode = 200
//       res.setHeader('Content-Type', 'application/json')
//       return res.json({
//         success: true,
//         token: token,
//         it: req.user._id,
//         status: 'You are successfully logged in'
//       })
//     })
//   })(req, res, next)
// })

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