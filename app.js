var app, express, http, routes, usersController;

express = require('express');

http = require('http');

routes = require('./config/routes');

usersController = require('./app/controllers/user');

app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.set('views', __dirname + '/app/views');
  app.use(app.router);
  app.use(express["static"](__dirname + '/public'));
  app.use(function(req, res) {
    return res.redirect('/users');
  });
  return app.use(function(err, req, res, next) {
    return res.status(err.status || 404).send(err.message);
  });
});

app.configure('development', function() {
  return app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  return app.use(express.errorHandler());
});

routes.user(app, usersController);

http.createServer(app).listen(app.get('port'));

console.log("Express server listening on port " + (app.get('port')));

module.exports = app;
