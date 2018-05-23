var User=require('./models/user');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.genre_list = function(req, res, next) {

    User.find()
      .exec(function (err, list_users) {
        if (err) { return next(err); }
        // Successful, so render.
        res.render('login', {list_users:  list_users});
      });
  
  };