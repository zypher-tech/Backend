

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
var userCount = 0;



exports.register =  function(req,res) {


	///Get Details
	userSchema.firstName = req.body.firstName;
	userSchema.lastName = req.body.lastName;
	userSchema.emailAddress = req.body.emailAddress;
	userSchema.password= req.body.password;
	userSchema.phoneNumber = req.body.phoneNumber;

 	userSchema.usersRef  = db.ref("users");
 	

 	//Get the Count of users
 	usersRef.once("value",snap => {
 		snap.forEach(snapshot=>{
 			userCount++;
 		});


 	}).then(pushUser(),error())
 	.catch(error=>{
 		console.log("Bad Happened "+error);

 	});

};




function pushUser(){

	console.log("pushing user at "+userCount);
	userSchema.userId = userCount;

     var usersRef = db.ref("users");
     usersRef.child(userSchema.userId).set(userSchema)
     .then(snap=>{
     		userSchema.status = '1';
     		res.send(userSchema);
     })
     .catch(function(error){
     	console.log("Error "+error);
     	res.send(failed);

     })




}