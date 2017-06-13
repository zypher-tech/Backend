var express = require('express');
var admin = require("firebase-admin");



var userSchema = {
  userId:'',
  firstName:'',
  lastName: '',
  phoneNumber:'',
  emailAddress:'',
  password:'',
  userName:'',
  delLat:'',
  defLon:'',
  isToiAccepted:'',
  rating:'',
  wishlists:[],
  cart:[],
  orders:[]

}
var response ;
var request ;
var email;
var pass;
var userCount =0;
// Get a database reference to our blog
var db = admin.database();
const router = express.Router();



exports.registerUser = function (req,res) {
  response = res;
  request = req;
  userSchema.firstName = req.body.firstName;
  userSchema.lastName = req.body.lastName;
  userSchema.phoneNumber = req.body.phoneNumber;
  userSchema.password = req.body.password;
  userSchema.emailAddress = req.body.emailAddress;


  //get the User COunt
  var usersRef = db.ref("users");
  usersRef.on('child_added',function(snap){
    userCount++;

  })
  .then(addUser,badHappened);
};

exports.addUser  = function(){
 var userRf  = db.ref("users");
 orderSchema.userId = userCount;
 userRf.child(orderSchema.userId).set(orderSchema);
};
