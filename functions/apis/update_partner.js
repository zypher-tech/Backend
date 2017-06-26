'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();



exports.broadcastToPartner = function(pid,amount,productName,duration) {


	console.log("Inside broadcastToPartner method");
	var bookpath = "books/"+pid;
	var booksRef = db.ref(bookpath);
	booksRef.once("value",snap => {
		var partnerId = snap.val().partner.partnerId;
		console.log("loaded Book");
		writeamount(partnerId,productName,amount,duration);
	});


};

function writeamount(partnerId,productName,amount,duration) {
	console.log("Writing Amount to Partner");
	var partnerPath = "partners/"+partnerId+'/earnings';
	var partnerRef = db.ref(partnerPath);
	
	var earnings = {
			productName:productName,
			amount:amount,
			duration:duration,
			transactionTime:Date.now()

	};
	partnerRef.update(earnings,err => {
		if (err) {
			console.log("Error "+err);
		}
	});
};