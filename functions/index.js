

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
//WORKING//////////////////////////////////////////////////////////////
// PULLS /partners/{partnerId}/home/{bookCount,orderedTimes,AmountEarned,ranking}

// exports.getPartnerHome = functions.https.onRequest((req,res) => {
	
// 	var partnerHome = require('./apis/partner_home');
// 	partnerHome.showHome(req,res);
// });

// =====================================================

//NINE

////// WORKING//////////////////////////////
//used when Rider delivering and Collectiing the amount for  order
// // It changes delivery status

// exports.changeDeliveryStatus = functions.https.onRequest((req,res) => {

//     var orderId = req.body.orderId;
//     var riderId = req.body.riderId;
//     var riderName = req.body.riderName;
//     var riderNumber  = req.body.phoneNumber;
//     var orderPath = 'orders/'+orderId;
//     var ordersRef = db.ref(orderPath);
//     var updateOrderStatus =  {
//     	deliveryStatus:1,
//     	rider:{
//     		riderId:riderId,
//     		riderName:riderName,
//     		riderNumber:riderNumber
//     	},
//     	deliveredAt:Date.now(),
//     	timingEngine:{
// 			deliveredAt:Date.now()
// 		}
//     };
//     ordersRef.update(updateOrderStatus,err => {
//     	console.log("inside callback ");
//     		if (err) {
//     			if (!res.headersSent) {
//     				res.send({status:0});
//     			}
//     		}
//     }).then(function(){
//     	console.log("inside then ");
//     	if (!res.headersSent) {
//     		res.send({status:1});
//     	}
//     });
    

// });




// ======================================================
//TEN
// //RIDER ORDER Handler
// exports.RiderAcceptedOrder = functions.database.ref('/orders/{pushId}/rider').onWrite(snapshot => {

//     console.log(snapshot.val());
// });
//===============================

// exports.getRiderOrders =  functions.https.onRequest((req,res) => {
// 		// var riderId = req.body.riderId;
// 		// var orderAssignRef = db.ref("orderAssignation/"+riderId+'/orders');
// 		// orderAssignRef.once("value",snap => {
				
// 		// });
// });


//==========================================================


//========================================================
	

// exports.getMyOrders = functions.https.onRequest((req,res)=> {
// 	var userId = req.body.userId;
// 	var ordersRef = db.ref("orders");
// 	ordersRef.orderbyChild("userId").equalTo(userId).once("value",snap => {
// 		console.log("Order Count So Far "+snap.val().orderId);
// 	});
// });

//========================================================


// exports.donatebooks = functions.https.onRequest((req,res)=> {
// 	var userId;
// 	var imageUrl;
// 	var bookName;
// 	var phoneNumber;
// 	var firstName;
// 	var bookCount;
// });


//========================================================


  //WORKING////////////////////////////////////////////////////
  /* Database Trigger - Invoked Whenever DeliveryStatus is Written 
  	{ Delivery Status Happens in only place, When rider Has delivered Order.
  		//Driver has Amount of Which Half('=') should go to Partners
  	}
   *
   *
//   */

// exports.updatePartnerAboutOrder = functions.database.ref('/orders/{pushId}/deliveryStatus').onWrite(snapshot => {

// 		// All Products must have parnters
// 		//get the Order that was delivered
// 		var orderId;
			
 	
// 		try{
// 			orderId =  snapshot.data.ref.parent.key;
// 		}
// 		catch(e){
// 				console.log("Error "+e);
// 		}
		



//   		var updatePartner = require('./apis/update_partner');
//   		// Since Order is fullfilled , we Have Money 
//   		//Send The Money Info to Partner
//   		updatePartner.broadcastToPartner(orderId);
//   });

//==============================================================
 

// exports.login = functions.https.onRequest((req,res) => {
// 	var loginHandler = require('./apis/login_handler');
// 	loginHandler.doLogin(req,res);
// });


//===============================================================

// exports.likebook = functions.https.onRequest((req,res) => {
// 	var likeHandler = require('./apis/like_handler');
// 	like_handler.performLike(req,res);
// });


//===============================================================

// exports.saveDefaultLocation = functions.https.onRequest((req,res)=>{
// 	var defLat = req.body.defLat;
// 	var defLon  = req.body.defLon;
// 	var userId = req.body.userId;
// 	var userPath = 'users/'+userId;
// 	var updateLat = {
// 		defLon:defLon,
// 		defLat:defLon
// 	};
// 	var userRef = db.ref(userPath);
// 	userRef.update(updateLat,err=>{
// 		if (err) {
// 			console.log("Error");
// 		}
// 	});
// });



//============================================================


// exports.searchProduct = functions.https.onRequest((req,res)=>{

// 		var searchText = req.body.searchText;
// 		var booksRef = db.ref("books");
// 		booksRef.once("value",snapshot=>{
// 				// if (snapshot.val().productName) {
// 						// Add to return Json;
// 						// See Also Paginated Request
// 				// }
// 		});
// 	});

//==============================================================
	//Request a Book

// exports.requestNewBook = functions.https.onRequest((req,res) => {
// 	var bookHandler  = require('./apis/book_requester');
// 	bookHandler.requestingBook(req,res);

// });
// // The General Error Handler
// function error(){

//     	console.log("Error in Pushing Order");
// };


//============================================

// exports.getGenres = functions.https.onRequest((req,res)=>{
// 		var genRef = "genres";
// 		genRef.once("value",snap=>{
// 			console.log("Genres :"+snap.val());
// 		});
// 	});

//==============================================

// exports.explore = functions.https.onRequest((req,res)=>{

// 		var exploreHandler = require('./apis/explore');
// 		exploreHandler.showExploreProducts(req,res);
// });


//=====================================================
// Working --- Partner/ user Adds a new Renting Collection
exports.rentMyCollection = functions.https.onRequest((req,res)=>{
	// A Partner Has sent a Image Link, saying he has new Image
	// 
	var id = req.body.profileId;
	var imageURL = req.body.imageURL;
	var partnerName = req.body.partnerName;
	var phoneNumber = req.body.phoneNumber;
	var fromWhere = req.body.fromWhere;
	var followId;
	var newSource = {
		followId:0,
		fromWhere:fromWhere,
		id:partnerId,
		imageURL:imageURL,
		partnerName:partnerName,
		phoneNumber:phoneNumber
	};
	var sourcePath = "platform/books/new";
	var sourceRef = db.ref(sourcePath);
	sourceRef.once("value",snap=>{
		followId = snap.numChildren();
	}).then(function(){
		newSource.followId = followId;
		console.log("Found  Follow Id "+followId);
		sourceRef.child(followId).set(newSource,err=>{
			if (err) {
				if (!res.headersSent) {
				res.send({status:0});
				}
			}
			else{
				if (!res.headersSent) {
				res.send({status:1});
				}
			}
		});	
	}).catch(function(){
		if (!res.headersSent) {
				res.send({status:0});
			}
	});

	
});


// exports.checkoutMoney = functions.https.onRequest((req,res)=>{
// 	// var partnerId = req.body.partnerId;
// 	// Get the Amount to be paid , get his location and Phone
// });

// ============================================================


// WORKING ////////////////////////////////////////////

// exports.getPartnerBook = functions.https.onRequest((req,res) =>{

// 	var partnerHome = require('./apis/partner_home');
// 	partnerHome.getBooksByPartnerId(req,res);

// });


//===========================================================


//WORKING//////////////////////////////////////

// exports.getPartnerTransactions =  functions.https.onRequest((req,res)=>{
// 	// Get his home Page
// 	var partnerId = req.body.partnerId;
// 	var d =new Date();
// 	var month = d.getMonth();
// 	var transactionPath = "partnerTransactions/"+partnerId+'/earnings/'+month;
// 	var transRef = db.ref(transactionPath);
// 	transRef.once("value", snap =>{
// 		res.send(snap.val());
// 	});

// });
