mongoose = require 'mongoose'
module.exports = (config)->
  # Ensure safe writes
  mongoOptions = { db: { safe: true }}
  # Connect
  mongoose.connect config.db, mongoOptions, (err, res)->
    if err
      console.log "ERROR connecting to: #{uristring}. #{err}"
    else
      console.log "Connected to Database"