mongoose = require 'mongoose'

uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/helloExpress'

# Ensure safe writes
mongoOptions = { db: { safe: true }}

# Connect
mongoose.connect uristring, mongoOptions, (err, res)->
  if err
    console.log "ERROR connecting to: #{uristring}. #{err}"
  else
    console.log "Succeeded connected to: #{uristring}"
    module.exports = mongoose