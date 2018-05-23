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
mongoose.connect('mongodb://localhost/local_library');
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
app.get('/signup', function(req, res){
  res.send('signup');
});

app.post('/signup', function(req, res){
  if(!req.body.id || !req.body.password){
     res.status("400");
     res.send("Invalid details!");
  } else {
     Users.filter(function(user){
        if(user.id === req.body.id){
           res.render('signup', {
              message: "User Already Exists! Login or choose another user id"});
        }
     });
     var newUser = {id: req.body.id, password: req.body.password};
     Users.push(newUser);
     req.session.user = newUser;
     res.redirect('/protected_page');
  }
});
function checkSignIn(req, res){
  if(req.session.user){
     next();     //If session exists, proceed to page
  } else {
     var err = new Error("Not logged in!");
     console.log(req.session.user);
     next(err);  //Error, trying to access unauthorized page!
  }
}
app.get('/protected_page', checkSignIn, function(req, res){
  res.render('protected_page', {id: req.session.user.id})
});

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', function(req, res){
  console.log(Users);
  if(!req.body.id || !req.body.password){
     res.render('login', {message: "Please enter both id and password"});
  } else {
     Users.filter(function(user){
        if(user.id === req.body.id && user.password === req.body.password){
           req.session.user = user;
           res.redirect('/protected_page');
        }
     });
     res.render('login', {message: "Invalid credentials!"});
  }
});

app.get('/logout', function(req, res){
  req.session.destroy(function(){
     console.log("user logged out.")
  });
  res.redirect('/login');
});

app.use('/protected_page', function(err, req, res, next){
console.log(err);
  //User should be authenticated! Redirect him to log in.
  res.redirect('/login');
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
