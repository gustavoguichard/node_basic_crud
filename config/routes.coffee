user = (app, user)->
  app.param 'name', (req, res, next, name)->
    user.load(req, next, name)

  app.get('/users', user.index)          
  app.get('/users/new', user.new)
  app.post('/users', user.create)
  app.get('/users/:name', user.show)
  app.get('/users/:name/edit', user.edit)
  app.put('/users/:name', user.update)
  app.delete('/users/:name', user.destroy)

module.exports.user = user