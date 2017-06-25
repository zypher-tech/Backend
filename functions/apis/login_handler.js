

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
		usersRef.on("child_added",(snap,prevKey) => {
				if (snap.val().emailAddress == email) {
						if (snap.val().password == password ) {
								//Right Password
								if (!res.HeaderSent) {
									res.send(snap.val());
								}
								
								

						}
						else{
							//Wrong Password
							if (!res.HeaderSent) {
							     res.send({status:0});
								}
						
						}

				}
				else{
					//No Match
					if (!res.HeaderSent) {
							     res.send({status:01});
								}
					

				}

		})
		.then(noUser(),function(error)=>{
			if (!res.HeaderSent) {
			res.send({status:001});
			}	
		});
};

function noUser(){

if (!res.HeaderSent) {
			res.send({status:0001});
	}	
	
};
