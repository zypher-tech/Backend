var express = require('express');
var router = express.Router();

var response ;
var request ;
// Get a database reference to our blog
var db = admin.database();


exports.savePartnerToken = function (req,res) {
    response = res;
    request = req;
    var partnerId = request.body.partnerId;
    var tokenId  = request.body.tokenId;

    var partnersRef = db.ref("partners");
    usersRef.orderByChild("partnerId").equalTo(partnerId)
    .once("value",function(snap){

    })
};
