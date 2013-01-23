express = require "express"
# viewHelpers = require("../helpers")

module.exports = (app)->  
  # assume "not found" in the error msgs
  # is a 404. this is somewhat silly, but
  # valid, you can do whatever you like, set
  # properties, use instanceof etc.
  app.use (err, req, res, next) ->
    
    # treat as 404
    return next()  if ~err.message.indexOf("not found")
    
    # log it
    console.error err.stack
    
    # error page
    res.status(500).render "500",
      error: err.stack

  # assume 404 since no middleware responded
  app.use (req, res, next) ->
    res.status(404).render "404",
      url: req.originalUrl

  app.configure 'development', ->
    app.use express.errorHandler dumpExceptions: true, showStack: true

  app.configure 'production', ->
      app.use express.errorHandler()