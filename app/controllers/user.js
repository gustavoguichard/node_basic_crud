var UserSchema, Users, mongoose;

mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/helloExpress");

UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

Users = mongoose.model('Users', UserSchema);

exports.index = function(req, res) {
  return Users.find({}, function(err, docs) {
    return res.render('users/index', {
      users: docs
    });
  });
};

exports["new"] = function(req, res) {
  return res.render('users/new');
};

exports.create = function(req, res) {
  var b;
  b = req.body;
  return new Users({
    name: b.name,
    email: b.email,
    age: b.age
  }).save(function(err, user) {
    if (err) {
      res.json(err);
    }
    return res.redirect("/users/" + user.name);
  });
};

exports.show = function(req, res) {
  return res.render('users/show', {
    user: req.user
  });
};

exports.edit = function(req, res) {
  return res.render('users/edit', {
    user: req.user
  });
};

exports.update = function(req, res) {
  var b;
  b = req.body;
  return Users.update({
    name: req.params.name
  }, {
    name: b.name,
    email: b.email,
    age: b.age
  }, function(err) {
    return res.redirect("/users/" + b.name);
  });
};

exports.destroy = function(req, res) {
  return Users.remove({
    name: req.params.name
  }, function(err) {
    return res.redirect('/users');
  });
};

exports.load = function(req, next, name) {
  return Users.find({
    name: name
  }, function(err, docs) {
    req.user = docs[0];
    return next();
  });
};
