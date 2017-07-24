

'use strict';
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({origin: "https:us-central1-bookaholic-786.cloudfunctions.net"});


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


exports.home =functions.https.onRequest((request, response) => {
		var homemod = require('./apis/home_api');

		homemod.initialize(request,response);
  });
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

exports.placeOrderForuser =  functions.https.onRequest((request, response) => {
			var userOrderHandler = require('./apis/place_order_api');

		userOrderHandler.placeOrderForuser(request,response);
});

// =====================================================



/*This is used for all saving all Tokends of Kind
 * request parms are
 	{
		"profileId":"",
		"tokenId","",
		"fr omWhere": can be "0"- user ,"1" -- rider,"2"-->partner
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

exports.registerNewUser =  functions.https.onRequest((req,res) => {
		var newUserHandler = require('./apis/register_new_user');
		newUserHandler.register(req,res);
	});

//======================================================
//SIX---->

exports.genreViewer =  functions.https.onRequest((req,res) => {

	var genView = require('./apis/genres_viewer_api');
	genView.showByGenres(req,res);

});
// =====================================================



exports.checkifBooksPresent = functions.https.onRequest((req,res) => {

		var isbn = req.body.isbn;
		var isbn10  = req.body.isten;
		var booksRef  = db.ref("books");
		if (isbn10 == 1 ) {
			booksRef.orderByChild("details/ISBN").equalTo(isbn).once("value",snap => {
					console.log("Child Exists  with isbn10");
			});
		}
		else{
			booksRef.orderByChild("details/ISBN13").equalTo(isbn).once("value",snap => {
					console.log("Child Exists with isbn13 ");
			});
		}
		

});

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
	 
//       // updatePartner.broadcastToPartner(orderSchema);
//       updateRider.broadcastToRiders(orderSchema);
//  });

// =====================================================

// // EIGHT
//WORKING//////////////////////////////////////////////////////////////
// PULLS /partners/{partnerId}/home/{bookCount,orderedTimes,AmountEarned,ranking}

exports.getPartnerHome = functions.https.onRequest((req,res) => {
	
	var partnerHome = require('./apis/partner_home');
	partnerHome.showHome(req,res);
});

// =====================================================

//NINE

////// WORKING//////////////////////////////
//used when Rider delivering and Collectiing the amount for  order
// // It changes delivery status

exports.changeDeliveryStatus = functions.https.onRequest((req,res) => {

try{


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
    		phoneNumber:riderNumber
    	},
       	timingEngine:{
			deliveredAt:Date.now()
		}
    };
    ordersRef.update(updateOrderStatus,err => {
    	console.log("inside callback ");
    		if (err) {
    			console.log("Error in Changing Delivery Status: "+err);
    			if (!res.headersSent) {
    				res.send({status:0});
    			}
    		}
    		else{
    			console.log("Good hit");
    			if (!res.headersSent) {
    				res.send({status:1});
    			}
    		}
    });
}
catch(e){
	console.log("Error in Changing Delivery Status:"+e);
}
    

});


//=================================================================
// Assign Rider Attributes to Order 
// // 

exports.assignOrderToRider = functions.https.onRequest((req,res) => {
		var assignOrderToRider = require('./apis/assign_order_to_rider');
		assignOrderToRider.updateOrder(req,res);
});



// ======================================================
//TEN
// //RIDER ORDER Handler
// exports.RiderAcceptedOrder = functions.database.ref('/orders/{pushId}/rider').onWrite(snapshot => {

//     console.log(snapshot.val());
// });
//===============================

// WORKING ,
// CHANGE RETURN object
// exports.getRiderOrders =  functions.https.onRequest((req,res) => {
// 		var returnJson = {
// 			"orders":[]
// 		};
// 		var riderId  = req.body.riderId;
// 		var ordersRef = db.ref("orders");
// 		ordersRef.orderByChild("rider/riderId").equalTo(riderId)
// 		.once("value",snap => {
				
// 				snap.forEach(singlesnap =>{
					
// 				});
// 		});

// });


//==========================================================


//========================================================
	
	//WORKING/////////////////////////////////
	//get the Orders of user , Queries order Node by userId

// exports.getMyOrders = functions.https.onRequest((req,res)=> {
// 	var userId = req.body.userId;
// 	var ordersRef = db.ref("orders");
// 	ordersRef.orderByChild("userId").equalTo(userId).once("value",snap => {
// 		if (!res.headersSent) {
// 			res.send(snap.val());
// 		}
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

exports.updatePartnerAboutOrder = functions.database.ref('/orders/{pushId}/deliveryStatus').onWrite(snapshot => {
		// All Products must have parnters
		//get the Order that was delivered

		// todo: if delivery Value is 0 // Leave
		console.log("DeliveryStatus Changed "+ snapshot.data.val());
		if(snapshot.data.val() == 0){

			return;
		}
		var orderId;
		try{
			orderId =  snapshot.data.ref.parent.key;
			console.log("Updating Partner About OrderId "+orderId);
		}
		catch(e){
				console.log("Error  "+e);
		}
 	var updatePartner = require('./apis/update_partner');
     // Since Order is fullfilled , we Have Money 
  	//Send The Money Info to Partner
  	updatePartner.broadcastToPartner(orderId);
  });

//==============================================================
 


// , {emailAddress,password, f}
// exports.login = functions.https.onRequest((req,res) => {
	// var loginHandler = require('./apis/login_handler');
	// loginHandler.doLogin(req,res);
// });


//===============================================================

// exports.likebook = functions.https.onRequest((req,res) => {
// 	var likeHandler = require('./apis/like_handler');
// 	like_handler.performLike(req,res);
// });


//===============================================================
	// Working///////////////////////////////////////////
	// returns status:1/0
// exports.saveDefaultLocation = functions.https.onRequest((req,res)=>{
// 	var defLat = req.body.defLat;
// 	var defLon  = req.body.defLon;
// 	var userId = req.body.userId;
// 	var userPath = 'users/'+userId;
// 	var updateLat = {
// 		defLon:defLon,
// 		defLat:defLat
// 	};
// 	var userRef = db.ref(userPath);
// 	userRef.update(updateLat,err=>{
// 		if (err) {
// 			console.log("Error");
// 			if (!res.headersSent) {
// 			res.send({status:0});
// 			}
// 		}
// 		else{
// 			if (!res.headersSent) {
// 			res.send({status:1});
// 		}
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
//Common for both partner and user
// exports.rentMyCollection = functions.https.onRequest((req,res)=>{
// 	// A Partner Has sent a Image Link, saying he has new Image
// 	// 
// 	var id = req.body.profileId;
// 	var imageURL = req.body.imageURL;
// 	var partnerName = req.body.partnerName;
// 	var phoneNumber = req.body.phoneNumber;
// 	var fromWhere = req.body.fromWhere;
// 	var followId;
// 	var newSource = {
// 		followId:0,
// 		fromWhere:fromWhere,
// 		id:partnerId,
// 		imageURL:imageURL,
// 		partnerName:partnerName,
// 		phoneNumber:phoneNumber
// 	};
// 	var sourcePath = "platform/books/new";
// 	var sourceRef = db.ref(sourcePath);
// 	sourceRef.once("value",snap=>{
// 		followId = snap.numChildren();
// 	}).then(function(){
// 		newSource.followId = followId;
// 		console.log("Found  Follow Id "+followId);
// 		sourceRef.child(followId).set(newSource,err=>{
// 			if (err) {
// 				if (!res.headersSent) {
// 				res.send({status:0});
// 				}
// 			}
// 			else{
// 				if (!res.headersSent) {
// 				res.send({status:1});
// 				}
// 			}
// 		});	
// 	}).catch(function(){
// 		if (!res.headersSent) {
// 				res.send({status:0});
// 			}
// 	});	
// });


// exports.checkoutMoney = functions.https.onRequest((req,res)=>{
// 	// var partnerId = req.body.partnerId;
// 	// Get the Amount to be paid , get his location and Phone
// });

// ============================================================


// WORKING ////////////////////////////////////////////

exports.getPartnerBook = functions.https.onRequest((req,res) =>{

	var partnerHome = require('./apis/partner_home');
	partnerHome.getBooksByPartnerId(req,res);

});


//===========================================================


//WORKING//////////////////////////////////////

exports.getPartnerTransactions =  functions.https.onRequest((req,res)=>{
	// Get his home Page
	var returnJson = {
		"transactions":[]
	};
	var partnerId = req.body.partnerId;
	var d =new Date();
	var month = d.getMonth();
	var transactionPath = "partnerTransactions/"+partnerId+'/earnings/'+month;
	console.log("Getting Transasctio Path "+transactionPath);
	var transRef = db.ref(transactionPath);
	transRef.once("value", snap =>{
		 snap.forEach(s=>{
		 		var trans = {
		 			amount:s.val().amount,
		 			duration:s.val().windowId,
		 			productName:s.val().productName,
		 			imageURL:s.val().imageURL,
		 			timestamp:s.val().timeStamp
		 		};
		 		returnJson.transactions.push(trans);

		 });
		 if (!res.headersSent) {
		 	res.send(returnJson);
		 }
	});

});



//--------------------------------------------------------

//Rider Home  Page
exports.getUndeliveredOrders = functions.https.onRequest((req,res)=>{
		
				var returnJson = {
						"orders":[]
				};
				var ordersRef = db.ref("orders");
				ordersRef.orderByChild("deliveryStatus").equalTo(0)
					.once("value",snap=>{
						// Full Order Child
						snap.forEach(snapshot => {
							// Get The Values and add it to return String 
							returnJson.orders.push({
							 	orderId:snapshot.val().orderId,
								userId:snapshot.val().userId,
							 	firstName:snapshot.val().firstName,
							 	lastName:snapshot.val().lastName,
							 	orderLat:snapshot.val().orderLat,
							 	orderLon:snapshot.val().orderLon,
							 	products: snapshot.val().products,
							 	amount:snapshot.val().payment.amount,
							 	orderInsertedAt:snapshot.val().timingEngine.orderInsertedAt
							});
						});
						if (!res.headersSent) {
							res.send(returnJson);
						}
				});
});



exports.registerRider = functions.https.onRequest((req,res)=>{


	var riderName = req.body.riderName;
	var riderPhoneNumber = req.body.phoneNumber;
	var emailAddress = req.body.emailAddress;
	var password = req.body.password;
	var ridersRef = db.ref("riders");

	var returnJson = {
		
	};
	var newRider = {
		status:0,
		riderId:0,
		riderName:riderName,
		phoneNumber:riderPhoneNumber,
		emailAddress:emailAddress,
		password:password
	};
 	
     ridersRef.once("value",function(snap){
  				var riderCount = snap.numChildren()+1;
  				console.log("Pushing Order At "+riderCount);
  				newRider.riderId = riderCount;
  				ridersRef.child(riderCount).set(newRider)
  				.then(snapshot => {

     				//pushed, user object, is now "snap"
     				//Appending operation status to result
     				console.log("Pushed User ");
     				
     				if (!res.headersSent) {
							newRider.status = 1;
							res.send(newRider);
     				}
     		
    			 })
     			.catch(function(error){
     				console.log("Error at Pushing Registartion "+error);
     				if (!res.headersSent) {
						res.send({status:0});
     				}
     			});
     		});


});

exports.registerPartner = functions.https.onRequest((req,res)=>{


	var partnerFirstName = req.body.firstName;
	var partnerLastName = req.body.lastName;
	var partnerPhoneNumber = req.body.phoneNumber;
	var emailAddress = req.body.emailAddress;
	var password = req.body.password;
	var partnerRef = db.ref("partners");

	var returnJson = {
		
	};
	var newPartner = {
		status:0,
		partnerId:0,
		currentAmount:0,
		firstName:partnerFirstName,
		lastName:partnerLastName,
		phoneNumber:partnerPhoneNumber,
		emailAddress:emailAddress,
		password:password
	};
 	
     partnerRef.once("value",function(snap){
  				var partnerCount = snap.numChildren()+1;
  				console.log("Pushing Partner At "+partnerCount);
  				newPartner.partnerId = partnerCount;
  				partnerRef.child(partnerCount).set(newPartner)
  				.then(snapshot => {

     				//pushed, user object, is now "snap"
     				//Appending operation status to result
     				console.log("Pushed Partner ");
     				
     				if (!res.headersSent) {
							newPartner.status = 1;
							res.send(newPartner);
     				}
     		
    			 })
     			.catch(function(error){
     				console.log("Error at Pushing Registartion "+error);
     				if (!res.headersSent) {
						res.send({status:0});
     				}
     			});
     });
});

// exports.getRiders = functions.https.onRequest((req,res)=>{
	
// 	var ridersRef = db.ref("riders");
// 	ridersRef.once("value",snap=>{
// 				if (!res.headersSent) {
// 					res.setHeader()
// 						res.status(200).send(snap.val());
// 				}
// 	});

// });


// Get Exam details

exports.getExamDetails = functions.https.onRequest((req,res)=>{

	var examCode = req.body.examCode;
	var examsRef = db.ref("exams/examCode");
	examsRef.once("value",snap => {

			if (!res.headersSent) {
				res.send(snap.val());
			}
	});


});


// Save Exam Details

// exports.saveExamDetails = functions.https.onRequest((req,res)=>{
// 	var examName  = req.body.examName;
// 	var examBaseCat  = req.body.exambaseCat;
// 	var examSubCat = req.body.examSubCat;
// 	var nextDate = req.body.time;
// 	var type = req.body.type;
// 	var about = req.body.about;
// 	var count = req.body.count;
// 	var topics = 



// });