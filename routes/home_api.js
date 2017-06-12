


'use strict';

var express = require('express');
var admin = require("firebase-admin");

// Get a database reference to our blog
var db = admin.database();
const router = express.Router();

exports.initialize = function(req, res){
 var db = admin.database();
 var ref = db.ref("books");
	ref.once("value", function(snapshot) {
  		console.log('Value from books : '+snapshot.val());
  		res.send(snapshot.val());
	});
};
