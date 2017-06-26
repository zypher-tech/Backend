

'use strict';
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
//The Root path of Db
var db = admin.database();
// Individual Modeules
/*These are Individual Modules which take care of
	*specific tasks
	*Each module has only  one contructor accepting request,response as objects
*/
// User Related Modules


// var loginHandler = require('./apis/login_handler');
// var genreView = require('./apis/genres_viewer_api');
// var userOrderHandler = require('./apis/place_order_api');
// //Order Related Modules
// var riderHandler = require('./apis/rider_order_handler');

// START OF FUCNTIONS ---------------------------->

/*Home Page*
	Pulls Data the Best Rated data from  books and Combos
	no Request params
*/



// ===================================================
// ONE----->


// exports.home =functions.https.onRequest((request, response) => {
// 		var homemod = require('./apis/home_api');

// 		homemod.initialize(request,response);
//   });
// =====================================================

/*View a Single Product
	Req Params:
		{"pid" : ""}
*/

 // TWO ------->
// =====================================================

 ////// WORKING//////////////////////////////
//
// exports.showProduct = functions.https.onRequest((request, response) => {
// 		var showProduct = require('./apis/show_product');
//
// 		showProduct.sendProduct(request,response);
// 	});

// =====================================================


// =====================================================

  ////// WORKING//////////////////////////////

// exports.placeOrderForuser =  functions.https.onRequest((request, response) => {
// 			var userOrderHandler = require('./apis/place_order_api');

// 		userOrderHandler.placeOrderForuser(request,response);
// });

// =====================================================



/*This is used for all saving all Tokends of Kind
 * request parms are
 	{
		"profileId":"",
		"tokenId","",
		"fromWhere": can be "0"- user ,"1" -- rider,"2"-->partner
 	}
*/
// FOUR-->

// =====================================================

////// WORKING//////////////////////////////

// exports.saveFCMToken = functions.https.onRequest((req,res) => {
// 	 	//First get from where FCM is Received
// 	 	var tokenManager = require('./apis/token_manager');

// 	 	tokenManager.saveToken(req,res);
// 	});

// =====================================================



/*User Registration Handler

	"firstName","lastName","emailAddress","password","phoneNumber"
*/

//FIVE-->
// =====================================================
////// WORKING//////////////////////////////

// exports.registerNewUser =  functions.https.onRequest((req,res) => {
// 		var newUserHandler = require('./apis/register_new_user');
// 		newUserHandler.register(req,res);
// 	});

//======================================================
//SIX---->

// exports.genreViewer =  functions.https.onRequest((req,res) => {

// 	// genreView.showByGenres(req,res);

// });
// =====================================================


/*
	SEVEN

// */

//================================================================
////// WORKING//////////////////////////////

// exports.orderIsRecevied = functions.database.ref('/orders/{pushId}').onWrite(snapshot => {

//       // Grab the current value of what was written to the Realtime Database.

// 		var orderSchema = {
// 			isAccepted:'',
// 			orderId : '',
// 			userId :'',
// 			firstName:'',
// 			lastName:'',
// 			phoneNumber:'',
// 			deliveryStatus:'',
// 			orderLat:'',
// 			orderLon :'',
// 			products:[

// 			],
// 			orderStatus:'',
// 			rider:{
// 				riderId:'',
// 				riderPhoneNumber:'',
// 				riderName:''
// 			},
// 			payment:{
// 				amount:'',
// 				isCod:'',
// 				codCollected:''
// 			},
// 			timingEngine:{
// 				orderInsertedAt:'',
// 				orderAcceptedAt:'',
// 				riderAcceptedAt:'',
// 				dispatchedAt:'',
// 				deliveredAt:'',
// 				returnDate:'',
// 			},
// 			orderFulfillment:{
// 				returnedAt:'',
// 				returnCondition:''
// 				}
// 		};

//       console.log("Broadcasting orderId : "+snapshot.data.val().orderId);

//       //
//       orderSchema.orderId  = snapshot.data.val().orderId;
//       orderSchema.firstName = snapshot.data.val().firstName;
//       orderSchema.lastName = snapshot.data.val().lastName;

//       orderSchema.phoneNumber = snapshot.data.val().phoneNumber;
//       orderSchema.orderLat = snapshot.data.val().orderLat;
//       orderSchema.orderLon = snapshot.data.val().orderLon;
//       orderSchema.payment.amount = snapshot.data.val().payment.amount;
//       orderSchema.timingEngine.orderAcceptedAt = snapshot.data.val().timingEngine.orderAcceptedAt;
//       var productsCount  = snapshot.data.val().products.length;

//       for (var i = 0;i<productsCount ;i++) {
//       	 var pidval = snapshot.data.val().products[i].pid;
//        	 var productNameval =  snapshot.data.val().products[i].productName;
//        	 orderSchema.products.push({pid: pidval, productName: productNameval});
//         // orderSchema.products[i].pid = pid;
//         // orderSchema.products[i].productName = productName;
//       }
//       var updateRider = require('./apis/update_rider');
// 	  var updatePartner = require('./apis/update_partner');
//       // updatePartner.broadcastToPartner(orderSchema);
//       updateRider.broadcastToRiders(orderSchema);
//  });

// =====================================================

// // EIGHT
// exports.getPartnerHome = functions.https.onRequest((req,res) => {
// 	 var partnerId = req.body.partnerId;
// 	 var partnerPath = "partners/"+partnerId;
// 	 var partnerRef = db.ref(partnerPath);
//    partnerRef.once("value",snap=>{

//      if (!res.headersSent) {
//           res.send(snap.val());
//         }
//      }
//    });
// });

// =====================================================

//NINE

exports.changeDeliveryStatus = functions.https.onRequest((req,res) => {

    var orderId = req.body.orderId;
    var riderId = req.body.riderId;
    var riderName = req.body.riderName;
    var riderNumber  = req.body.phoneNumber;
    var orderPath = 'orders/'+orderId;
    var ordersRef = db.ref(orderPath);
    var updateOrderStatus =  {
    	deliveryStatus:1,
    	rider:{
    		riderId:riderId,
    		riderName:riderName,
    		riderNumber:riderNumber
    	},
    	deliveredAt:Date.now(),
    	timingEngine:{
			
			deliveredAt:Date.now()
		}
    };
    ordersRef.update(updateOrderStatus,err => {
    	console.log("inside callback ");
    		if (err) {
    			if (!res.headersSent) {
    				res.send({status:0});
    			}
    		}
    }).then(function(){
    	console.log("inside then ");
    	if (!res.headersSent) {
    		res.send({status:1});
    	}
    });
    


});




// ======================================================
//TEN
// //RIDER ORDER Handler
// exports.RiderAcceptedOrder = functions.database.ref('/orders/{pushId}/rider').onWrite(snapshot => {

//     console.log(snapshot.val());
// });



// // The General Error Handler
// function error(){

//     	console.log("Error in Pushing Order");
// };
