mongoose = require 'mongoose'

mongoose.connect "mongodb://localhost/helloExpress"

UserSchema = new mongoose.Schema 
  name: String
  email: String
  age: Number
Users = mongoose.model 'Users', UserSchema

exports.index = (req, res)->
  Users.find {}, (err, docs)->
    res.render 'users/index', {users: docs}

exports.new = (req, res)->
  res.render 'users/new'

exports.create = (req, res)->
  b = req.body
  new Users(
    name: b.name
    email: b.email
    age: b.age
  ).save (err, user)->
    res.json err if err
    res.redirect "/users/#{user.name}"

exports.show = (req, res)->
  res.render 'users/show', {user: req.user}

exports.edit = (req, res)->
  res.render 'users/edit', {user: req.user}

exports.update = (req, res)->
  b = req.body
  Users.update {name: req.params.name}, {
    name: b.name, email: b.email, age: b.age
  }, (err)->
    res.redirect "/users/#{b.name}"

exports.destroy = (req, res)->
  Users.remove {name: req.params.name}, (err)->
    res.redirect '/users'

exports.load = (req, next, name)->
  Users.find {name: name}, (err, docs)->
    req.user = docs[0]
    next()