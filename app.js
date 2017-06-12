const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const index = require('./routes/index')
const login = require('./routes/login')

const app = express()

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', index)
app.use('/api', login)

app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  const error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.json(err)
})

module.exports = app
