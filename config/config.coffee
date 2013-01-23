module.exports =
  development:
    root: require('path').normalize(__dirname + '/..')
    port: process.env.PORT || 3000
    app:
      name: 'NodeJs structure'
    db: 'mongodb://localhost/helloExpress'
    google:
      clientID: "APP_ID"
      clientSecret: "APP_SECRET"
      callbackURL: "http://localhost:3000/auth/google/callback"
  test: {}
  production:
    root: require('path').normalize(__dirname + '/..')
    port: process.env.PORT
    app:
      name: 'NodeJs structure'
    db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI
    google:
      clientID: "APP_ID"
      clientSecret: "APP_SECRET"
      callbackURL: "http://my-node-structure.herokuapp.com/auth/google/callback"

console.log "App configuration loaded"