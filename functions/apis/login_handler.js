

'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();



exports.doLogin = function(req,res) {


		var email = req.body.emailAddress;
		var pass  = req.body.password;

		var usersRef = db.ref("users");
		usersRef.on("child_added",(snap,prevKey) => {
				if (snap.val().emailAddress == email) {
						if (snap.val().password == password ) {
								//Right Password
								res.send(snap.val());

						}
						else{
							//Wrong Password
							res.send('status:0')
						}

				}
				else{

				}
				
		});