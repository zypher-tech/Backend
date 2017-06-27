'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();




exports.broadcastToPartner = function(orderId){

		console.log("Broadcasting OrderId: "+orderId);
		var orderPath = "orders/"+orderId;
		var ordersRef = db.ref(orderPath);
		
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
  					updatePartner(pidVal,25,pidName,"2 Weeks");
  					// var amountCharged = snapshot.val().products[i].amount;
  	// 				// var duration = snapshot.val().products[i].duration
  				}
  	
  		});
  		// 	productsToNotify.push({pid: pid, productName: pName});
			
};
function updatePartner(pid,amount,productName,duration) {
	console.log("getting Parter Details for "+pid);
		var bookpath = "books/"+pid;
		var booksRef = db.ref(bookpath);
		booksRef.once("value",snap => {
			console.log("Loaded Book");
			var partnerId = snap.val().partnerId;
			console.log("PartnerId :"+partnerId);
			writeamount(partnerId,productName,amount,duration);
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

function writeamount(partnerId,productName,amount,duration) {
	console.log("Writing Amount to Partner");
	// var partnerPath = "partners/"+partnerId+'/earnings';
	// var partnerRef = db.ref(partnerPath);
	
	// var earnings = {
	// 		productName:productName,
	// 		amount:amount,
	// 		duration:duration,
	// 		transactionTime:Date.now()

	// };
	// partnerRef.update(earnings,err => {
	// 	if (err) {
	// 		console.log("Error "+err);
	// 	}
	// });
}; 