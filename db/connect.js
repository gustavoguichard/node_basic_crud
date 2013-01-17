var mongoOptions, mongoose, uristring;

mongoose = require('mongoose');

uristring = process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost/helloExpress';

mongoOptions = {
  db: {
    safe: true
  }
};

mongoose.connect(uristring, mongoOptions, function(err, res) {
  if (err) {
    return console.log("ERROR connecting to: " + uristring + ". " + err);
  } else {
    return console.log("Succeeded connected to: " + uristring);
  }
});

module.exports = mongoose;
