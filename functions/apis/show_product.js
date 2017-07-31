
'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();

var request;
var response;



exports.sendProduct = function(req,res) {
			
		request = req;
		response = res;
		var pid = req.body.pid;
		var genId = req.body.genId;
		var returnJson = {
			similar:[]
		};

		// We have  genreId, show Similar Genre Id
		var booksRef = db.ref("genres");
		booksRef.orderByChild("baseCategory").equalTo(pid).
		once("value",snap => {
			snap.forEach(singleSnap => {
				// Each Similar Products , get Image,Pid,cost,name maybe
				returnJson.similar.push({
					pid:singleSnap.val().pid,
					imageURL:singleSnap.val().imageURL,
					amount : singleSnap.val().price7,
					name:singleSnap.val().productName
				});
			});

			// Responsebody Ready
			if (!res.headersSent) {
				res.send(returnJson);
			}
		});



















		// var pidPath = 'books/'+pid;
		// var pidRef = db.ref(pidPath);
		// pidRef.once("value",snap=>{
		// 	if (!snap.val()) {

		// 		//PRoduct Exists
		// 		if (!response.headersSent) {
		// 			response.send(snap.val());
		// 		}
		// 	}
		// 	else{
		// 		if (!response.headersSent) {
		// 			response.send({status:0});
		// 		}	
		// 	}
		// }
		// ,err=>{
		// 	console.log("Error: "+err);
		// 	if (!response.headersSent) {
		// 		response.send({status:0})
		// 	}
		// });
};



