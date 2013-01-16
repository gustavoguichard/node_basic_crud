# Module dependencies.
express = require 'express'
http = require 'http'
routes = require './config/routes'

# Controllers
usersController = require './controllers/user'

app = express()

app.configure ->
  app.set 'port', process.env.PORT || 3000
  app.set 'view engine', 'jade'
  app.use express.favicon()
  app.use express.logger('dev')
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.set 'views', __dirname + '/views'

  app.use app.router
  app.use express.static __dirname + '/public'

  # 404 errors
  app.use (req, res)->
    res.redirect '/users'#, nada
  app.use (err, req, res, next)->
    res.status(err.status || 404).send err.message

app.configure 'development', ->
  app.use express.errorHandler dumpExceptions: true, showStack: true

app.configure 'production', ->
    app.use express.errorHandler()

routes.user app, usersController

unless module.parent
  http.createServer(app).listen app.get('port')
  console.log "Express server listening on port #{app.get 'port'}"

module.exports = app