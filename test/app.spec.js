var app, http;

app = require('../app');

http = require('http');

describe('Server', function() {
  return it('should respond with 200 at /', function() {
    return http.get('/', function(res) {
      return res.should.have.status(200);
    });
  });
});
