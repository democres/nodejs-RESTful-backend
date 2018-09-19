var app = require('./app');
var port = 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://david:David123@ds163382.mlab.com:63382/davidtestdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
