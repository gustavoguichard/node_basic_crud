var UserSchema, Users, app, express, http, mongoose;

express = require('express');

mongoose = require('mongoose');

http = require('http');

app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express["static"](__dirname + '/public'));
  app.use(function(req, res) {
    return res.send(404, "four - oh - four");
  });
  return app.use(function(err, req, res, next) {
    return res.status(err.status || 404).send(err.message);
  });
});

mongoose.connect("mongodb://localhost/helloExpress");

UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

Users = mongoose.model('Users', UserSchema);

app.param('name', function(req, res, next, name) {
  return Users.find({
    name: name
  }, function(err, docs) {
    req.user = docs[0];
    return next();
  });
});

app.get('/users', function(req, res) {
  return Users.find({}, function(err, docs) {
    return res.render('users/index', {
      users: docs
    });
  });
});

app.get('/users/new', function(req, res) {
  return res.render('users/new');
});

app.get('/users/:name', function(req, res) {
  return res.render('users/show', {
    user: req.user
  });
});

app.get('/users/:name/edit', function(req, res) {
  return res.render('users/edit', {
    user: req.user
  });
});

app.post('/users', function(req, res) {
  var b;
  b = req.body;
  return new Users({
    name: b.name,
    email: b.email,
    age: b.age
  }).save(function(err, user) {
    console.log(user);
    if (err) {
      res.json(err);
    }
    return res.redirect("/users/" + user.name);
  });
});

app.put('/users/:name', function(req, res) {
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
});

app["delete"]('/users/:name', function(req, res) {
  return Users.remove({
    name: req.params.name
  }, function(err) {
    return res.redirect('/users');
  });
});

app.configure('development', function() {
  return app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function() {
  return console.log("Express server listening on port " + (app.get('port')));
});
