


'use strict';

var express = require('express');
var admin = require("firebase-admin");



exports.requestingBook = function(req,res) {
		var type = req.body.type;
			if (type ==0) {
				// ISBN 10
				var isbn10 = req.body.isbn10;
				searchIsbn10(isbn10);
			}
			else if(type == 1){
				// ISBN 10
				var isbn13 = req.body.isbn13;
				searchIsbn13(isbn13);


			}
			else if (type == 2) {
				// bookName
				var productName = req.body.productName;
				searchbyProductName(productName);


			}
}
function searchIsbn10(isbn10){
	var booksRef = db.ref("books");
	// booksRef.orderByChild("isbn10").on("value", snap=>{
	// 	console.log("Products "+snap.val());0000

	// });
};

function searchIsbn13(isbn13) {
	// body...
	var booksRef = db.ref("books");
};

function searchbyProductName(productName){
	var booksRef = db.ref("books");
};
