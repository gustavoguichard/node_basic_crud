var user;

user = function(app, user) {
  app.param('name', function(req, res, next, name) {
    return user.load(req, next, name);
  });
  app.get('/users', user.index);
  app.get('/users/new', user["new"]);
  app.post('/users', user.create);
  app.get('/users/:name', user.show);
  app.get('/users/:name/edit', user.edit);
  app.put('/users/:name', user.update);
  return app["delete"]('/users/:name', user.destroy);
};

module.exports.user = user;
