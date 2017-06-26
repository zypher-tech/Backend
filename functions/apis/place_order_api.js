

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
	deliveryStatus:'',
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
  		 insertOrder(snap.numChildren());
	});
	// orders_Ref.transaction(function(snapshot) {
 //  			order_count++;
	// }).then(insertOrder(order_count));
};

function insertOrder(order_count){
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
 	oScheme.phoneNumber = request.body.phoneNumber;
 	//get the List of products

 	console.log("Got Varaibles " + oScheme.phoneNumber);
 	var productsChosenCount = request.body.products.length;
 	for (var i =0;i < productsChosenCount;i++) {
 			console.log('inside loop');
			try{
		 		//Individual Products in Response
	 			var pid = request.body.products[i].pid;

	 			//Insert into this Order
	 			//Prepare Packing
	 			//Add to PartnerBroadcast Tables
				var pName = request.body.products[i].productName;
				console.log("Getting Products [i] "+pName);
 				//parePacking(pid);
 		 		oScheme.products.push({pid: pid, productName: pName});
	 		}
	 		catch(err){
	 			if(!response.headersSent){
					response.send(orderFailed);
				}
	 		}
 		//orderSchema.products.product[i].imageUrl = response.products[i].imageUrl;
     }
 	// update Order Status
 	


 	console.log("Order Construction complete, pushing...");
 		//Timing Related Attiribs
 		// orderSchema.timingEngine.orderAcceptedAt = Date.now();
 	var ordersRef = db.ref("orders");
	ordersRef.child(oScheme.orderId).set(oScheme)
		.then(snap=>{
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
	console.log("Inside Erro Handler :");
     orderFailed.isAccepted  = 0;
     if(!response.headersSent){
				response.send(orderFailed);
		}
		
};
