module.exports = (app)->
  users = require '../app/controllers/users_controller'
  app.param 'name', (req, res, next, name)->
    users.load(req, next, name)

  app.get('/users', users.index)          
  app.get('/users/new', users.new)
  app.post('/users', users.create)
  app.get('/users/:name', users.show)
  app.get('/users/:name/edit', users.edit)
  app.put('/users/:name', users.update)
  app.delete('/users/:name', users.destroy)