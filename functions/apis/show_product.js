
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
		var pidPath = 'books/'+pid;
		var pidRef = db.ref(pidPath);
		pidRef.once("value",snap=>{
			if (!snap.val()) {

				//PRoduct Exists
				if (!response.headersSent) {
					response.send(snap.val());
				}
			}
			else{
				if (!response.headersSent) {
					response.send({status:0});
				}	
			}
		}
		,err=>{
			console.log("Error: "+err);
			if (!response.headersSent) {
				response.send({status:0})
			}
		});

};



