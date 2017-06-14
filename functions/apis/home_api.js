


'use strict';

var express = require('express');
var admin = require("firebase-admin");


var response ;
var returnJson = {
	"combos":[],
	"products":[]
};

// Get a database reference to our blog
var db = admin.database();
const router = express.Router();

exports.initialize = function(req, res){

	response = res;
	console.log("inside Home API");
 	var db = admin.database();
 	var ref = db.ref("books");
	ref.once("value", function(snapshot) {

  	  console.log("Value from Products Table "+ snapshot.val());
  	  returnJson.products = snapshot.val();

	})
	.then(getCombos,error);
};

function error(){
	console.log("Error "+error);
};



function getCombos(snapshot){
	console.log("Current Json "+returnJson);
	var ref = db.ref("combos");
	ref.once("value", function(snapshot) {

  	  console.log("Value from Combos Table "+ snapshot.val());
  	  returnJson.combos = snapshot.val();

	}).then(sendJson,error);
};

function sendJson(){
	//get Individual Products
	console.log("Final Json "+returnJson);
	response.send(returnJson);
};
