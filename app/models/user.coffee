mongoose = require 'mongoose'

UserSchema = new mongoose.Schema 
  name: 
    type: String
    default: ""
  email: String
  age: Number

mongoose.model 'User', UserSchema