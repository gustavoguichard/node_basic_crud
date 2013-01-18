var EventEmitter, logger, mongoOptions, mongoose, uristring;

mongoose = require('mongoose');

EventEmitter = require('events').EventEmitter;

logger = new EventEmitter();

uristring = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/helloExpress';

mongoOptions = {
  db: {
    safe: true
  }
};

mongoose.connect(uristring, mongoOptions, function(err, res) {
  if (err) {
    return console.log("ERROR connecting to: " + uristring + ". " + err);
  }
});

module.exports = mongoose;
