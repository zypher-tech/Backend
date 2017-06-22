
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


var db = admin.database();

var orderSchema = {
	isAccepted:'',
	orderId : '',
	userId :'',
	firstName:'',
	readingDuration:'',
	lastName:'',
	phoneNumber:'',
	orderLat:'',
	orderLon :'',
	products:[],
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
var orderFailed = {
	isAccepted:''
};




/*These are Individual Modules which take care of
	specific tasks

	Each module has only



  one contructor accepting request,response as objects
*/
var showProduct = require('./apis/show_product');


var homemod = require('./apis/home_api');
var tokenManager = require('./apis/token_manager');





// User Related Modules

var newUserHandler = require('./apis/register_new_user');
var loginHandler = require('./apis/login_handler');
var genreView = require('./apis/genres_viewer_api');
var addtoCart = require('./apis/add_to_cart');






// //Order Related Modules
var riderHandler = require

/*Home Page*
	Pulls Data the Best Rated data from  books and Combos
	no Request params
*/
exports.home =functions.https.onRequest((request, response) => {

		homemod.initialize(request,response);
  });

/*View a Single Product
	Req Params:
		{"pid" : ""}
 */
exports.showProduct = functions.https.onRequest((request, response) => {

		showProduct.sendProduct(request,response);
	});



/*This is used for all saving all Tokends of Kind
 * request parms are
 	{
		"profileId":"",
		"tokenId","",
		"fromWhere": can be "0"- user ,"1" -- rider,"2"-->partner
 	}
*/
exports.saveFCMToken = functions.https.onRequest((req,res) => {
	 	//First get from where FCM is Received
	 	tokenManager.saveToken(req,res);
	});



/*User Registration Handler

	"firstName","lastName","emailAddress","password","phoneNumber"
*/
exports.registerNewUser =  functions.https.onRequest((req,res) => {

		newUserHandler.register(req,res);
	});

exports.genreViewer =  functions.https.onRequest((req,res) => {

	genreView.showByGenres(req,res);

});

/*A Database Trigger Function , This Function is Called Whenever a new  Order is Inserted*/

exports.orderIsRecevied = functions.database.ref('/orders/{pushId}').onWrite(snapshot => {
      // Grab the current value of what was written to the Realtime Database.


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
        .then(broadcast(orderSchema),error());
        // orderSchema.products[i].pid = pid;
        // orderSchema.products[i].productName = productName;
      }
 });



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
