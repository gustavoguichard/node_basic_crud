var mongoOptions, mongoose, uristring;

mongoose = require('mongoose');

uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/helloExpress';

mongoOptions = {
  db: {
    safe: true
  }
};

mongoose.connect(uristring, mongoOptions, function(err, res) {
  if (err) {
    return console.log("ERROR connecting to: " + uristring + ". " + err);
  } else {
    console.log("Succeeded connected to: " + uristring);
    return module.exports = mongoose;
  }
});
