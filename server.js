
// Initilisation Code
const express = require('express');
const app = express();
var path = require('path');


var cors = require('cors')

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
app.set('views', __dirname + 'public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// view engine setup
app.set('views', path.join(__dirname, 'views'));






app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '../public')));






//Enable Loggin
// var placeOrder = require('./routes/place_order_api');


// The Root Page TODO :  this is is the Webpage

app.get('/',function(req,res){

  res.render('coming_soon.html');

});


app.get('/adminpanel',function(req,res){
  res.render('admin_panel.html');
})




app.get('/orderspanel',function(req,res){
  res.render('orders_page.html');
});
/*
   show a Product Based on Product Id from Request Object

   The Request params
      {
       "pid":45
    }
*/

app.post('/api/isBooksPresent',function(req,res){
  // Get a database reference to our posts
  console.log("Inside ISBN Check");
  var isbn = req.body.isbn;
  var isten  = req.body.isten;
  var db = admin.database();
  var returnJson = {};
  var booksRef = db.ref("books");
  if (isten == 1) {
    booksRef.orderByChild("ISBN").equalTo(isbn).on("value", function(snapshot) {
      // If First Value is 0
        snapshot.forEach(snap => {
            if (!snap.exists) {

            }
            else{
              returnJson.pid = snap.val().pid;
            }
        });

         if (!res.headersSent) {
            res.send(returnJson);

        }
        else{
          console.log("Response Already Sent");
        }
      }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });  
  }
  else{
      booksRef.orderByChild("ISBN").equalTo(isbn).on("value", function(snapshot) {
       res.send(snapshot.val());
      }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });  
  }
  
});






// app.post('/api/placeorder',function(req,res){

//
  // placeOrder.placeOrderForuser(req,res);
// });


const server = app.listen(5000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});
