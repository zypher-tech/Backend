
var express = require('express');
var admin = require("firebase-admin");


var response ;
var request ;
var email;
var pass;


var loginStatus = {
   status :'',
   firstName:'',
   lastName:'',
   userId:'',
   userFcmToken:'',

   phoneNumber:'',
   user
}

var db = admin.database();
var result;

exports.doLogin = function(req, res){
    response = res;
    email  = req.body.email;
    pass  = req.body.password;
    validate(email,pass).then(sendResult,error);
	})
  ;
};
function validate = function(email,pass){
  var userRef = db.ref("users");
  userRef.orderByChild("email").equalTo(email)
  .once("value",function(snapshot){
    if (pass == snapshot.val().password) {
      sendResult(snapshot.val());

    }
  });

function sendResult = function(snap){
    loginStatus.status = 1;
    loginStatus.firstName  = snap.val().firstName;
    loginStatus.phoneNumber = snap.val().phoneNumber;
    loginStatus.userId = snap.val().userId;
    response.send(loginStatus);



};
function error = function(){
 loginStatus.status = 0;
 response.send(loginStatus);
}
