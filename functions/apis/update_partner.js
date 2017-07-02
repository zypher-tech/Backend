'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();



// get Partner Id from OrderId
exports.broadcastToPartner = function(orderId){

		console.log("Broadcasting OrderId: "+orderId);
		var orderPath = "orders/"+orderId;
		var ordersRef = db.ref(orderPath);
		var oId = orderId;

		
		console.log("Order Path "+orderPath);
		ordersRef.once("value",snapshot => {
				// The Single Order 

				//Get The products
				var productsCount = snapshot.val().products.length;

  				console.log("Product Counts are "+ productsCount);
	  			for (var i =0;i < productsCount;i++) {
  					var pidVal = snapshot.val().products[i].pid;
  					var pidName = snapshot.val().products[i].productName;
  					console.log("for Loop - Broadcasting: pid "+pidVal);

  					// Udpate Every Partner in the Order
  					updatePartner(pidVal,25,pidName,"2 Weeks",oId);
  					// var amountCharged = snapshot.val().products[i].amount;
  					// have some Fraction
  	// 				// var duration = snapshot.val().products[i].duration
  				//var who
  				}
  	
  		});
  		
			
};



function updatePartner(pid,amount,productName,duration,orderId) {
	console.log("getting Parter Details for "+pid);
		var bookpath = "books/"+pid;
		var booksRef = db.ref(bookpath);
		booksRef.once("value",snap => {
			console.log("Loaded Book");
			var partnerId = snap.val().partnerId;
			console.log("PartnerId :"+partnerId);
			writeamount(partnerId,productName,amount,duration,orderId);
		});
};


// 	console.log("Inside broadcastToPartner method: "+pid);
// 	var bookpath = "books/"+pid;
// 	var booksRef = db.ref(bookpath);
// 	booksRef.once("value",snap => {
// 		var partnerId = snap.val().partner.partnerId;
// 		console.log("loaded Book");
// 		writeamount(partnerId,productName,amount,duration);
// 	});


// };

97507 99444
function writeamount(partnerId,productName,amount,duration,orderId) {
	console.log("Writing Amount to Partner");
	var partnerPath = "partners/"+partnerId;
	var partnerRef = db.ref(partnerPath);
	var newTransaction = {
		partnerId:partnerId,
		orderId:orderId,
		productName:productName,
		amount:amount,
		duration:duration,
		timeStamp:Date.now()
	};

	var d = new Date();
	var month = d.getMonth();
	var transactionPath = "partnerTransactions/"+partnerId+'/earnings/'+month;
	console.log("Pusing :"+transactionPath);

	var transRef = db.ref(transactionPath);
	transRef.push(newTransaction,err => {
		console.log("Written Transaction");
		if (err) {
			console.log("Error "+err);

		}
	});
}; 