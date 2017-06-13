
// Initilisation Code
const express = require('express');
const app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var admin = require("firebase-admin");

var serviceAccount = require("./bookaholic-786-firebase-adminsdk-izd89-be4149cddc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bookaholic-786.firebaseio.com"
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Defining Routes

//Home Controllers
//product Controllers
//Admin Controllers



//For Website
var index = require('./routes/index');

//Equivalent Mobile API

var home = require('./routes/home_api');

//The Admin Panel, Renders HTML , NO API

var showAdminPage = require('./routes/admin_panel_provider');

if (showAdminPage == null) {
	console.log("Admin Null");
}
var showProduct = require('./routes/show_product_api');
var newReleases  = require('./routes/new_releases_api');
var offers = require('./routes/offers_api');
var placeOrder = require('./routes/place_order_api');
var saveUserFckToken = require('./routes/save_user_fcm_token')
var saveRiderFcmToken = require('./routes/save_partner_fcm_token');
var searchProduct = require('./routes/search_product_api');
var newUser = require('./routes/new_user_api');
var login = require('./routes/login_api');
var register = require('./routes/register_api');
var orderBroadcastApi =require('./routes/broadcast_order_api');





app.get('/home', function(req, res) {
	home.initialize(req,res);
});


/*
   show a Product Based on Product Id from Request Object

   The Request params
      {
       "pid":45
    }
*/
app.get('/api/showproduct',function(req,res){
    showProduct.viewProduct(req,res);
});




app.get('/adminpanel',function(req, res) {
	console.log('inside Functions');
	showAdminPage.showAdmin(req,res);
});

app.get('/newReleases',function(req, res) {
	console.log('inside Functions');
	newReleases.initialize(req,res);
});



app.post('/api/placeorder',function(req,res){

  placeOrder.placeOrderForuser(req,res);
});


app.get('/books/:pid',function(req, res) {
	var pid  = req.params.pid;
	console.log(pid);
	showProduct.show(req,res,pid);
});

const server = app.listen(5000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
