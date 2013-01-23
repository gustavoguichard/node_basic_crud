# Module dependencies.
express = require 'express'
fs = require 'fs'
http = require 'http'
app = express()

# Load configurations
env = process.env.NODE_ENV || 'development'
config = require('./config/config')[env]
mongoose = require('./db/connect')(config)

mongoose.connection.on 'open', ->
  # models
  models_path = __dirname + '/app/models'
  fs.readdirSync(models_path).forEach (file)->
    require "#{models_path}/#{file}"
  
  require('./config/express')(app, config)
  # Application controller
  require('./app/controllers/application_controller')(app)
  require('./config/routes')(app)

  app.listen config.port
  console.log "Express server listening on port #{config.port}"

mongoose.connection.on 'error', (err)->
  console.log "DB Connection error: #{err}"
  app.close()

module.exports = app