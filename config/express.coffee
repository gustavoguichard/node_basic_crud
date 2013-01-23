express = require 'express'
compass = require 'node-compass'

module.exports = (app, config)->
  app.configure ->
    app.use compass(
      project: __dirname + '/assets/styles'
    )
    app.set 'port', config.port
    app.set 'view engine', 'jade'
    app.use express.favicon()
    app.use express.logger('dev')
    app.use express.bodyParser()
    app.use express.methodOverride()
    # app.set 'views', __dirname + '/app/views'
    app.set 'views', 'app/views'
    app.use app.router
    # app.use express.static __dirname + '/public'
    app.use express.compress(
      filter: (req, res) ->
        # console.log res.getHeader("Content-Type")
        /json|text|javascript|css/.test res.getHeader("Content-Type")

      level: 9
    )

    app.use express.static 'public'