

'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();
var user = {

};

var wrongPass = {

};
var noUser = {

};




// Get Request Variales
exports.doLogin = function(req,res) {


		var email = req.body.emailAddress;
		var pass  = req.body.password;


		//Run it through user Loops
		var usersRef = db.ref("users");
		// usersRef.on("child_added",(snap,prevKey) => {
		// 		if (snap.val().emailAddress == email) {
		// 				if (snap.val().password == password ) {
		// 						//Right Password
		// 						res.send(snap.val());
		// 						console.log("Snap Sent ");

		// 				}
		// 				else{
		// 					//Wrong Password
		// 					res.send('status:0')
		// 				}

		// 		}
		// 		else{
		// 			//No Match

		// 		}
				
		// })
		// .then(noUser(),function(error)=>{
		// 	res.send()
		// });
};

function noUser(){


	console.log("No user Login ");
};