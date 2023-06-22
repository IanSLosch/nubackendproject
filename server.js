const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const passport = require('passport')
const config = require('./config')

// route imports
const usersRouter = require('./routes/usersRouter')
const pollsRouter = require('./routes/pollsRouter')
const cardsRouter = require('./routes/cardsRouter')

const mongoose = require('mongoose')

const url = config.mongoUrl
const connect = mongoose.connect(url)

connect.then(() => console.log('Connected correctly to Server'))
.catch((err) => console.log(err))

const app = express()

// Secure traffic only
app.all('*', (req, res, next) => { // catches every type of request (the crud types)
  if (req.secure) { // req.secure is true when connection that request was sent over was https
    return next()
  } else {
    console.log(`Redirecting to: https://${req.hostname}:${app.get('secPort')}${req.url}`)
    try {
      res.redirect(301, `https://${req.hostname}:${app.get('secPort')}${req.url}`)
    } catch (err) {
      console.log('Error during redirection', err)
      next(err)
    }    
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(passport.initialize())

app.use('/users', usersRouter)

app.use(express.static(path.join(__dirname, 'public')))

app.use('/polls', pollsRouter)
app.use('/cards', cardsRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app