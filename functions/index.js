
const functions = require('firebase-functions');






var home_api = require('./routes/home_api');
var show_product = ('./routes/show_product_api');
var new_release  = ('./routes/new_releases_api');
var offers = ('./routes/offers_api');
var get_product = ('./routes/show_product_api');
var place_order = ('./routes/place_order');
var saveUserFckToken = ('./routes/saveUserFckToken');
var savePartnerFcmToken = ('./routes/save_user_fcm_token');
var saveRiderFcmToken = ('./routes/save_partner_token_api');
var searchProduct = ('./routes/search_product_api');
var newUser = ('./routes/new_user_api');
var login = ('./routes/login_api');
var register = ('./routes/register_api');
var orderBroadcastApi = ('./routes/broadcast_order_api');


/*Home Page*/
exports.home =functions.https.onRequest((request, response) => {
 response.send("Hello from Home AppBackend");
});

exports.newReleases = functions.https.onRequest((request, response) => {


      
});



exports.offers = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});



exports.showProduct = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});



exports.placeOrder = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.insertProduct  = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});



exports.searchProduct  = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});



exports.addToCart  = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});



exports.saveUserFckToken  = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});



exports.savePartnerFcmToken  = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});




exports.saveRiderFcmToken  = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});



exports.newRider  = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
