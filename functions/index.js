

'use strict';
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
//The Root path of Db

// Individual Modeules
/*These are Individual Modules which take care of
	*specific tasks
	*Each module has only  one contructor accepting request,response as objects
*/
// User Related Modules

// var newUserHandler = require('./apis/register_new_user');
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

 
// exports.showProduct = functions.https.onRequest((request, response) => {
// 		var showProduct = require('./apis/show_product');

// 		showProduct.sendProduct(request,response);
// 	});

// =====================================================


// =====================================================


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
		"fromWhere": can be "0"- user ,"1" -- rider,"2"-->partner
 	}
*/
// FOUR-->

// =====================================================

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

// exports.registerNewUser =  functions.https.onRequest((req,res) => {

// 		// newUserHandler.register(req,res);
// 	});

//======================================================
//SIX---->

// exports.genreViewer =  functions.https.onRequest((req,res) => {

// 	// genreView.showByGenres(req,res);

// });
// =====================================================


/* Cloud Function-
	*
	*
	*
	*

// */
// exports.placeOrderForuser = functions.https.onRequest((req,res) => {
// 	userOrderHandler.placeOrderForuser(req,res);
// };
/*A Database Trigger Function , This Function is Called Whenever a new  Order is Inserted*/


exports.orderIsRecevied = functions.database.ref('/orders/{pushId}').onWrite(snapshot => {
      // Grab the current value of what was written to the Realtime Database.
     
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
		returnDate:'',


	},
	orderFulfillment:{
		returnedAt:'',
		returnCondition:'',

	}
		};

      console.log("Broadcasting orderId : "+snapshot.data.val().orderId);

      //
      orderSchema.orderId  = snapshot.data.val().orderId;
      orderSchema.firstName = snapshot.data.val().firstName;
      orderSchema.lastName = snapshot.data.val().lastName;

      orderSchema.phoneNumber = snapshot.data.val().phoneNumber;
      orderSchema.orderLat = snapshot.data.val().orderLat;
      orderSchema.orderLon = snapshot.data.val().orderLon;
      orderSchema.payment.amount = snapshot.data.val().payment.amount;
      orderSchema.timingEngine.orderAcceptedAt = snapshot.data.val().timingEngine.orderAcceptedAt;
      var productsCount  = snapshot.data.val().products.length;

      for (var i = 0;i<productsCount ;i++) {

        //looping through products
       var pidval = snapshot.data.val().products[i].pid;
        var productNameval =  snapshot.data.val().products[i].productName;
        orderSchema.products.push({pid: pidval, productName: productNameval})
        .then(broadcast(orderSchema));
        // orderSchema.products[i].pid = pid;
        // orderSchema.products[i].productName = productName;
      }
 });



// =====================================================

// // SEVEN
// exports.getPartnerHome = functions.https.onRequest((req,res) => {
// 	 var partnerId = req.body.partnerId;
// 	 var partnerPath = "partners/"+partnerId;
// 	 var partnerRef = db.ref(partnerPath);
// });

// =====================================================

function broadcast(order){


	var updateRider = require('./apis/update_rider');
	var updatePartner = require('./apis/update_partner');
      // updatePartner.broadcastToPartner(orderSchema);
      updateRider.broadcastToRiders(orderSchema);
};


/*Save user FCM TOken
 * It handles 3 Types of  Token Management
 pass in "tokenId","profileId","fromWhere":0-->user,1-->rider,2-->partner

*/




// // The General Error Handler
// function error(){

//     	console.log("Error in Pushing Order");
// };
