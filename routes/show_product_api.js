

'use strict';

var express = require('express');
const router = express.Router();

exports.initialize = function(req, res){
  res.send('Hello Fucking World, I\'m Here');
   var pid   = req.params.pid;
};
