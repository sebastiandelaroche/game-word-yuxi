


var express 		= require('express');
var path 			= require('path');
var favicon 		= require('serve-favicon');
var logger 			= require('morgan');
var cookieParser	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var mongoose 		= require('mongoose');

// my module
var dbconfig 		= require('./config/db');

var index = require('./routes/index');
var words = require('./routes/words');
var players = require('./routes/players');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(dbconfig.url, function(err, res) {  
	if(err) console.log('ERROR: connecting to Database. ' + err);
});

app.use('/'		, index);
app.use('/words', words);
app.use('/players', players);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
