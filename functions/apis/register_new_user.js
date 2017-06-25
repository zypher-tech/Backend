

'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();


var userSchema = {
	userId:'',
	firstName:'',
	lastName:'',
	emailAddress:'',
	phoneNumber:'',
	password:'',
	defLat :'',
	defLon:'',
	myOrders:[],
	myCart:[]

};

var failed = {
	status :'0'
};


/*Getting user variables*/

exports.register =  function(req,res) {


	///Get Details
	userSchema.firstName = req.body.firstName;
	userSchema.lastName = req.body.lastName;
	userSchema.emailAddress = req.body.emailAddress;
	userSchema.password= req.body.password;
	userSchema.phoneNumber = req.body.phoneNumber;

 	userSchema.usersRef  = db.ref("users");
 	var userCount = 0;
};




function pushUser(userCount){

	console.log("pushing user at "+userCount);

	//Adding Count to user Object
	userSchema.userId = userCount;


	//Pushing to User Ref
     var usersRef = db.ref("users");
     usersRef.child(userSchema.userId).set(userSchema)
     .then(snap => {

     	//pushed, user object, is now "snap"
     	//Appending operation status to result
     		userSchema.status = '1';
     		res.send(userSchema);
     })
     .catch(function(error){
     	console.log("Error at Pushing Registartion "+error);
     	res.send(failed);

     });
};