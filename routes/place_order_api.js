var express = require('express');
var router = express.Router();


// Get a database reference to our blog
var db = admin.database();
const router = express.Router();
var request ;
var response;

var orderSchema = {
	orderId : '',
	userId :'',
	userName:'',
	userPhoneNumber:'',
	userDefLat:'',
	userDefLon :'',
	products:[
	  {
	  	pid:'',
        productName:'',
		imageUrl:''
	   },
	   {}
	],
	orderStatus:'',
	rider:{
		riderId:'',
		riderPhoneNumber:'',
		riderName:''
	},
	payment:{
		amount:'',
		isCod:''
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

}


// A Order has been Received From user
//Check Whether Product is available
// IF Avaliable Update Quantity from Current Children
// send to Dispatch Unit
// brodcast to Riders
//
//

exports.placeOrderForuser = function(req, res){

	response = res;
	console.log("inside Home");
 	var db = admin.database();
 	var ordersRef = db.ref("orders");
 	var order_count = 0;
 	// Genereate New Order Id
 	ordersRef.on('child_added',function(snap){
 		order_count++;

 	})
 	.then(inserOrder,error)



};

function inserOrder(){

	var db = admin.database();
 	var ordersRef = db.ref("orders");

 	// get User Related Indo
 	orderSchema.orderId = order_count;
 	orderSchema.userName = response.userId;
 	orderSchema.userPhoneNumber = response.userPhoneNumber;
 	orderSchema.userDefLat = response.userLat;
 	orderSchema.userDefLon = response.userDefLon;
 	//get the List of products
 	var productsChosenCount = response.products.length;
 	for (var i =0;i < productsChosenCount;i++) {
 		//Individual Products in Response
 		var pid = response.products[i].pid;

 		//Insert into this Order
 		//Prepare Packing
 		//Add to PartnerBroadcast Tables


 		orderSchema.products.product[i].pid = pid;
 		preparePacking(pid);
 		orderSchema.products.product[i].productName = response.products[i].productName;
 		orderSchema.products.product[i].imageUrl = response.products[i].imageUrl;
 	}
 	// update Order Status
 	orderSchema.orderStatus = '1';

 	//Timing Related Attiribs
 	// orderSchema.timingEngine.orderAcceptedAt = Date.now();
 	ordersRef.child(orderSchema.orderId).set(orderSchema);
}



/*This Function gives a Cloud Message to Admin Panel to Pack the Product */
function preparePacking(pid){

}
function error(){
	console.log("Error "+error);
};
