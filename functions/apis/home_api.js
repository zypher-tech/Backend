


'use strict';

var express = require('express');
var admin = require("firebase-admin");

const cors = require('cors')({origin: true});

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
	.then(getCombos);
};




function getCombos(snapshot){
	console.log("Current Json "+returnJson);
	var ref = db.ref("combos");
	ref.once("value", function(snapshot) {

  	  console.log("Value from Combos Table "+ snapshot.val());
  	  returnJson.combos = snapshot.val();

	}).then(sendJson);
};

function sendJson(){
	//get Individual Products
	console.log("Final Json "+returnJson);
	if (!response.headersSent) {
		 response.set('Access-Control-Allow-Origin', "*")
  		response.set('Access-Control-Allow-Methods', 'GET, POST')
		response.status(200).send(returnJson);
	}
};
