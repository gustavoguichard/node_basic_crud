mongoose = require 'mongoose'
EventEmitter = require('events').EventEmitter
logger = new EventEmitter()

uristring = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/helloExpress'

# Ensure safe writes
mongoOptions = { db: { safe: true }}

# Connect
mongoose.connect uristring, mongoOptions, (err, res)->
  if err
    console.log "ERROR connecting to: #{uristring}. #{err}"

module.exports = mongoose