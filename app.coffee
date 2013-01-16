# Module dependencies.
express = require 'express'
mongoose = require 'mongoose'
# routes = require './routes'
# user = require './routes/user'
http = require 'http'
# path = require 'path'

app = express()

app.configure ->
  app.set 'port', process.env.PORT || 3000
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'jade'
  app.use express.favicon()
  app.use express.logger('dev')
  app.use express.bodyParser()
  app.use express.methodOverride()

  app.use app.router
  app.use express.static __dirname + '/public'

  # 404 errors
  app.use (req, res)->
    res.redirect '/users', nada
  app.use (err, req, res, next)->
    res.status(err.status || 404).send err.message

app.configure 'development', ->
  app.use express.errorHandler dumpExceptions: true, showStack: true

app.configure 'production', ->
    app.use express.errorHandler()

mongoose.connect "mongodb://localhost/helloExpress"

UserSchema = new mongoose.Schema 
  name: String
  email: String
  age: Number
Users = mongoose.model 'Users', UserSchema

# query PARAMS
app.param 'name', (req, res, next, name)->
  Users.find {name: name}, (err, docs)->
    req.user = docs[0]
    next()

# users#index
app.get '/users', (req, res)->
  Users.find {}, (err, docs)->
    res.render 'users/index', {users: docs}

# users#new
app.get '/users/new', (req, res)->
  res.render 'users/new'

# users#show
app.get '/users/:name', (req, res)->
  res.render 'users/show', {user: req.user}

# users#edit
app.get '/users/:name/edit', (req, res)->
  res.render 'users/edit', {user: req.user}

# users#create
app.post '/users', (req, res)->
  b = req.body
  new Users(
    name: b.name
    email: b.email
    age: b.age
  ).save (err, user)->
    console.log user
    res.json err if err
    res.redirect "/users/#{user.name}"

# users#update
app.put '/users/:name', (req, res)->
  b = req.body
  Users.update {name: req.params.name}, {
    name: b.name, email: b.email, age: b.age
  }, (err)->
    res.redirect "/users/#{b.name}"

# users#destroy
app.delete '/users/:name', (req, res)->
  Users.remove {name: req.params.name}, (err)->
    res.redirect '/users'

unless module.parent
  http.createServer(app).listen app.get('port')
  console.log "Express server listening on port #{app.get 'port'}"

module.exports = app