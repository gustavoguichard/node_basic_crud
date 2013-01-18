var UserSchema, Users, mongoose;

mongoose = require('../../db/connect');

UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

Users = mongoose.model('Users', UserSchema);

module.exports = Users;
