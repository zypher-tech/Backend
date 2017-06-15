
'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();




exports.sendProduct = function(req,res) {
	// body...


	//First Get the Pid that the user Wants to see
	var pid = req.body.pid;
	ordersRef.once("value")
			.then(function (snapshot) {

				//incremnet Count
				snapshot.forEach(function (singleData) {
						
						if (pid == singleData.pid) {
							//Matches
							res.send(singleData);
						}
						else{
							//DO Nothinh
						}


			 });
			});
};



