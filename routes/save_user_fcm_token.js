var express = require('express');
var router = express.Router();

var response ;
var request ;
var email;
var pass;
var userCount =0;
// Get a database reference to our blog
var db = admin.database();


exports.saveUserToken = function (req,res) {
    response = res;
    request = req;
    var userId = request.body.userId;
    var tokenId  = request.body.tokenId;

    var usersRef = db.ref("users");
    usersRef.orderByChild("userId").equalTo(userId)
    .once("value",function(snap){
      
    })
};
