'use strict';

var express = require('express');
var admin = require("firebase-admin");


var db = admin.database();



// get Partner Id from OrderId
exports.broadcastToPartner = function(orderId){

		console.log("Updating Partner About OrderId: "+orderId);
		var orderPath = "orders/"+orderId;
		var ordersRef = db.ref(orderPath);
		var oId = orderId;

		
		console.log("Order Path "+orderPath);
		ordersRef.once("value",snapshot => {
				// The Single Order 

				//Get The products
				var productsCount = snapshot.val().products.length;
  				console.log("The Product Counts in Order is "+ productsCount);
	  			for (var i =0;i < productsCount; i++) {
  					var pidVal = snapshot.val().products[i].pid;
  					var partnerId = snapshot.val().products[i].partnerId;
  					var pidName = snapshot.val().products[i].productName;
  					var imageURL = snapshot.val().products[i].imageURL;
  					var amount = snapshot.val().products[i].amountForWindow;
  					var windowId = snapshot.val().products[i].windowId;
  					console.log("Updating Partner  " + partnerId);

  					// Udpate Every Partner in the Order
  					updatePartner(pidVal,pidName,imageURL,windowId,amount,oId,partnerId);
  				}
  		});
  		
			
};



function updatePartner(pid,productName,imageURL,windowId,amount,oId,partnerId) {
		console.log("Updating Rs "+amount +" to Partner "+partnerId);
		writeamount(partnerId,productName,imageURL,amount,windowId,oId);
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


function writeamount(partnerId,productName,imageURL,new_amount,windowId,orderId) {
	console.log("Writing Amount ");
	var partnerPath = "partners/"+partnerId;

	var partnerRef = db.ref(partnerPath);


	// Write Amont to Parnter home

	partnerRef.once("value",snap =>{
			var currentAmount = snap.val().currentAmount;

			console.log("The Current Amount in his balance is "+currentAmount);
			var updatedamount = new_amount + currentAmount;
			var updatedamountObj = {
				currentAmount:updatedamount
			};

			console.log(" Updating new Amount to "+updatedamount);
			partnerRef.update(updatedamountObj,err =>{

				if (err) {
					console.log("Error Happend in updating Emaount "+err);
				}

				console.log("Writen Home Amount SuccessFully");
			});
	});




	console.log("Saving Trsanction");
	// Save the Trsanction in Partner Montly 
	var newTransaction = {
		partnerId:partnerId,
		orderId:orderId,
		productName:productName,
		imageURL:imageURL,
		amount:new_amount,
		windowId:windowId,
		timeStamp:Date.now()
	};






	var d = new Date();
	var month = d.getMonth();
	var transactionPath = "partnerTransactions/"+partnerId+'/earnings/'+month;
	console.log("Saving Transaction at :"+transactionPath);

	var transRef = db.ref(transactionPath);
	transRef.push(newTransaction,err => {
		
		if (err) {
			console.log("Error at Updating Transaction "+err);

		}
		console.log("Written Transaction");
		console.log("Partner Updated");
	});


}; 