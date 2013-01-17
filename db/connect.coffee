mongoose = require 'mongoose'
mongoose.connect process.env.MONGOLAB_URI || 'mongodb://localhost/helloExpress'

module.exports = mongoose