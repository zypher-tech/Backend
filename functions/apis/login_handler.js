

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

		//query the users ref by Email 

		usersRef.orderByChild("emailAddress").equalTo(email).once("value",snap =>{
			res.send(snap.val());

		});























		// usersRef.on("child_added",(snap,prevKey) => {
		// 	console.log("Email Address "+snap.val().emailAddress);
		// 		if (snap.val().emailAddress == email) {
		// 			console.log("Password "+snap.val().password);
		// 				if (snap.val().password == password ) {
		// 						//Right Password
		// 						if (!res.headersSent) {
		// 							console.log("response Sent 1");
		// 							// res.send(snap.val());
		// 						}
								
								

		// 				}
		// 				else{
		// 					//Wrong Password
		// 					if (!res.headersSent) {
		// 					     console.log("response Sent 0");
		// 						}
						
		// 				}

		// 		}
		// 		else{

		// 		}

		// });
		
};

function newMethod(){
	console.log("NEw Method");
};
