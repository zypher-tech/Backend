
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


var db = admin.database();

var orderSchema = {
	isAccepted:'',
	orderId : '',
	userId :'',
	firstName:'',
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

}
var orderFailed = {
	isAccepted:''
}

var showProduct = require('./apis/show_product');


var homemod = require('./apis/home_api');

var tokenManager = require('./apis/token_manager')













/*Home Page*/
exports.home =functions.https.onRequest((request, response) => {

		homemod.initialize(request,response);
  });

/*View a Single Product */

exports.showProduct = functions.https.onRequest((request, response) => {
		showProduct.sendProduct(request,response);
	});



// Save Order Manager Receiver Token

/* A token is Receieved from this service
	save it to to a Path
	on Receiving a order , get the tokenId from Tree and Pass the Notification
 *
*/



/*A Database Trigger Function , This Function is Called Whenever a new  Order is Inserted*/

exports.orderIsRecevied = functions.database.ref('/orders/{pushId}')
    .onWrite(snapshot => {
      // Grab the current value of what was written to the Realtime Database.
      console.log("inside Order Received Functions");

      console.log("snapshot.data.val().orderId : "+snapshot.data.val().orderId);

      //Whil
      orderSchema.orderId  = snapshot.data.val().orderId;
      orderSchema.firstName = snapshot.data.val().firstName;
      orderSchema.lastName = snapshot.data.val().lastName;

      orderSchema.phoneNumber = snapshot.data.val().phoneNumber;
      orderSchema.orderLat = snapshot.data.val().orderLat;
      orderSchema.orderLon = snapshot.data.val().orderLon;
      orderSchema.payment.amount = snapshot.data.val().payment.amount;
      orderSchema.timingEngine.orderAcceptedAt = snapshot.data.val().timingEngine.orderAcceptedAt;

     console.log("Products count  "+snapshot.data.val().products.length);
      var productsCount  = snapshot.data.val().products.length;
      for (var i = 0;i<productsCount ;i++) {

        //looping through products
       var pidval = snapshot.data.val().products[i].pid;
        var productNameval =  snapshot.data.val().products[i].productName;
        orderSchema.products.push({pid: pidval, productName: productNameval});
        // orderSchema.products[i].pid = pid;
        // orderSchema.products[i].productName = productName;
      }

      

      console.log("Got Order variables The products is : "+orderSchema.products[0].productName);




    });

 /*Save user FCM TOken*/
exports.saveFCMToken = functions.https.onRequest((req,res) => {
 	//First get from where FCM is Received
 	tokenManager.saveToken(req,res);
 });