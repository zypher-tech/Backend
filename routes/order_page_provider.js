




var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");




/* GET Orders Page from pUblic Directory */

exports.initializePage = function(req, res){

  res.send('./public/orders_page.html', { title: 'Current Orders' });

};
