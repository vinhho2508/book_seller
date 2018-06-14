var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter=require('./routes/catalog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var mongoose = require('mongoose');
//var dev_db_url = 'mongodb://localhost:@:27017/local_library'
//var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect('mongodb://localhost/book_sell');
//mongoose.createConnection('mongodb://localhost:27017/local_library').host;
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog',catalogRouter);

app.get('/signup', function(req, res){
  res.render('signup');
});
app.get('/login', function(req, res){
  res.render('login');
});

app.get('/admin', function(req, res){
  res.render('admin');
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
