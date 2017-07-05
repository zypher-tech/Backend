

'use strict';
var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");



// Get a database reference to our blog
var db = admin.database();
var request;
var response;

var ordersRef = db.ref("orders");


var orderSchema = {
	isAccepted:'',
	orderId : '',
	userId :'',
	firstName:'',
	lastName:'',
	phoneNumber:'',
	
	orderLat:'',
	orderLon :'',
	
	products:[

	],
	orderStatus:'',
	rider:{
		riderId:'',
		riderPhoneNumber:'',
		riderName:''
	},
	payment:{
		amount:'',
		isCod:'',
		codCollected:''
	},
	timingEngine:{
		orderInsertedAt:'',
		orderAcceptedAt:'',
		riderAcceptedAt:'',
		dispatchedAt:'',
		deliveredAt:'',
		returnDate:''
},
	orderFulfillment:{
		returnedAt:'',
		returnCondition:''

	}
};
var orderFailed = {
	isAccepted: 0
};

// A Order has been Received From user
//Check Whether Product is available
// IF Avaliable Update Quantity from Current Children
// send to Dispatch Unit
// brodcast to Riders
//
//

exports.placeOrderForuser = function(req, res){

	response = res;
	request = req;
	var order_count = 1;
	// console.log("Inside Order Placer");

	console.log("Placing Order");
 	// Genereate New Order Id
 	var ordersRef = db.ref("orders");
 	ordersRef.once("value", function(snap) {
  		 insertOrder(snap.numChildren()+1);
	});
	// orders_Ref.transaction(function(snapshot) {
 //  			order_count++;
	// }).then(insertOrder(order_count));
};

function insertOrder(order_count){

	// Order Model
	var oScheme = {
		isAccepted:'',
		orderId : '',
		userId :'',
		firstName:'',
		lastName:'',
		phoneNumber:'',
		deliveryStatus:'',
		orderLat:'',
		orderLon :'',
		products:[

		],
		orderStatus:'',
		rider:{
			riderId:0,
			phoneNumber:'',
			riderName:''
		},
		payment:{
			amount:'',
			isCod:'',
			codCollected:''
		},
		timingEngine:{
			orderInsertedAt:'',
			orderAcceptedAt:'',
			riderAcceptedAt:'',
			dispatchedAt:'',
			deliveredAt:'',
			returnDate:'',
		},
		orderFulfillment:{
			returnedAt:'',
			returnCondition:'',
		}
	};
	console.log("Insert Order Method  Order Id "+order_count);
	oScheme.orderId = order_count;
 	oScheme.userId = request.body.userId;
 	oScheme.firstName = request.body.firstName;
 	oScheme.lastName  = request.body.lastName;
 	oScheme.orderLat = request.body.orderLat;
 	oScheme.orderLon = request.body.orderLon;
 	oScheme.payment.amount = request.body.amount;   // The Total Amount of The Transaction
 	oScheme.phoneNumber = request.body.phoneNumber;
 	oScheme.timingEngine.orderInsertedAt = Date.now();
 	//get the List of products
 	console.log("Getting Products for Order "+oScheme)
 	var productsChosenCount = request.body.products.length;
 	for (var i =0;i < productsChosenCount;i++) {
 			console.log('inside loop');
			try{
		 		//Get product Variables
	 			var pid = request.body.products[i].pid;
				var pName = request.body.products[i].productName;
				var pImage = request.body.products[i].imageURL;
				var windowId = request.body.products[i].windowId;
				var partnerId =  request.body.products[i].partnerId;
				var amountForWindow = request.body.products[i].amountForWindow;   // The Cost for the Window
 		 		oScheme.products.push(
 		 			{
 		 			pid: pid,
 		 	        productName:pName,
 		 			imageURL: pImage,
 		 			partnerId:partnerId,
 		 			windowId:windowId,
 		 			amountForWindow:amountForWindow
 		 		   });  	// Push to Products Array
	 		}
	 		catch(err){
	 			if(!response.headersSent){
					response.send(orderFailed);
				}
	 		}
 	
     }
 	// update Order Status

 	//todo Update Return Status
 	oScheme.timingEngine.orderInsertedAt = Date.now();
 	oScheme.deliveryStatus = 0;
 	console.log("Order Construction complete, pushing...");
 		//Timing Related Attiribs
 		// orderSchema.timingEngine.orderAcceptedAt = Date.now();
 	var ordersRef = db.ref("orders");
	ordersRef.child(order_count).set(oScheme)
		.then(snap=>{
			console.log("Order Pushed , Sending response");
			if(!response.headersSent){
				oScheme.isAccepted = 1;
				response.send(oScheme);
			}
		})
		.catch(err=>{

			if(!response.headersSent){
				response.send(orderFailed);
			}
		});

	
};
function errorHanlder(){
	console.log("Inside Error Handler ");
     orderFailed.isAccepted  = 0;
     if(!response.headersSent){

				response.send(orderFailed);
		}
		
};
